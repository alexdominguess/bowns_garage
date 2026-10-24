/* Brown´s Garage: comportamento da página. Os dados vêm de js/site.config.js */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");

  /* ---------- Utilidades ---------- */

  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, cfg);
  }

  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  /* ---------- WhatsApp ---------- */

  function whatsappUrl(message) {
    var number = digits(get("whatsapp.number"));
    if (!number) return "#contato";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  function bindWhatsapp() {
    var messages = {
      geral: get("whatsapp.scheduleMessage"),
      orcamento: get("whatsapp.quoteMessage")
    };
    doc.querySelectorAll("[data-wa]").forEach(function (link) {
      var key = link.getAttribute("data-wa");
      link.setAttribute("href", whatsappUrl(messages[key] || messages.geral));
      if (digits(get("whatsapp.number"))) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  /* ---------- Dados do site ---------- */

  function bindText() {
    // Textos e links vêm de site.config.js; ver atributos data-bind e data-bind-href no HTML
    doc.querySelectorAll("[data-bind]").forEach(function (node) {
      var value = get(node.getAttribute("data-bind"));
      if (value) node.textContent = value;
    });

    doc.querySelectorAll("[data-bind-href]").forEach(function (node) {
      var value = get(node.getAttribute("data-bind-href"));
      if (value) {
        node.setAttribute("href", value);
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      } else {
        var wrapper = node.closest("[data-social]");
        if (wrapper) wrapper.hidden = true;
      }
    });

    var year = doc.getElementById("ano");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function renderHours() {
    var hours = cfg.hours || [];
    doc.querySelectorAll('[data-render="hours"]').forEach(function (container) {
      container.textContent = "";
      hours.forEach(function (item) {
        container.appendChild(el("div", { class: "hours-row" }, [
          el("span", { text: item.label }),
          el("span", { text: item.time })
        ]));
      });
    });
  }

  function renderServices() {
    var list = doc.querySelector('[data-render="services"]');
    if (!list) return;
    var message = get("whatsapp.serviceMessage") || "";

    (cfg.services || []).forEach(function (service, index) {
      var number = String(index + 1).padStart(2, "0");
      var item = el("li", { class: "service" });

      var media = el("div", { class: "service-media" }, [
        el("img", {
          src: service.image,
          alt: service.alt || "",
          width: "1400",
          height: "933",
          loading: index < 2 ? "eager" : "lazy",
          decoding: "async"
        })
      ]);

      var link = el("a", { class: "service-link", text: "Solicitar orçamento" });
      link.appendChild(el("span", { "aria-hidden": "true", text: "→" }));
      link.setAttribute("href", whatsappUrl(message.replace("{servico}", service.name)));
      link.setAttribute("aria-label", "Solicitar orçamento de " + service.name);
      if (digits(get("whatsapp.number"))) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }

      item.appendChild(media);
      item.appendChild(el("span", { class: "service-index", "aria-hidden": "true", text: number }));
      item.appendChild(el("div", { class: "service-body" }, [
        el("h3", { class: "service-name", text: service.name }),
        el("p", { class: "service-desc", text: service.description }),
        link
      ]));

      list.appendChild(item);
    });
  }

  function renderGallery() {
    var grid = doc.querySelector('[data-render="gallery"]');
    if (!grid) return;

    (cfg.gallery || []).forEach(function (photo) {
      var size = photo.size || "square";
      var figure = el("figure", { class: "gallery-item gallery-item--" + size });
      figure.appendChild(el("img", {
        src: photo.src,
        alt: photo.alt || "",
        width: "1400",
        height: "1000",
        loading: "lazy",
        decoding: "async"
      }));
      if (photo.caption) figure.appendChild(el("figcaption", { text: photo.caption }));
      grid.appendChild(figure);
    });
  }

  function renderReviews() {
    var section = doc.getElementById("depoimentos");
    var grid = doc.querySelector('[data-render="reviews"]');
    var reviews = cfg.reviews || [];
    if (!section || !grid || reviews.length === 0) return;

    reviews.forEach(function (review) {
      var rating = Math.max(0, Math.min(5, Math.round(Number(review.rating) || 0)));
      var stars = "★".repeat(rating) + "☆".repeat(5 - rating);
      grid.appendChild(el("article", { class: "review" }, [
        el("p", { class: "review-stars", "aria-label": rating + " de 5 estrelas", text: stars }),
        el("blockquote", {}, [el("p", { text: review.text })]),
        el("cite", { text: review.author })
      ]));
    });

    section.hidden = false;
  }

  /* ---------- Cabeçalho e menu ---------- */

  function bindHeader() {
    var header = doc.querySelector(".site-header");
    var toggle = doc.querySelector(".menu-toggle");
    var nav = doc.getElementById("menu");

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
      doc.body.style.overflow = open ? "hidden" : "";
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 961px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  function bindActiveLink() {
    var links = doc.querySelectorAll(".primary-nav .nav-link");
    var sections = [];
    links.forEach(function (link) {
      var target = doc.querySelector(link.getAttribute("href"));
      if (target) sections.push({ link: link, target: target });
    });

    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (item) {
          item.link.classList.toggle("is-active", item.target === entry.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (item) { observer.observe(item.target); });
  }

  /* ---------- Animações ---------- */

  function bindReveal() {
    var items = doc.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (node) { node.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (node) { observer.observe(node); });
  }

  function bindCompare() {
    var compare = doc.querySelector(".compare");
    var range = doc.querySelector(".compare-range");
    if (!compare || !range) return;

    var before = doc.querySelector(".compare-before");
    var after = doc.querySelector(".compare-after");
    var pair = cfg.comparison || {};
    if (pair.before) {
      before.setAttribute("src", pair.before.src);
      before.setAttribute("alt", pair.before.alt || "");
    }
    if (pair.after) {
      after.setAttribute("src", pair.after.src);
      after.setAttribute("alt", pair.after.alt || "");
    }

    function update() {
      compare.style.setProperty("--pos", range.value + "%");
    }
    range.addEventListener("input", update);
    update();
  }

  /* ---------- Inicialização ---------- */

  function init() {
    bindWhatsapp();
    bindText();
    renderHours();
    renderServices();
    renderGallery();
    renderReviews();
    bindHeader();
    bindActiveLink();
    bindCompare();
    bindReveal();

    // Dispara a entrada do hero após a primeira pintura
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        doc.body.classList.add("is-loaded");
      });
    });
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
