/* scAI Index — shared app logic: nav active state, leaderboard table rendering, sorting, model cards. */
(function () {
  "use strict";

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
    }
  });

  /* ---------- Leaderboard: two sections, sortable table ---------- */
  function initLeaderboard(el) {
    var sections = ["scFoundation", "generalLLM"];
    var current = "scFoundation";
    var sortKey = null, sortDir = -1;

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
        sortKey = null; sortDir = -1;
        renderTable();
      });
    });

    function fmt(v) { return (typeof v === "number") ? v.toFixed(2) : (v || "—"); }

    function renderTable() {
      var sec = SCAI_DATA[current];
      document.getElementById("secDesc").textContent = sec.desc;

      var th = "";
      th += "<th class='sortable' data-key='name'>Model <span class='arrow'>▲▼</span></th>";
      sec.columns.forEach(function (c) {
        var cls = c.score ? "sortable num" : "sortable num";
        th += "<th class='" + cls + "' data-key='" + c.key + "'>" + c.label + " <span class='arrow'>▲▼</span></th>";
      });
      document.getElementById("thead").innerHTML = "<tr>" + th + "</tr>";

      var rows = sec.models.slice();
      if (sortKey) {
        rows.sort(function (a, b) {
          var va = a[sortKey], vb = b[sortKey];
          if (typeof va === "string") return sortDir * va.localeCompare(vb);
          return sortDir * ((va || -1) - (vb || -1));
        });
      }

      var tb = "";
      rows.forEach(function (m, i) {
        var rankCls = i === 0 ? "r1" : i === 1 ? "r2" : i === 2 ? "r3" : "";
        tb += "<tr><td><span class='rank " + rankCls + "'>" + (i + 1) + "</span> ";
        tb += "<span class='model-name'>" + m.name + "</span><br><span class='model-org'>" + m.org + "</span></td>";
        sec.columns.forEach(function (c) {
          var v = m[c.key];
          var cls = c.score ? "score" : "";
          var val = (typeof v === "number") ? v.toFixed(2) : (v || "—");
          if (v === undefined || v === null || v === "") val = "<span class='na'>—</span>";
          tb += "<td class='num " + cls + "'>" + val + "</td>";
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
      h += "<h2 style='margin:26px 0 12px'>" + sec.title + "</h2><div class='cards'>";
      sec.models.forEach(function (m) {
        h += "<div class='mcard'><h3>" + m.name + "</h3><div class='meta'>" + m.org + " · " + m.year + "</div>";
        h += "<div class='stats'>";
        sec.columns.forEach(function (c) {
          var v = m[c.key];
          var val = (typeof v === "number") ? v.toFixed(2) : (v || "—");
          h += "<div>" + c.label.replace(" ↑", "") + "<b>" + val + "</b></div>";
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
      h += "<li><span class='date'>" + p.date + "</span><span class='tag'>" + p.tag + "</span> ";
      h += p.url && p.url !== "#" ? "<a href='" + p.url + "'>" + p.title + "</a>" : "<span>" + p.title + "</span>";
      h += "</li>";
    });
    feed.innerHTML = h;
  }
})();
