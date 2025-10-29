/*
  Interacciones de usuario
  - Menú desplegable desde el icono: Iniciar sesión / Registrarse
  - Panel lateral deslizante desde la derecha cargando contenido externo (login.html / register.html)
  - Cierre por overlay, tecla ESC y botón cerrar, con gestión de foco
*/

(function () {
  /** Elementos clave **/
  const userBtn = document.getElementById('userButton');
  const userMenu = document.getElementById('userMenu');
  const overlay = document.getElementById('auth-overlay');
  const sidePanel = document.getElementById('sidePanel');
  const panelCloseBtn = document.getElementById('panelCloseBtn');
  const panelContent = document.getElementById('panelContent');
  const panelTitle = document.getElementById('panel-title');

  let lastFocused = null;

  /** Utilidades: Menú **/
  function toggleMenu(forceOpen) {
    const willOpen = forceOpen ?? userMenu.hasAttribute('hidden');
    if (willOpen) {
      userMenu.hidden = false;
      // reflow para transición
      userMenu.offsetHeight; // eslint-disable-line no-unused-expressions
      userMenu.classList.add('open');
      userBtn.setAttribute('aria-expanded', 'true');
      document.addEventListener('mousedown', onOutsideMenuClick);
    } else {
      userMenu.classList.remove('open');
      userBtn.setAttribute('aria-expanded', 'false');
      const onEnd = () => {
        userMenu.hidden = true;
        userMenu.removeEventListener('transitionend', onEnd);
      };
      userMenu.addEventListener('transitionend', onEnd);
      document.removeEventListener('mousedown', onOutsideMenuClick);
    }
  }

  function onOutsideMenuClick(e) {
    if (!userMenu.contains(e.target) && e.target !== userBtn && !userBtn.contains(e.target)) {
      toggleMenu(false);
    }
  }

  /** Utilidades: Panel lateral **/
  async function openPanel(kind) {
    // kind: 'login' | 'register'
    lastFocused = document.activeElement;
    const map = {
      login: { file: 'login.html', title: 'Iniciar sesión' },
      register: { file: 'register.html', title: 'Registrarse' }
    };
    const cfg = map[kind];
    if (!cfg) return;

    panelTitle.textContent = cfg.title;

    const useTemplateFallback = location.protocol === 'file:';
    if (!useTemplateFallback) {
      try {
        const res = await fetch(cfg.file, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const html = await res.text();
        panelContent.innerHTML = html;
      } catch (e) {
        // Fallback a plantilla embebida
        const tpl = document.getElementById(kind === 'login' ? 'tpl-login' : 'tpl-register');
        if (tpl) {
          panelContent.innerHTML = tpl.innerHTML;
        } else {
          panelContent.innerHTML = '<p style="color:#b8b8b8">No se pudo cargar el contenido.</p>';
        }
      }
    } else {
      // Bajo file:// usar directamente la plantilla
      const tpl = document.getElementById(kind === 'login' ? 'tpl-login' : 'tpl-register');
      if (tpl) {
        panelContent.innerHTML = tpl.innerHTML;
      } else {
        panelContent.innerHTML = '<p style="color:#b8b8b8">No se pudo cargar el contenido.</p>';
      }
    }

    // Mostrar overlay y panel con animación
    overlay.hidden = false;
    sidePanel.hidden = false;
    overlay.offsetHeight; sidePanel.offsetHeight; // eslint-disable-line no-unused-expressions
    overlay.classList.add('open');
    sidePanel.classList.add('open');

    // Foco al primer elemento interactivo del panel
    setTimeout(() => {
      const focusable = sidePanel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }, 20);

    document.addEventListener('keydown', onKeydown);
  }

  function closePanel() {
    overlay.classList.remove('open');
    sidePanel.classList.remove('open');
    const onEnd = () => {
      overlay.hidden = true;
      sidePanel.hidden = true;
      overlay.removeEventListener('transitionend', onEnd);
    };
    overlay.addEventListener('transitionend', onEnd);

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }

    document.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (!sidePanel.hasAttribute('hidden')) closePanel();
      if (!userMenu.hasAttribute('hidden')) toggleMenu(false);
    }
  }

  /** Eventos **/
  userBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  document.getElementById('userMenu').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    toggleMenu(false);
    openPanel(action);
  });

  panelCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePanel();
  });

  overlay.addEventListener('click', () => {
    if (!sidePanel.hasAttribute('hidden')) closePanel();
  });
})();
