document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.classList.toggle('open');
      navToggle.innerHTML = navMobile.classList.contains('open')
        ? '<svg class="icon" viewBox="0 0 24 24" width="28" height="28"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" width="28" height="28"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24" width="28" height="28"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });
    });
  }

  var yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = '© ' + new Date().getFullYear() + ' DLAR Distribuidora Alimentícia. Todos os direitos reservados.';
  }

  // Abas do catálogo
  var tabs = document.querySelectorAll('.catalog-tab');
  var panels = document.querySelectorAll('.catalog-panel');

  function activateTab(target) {
    tabs.forEach(function (t) {
      var isActive = t.getAttribute('data-tab') === target;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-panel') !== target;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.getAttribute('data-tab'));
    });
  });

  // Botões "Ver itens da cesta" nos cards: ativam a aba e rolam até o catálogo
  document.querySelectorAll('[data-open-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateTab(btn.getAttribute('data-open-tab'));
      var catalogo = document.getElementById('catalogo');
      if (catalogo) {
        catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Sombra do header ao rolar
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal ao rolar
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.section-header, .cestas-grid .cesta-card, .vantagens-grid .vantagem-card, ' +
      '.catalog-tabs, .catalog-panel:not([hidden]), .catalog-bonus, .catalog-avisos, ' +
      '.sobre-media, .sobre-content, .sobre-list li, .contato-cards .contato-card, ' +
      '.contato-extra, .cta-band-inner'
    );

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
    });

    document.querySelectorAll('.cestas-grid, .vantagens-grid, .contato-cards, .sobre-list').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (child, i) {
        child.style.setProperty('--reveal-delay', (i * 0.08) + 's');
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
});
