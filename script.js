(function () {
  "use strict";
  var C = window.AGRIFUTECH || { stages: [], timeline: [], news: [], events: [] };
  var STATUS = { ok: "Working today", dev: "In development", plan: "Planned" };
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function chip(status) { return el("span", { class: "chip " + status, text: STATUS[status] }); }
  function fmtDate(s) {
    var p = String(s).split("-");
    var m = MONTHS[parseInt(p[1], 10) - 1] || "";
    return (p[2] ? parseInt(p[2], 10) + " " : "") + m + " " + p[0];
  }

  // ---- platform flow ----
  var flow = document.querySelector(".flow");
  var detail = document.getElementById("stage-detail");
  var buttons = [];
  function show(i, focus) {
    var s = C.stages[i];
    buttons.forEach(function (b, j) {
      b.setAttribute("aria-selected", j === i ? "true" : "false");
      b.tabIndex = j === i ? 0 : -1;
    });
    if (focus) buttons[i].focus();
    detail.innerHTML = "";
    detail.appendChild(el("div", { class: "sd-head" }, [
      el("span", { class: "sd-step", text: "Stage " + (i + 1) + " of " + C.stages.length }),
      chip(s.status)
    ]));
    detail.appendChild(el("h3", { text: s.title + ": " + s.summary }));
    detail.appendChild(el("p", { text: s.detail }));
    detail.appendChild(el("ul", { class: "sd-points" }, s.points.map(function (pt) {
      return el("li", {}, [el("span", { text: pt[0] }), chip(pt[1])]);
    })));
  }
  if (flow && detail && C.stages.length) {
    C.stages.forEach(function (s, i) {
      var b = el("button", { class: "stage " + s.status, role: "tab", id: "tab-" + s.id, "aria-controls": "stage-detail", type: "button" }, [
        el("span", { class: "stage-num", text: String(i + 1) }),
        el("span", { class: "stage-title", text: s.title }),
        el("span", { class: "stage-sum", text: s.summary })
      ]);
      b.addEventListener("click", function () { show(i); stopTour(); });
      b.addEventListener("keydown", function (e) {
        var k = e.key, n = C.stages.length;
        if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); show((i + 1) % n, true); stopTour(); }
        if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); show((i - 1 + n) % n, true); stopTour(); }
      });
      buttons.push(b);
      flow.appendChild(b);
    });
    show(0);
    // gentle automatic tour until the visitor interacts (skipped when reduced motion is preferred)
    var tour = null, cur = 0;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function stopTour() { if (tour) { clearInterval(tour); tour = null; } }
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && tour === null && cur >= 0) {
            tour = setInterval(function () { cur = (cur + 1) % C.stages.length; show(cur); }, 4500);
          } else if (!en.isIntersecting) stopTour();
        });
      }, { threshold: 0.4 }).observe(flow);
      flow.addEventListener("pointerdown", function () { cur = -1; stopTour(); });
      flow.addEventListener("focusin", function () { cur = -1; stopTour(); });
    }
  }

  // ---- timeline ----
  var tl = document.getElementById("timeline");
  if (tl) {
    C.timeline.forEach(function (t) {
      var label = t.state === "done" ? "Completed" : t.state === "current" ? "We are here" : "Coming";
      tl.appendChild(el("li", { class: "tl-item " + t.state }, [
        el("span", { class: "tl-dot", "aria-hidden": "true" }),
        el("div", { class: "tl-body" }, [
          el("p", { class: "tl-meta" }, [el("span", { text: t.when }), el("span", { class: "tl-state", text: label })]),
          el("h3", { text: t.title }),
          el("p", { text: t.text })
        ])
      ]));
    });
  }

  // ---- news ----
  var nl = document.getElementById("news-list");
  if (nl) {
    C.news.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).forEach(function (n) {
      nl.appendChild(el("article", { class: "news-item" }, [
        el("p", { class: "news-meta" }, [el("time", { datetime: n.date, text: fmtDate(n.date) }), el("span", { class: "tag", text: n.tag })]),
        el("h3", { text: n.title }),
        el("p", { text: n.text })
      ]));
    });
  }
  var ev = document.getElementById("events-list");
  if (ev) {
    if (!C.events.length) ev.appendChild(el("p", { text: "No public events are scheduled yet. New dates will be announced here." }));
    C.events.forEach(function (e) {
      ev.appendChild(el("div", { class: "event" }, [
        el("time", { datetime: e.date, text: fmtDate(e.date) }),
        el("h4", { text: e.title }),
        el("p", { class: "muted small", text: e.place || "" })
      ]));
    });
  }

  // ---- mobile nav ----
  var toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }
})();
