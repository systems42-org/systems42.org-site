/* systems42.org: popovers, theme switch, mobile menu, search (lunr). No dependencies except lunr.min.js. */
(function () {
  'use strict';
  var doc = document;
  var script = doc.currentScript || doc.querySelector('script[data-search-index]');
  var INDEX_URL = script ? script.getAttribute('data-search-index') : '/search.json';
  var SEARCH_PAGE = script ? script.getAttribute('data-search-page') : '/search/';

  /* ---------- popovers (42 family, more menu) ---------- */
  var popButtons = Array.prototype.slice.call(doc.querySelectorAll('[data-pop]'));
  function closePops(except) {
    popButtons.forEach(function (b) {
      var p = doc.getElementById(b.getAttribute('data-pop'));
      if (!p || p === except) { return; }
      p.hidden = true;
      b.setAttribute('aria-expanded', 'false');
    });
  }
  popButtons.forEach(function (b) {
    var p = doc.getElementById(b.getAttribute('data-pop'));
    if (!p) { return; }
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = p.hidden;
      closePops(p);
      p.hidden = !open;
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var first = p.querySelector('a, button');
        if (first && e.detail === 0) { first.focus(); }
      }
    });
    p.addEventListener('click', function (e) { e.stopPropagation(); });
  });
  doc.addEventListener('click', function () { closePops(); });

  /* ---------- theme ---------- */
  var root = doc.documentElement;
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') { root.setAttribute('data-theme', t); } else { root.removeAttribute('data-theme'); t = 'auto'; }
    doc.querySelectorAll('[data-theme-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme-set') === t ? 'true' : 'false');
    });
    try { if (t === 'auto') { localStorage.removeItem('s42-theme'); } else { localStorage.setItem('s42-theme', t); } } catch (e) {}
  }
  var stored = null;
  try { stored = localStorage.getItem('s42-theme'); } catch (e) {}
  applyTheme(stored || 'auto');
  doc.querySelectorAll('[data-theme-set]').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme-set')); });
  });

  /* ---------- sub navigation marker ---------- */
  var links = doc.querySelectorAll('.subnav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { var el = doc.getElementById(a.getAttribute('href').slice(1)); if (el) { map[el.id] = a; } });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { obs.observe(doc.getElementById(id)); });
  }

  /* ---------- search ---------- */
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || '');
  doc.querySelectorAll('.kbd-hint').forEach(function (k) { k.textContent = isMac ? '⌘K' : 'Ctrl K'; });

  var index = null, docs = null, loading = null;
  function loadIndex() {
    if (loading) { return loading; }
    loading = fetch(INDEX_URL).then(function (r) { return r.json(); }).then(function (data) {
      docs = {};
      data.forEach(function (d, i) { d.id = String(i); docs[d.id] = d; });
      index = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('lede', { boost: 4 });
        this.field('content');
        this.metadataWhitelist = ['position'];
        data.forEach(function (d) { this.add(d); }, this);
      });
      return index;
    });
    return loading;
  }

  function terms(q) {
    return q.toLowerCase().split(/[\s,.;:!?()"']+/).filter(function (t) { return t.length > 0; });
  }

  function search(q) {
    if (!index) { return []; }
    var raw = terms(q);
    if (!raw.length) { return []; }
    var results;
    try {
      results = index.query(function (query) {
        raw.forEach(function (t, i) {
          var last = i === raw.length - 1;
          var stemmed = index.pipeline.runString(t, {});
          var s = stemmed.length ? stemmed[0] : t;
          query.term(s, { boost: 10 });
          if (last || t.length >= 3) { query.term(s, { wildcard: lunr.Query.wildcard.TRAILING, boost: 4 }); }
          if (t.length >= 5) { query.term(s, { editDistance: 1, boost: 1 }); }
        });
      });
    } catch (e) { results = []; }
    return results.map(function (r) { return { doc: docs[r.ref], score: r.score }; });
  }

  function escapeHtml(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function highlight(text, raw) {
    if (!raw.length) { return escapeHtml(text); }
    var re = new RegExp('(' + raw.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'ig');
    return escapeHtml(text).replace(re, '<mark>$1</mark>');
  }

  function snippet(d, raw) {
    var text = d.content || '';
    var lower = text.toLowerCase();
    var pos = -1;
    for (var i = 0; i < raw.length; i++) { var p = lower.indexOf(raw[i]); if (p >= 0 && (pos < 0 || p < pos)) { pos = p; } }
    if (pos < 0) { return highlight((d.lede || text).slice(0, 150), raw) + (text.length > 150 ? '…' : ''); }
    var start = Math.max(0, pos - 70), end = Math.min(text.length, pos + 110);
    return (start > 0 ? '…' : '') + highlight(text.slice(start, end), raw) + (end < text.length ? '…' : '');
  }

  function render(list, results, raw, limit, q) {
    list.innerHTML = '';
    var shown = limit ? results.slice(0, limit) : results;
    shown.forEach(function (r, i) {
      var li = doc.createElement('li');
      li.setAttribute('role', 'option');
      li.id = list.id + '-' + i;
      li.innerHTML = '<a href="' + r.doc.url + '"><span class="r-title">' + highlight(r.doc.title, raw) + '</span><span class="r-type">' + (r.doc.type === 'posts' ? 'blog' : 'page') + '</span><span class="r-snip">' + snippet(r.doc, raw) + '</span></a>';
      list.appendChild(li);
    });
    if (limit && results.length > limit) {
      var all = doc.createElement('li');
      all.setAttribute('role', 'option');
      all.className = 'r-all';
      all.id = list.id + '-all';
      all.innerHTML = '<a href="' + SEARCH_PAGE + '?q=' + encodeURIComponent(q) + '">Show all ' + results.length + ' results</a>';
      list.appendChild(all);
    }
    if (!results.length && raw.length) {
      var none = doc.createElement('li');
      none.className = 'r-none';
      none.textContent = 'No results for “' + q + '”';
      list.appendChild(none);
    }
  }

  function debounce(fn, ms) { var t; return function () { var a = arguments, s = this; clearTimeout(t); t = setTimeout(function () { fn.apply(s, a); }, ms); }; }

  /* --- the dialog --- */
  var dialog = doc.getElementById('search');
  var input = doc.getElementById('search-input');
  var list = doc.getElementById('search-results');
  var active = -1, lastFocus = null;

  function options() { return Array.prototype.slice.call(list.querySelectorAll('[role=option]')); }
  function setActive(i) {
    var opts = options();
    if (!opts.length) { active = -1; input.removeAttribute('aria-activedescendant'); return; }
    active = (i + opts.length) % opts.length;
    opts.forEach(function (o, k) { o.setAttribute('aria-selected', k === active ? 'true' : 'false'); });
    input.setAttribute('aria-activedescendant', opts[active].id);
    var el = opts[active];
    if (el.scrollIntoView) { el.scrollIntoView({ block: 'nearest' }); }
  }
  function openDialog() {
    if (!dialog || !dialog.hidden) { return; }
    closePops();
    lastFocus = doc.activeElement;
    dialog.hidden = false;
    doc.body.classList.add('search-open-body');
    input.value = '';
    list.innerHTML = '';
    input.focus();
    loadIndex().catch(function () { list.innerHTML = '<li class="r-none">Search index could not be loaded.</li>'; });
  }
  function closeDialog() {
    if (!dialog || dialog.hidden) { return; }
    dialog.hidden = true;
    doc.body.classList.remove('search-open-body');
    input.setAttribute('aria-expanded', 'false');
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  function runDialogSearch() {
    var q = input.value.trim();
    if (!q) { list.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); active = -1; return; }
    loadIndex().then(function () {
      var raw = terms(q);
      render(list, search(q), raw, 8, q);
      input.setAttribute('aria-expanded', 'true');
      setActive(0);
    });
  }
  if (dialog && input && list) {
    doc.querySelectorAll('[data-search-open]').forEach(function (b) { b.addEventListener('click', openDialog); });
    doc.querySelectorAll('[data-search-close]').forEach(function (b) { b.addEventListener('click', closeDialog); });
    input.addEventListener('input', debounce(runDialogSearch, 60));
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
      else if (e.key === 'End') { e.preventDefault(); setActive(options().length - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var opts = options();
        if (active >= 0 && opts[active]) { opts[active].querySelector('a').click(); }
        else if (input.value.trim()) { location.href = SEARCH_PAGE + '?q=' + encodeURIComponent(input.value.trim()); }
      }
    });
    list.addEventListener('mousemove', function (e) {
      var li = e.target.closest('[role=option]');
      if (li) { var i = options().indexOf(li); if (i !== active) { setActive(i); } }
    });
    doc.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); if (dialog.hidden) { openDialog(); } else { closeDialog(); } return; }
      if (e.key === 'Escape') {
        if (!dialog.hidden) { e.preventDefault(); closeDialog(); } else { closePops(); }
      }
      if (e.key === '/' && dialog.hidden && !/^(INPUT|TEXTAREA|SELECT)$/.test(doc.activeElement.tagName) && !doc.activeElement.isContentEditable) { e.preventDefault(); openDialog(); }
    });
    // trap tab inside the dialog
    dialog.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') { return; }
      var f = dialog.querySelectorAll('input, button, a[href]');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* --- the /search/ page --- */
  var pInput = doc.getElementById('search-page-input');
  var pList = doc.getElementById('search-page-results');
  var pStatus = doc.getElementById('search-page-status');
  if (pInput && pList) {
    var params = new URLSearchParams(location.search);
    var q0 = params.get('q') || '';
    pInput.value = q0;
    function runPage() {
      var q = pInput.value.trim();
      if (!q) { pList.innerHTML = ''; pStatus.textContent = ''; return; }
      loadIndex().then(function () {
        var res = search(q);
        render(pList, res, terms(q), 0, q);
        pStatus.textContent = res.length ? res.length + (res.length === 1 ? ' result for “' : ' results for “') + q + '”' : 'No results for “' + q + '”';
        var url = SEARCH_PAGE + '?q=' + encodeURIComponent(q);
        if (history.replaceState) { history.replaceState(null, '', url); }
        doc.title = 'Search: ' + q + ' – systems42';
      });
    }
    pInput.addEventListener('input', debounce(runPage, 80));
    pInput.form.addEventListener('submit', function (e) { e.preventDefault(); runPage(); });
    if (q0) { runPage(); } else { pInput.focus(); }
  }
})();
