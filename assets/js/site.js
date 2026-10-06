(function () {
  // "42" family popover
  var btn = document.querySelector('.btn-42');
  var pop = document.getElementById('family-pop');
  function closePop() { if (pop) { pop.hidden = true; } if (btn) { btn.setAttribute('aria-expanded', 'false'); } }
  if (btn && pop) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = pop.hidden;
      pop.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    pop.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', closePop);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closePop(); closeNav(); } });
  }
  // mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  function closeNav() { if (nav) { nav.classList.remove('is-open'); } if (toggle) { toggle.setAttribute('aria-expanded', 'false'); } }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // current section marker in the sub navigation
  var links = document.querySelectorAll('.subnav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { var el = document.getElementById(a.getAttribute('href').slice(1)); if (el) { map[el.id] = a; } });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { obs.observe(document.getElementById(id)); });
  }
})();
