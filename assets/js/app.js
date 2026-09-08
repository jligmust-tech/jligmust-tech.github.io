/* scAI Index — shared app logic: nav active state, leaderboard table rendering, sorting, model cards. */
(function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function firstScoreKey(sec) {
    for (var i = 0; i < sec.columns.length; i++) {
      if (sec.columns[i].score) return sec.columns[i].key;
    }
    return null;
  }

  function parseScaleNumber(value) {
    var match = String(value == null ? "" : value).replace(/,/g, "").match(/([0-9]+(?:\.[0-9]+)?)\s*([KMBT])?/i);
    if (!match) return null;
    var multiplier = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[String(match[2] || "").toUpperCase()] || 1;
    return parseFloat(match[1]) * multiplier;
  }

  function formatScaleNumber(value) {
    if (value == null || !isFinite(value)) return "—";
    var units = [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]];
    for (var i = 0; i < units.length; i++) {
      if (Math.abs(value) >= units[i][0]) {
        var scaled = value / units[i][0];
        return (scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2)).replace(/\.00$/, "") + units[i][1];
      }
    }
    return value.toFixed(0);
  }

  function externalLink(url, label) {
    return "<a href='" + esc(url) + "' target='_blank' rel='noopener noreferrer'>" + esc(label) + "</a>";
  }

  function evidenceLinks(model) {
    var links = [];
    if (model.url) links.push(externalLink(model.url, "model"));
    (model.sources || []).forEach(function (url, i) {
      if (url !== model.url) links.push(externalLink(url, "S" + (i + 1)));
    });
    if (!links.length) return "";
    return "<span class='model-links' title='" + esc(model.notes || "") + "'>" + links.join(" ") + "</span>";
  }

  /* Nav active state from body[data-page] */
  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");
    if (page) {
      var links = document.querySelectorAll("nav .links a");
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("data-page") === page) links[i].classList.add("active");
      }
    }

    if (window.SCAI_DATA) {
      var board = document.getElementById("leaderboard");
      if (board) initLeaderboard(board);
      var grid = document.getElementById("modelCards");
      if (grid) renderModelCards(grid);
      var feed = document.getElementById("updates");
      if (feed) renderUpdates(feed);
      var guide = document.getElementById("researchGuide");
      if (guide) renderResearchGuide(guide);
    }
  });

  /* ---------- Leaderboard: two sections, sortable table ---------- */
  function initLeaderboard(el) {
    var current = "scFoundation";
    var sortKey = firstScoreKey(SCAI_DATA[current]), sortDir = -1;

    var h = "";
    h += '<div class="card">';
    h += '<div class="segment" id="seg">';
    h += '<button data-sec="scFoundation" class="active">Single-Cell Foundation Models</button>';
    h += '<button data-sec="generalLLM">General LLMs on sc Tasks</button>';
    h += '</div>';
    h += '<p class="sub" id="secDesc" style="margin-top:12px"></p>';
    h += '<div class="tblwrap"><table id="tbl"><thead id="thead"></thead><tbody id="tbody"></tbody></table></div>';
    h += '</div>';
    h += '<div class="card plot-card">';
    h += '<div class="plot-heading"><div><h2>Model size vs performance</h2><p class="sub">Explore the source-linked snapshot as a scatter plot. Choose the axes; missing values are omitted.</p></div></div>';
    h += '<div class="plot-controls"><label>X axis<select id="plotX"></select></label><label>Y axis<select id="plotY"></select></label></div>';
    h += '<p class="sub plot-note" id="plotNote"></p><div class="scatter-wrap"><svg id="scatterPlot" class="scatter-plot" viewBox="0 0 960 430" role="img" aria-label="Model size versus performance scatter plot"></svg></div>';
    h += '</div>';
    el.innerHTML = h;

    var xSelect = el.querySelector("#plotX");
    var ySelect = el.querySelector("#plotY");
    xSelect.addEventListener("change", renderPlot);
    ySelect.addEventListener("change", renderPlot);

    el.querySelectorAll("#seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        el.querySelectorAll("#seg button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        current = b.getAttribute("data-sec");
        sortKey = firstScoreKey(SCAI_DATA[current]); sortDir = -1;
        renderTable();
      });
    });

    function renderTable() {
      var sec = SCAI_DATA[current];
      document.getElementById("secDesc").textContent = sec.desc;

      var th = "";
      th += "<th class='sortable' data-key='name'>Model <span class='arrow'>▲▼</span></th>";
      sec.columns.forEach(function (c) {
        var cls = "sortable num";
        th += "<th class='" + cls + "' data-key='" + esc(c.key) + "'>" + esc(c.label) + " <span class='arrow'>▲▼</span></th>";
      });
      document.getElementById("thead").innerHTML = "<tr>" + th + "</tr>";

      var rows = sec.models.slice();
      if (sortKey) {
        rows.sort(function (a, b) {
          var va = a[sortKey], vb = b[sortKey];
          var aMissing = va === null || va === undefined || va === "";
          var bMissing = vb === null || vb === undefined || vb === "";
          if (aMissing || bMissing) {
            if (aMissing && bMissing) return 0;
            return aMissing ? 1 : -1;
          }
          if (typeof va === "string" || typeof vb === "string") {
            return sortDir * String(va).localeCompare(String(vb));
          }
          return sortDir * (va - vb);
        });
      }

      var tb = "";
      rows.forEach(function (m, i) {
        var rankCls = i === 0 ? "r1" : i === 1 ? "r2" : i === 2 ? "r3" : "";
        tb += "<tr><td><span class='rank " + rankCls + "'>" + (i + 1) + "</span> ";
        tb += "<span class='model-name'>" + (m.url ? externalLink(m.url, m.name) : esc(m.name)) + "</span><br><span class='model-org'>" + esc(m.org) + "</span><br>" + evidenceLinks(m) + "</td>";
        sec.columns.forEach(function (c) {
          var v = m[c.key];
          var cls = c.score ? "score" : "";
          var val = (typeof v === "number" && c.score) ? v.toFixed(2) : (v || "—");
          if (v === undefined || v === null || v === "") val = "<span class='na'>—</span>";
          tb += "<td class='num " + cls + "'>" + (typeof val === "string" && val.indexOf("<span") === 0 ? val : esc(val)) + "</td>";
        });
        tb += "</tr>";
      });
      document.getElementById("tbody").innerHTML = tb;

      document.querySelectorAll("#thead th.sortable").forEach(function (thEl) {
        thEl.addEventListener("click", function () {
          var key = thEl.getAttribute("data-key");
          if (sortKey === key) sortDir = -sortDir; else { sortKey = key; sortDir = key === "name" ? 1 : -1; }
          document.querySelectorAll("#thead th").forEach(function (x) {
            x.classList.remove("up", "down");
            if (x.getAttribute("data-key") === key) x.classList.add(sortDir === 1 ? "up" : "down");
          });
          renderTable();
        });
      });
      configurePlotAxes(sec);
      renderPlot();
    }

    function configurePlotAxes(sec) {
      var xOptions = [];
      if (sec.models.some(function (m) { return parseScaleNumber(m.params) != null; })) xOptions.push({ key: "params", label: "Model size (parameters)" });
      if (sec.models.some(function (m) { return parseScaleNumber(m.cells) != null; })) xOptions.push({ key: "cells", label: "Pretraining cells" });
      xOptions.push({ key: "year", label: "Publication year" });
      var yOptions = sec.columns.filter(function (c) { return c.score; }).map(function (c) { return { key: c.key, label: c.label.replace(/\s*↑$/, "") }; });
      var selectedX = xSelect.value, selectedY = ySelect.value;
      xSelect.innerHTML = xOptions.map(function (x) { return "<option value='" + esc(x.key) + "'>" + esc(x.label) + "</option>"; }).join("");
      ySelect.innerHTML = yOptions.map(function (y) { return "<option value='" + esc(y.key) + "'>" + esc(y.label) + "</option>"; }).join("");
      xSelect.value = xOptions.some(function (x) { return x.key === selectedX; }) ? selectedX : (xOptions.some(function (x) { return x.key === "params"; }) ? "params" : xOptions[0].key);
      ySelect.value = yOptions.some(function (y) { return y.key === selectedY; }) ? selectedY : (yOptions[0] ? yOptions[0].key : "");
    }

    function renderPlot() {
      var sec = SCAI_DATA[current];
      var xKey = xSelect.value, yKey = ySelect.value;
      var xOption = xKey === "params" ? "Model size (parameters)" : xKey === "cells" ? "Pretraining cells" : "Publication year";
      var yOption = ((sec.columns.find(function (c) { return c.key === yKey; }) || {}).label || yKey).replace(/\s*↑$/, "");
      var isLog = xKey === "params" || xKey === "cells";
      var items = sec.models.map(function (m) {
        var x = xKey === "year" ? Number(m.year) : parseScaleNumber(m[xKey]);
        var y = typeof m[yKey] === "number" ? m[yKey] : null;
        return { model: m, x: x, y: y };
      }).filter(function (p) { return p.x != null && isFinite(p.x) && p.x > 0 && p.y != null && isFinite(p.y); });
      var svg = el.querySelector("#scatterPlot");
      var note = el.querySelector("#plotNote");
      if (!items.length) {
        svg.innerHTML = "<text x='480' y='210' text-anchor='middle' fill='#64748b'>No models have both selected values.</text>";
        note.textContent = "No plotted points for this axis combination.";
        return;
      }
      var left = 82, right = 24, top = 30, bottom = 68, width = 960, height = 430;
      var plotW = width - left - right, plotH = height - top - bottom;
      var rawMin = Math.min.apply(null, items.map(function (p) { return p.x; }));
      var rawMax = Math.max.apply(null, items.map(function (p) { return p.x; }));
      var xMin = isLog ? Math.log10(rawMin) : rawMin, xMax = isLog ? Math.log10(rawMax) : rawMax;
      if (xMin === xMax) { xMin -= 1; xMax += 1; }
      var xPad = (xMax - xMin) * 0.06; xMin -= xPad; xMax += xPad;
      var yMin = 0, yMax = 1;
      function xPos(value) { var v = isLog ? Math.log10(value) : value; return left + ((v - xMin) / (xMax - xMin)) * plotW; }
      function yPos(value) { return top + (1 - (value - yMin) / (yMax - yMin)) * plotH; }
      function xLabel(value) { return xKey === "year" ? String(Math.round(value)) : formatScaleNumber(value); }
      var h = "<title>" + esc(xOption + " vs " + yOption) + "</title><desc>Each point is a model with a published numeric value for both selected axes.</desc>";
      [0, 0.25, 0.5, 0.75, 1].forEach(function (tick) {
        var y = yPos(tick);
        h += "<line x1='" + left + "' y1='" + y.toFixed(1) + "' x2='" + (width - right) + "' y2='" + y.toFixed(1) + "' stroke='#e2e8f0'/>";
        h += "<text x='" + (left - 12) + "' y='" + (y + 4).toFixed(1) + "' text-anchor='end' fill='#64748b' font-size='12'>" + tick.toFixed(2) + "</text>";
      });
      var xTicks = [];
      for (var i = 0; i < 5; i++) {
        var tickValue = isLog ? Math.pow(10, xMin + ((xMax - xMin) * i / 4)) : xMin + ((xMax - xMin) * i / 4);
        xTicks.push(tickValue);
      }
      xTicks.forEach(function (tickValue) {
        var x = xPos(tickValue);
        h += "<line x1='" + x.toFixed(1) + "' y1='" + top + "' x2='" + x.toFixed(1) + "' y2='" + (height - bottom) + "' stroke='#f1f5f9'/>";
        h += "<text x='" + x.toFixed(1) + "' y='" + (height - bottom + 23) + "' text-anchor='middle' fill='#64748b' font-size='12'>" + esc(xLabel(tickValue)) + "</text>";
      });
      h += "<line x1='" + left + "' y1='" + (height - bottom) + "' x2='" + (width - right) + "' y2='" + (height - bottom) + "' stroke='#94a3b8'/><line x1='" + left + "' y1='" + top + "' x2='" + left + "' y2='" + (height - bottom) + "' stroke='#94a3b8'/>";
      h += "<text x='" + (left + plotW / 2) + "' y='" + (height - 15) + "' text-anchor='middle' fill='#475569' font-size='13'>" + esc(xOption + (isLog ? " · log scale" : "")) + "</text>";
      h += "<text x='18' y='" + (top + plotH / 2) + "' transform='rotate(-90 18 " + (top + plotH / 2) + ")' text-anchor='middle' fill='#475569' font-size='13'>" + esc(yOption) + " (higher is better)</text>";
      items.forEach(function (p) {
        var x = xPos(p.x), y = yPos(p.y);
        var tip = p.model.name + " — " + xOption + ": " + xLabel(p.x) + "; " + yOption + ": " + p.y.toFixed(3);
        h += "<circle cx='" + x.toFixed(1) + "' cy='" + y.toFixed(1) + "' r='6' fill='#3182ce' fill-opacity='0.82' stroke='#ffffff' stroke-width='2'><title>" + esc(tip) + "</title></circle>";
      });
      svg.innerHTML = h;
      note.textContent = items.length + " of " + sec.models.length + " models plotted. Parameter and cell-count axes use a logarithmic scale; each point requires a published size and score.";
    }

    renderTable();
  }

  /* ---------- Model cards grid (models.html) ---------- */
  function renderModelCards(grid) {
    var h = "";
    Object.keys(SCAI_DATA).forEach(function (secKey) {
      var sec = SCAI_DATA[secKey];
      if (!sec.models) return;
      h += "<h2 style='margin:26px 0 12px'>" + esc(sec.title) + "</h2><div class='cards'>";
      sec.models.forEach(function (m) {
        h += "<div class='mcard'><h3>" + (m.url ? externalLink(m.url, m.name) : esc(m.name)) + "</h3><div class='meta'>" + esc(m.org) + " · " + esc(m.year) + "</div>";
        h += evidenceLinks(m);
        h += "<div class='stats'>";
        sec.columns.forEach(function (c) {
          var v = m[c.key];
          var val = (typeof v === "number" && c.score) ? v.toFixed(2) : (v || "—");
          h += "<div>" + esc(c.label.replace(" ↑", "")) + "<b>" + esc(val) + "</b></div>";
        });
        h += "</div></div>";
      });
      h += "</div>";
    });
    grid.innerHTML = h;
  }

  /* ---------- Updates feed (index.html) ---------- */
  function renderUpdates(feed) {
    var h = "";
    SCAI_DATA.posts.slice(0, 5).forEach(function (p) {
      h += "<li><span class='date'>" + esc(p.date) + "</span><span class='tag'>" + esc(p.tag) + "</span> ";
      h += p.url && p.url !== "#" ? "<a href='" + esc(p.url) + "'>" + esc(p.title) + "</a>" : "<span>" + esc(p.title) + "</span>";
      h += "</li>";
    });
    feed.innerHTML = h;
  }

  /* ---------- Research guide (research.html) ---------- */
  function guideLinks(links) {
    return (links || []).map(function (link) {
      return externalLink(link.url, link.label);
    }).join(" ");
  }

  function guideTable(rows, columns) {
    var h = "<div class='tblwrap'><table class='guide-table'><thead><tr>";
    columns.forEach(function (c) { h += "<th>" + esc(c.label) + "</th>"; });
    h += "</tr></thead><tbody>";
    rows.forEach(function (row) {
      h += "<tr>";
      columns.forEach(function (c) {
        var value = row[c.key];
        if (c.key === "links") {
          h += "<td class='guide-links'>" + guideLinks(value) + "</td>";
        } else if (c.key === "rank" || c.key === "priority") {
          h += "<td><span class='priority-badge'>" + esc(value) + "</span></td>";
        } else if (c.key === "status") {
          h += "<td><span class='evidence-badge'>" + esc(value) + "</span></td>";
        } else if (c.key === "name" || c.key === "task") {
          h += "<td><strong>" + esc(value) + "</strong></td>";
        } else {
          h += "<td>" + esc(value) + "</td>";
        }
      });
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    return h;
  }

  function guideSection(id, title, sub, body) {
    return "<section id='" + esc(id) + "' class='block'><div class='card guide-card'><h2>" + esc(title) + "</h2><p class='sub'>" + esc(sub) + "</p>" + body + "</div></section>";
  }

  function renderResearchGuide(el) {
    var guide = SCAI_DATA.researchGuide;
    if (!guide) return;
    var h = "<p class='guide-lead'>" + esc(guide.intro) + "</p>";
    h += "<div class='guide-policy'><strong>Stage 1 status:</strong> " + esc(guide.sourcePolicy) + "</div>";
    h += "<div class='guide-callout'><strong>How to read the rank:</strong> curation priority for a Stage 1 benchmark and reading list, based on task relevance, visibility, reproducible implementation and representation value. It is not a universal performance ranking.</div>";
    h += guideSection("research-router", "Stage 1 information router", "Choose the research question first; follow the linked public sources before considering any future execution.", guideTable(guide.routes, [
      { key: "route", label: "Research route" }, { key: "question", label: "Question" }, { key: "path", label: "Reading path" }, { key: "inputs", label: "Public inputs" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("research-models", "Stage 1 model priority", "Start here for perturbation-response and post-perturbation gene-expression experiments.", guideTable(guide.stage1Models, [
      { key: "rank", label: "Priority" }, { key: "name", label: "Model" }, { key: "role", label: "Role" }, { key: "scope", label: "Perturbation scope" }, { key: "embedding", label: "Representation / biology prior" }, { key: "generalization", label: "Generalization focus" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("research-model-selection", "Model selection guide", "Use the task first, then read the strengths and trade-offs before choosing a model family.", guideTable(guide.modelSelection, [
      { key: "name", label: "Model" }, { key: "bestFor", label: "Best fit" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "choose", label: "Choose it when" }, { key: "links", label: "Public evidence" }
    ]) + "<div class='guide-choice'><strong>Quick selector:</strong> GEARS for a default genetic baseline; CPA/chemCPA for dose or context composition; CellOT, STATE or PerturbNet for distributional responses; scGPT or scFoundation for frozen scFM probes; LPM or Scouter for biology-aware embedding questions; scVIDR for dose-focused chemical transfer.</div>");
    h += guideSection("research-datasets", "Benchmark datasets and access", "A compact dataset ladder: broad atlases for robustness, canonical studies for interpretable splits, and large perturbation atlases for modern virtual-cell models.", guideTable(guide.benchmarkDatasets, [
      { key: "name", label: "Dataset" }, { key: "type", label: "Type" }, { key: "coverage", label: "Coverage" }, { key: "use", label: "Recommended use" }, { key: "links", label: "Access / paper" }
    ]));
    h += guideSection("research-suites", "Benchmark suites and evaluation", "Use at least one broad comparison suite plus an anti-shortcut or biology-grounded evaluation.", guideTable(guide.evaluationSuites, [
      { key: "name", label: "Suite" }, { key: "focus", label: "Focus" }, { key: "metrics", label: "Metrics / signal" }, { key: "recommendation", label: "Use in study" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("research-citations", "Citation register", "Primary public records behind the Stage 1 routing layer. Publication status is shown so peer-reviewed evidence is not conflated with preprints.", guideTable(guide.citations, [
      { key: "citation", label: "Citation" }, { key: "status", label: "Status" }, { key: "why", label: "Why it is here" }, { key: "links", label: "Public source" }
    ]));
    h += guideSection("research-embeddings", "Perturbation-aware embedding agenda", "Prioritized probes for biology embeddings; P0 is the Stage 1 implementation target.", guideTable(guide.embeddingTasks, [
      { key: "priority", label: "Priority" }, { key: "task", label: "Embedding task" }, { key: "probe", label: "Question" }, { key: "biology", label: "Biology-facing readout" }, { key: "guardrail", label: "Guardrail" }
    ]));
    h += guideSection("research-roadmap", "Stage 2 and backlog", "Broader virtual-cell and perturbation-trained models to add after the common evaluation protocol is stable.", guideTable(guide.roadmap, [
      { key: "name", label: "Model / direction" }, { key: "status", label: "Status" }, { key: "note", label: "Why later" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("research-agent-selection", "Bioinformatics agent & tool selection guide", "Benchmarks measure different capabilities; pair an execution benchmark with a local tool layer when reproducibility and privacy matter.", guideTable(guide.agentSelection, [
      { key: "name", label: "Agent / tool" }, { key: "kind", label: "Type" }, { key: "bestFor", label: "Best fit" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "choose", label: "Choose it when" }, { key: "links", label: "Public evidence" }
    ]) + "<div class='guide-choice'><strong>Quick selector:</strong> scBench for concrete single-cell workflows; BixBench for long computational-biology trajectories; BioAgent Bench for robustness and failure handling; LAB-Bench for broad biology reasoning; ClawBio for a local-first, MCP-compatible execution layer. These are not interchangeable scores.</div>");
    h += "<div id='research-next' class='guide-next'><h2>Suggested first information route</h2><p>Start with the public-source ledger: record each model's paper, code, perturbation scope, representation, benchmark context and limitations. Then route each research question through the canonical datasets and evaluation suites above. The P0 embedding items are evaluation specifications for future work, not runs performed by this site.</p><p class='sub'>The accompanying <a href='blog/posts/2026-09-08-perturbation-virtual-cell-guide.html'>research report</a> explains the rationale and caveats.</p></div>";
    el.innerHTML = h;
  }
})();
