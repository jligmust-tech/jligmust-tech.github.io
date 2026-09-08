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
    var annotationRows = [], annotationsById = {}, plotLockedKey = null;

    var h = "";
    h += '<div class="card" id="leaderboard-tables">';
    h += '<div class="segment" id="seg">';
    h += '<button data-sec="scFoundation" class="active">Single-Cell Foundation Models</button>';
    h += '<button data-sec="generalLLM">General LLMs on sc Tasks</button>';
    h += '</div>';
    h += '<p class="sub" id="secDesc" style="margin-top:12px"></p>';
    h += '<div class="tblwrap"><table id="tbl"><thead id="thead"></thead><tbody id="tbody"></tbody></table></div>';
    h += '</div>';
    h += '<div class="card plot-card" id="leaderboard-plot">';
    h += '<div class="plot-heading"><div><h2>Global model comparison</h2><p class="sub">Start with the populated global view, then switch to model size or pretraining scale. Missing values are omitted and source-specific metrics stay labeled.</p></div><span class="plot-badge">interactive</span></div>';
    h += '<div class="plot-controls"><label>Data scope<select id="plotScope"><option value="all">All catalogued models</option><option value="scFoundation">Single-cell foundation models</option><option value="generalLLM">General LLMs on sc tasks</option></select></label><label>X axis<select id="plotX"></select></label><label>Y axis<select id="plotY"></select></label></div>';
    h += '<div class="plot-legend" aria-label="Plot legend"><span><i class="legend-dot foundation"></i>Single-cell foundation</span><span><i class="legend-dot llm"></i>General LLM</span></div>';
    h += '<p class="sub plot-note" id="plotNote"></p><div class="scatter-wrap"><svg id="scatterPlot" class="scatter-plot" viewBox="0 0 960 430" role="img" aria-label="Global model comparison scatter plot"></svg></div>';
    h += '<div class="plot-detail" id="plotDetail" aria-live="polite"><strong>Point details</strong><span>Hover or focus a point for model information; click a point to keep it open.</span></div><button type="button" class="plot-clear" id="plotClear" hidden>Clear selection</button>';
    h += '<div class="plot-storage" id="plot-annotations"><div class="plot-storage-heading"><div><h3>Stored plot annotations</h3><p class="sub">The chart annotations are maintained separately in a public CSV so the metadata can be reviewed, edited and versioned independently.</p></div><a class="csv-link" href="assets/data/model_annotations.csv" download="model_annotations.csv">Download CSV</a></div><div id="plotAnnotations"><p class="sub">Loading the stored annotation table…</p></div></div>';
    h += '</div>';
    el.innerHTML = h;

    var scopeSelect = el.querySelector("#plotScope");
    var xSelect = el.querySelector("#plotX");
    var ySelect = el.querySelector("#plotY");
    var svg = el.querySelector("#scatterPlot");
    var detail = el.querySelector("#plotDetail");
    var clearButton = el.querySelector("#plotClear");
    scopeSelect.addEventListener("change", function () { plotLockedKey = null; clearPointDetails(); configurePlotAxes(); renderPlot(); });
    xSelect.addEventListener("change", function () { plotLockedKey = null; clearPointDetails(); renderPlot(); });
    ySelect.addEventListener("change", function () { plotLockedKey = null; clearPointDetails(); renderPlot(); });
    clearButton.addEventListener("click", function () { plotLockedKey = null; clearPointDetails(); updatePointStyles(); });
    svg.addEventListener("click", function () { plotLockedKey = null; clearPointDetails(); updatePointStyles(); });

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
      configurePlotAxes();
      renderPlot();
    }

    function parseCsv(text) {
      var rows = [], row = [], value = "", quoted = false;
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (quoted) {
          if (ch === '"') {
            if (text[i + 1] === '"') { value += '"'; i++; } else quoted = false;
          } else value += ch;
        } else if (ch === '"') quoted = true;
        else if (ch === ",") { row.push(value); value = ""; }
        else if (ch === "\n") { row.push(value.replace(/\r$/, "")); rows.push(row); row = []; value = ""; }
        else value += ch;
      }
      if (value.length || row.length) { row.push(value.replace(/\r$/, "")); rows.push(row); }
      if (!rows.length) return [];
      var headers = rows.shift();
      return rows.filter(function (r) { return r.some(function (v) { return v !== ""; }); }).map(function (r) {
        var item = {};
        headers.forEach(function (header, index) { item[header] = r[index] || ""; });
        return item;
      });
    }

    function loadPlotAnnotations() {
      fetch("assets/data/model_annotations.csv", { cache: "no-store" }).then(function (response) {
        if (!response.ok) throw new Error("annotation CSV request failed");
        return response.text();
      }).then(function (text) {
        annotationRows = parseCsv(text);
        annotationsById = {};
        annotationRows.forEach(function (row) { annotationsById[row.id] = row; });
        renderStoredAnnotations();
        renderPlot();
      }).catch(function () {
        el.querySelector("#plotAnnotations").innerHTML = "<p class='sub plot-error'>The stored annotation CSV could not be loaded. The chart still uses the source-linked model metadata in data.js.</p>";
      });
    }

    function renderStoredAnnotations() {
      var target = el.querySelector("#plotAnnotations");
      if (!annotationRows.length) { target.innerHTML = "<p class='sub'>No stored annotations are available.</p>"; return; }
      var h = "<div class='tblwrap'><table class='annotation-table'><thead><tr><th>Scope</th><th>Model</th><th>Model family</th><th>Annotation</th><th>Plot role</th><th>Selection note</th><th>Benchmark coverage</th><th>Evidence status</th><th>Public source</th></tr></thead><tbody>";
      annotationRows.forEach(function (row) {
        h += "<tr><td>" + esc(row.section) + "</td><td><strong>" + esc(row.name) + "</strong></td><td>" + esc(row.model_family) + "</td><td>" + esc(row.annotation) + "</td><td>" + esc(row.plot_role) + "</td><td>" + esc(row.selection_note) + "</td><td>" + esc(row.benchmark_coverage || "Not pinned") + "</td><td><span class='evidence-badge'>" + esc(row.evidence_status || "Source-specific") + "</span></td><td>" + (row.source ? externalLink(row.source, "source") : "<span class='na'>—</span>") + "</td></tr>";
      });
      target.innerHTML = h + "</tbody></table></div>";
    }

    function scopeRows(scope) {
      var keys = scope === "all" ? ["scFoundation", "generalLLM"] : [scope];
      var rows = [];
      keys.forEach(function (key) {
        var sec = SCAI_DATA[key];
        if (!sec || !sec.models) return;
        sec.models.forEach(function (model) { rows.push({ model: model, secKey: key, sec: sec, annotation: annotationsById[model.id] || null }); });
      });
      return rows;
    }

    function scoreValue(model, key) {
      if (key === "annotation") {
        if (typeof model.anno === "number") return model.anno;
        if (typeof model.scAnno === "number") return model.scAnno;
        return null;
      }
      return typeof model[key] === "number" ? model[key] : null;
    }

    function axisHasValue(rows, key) {
      return rows.some(function (row) {
        return key === "year" ? Number(row.model.year) > 0 : key === "params" || key === "cells" ? parseScaleNumber(row.model[key]) != null : scoreValue(row.model, key) != null;
      });
    }

    function xAxisLabel(key) {
      return key === "params" ? "Model size (parameters · log scale)" : key === "cells" ? "Pretraining cells (log scale)" : "Publication year";
    }

    function yAxisLabel(key) {
      return key === "annotation" ? "Annotation score (source-specific)" : key === "batch" ? "Batch integration (foundation only)" : key === "geneSet" ? "Gene-set term score (LLM only)" : key === "scCode" ? "Workflow accuracy (LLM only)" : key;
    }

    function configurePlotAxes() {
      var rows = scopeRows(scopeSelect.value);
      var xOptions = [
        { key: "year", label: xAxisLabel("year") },
        { key: "params", label: xAxisLabel("params") },
        { key: "cells", label: xAxisLabel("cells") }
      ].filter(function (option) { return axisHasValue(rows, option.key); });
      var yOptions = [
        { key: "annotation", label: yAxisLabel("annotation") },
        { key: "batch", label: yAxisLabel("batch") },
        { key: "geneSet", label: yAxisLabel("geneSet") },
        { key: "scCode", label: yAxisLabel("scCode") }
      ].filter(function (option) { return axisHasValue(rows, option.key); });
      var selectedX = xSelect.value, selectedY = ySelect.value;
      xSelect.innerHTML = xOptions.map(function (x) { return "<option value='" + esc(x.key) + "'>" + esc(x.label) + "</option>"; }).join("");
      ySelect.innerHTML = yOptions.map(function (y) { return "<option value='" + esc(y.key) + "'>" + esc(y.label) + "</option>"; }).join("");
      xSelect.value = xOptions.some(function (x) { return x.key === selectedX; }) ? selectedX : (xOptions.some(function (x) { return x.key === "year"; }) ? "year" : (xOptions[0] ? xOptions[0].key : ""));
      ySelect.value = yOptions.some(function (y) { return y.key === selectedY; }) ? selectedY : (yOptions.some(function (y) { return y.key === "annotation"; }) ? "annotation" : (yOptions[0] ? yOptions[0].key : ""));
    }

    function renderPlot() {
      var scope = scopeSelect.value;
      var rows = scopeRows(scope);
      var xKey = xSelect.value, yKey = ySelect.value;
      var xOption = xAxisLabel(xKey), yOption = yAxisLabel(yKey);
      var isLog = xKey === "params" || xKey === "cells";
      var items = rows.map(function (row) {
        var x = xKey === "year" ? Number(row.model.year) : parseScaleNumber(row.model[xKey]);
        var y = scoreValue(row.model, yKey);
        return { model: row.model, secKey: row.secKey, sec: row.sec, annotation: row.annotation, x: x, y: y, key: row.secKey + ":" + row.model.id };
      }).filter(function (p) { return p.x != null && isFinite(p.x) && p.x > 0 && p.y != null && isFinite(p.y); });
      var note = el.querySelector("#plotNote");
      if (!items.length) {
        svg.innerHTML = "<text x='480' y='210' text-anchor='middle' fill='#64748b'>No models have both selected values.</text>";
        note.textContent = "No models have both selected values in this scope. Try the global scope or a different axis.";
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
      var xGroups = {};
      items.forEach(function (p) { var group = String(p.x); if (!xGroups[group]) xGroups[group] = []; xGroups[group].push(p); });
      Object.keys(xGroups).forEach(function (group) { xGroups[group].forEach(function (p, index) { p.jitter = (index - (xGroups[group].length - 1) / 2) * 8; }); });
      function pointX(point) { return xPos(point.x) + (point.jitter || 0); }
      var h = "<title>" + esc(xOption + " vs " + yOption) + "</title><desc>Each point is a model with a published numeric value for both selected axes.</desc>";
      [0, 0.25, 0.5, 0.75, 1].forEach(function (tick) {
        var y = yPos(tick);
        h += "<line x1='" + left + "' y1='" + y.toFixed(1) + "' x2='" + (width - right) + "' y2='" + y.toFixed(1) + "' stroke='#e2e8f0'/>";
        h += "<text x='" + (left - 12) + "' y='" + (y + 4).toFixed(1) + "' text-anchor='end' fill='#64748b' font-size='12'>" + tick.toFixed(2) + "</text>";
      });
      var xTicks = [];
      if (xKey === "year") {
        var firstYear = Math.ceil(xMin), lastYear = Math.floor(xMax), yearStep = Math.max(1, Math.ceil((lastYear - firstYear) / 5));
        for (var year = firstYear; year <= lastYear; year += yearStep) xTicks.push(year);
      }
      if (!xTicks.length) for (var i = 0; i < 5; i++) xTicks.push(isLog ? Math.pow(10, xMin + ((xMax - xMin) * i / 4)) : xMin + ((xMax - xMin) * i / 4));
      xTicks.forEach(function (tickValue) {
        var x = xPos(tickValue);
        h += "<line x1='" + x.toFixed(1) + "' y1='" + top + "' x2='" + x.toFixed(1) + "' y2='" + (height - bottom) + "' stroke='#f1f5f9'/>";
        h += "<text x='" + x.toFixed(1) + "' y='" + (height - bottom + 23) + "' text-anchor='middle' fill='#64748b' font-size='12'>" + esc(xLabel(tickValue)) + "</text>";
      });
      h += "<line x1='" + left + "' y1='" + (height - bottom) + "' x2='" + (width - right) + "' y2='" + (height - bottom) + "' stroke='#94a3b8'/><line x1='" + left + "' y1='" + top + "' x2='" + left + "' y2='" + (height - bottom) + "' stroke='#94a3b8'/>";
      h += "<text x='" + (left + plotW / 2) + "' y='" + (height - 15) + "' text-anchor='middle' fill='#475569' font-size='13'>" + esc(xOption) + "</text>";
      h += "<text x='18' y='" + (top + plotH / 2) + "' transform='rotate(-90 18 " + (top + plotH / 2) + ")' text-anchor='middle' fill='#475569' font-size='13'>" + esc(yOption) + " (higher is better)</text>";
      items.forEach(function (p, index) {
        var x = pointX(p), y = yPos(p.y), color = p.secKey === "scFoundation" ? "#3182ce" : "#d97706";
        var tip = p.model.name + " — " + xOption + ": " + xLabel(p.x) + "; " + yOption + ": " + p.y.toFixed(3);
        h += "<g class='plot-point' tabindex='0' role='button' data-point-index='" + index + "' data-point-key='" + esc(p.key) + "' aria-label='" + esc(tip) + "'><circle cx='" + x.toFixed(1) + "' cy='" + y.toFixed(1) + "' r='8' fill='" + color + "' fill-opacity='0.86' stroke='#ffffff' stroke-width='2'><title>" + esc(tip) + "</title></circle></g>";
      });
      svg.innerHTML = h;
      note.textContent = items.length + " of " + rows.length + " models plotted in " + (scope === "all" ? "the global catalog" : scope === "scFoundation" ? "the foundation-model scope" : "the general-LLM scope") + ". Year is the default because it has the broadest coverage; repeated x-values are lightly offset for readability. Metrics remain source-specific.";
      svg.querySelectorAll(".plot-point").forEach(function (point, index) {
        var item = items[index];
        point.addEventListener("mouseenter", function () { if (!plotLockedKey) showPointDetails(item); });
        point.addEventListener("mouseleave", function () { if (!plotLockedKey) clearPointDetails(); });
        point.addEventListener("focus", function () { if (!plotLockedKey) showPointDetails(item); });
        point.addEventListener("blur", function () { if (!plotLockedKey) clearPointDetails(); });
        point.addEventListener("click", function (event) { event.stopPropagation(); plotLockedKey = item.key; showPointDetails(item); updatePointStyles(); });
        point.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); plotLockedKey = item.key; showPointDetails(item); updatePointStyles(); }
        });
      });
      updatePointStyles();
    }

    function sourceLinks(point) {
      var urls = [];
      if (point.model.url) urls.push(point.model.url);
      (point.model.sources || []).forEach(function (url) { if (urls.indexOf(url) === -1) urls.push(url); });
      if (point.annotation && point.annotation.source && urls.indexOf(point.annotation.source) === -1) urls.push(point.annotation.source);
      return urls.slice(0, 5).map(function (url, index) { return externalLink(url, index === 0 ? "model" : "S" + index); }).join(" ");
    }

    function clearPointDetails() {
      detail.innerHTML = "<strong>Point details</strong><span>Hover or focus a point for model information; click a point to keep it open.</span>";
      clearButton.hidden = !plotLockedKey;
    }

    function showPointDetails(point) {
      var row = point.annotation || {};
      var section = point.secKey === "scFoundation" ? "Single-cell foundation" : "General LLM";
      var h = "<div class='plot-detail-head'><strong>" + esc(point.model.name) + "</strong><span class='plot-section-tag " + (point.secKey === "scFoundation" ? "foundation" : "llm") + "'>" + esc(section) + "</span></div>";
      h += "<div class='plot-detail-meta'>" + esc(point.model.org) + " · " + esc(point.model.year) + " · Params: " + esc(point.model.params || "—") + " · Pretrain cells: " + esc(point.model.cells || "—") + "</div>";
      h += "<div class='plot-detail-grid'><div><span>Plotted X</span><b>" + esc(xAxisLabel(xSelect.value)) + ": " + esc(xSelect.value === "year" ? String(Math.round(point.x)) : formatScaleNumber(point.x)) + "</b></div><div><span>Plotted Y</span><b>" + esc(yAxisLabel(ySelect.value)) + ": " + esc(point.y.toFixed(3)) + "</b></div></div>";
      if (row.annotation) h += "<p class='plot-detail-annotation'><strong>Annotation:</strong> " + esc(row.annotation) + "</p>";
      if (row.plot_role) h += "<p class='plot-detail-note'><strong>Plot role:</strong> " + esc(row.plot_role) + "</p>";
      if (row.selection_note) h += "<p class='plot-detail-note'><strong>Selection note:</strong> " + esc(row.selection_note) + "</p>";
      if (row.benchmark_coverage) h += "<p class='plot-detail-note'><strong>Benchmark coverage:</strong> " + esc(row.benchmark_coverage) + "</p>";
      if (row.evidence_status) h += "<p class='plot-detail-note'><strong>Evidence status:</strong> <span class='evidence-badge'>" + esc(row.evidence_status) + "</span></p>";
      h += "<p class='plot-detail-note'><strong>Source note:</strong> " + esc(point.model.notes || "No source note recorded.") + "</p>";
      h += "<div class='plot-detail-links'><strong>Public evidence:</strong> " + (sourceLinks(point) || "<span class='na'>—</span>") + "</div>";
      detail.innerHTML = h;
      clearButton.hidden = !plotLockedKey;
    }

    function updatePointStyles() {
      svg.querySelectorAll(".plot-point").forEach(function (point) {
        point.classList.toggle("selected", point.getAttribute("data-point-key") === plotLockedKey);
      });
    }

    renderTable();
    renderStoredAnnotations();
    loadPlotAnnotations();
  }

  /* ---------- Model cards grid (models.html) ---------- */
  function renderModelCards(grid) {
    var h = "";
    Object.keys(SCAI_DATA).forEach(function (secKey) {
      var sec = SCAI_DATA[secKey];
      if (!sec.models) return;
      var sectionId = secKey === "scFoundation" ? "models-foundation" : "models-general-llm";
      h += "<h2 id='" + sectionId + "' style='margin:26px 0 12px'>" + esc(sec.title) + "</h2><div class='cards'>";
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

  function guideFilterText(value) {
    if (Array.isArray(value)) return value.map(guideFilterText).join(" ");
    if (value && typeof value === "object") return Object.keys(value).map(function (key) { return guideFilterText(value[key]); }).join(" ");
    return String(value == null ? "" : value);
  }

  function guideFilterBar(group, rows) {
    var statuses = [];
    rows.forEach(function (row) {
      if (row.status && statuses.indexOf(row.status) === -1) statuses.push(row.status);
    });
    statuses.sort();
    var h = "<div class='guide-filter' data-guide-filter-group='" + esc(group) + "'>";
    h += "<label>Search table<input type='search' data-guide-search placeholder='Name, dataset, protocol or source'></label>";
    h += "<label>Evidence status<select data-guide-status><option value=''>All statuses</option>";
    statuses.forEach(function (status) { h += "<option value='" + esc(status) + "'>" + esc(status) + "</option>"; });
    h += "</select></label><span class='guide-filter-count' data-guide-filter-count>" + rows.length + " records</span>";
    h += "<span class='guide-filter-note'>Filters change the display only; the downloadable CSV remains the source record.</span></div>";
    return h;
  }

  function guideTable(rows, columns, options) {
    options = options || {};
    var filterKey = options.filterKey || "";
    var h = filterKey ? "<div class='guide-table-block' data-guide-table-block='" + esc(filterKey) + "'>" + guideFilterBar(filterKey, rows) : "";
    h += "<div class='tblwrap'><table class='guide-table'" + (filterKey ? " data-guide-table='" + esc(filterKey) + "'" : "") + "><thead><tr>";
    columns.forEach(function (c) { h += "<th>" + esc(c.label) + "</th>"; });
    h += "</tr></thead><tbody>";
    rows.forEach(function (row) {
      var rowText = columns.map(function (c) { return guideFilterText(row[c.key]); }).join(" ").toLowerCase();
      h += "<tr" + (filterKey ? " data-guide-row-text='" + esc(rowText) + "' data-guide-row-status='" + esc(row.status || "") + "'" : "") + ">";
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
    if (filterKey) h += "</div>";
    return h;
  }

  function guideSection(id, title, sub, body) {
    return "<section id='" + esc(id) + "' class='block'><div class='card guide-card'><h2>" + esc(title) + "</h2><p class='sub'>" + esc(sub) + "</p>" + body + "</div></section>";
  }

  function bindGuideFilters(el) {
    el.querySelectorAll("[data-guide-filter-group]").forEach(function (filter) {
      var block = filter.parentNode;
      var search = filter.querySelector("[data-guide-search]");
      var status = filter.querySelector("[data-guide-status]");
      var count = filter.querySelector("[data-guide-filter-count]");
      var rows = block.querySelectorAll("tbody tr[data-guide-row-text]");
      function applyFilter() {
        var query = (search.value || "").trim().toLowerCase();
        var selectedStatus = status.value || "";
        var visible = 0;
        rows.forEach(function (row) {
          var matchesText = !query || row.getAttribute("data-guide-row-text").indexOf(query) !== -1;
          var matchesStatus = !selectedStatus || row.getAttribute("data-guide-row-status") === selectedStatus;
          row.hidden = !(matchesText && matchesStatus);
          if (!row.hidden) visible += 1;
        });
        count.textContent = visible + " of " + rows.length + " records";
      }
      search.addEventListener("input", applyFilter);
      status.addEventListener("change", applyFilter);
      applyFilter();
    });
  }

  function renderResearchGuide(el) {
    var guide = SCAI_DATA.researchGuide;
    if (!guide) return;
    var stage1 = "<p class='guide-lead'>" + esc(guide.intro) + "</p>";
    stage1 += "<div class='guide-policy'><strong>Stage 1.5 status:</strong> " + esc(guide.sourcePolicy) + "</div>";
    stage1 += "<div class='guide-callout'><strong>How to read the rank:</strong> curation priority for a Stage 1 benchmark and reading list, based on task relevance, visibility, reproducible implementation and representation value. It is not a universal performance ranking.</div>";
    stage1 += guideSection("research-router", "Stage 1 information router", "Choose the research question first; follow the linked public sources before considering any future execution.", guideTable(guide.routes, [
      { key: "route", label: "Research route" }, { key: "question", label: "Question" }, { key: "path", label: "Reading path" }, { key: "inputs", label: "Public inputs" }, { key: "links", label: "Sources" }
    ]));
    stage1 += guideSection("research-models", "Stage 1 model priority", "Start here for perturbation-response and post-perturbation gene-expression experiments.", guideTable(guide.stage1Models, [
      { key: "rank", label: "Priority" }, { key: "name", label: "Model" }, { key: "role", label: "Role" }, { key: "scope", label: "Perturbation scope" }, { key: "embedding", label: "Representation / biology prior" }, { key: "generalization", label: "Generalization focus" }, { key: "links", label: "Sources" }
    ]));
    stage1 += guideSection("research-model-selection", "Model selection guide", "Use the task first, then read the strengths and trade-offs before choosing a model family.", guideTable(guide.modelSelection, [
      { key: "name", label: "Model" }, { key: "bestFor", label: "Best fit" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "choose", label: "Choose it when" }, { key: "links", label: "Public evidence" }
    ]) + "<div class='guide-choice'><strong>Quick selector:</strong> GEARS for a default genetic baseline; CPA/chemCPA for dose or context composition; CellOT, STATE or PerturbNet for distributional responses; scGPT or scFoundation for frozen scFM probes; LPM or Scouter for biology-aware embedding questions; scVIDR for dose-focused chemical transfer.</div>");
    stage1 += guideSection("research-datasets", "Benchmark datasets and access", "A compact dataset ladder: broad atlases for robustness, canonical studies for interpretable splits, and large perturbation atlases for modern virtual-cell models.", guideTable(guide.benchmarkDatasets, [
      { key: "name", label: "Dataset" }, { key: "type", label: "Type" }, { key: "coverage", label: "Coverage" }, { key: "use", label: "Recommended use" }, { key: "links", label: "Access / paper" }
    ]));
    stage1 += guideSection("research-suites", "Benchmark suites and evaluation", "Use at least one broad comparison suite plus an anti-shortcut or biology-grounded evaluation.", guideTable(guide.evaluationSuites, [
      { key: "name", label: "Suite" }, { key: "focus", label: "Focus" }, { key: "metrics", label: "Metrics / signal" }, { key: "recommendation", label: "Use in study" }, { key: "links", label: "Sources" }
    ]));
    stage1 += guideSection("research-evidence", "Benchmark evidence matrix", "A protocol-level ledger for model × dataset × split × metric evidence. A row is comparable only within the stated protocol and source boundary.", guideTable(guide.benchmarkEvidence, [
      { key: "name", label: "Resource" }, { key: "type", label: "Type" }, { key: "task", label: "Task" }, { key: "datasets", label: "Dataset / suite" }, { key: "split", label: "Split / holdout" }, { key: "metrics", label: "Metrics" }, { key: "baselines", label: "Baselines" }, { key: "status", label: "Evidence status" }, { key: "comparability", label: "Comparability" }, { key: "code", label: "Code" }, { key: "data", label: "Data" }, { key: "notes", label: "Notes" }, { key: "links", label: "Public source" }
    ], { filterKey: "benchmark-evidence" }) + "<div class='guide-choice'><strong>Public export:</strong> <a href='assets/data/benchmark_evidence.csv' download='benchmark_evidence.csv'>Download the benchmark evidence matrix CSV</a>. Treat each row as a source-linked protocol record, not a universal score.</div>");
    stage1 += guideSection("research-protocol-matrix", "Canonical benchmark protocol matrix", "A model-independent study specification. Use one row to define the comparison before reading source-reported scores or planning any future execution.", guideTable(guide.benchmarkProtocols, [
      { key: "id", label: "ID" }, { key: "name", label: "Protocol" }, { key: "scope", label: "Scope" }, { key: "datasets", label: "Dataset / suite" }, { key: "access", label: "Public access" }, { key: "holdout", label: "Holdout" }, { key: "endpoint", label: "Endpoint" }, { key: "metrics", label: "Metrics" }, { key: "baselines", label: "Required baselines" }, { key: "overlap", label: "Overlap audit" }, { key: "models", label: "Compatible models" }, { key: "status", label: "Status" }, { key: "links", label: "Public sources" }, { key: "notes", label: "Notes" }
    ], { filterKey: "benchmark-protocols" }) + "<div class='guide-choice'><strong>Public export:</strong> <a href='assets/data/benchmark_protocols.csv' download='benchmark_protocols.csv'>Download the canonical benchmark protocol CSV</a>. All rows are study specifications; this site does not execute them.</div>");
    stage1 += guideSection("research-protocol", "Split and holdout protocol guide", "Make the generalization question explicit before comparing perturbation-response or embedding models.", guideTable(guide.evaluationProtocols, [
      { key: "priority", label: "Priority" }, { key: "name", label: "Protocol" }, { key: "definition", label: "Definition" }, { key: "question", label: "Question answered" }, { key: "risk", label: "Leakage / interpretation risk" }, { key: "status", label: "Status" }
    ]));
    stage1 += guideSection("research-guardrails", "Baseline and anti-shortcut checklist", "Use these controls before interpreting a model delta as biological progress.", guideTable(guide.benchmarkGuardrails, [
      { key: "name", label: "Guardrail" }, { key: "purpose", label: "Purpose" }, { key: "implementation", label: "Implementation" }, { key: "interpretation", label: "Interpretation" }, { key: "status", label: "Status" }
    ]));
    stage1 += guideSection("research-citations", "Citation register", "Primary public records behind the Stage 1 routing layer. Publication status is shown so peer-reviewed evidence is not conflated with preprints.", guideTable(guide.citations, [
      { key: "citation", label: "Citation" }, { key: "status", label: "Status" }, { key: "why", label: "Why it is here" }, { key: "links", label: "Public source" }
    ]));
    stage1 += guideSection("research-sources", "Public source registry", "Canonical public URLs and evidence roles for the Stage 1 and Stage 2 reading map. Review this table before treating a paper, repository or benchmark as current evidence.", guideTable(guide.sourceRegistry, [
      { key: "id", label: "ID" }, { key: "name", label: "Source" }, { key: "type", label: "Type" }, { key: "publication", label: "Publication / release" }, { key: "accessed", label: "Access checked" }, { key: "status", label: "Evidence status" }, { key: "artifacts", label: "Public artifacts" }, { key: "role", label: "Role" }, { key: "note", label: "Verification note" }, { key: "links", label: "Public URLs" }
    ], { filterKey: "source-registry" }) + "<div class='guide-choice'><strong>Public export:</strong> <a href='assets/data/source_registry.csv' download='source_registry.csv'>Download the source registry CSV</a>. Access dates are curation timestamps, not guarantees that a source will remain unchanged.</div>");
    stage1 += guideSection("research-embeddings", "Perturbation-aware embedding agenda", "Prioritized probes for biology embeddings; P0 is the Stage 1 implementation target.", guideTable(guide.embeddingTasks, [
      { key: "priority", label: "Priority" }, { key: "task", label: "Embedding task" }, { key: "probe", label: "Question" }, { key: "biology", label: "Biology-facing readout" }, { key: "guardrail", label: "Guardrail" }
    ]));
    var stage2 = guideSection("research-roadmap", "Stage 2 and backlog", "Broader virtual-cell and perturbation-trained models to add after the common evaluation protocol is stable.", guideTable(guide.roadmap, [
      { key: "name", label: "Model / direction" }, { key: "status", label: "Status" }, { key: "note", label: "Why later" }, { key: "links", label: "Sources" }
    ]));
    stage2 += guideSection("research-stage2-virtual", "Stage 2 virtual-cell triage", "A ranked reading queue for newer virtual-cell and perturbation directions. Priority reflects study readiness and evidence maturity, not a universal performance ranking.", guideTable(guide.stage2VirtualCell, [
      { key: "priority", label: "Priority" }, { key: "name", label: "Model / direction" }, { key: "year", label: "Period" }, { key: "kind", label: "Type" }, { key: "task", label: "Task fit" }, { key: "evidence", label: "Public evidence" }, { key: "status", label: "Evidence maturity" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "next", label: "Next verification" }, { key: "links", label: "Sources" }
    ]) + "<div class='guide-choice'><strong>Public export:</strong> <a href='assets/data/stage2_virtual_cell.csv' download='stage2_virtual_cell.csv'>Download the Stage 2 virtual-cell triage CSV</a>.</div>");
    stage2 += guideSection("research-stage2-agents", "Stage 2 agents, benchmarks and tool layers", "Keep agent capability, benchmark protocol and execution infrastructure separate. Use the pros/cons and next-verification columns to choose a route without conflating scores.", guideTable(guide.stage2AgentTools, [
      { key: "priority", label: "Priority" }, { key: "name", label: "Resource" }, { key: "year", label: "Period" }, { key: "kind", label: "Type" }, { key: "bestFor", label: "Best fit" }, { key: "evidence", label: "Public evidence" }, { key: "status", label: "Evidence maturity" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "next", label: "Next verification" }, { key: "links", label: "Sources" }
    ]) + "<div class='guide-choice'><strong>Public export:</strong> <a href='assets/data/stage2_agent_tools.csv' download='stage2_agent_tools.csv'>Download the Stage 2 agent/tool triage CSV</a>.</div>");
    stage2 += guideSection("research-agent-selection", "Bioinformatics agent & tool selection guide", "Benchmarks measure different capabilities; pair an execution benchmark with a local tool layer when reproducibility and privacy matter.", guideTable(guide.agentSelection, [
      { key: "name", label: "Agent / tool" }, { key: "kind", label: "Type" }, { key: "bestFor", label: "Best fit" }, { key: "pros", label: "Pros" }, { key: "cons", label: "Cons / risks" }, { key: "choose", label: "Choose it when" }, { key: "links", label: "Public evidence" }
    ]) + "<div class='guide-choice'><strong>Quick selector:</strong> scBench for concrete single-cell workflows; BixBench for long computational-biology trajectories; BioAgent Bench for robustness and failure handling; LAB-Bench for broad biology reasoning; Biomni for broad biomedical tool use; FlowAgent for workflow orchestration and recovery; GoekeLab’s catalog for candidate skill discovery; BioSkillSafety for a safety gate; ClawBio for a local-first, MCP-compatible execution layer. These are not interchangeable scores.</div>");
    stage1 += "<div id='research-next' class='guide-next'><h2>Suggested Stage 1 route</h2><p>Start with the public source registry, canonical protocol matrix and benchmark evidence matrix. Then route each perturbation-response question through the datasets, holdouts, metrics and baselines before considering any future execution. The P0 embedding items are evaluation specifications for future work, not runs performed by this site.</p><p class='sub'>Stage 2 has its own tab below. The accompanying <a href='blog/posts/2026-09-08-perturbation-virtual-cell-guide.html'>research report</a> explains the rationale and caveats.</p></div>";
    stage2 += "<div id='research-stage2-next' class='guide-next'><h2>Suggested Stage 2 route</h2><p>Start with VCBench, the Virtual Cell Challenge 2025 and the public community virtual-cell benchmark, then route each model through a matched Cell-Eval or PertEval-style protocol. For agent work, use a knowledge benchmark only as a pre-screen, an executable workflow benchmark for task completion, a workflow framework for planning/recovery analysis, a versioned local tool layer for reproducibility and a safety benchmark as a permission/abstention gate. No model runs are performed by this site.</p><p class='sub'>Stage 1 protocol guidance remains available in the neighboring tab.</p></div>";

    el.innerHTML = "<div class='research-tabs' role='tablist' aria-label='Research Guide stages'><button type='button' class='research-tab' id='research-tab-stage1' role='tab' aria-controls='research-stage1-panel' aria-selected='true' data-research-tab='stage1'>Stage 1 <span>Benchmark protocol</span></button><button type='button' class='research-tab' id='research-tab-stage2' role='tab' aria-controls='research-stage2-panel' aria-selected='false' data-research-tab='stage2'>Stage 2 <span>Frontier models &amp; agents</span></button></div><div class='research-tab-panel' id='research-stage1-panel' role='tabpanel' aria-labelledby='research-tab-stage1' data-research-panel='stage1'></div><div class='research-tab-panel' id='research-stage2-panel' role='tabpanel' aria-labelledby='research-tab-stage2' data-research-panel='stage2' hidden></div>";
    el.querySelector("[data-research-panel='stage1']").innerHTML = stage1;
    el.querySelector("[data-research-panel='stage2']").innerHTML = stage2;

    var tabButtons = el.querySelectorAll("[data-research-tab]");
    var panels = el.querySelectorAll("[data-research-panel]");
    var indexes = document.querySelectorAll("[data-research-index]");
    var activeTab = "stage1";
    function tabForHash() {
      var hash = window.location.hash || "";
      if (hash === "#stage2" || hash.indexOf("#research-stage2-") === 0 || hash === "#research-roadmap" || hash === "#research-agent-selection") return "stage2";
      return "stage1";
    }
    function activateTab(tab, updateHash) {
      activeTab = tab === "stage2" ? "stage2" : "stage1";
      for (var i = 0; i < tabButtons.length; i++) {
        var selected = tabButtons[i].getAttribute("data-research-tab") === activeTab;
        tabButtons[i].classList.toggle("active", selected);
        tabButtons[i].setAttribute("aria-selected", selected ? "true" : "false");
        tabButtons[i].tabIndex = selected ? 0 : -1;
      }
      for (var j = 0; j < panels.length; j++) panels[j].hidden = panels[j].getAttribute("data-research-panel") !== activeTab;
      for (var k = 0; k < indexes.length; k++) indexes[k].hidden = indexes[k].getAttribute("data-research-index") !== activeTab;
      if (updateHash) window.history.replaceState(null, "", activeTab === "stage2" ? "#stage2" : "#stage1");
    }
    for (var b = 0; b < tabButtons.length; b++) {
      tabButtons[b].addEventListener("click", function () { activateTab(this.getAttribute("data-research-tab"), true); });
      tabButtons[b].addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var next = this.getAttribute("data-research-tab") === "stage1" ? "stage2" : "stage1";
        activateTab(next, true);
        el.querySelector("[data-research-tab='" + next + "']").focus();
      });
    }
    window.addEventListener("hashchange", function () { activateTab(tabForHash(), false); });
    activateTab(tabForHash(), false);
    if (window.location.hash.indexOf("#research-") === 0) {
      window.setTimeout(function () {
        var target = document.getElementById(window.location.hash.slice(1));
        if (target) target.scrollIntoView();
      }, 0);
    }
    bindGuideFilters(el);
  }
})();
