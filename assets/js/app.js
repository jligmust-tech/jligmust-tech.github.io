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
    el.innerHTML = h;

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

  function guideSection(title, sub, body) {
    return "<section class='block'><div class='card guide-card'><h2>" + esc(title) + "</h2><p class='sub'>" + esc(sub) + "</p>" + body + "</div></section>";
  }

  function renderResearchGuide(el) {
    var guide = SCAI_DATA.researchGuide;
    if (!guide) return;
    var h = "<p class='guide-lead'>" + esc(guide.intro) + "</p>";
    h += "<div class='guide-policy'><strong>Stage 1 status:</strong> " + esc(guide.sourcePolicy) + "</div>";
    h += "<div class='guide-callout'><strong>How to read the rank:</strong> curation priority for a Stage 1 benchmark and reading list, based on task relevance, visibility, reproducible implementation and representation value. It is not a universal performance ranking.</div>";
    h += guideSection("Stage 1 information router", "Choose the research question first; follow the linked public sources before considering any future execution.", guideTable(guide.routes, [
      { key: "route", label: "Research route" }, { key: "question", label: "Question" }, { key: "path", label: "Reading path" }, { key: "inputs", label: "Public inputs" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("Stage 1 model priority", "Start here for perturbation-response and post-perturbation gene-expression experiments.", guideTable(guide.stage1Models, [
      { key: "rank", label: "Priority" }, { key: "name", label: "Model" }, { key: "role", label: "Role" }, { key: "scope", label: "Perturbation scope" }, { key: "embedding", label: "Representation / biology prior" }, { key: "generalization", label: "Generalization focus" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("Benchmark datasets and access", "A compact dataset ladder: broad atlases for robustness, canonical studies for interpretable splits, and large perturbation atlases for modern virtual-cell models.", guideTable(guide.benchmarkDatasets, [
      { key: "name", label: "Dataset" }, { key: "type", label: "Type" }, { key: "coverage", label: "Coverage" }, { key: "use", label: "Recommended use" }, { key: "links", label: "Access / paper" }
    ]));
    h += guideSection("Benchmark suites and evaluation", "Use at least one broad comparison suite plus an anti-shortcut or biology-grounded evaluation.", guideTable(guide.evaluationSuites, [
      { key: "name", label: "Suite" }, { key: "focus", label: "Focus" }, { key: "metrics", label: "Metrics / signal" }, { key: "recommendation", label: "Use in study" }, { key: "links", label: "Sources" }
    ]));
    h += guideSection("Citation register", "Primary public records behind the Stage 1 routing layer. Publication status is shown so peer-reviewed evidence is not conflated with preprints.", guideTable(guide.citations, [
      { key: "citation", label: "Citation" }, { key: "status", label: "Status" }, { key: "why", label: "Why it is here" }, { key: "links", label: "Public source" }
    ]));
    h += guideSection("Perturbation-aware embedding agenda", "Prioritized probes for biology embeddings; P0 is the Stage 1 implementation target.", guideTable(guide.embeddingTasks, [
      { key: "priority", label: "Priority" }, { key: "task", label: "Embedding task" }, { key: "probe", label: "Question" }, { key: "biology", label: "Biology-facing readout" }, { key: "guardrail", label: "Guardrail" }
    ]));
    h += guideSection("Stage 2 and backlog", "Broader virtual-cell and perturbation-trained models to add after the common evaluation protocol is stable.", guideTable(guide.roadmap, [
      { key: "name", label: "Model / direction" }, { key: "status", label: "Status" }, { key: "note", label: "Why later" }, { key: "links", label: "Sources" }
    ]));
    h += "<div class='guide-next'><h2>Suggested first information route</h2><p>Start with the public-source ledger: record each model's paper, code, perturbation scope, representation, benchmark context and limitations. Then route each research question through the canonical datasets and evaluation suites above. The P0 embedding items are evaluation specifications for future work, not runs performed by this site.</p><p class='sub'>The accompanying <a href='blog/posts/2026-09-08-perturbation-virtual-cell-guide.html'>research report</a> explains the rationale and caveats.</p></div>";
    el.innerHTML = h;
  }
})();
