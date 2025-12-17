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

  const USERS_KEY = 'mb_users';
  const SESSION_KEY = 'mb_session';

  function safeJsonParse(str, fallback) {
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  }

  function getUsers() {
    return safeJsonParse(localStorage.getItem(USERS_KEY) || '[]', []);
  }

  function setUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    return safeJsonParse(localStorage.getItem(SESSION_KEY) || 'null', null);
  }

  function setSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function showInlineMessage(container, kind, text) {
    if (!container) return;
    let el = container.querySelector('.auth-message');
    if (!el) {
      el = document.createElement('div');
      el.className = 'auth-message';
      el.style.marginTop = '10px';
      el.style.padding = '10px 12px';
      el.style.borderRadius = '10px';
      el.style.border = '1px solid var(--stroke)';
      el.style.fontSize = '0.95rem';
      container.appendChild(el);
    }
    if (kind === 'error') {
      el.style.background = 'rgba(220, 38, 38, 0.12)';
      el.style.borderColor = 'rgba(220, 38, 38, 0.35)';
      el.style.color = 'var(--text)';
    } else {
      el.style.background = 'rgba(34, 197, 94, 0.12)';
      el.style.borderColor = 'rgba(34, 197, 94, 0.35)';
      el.style.color = 'var(--text)';
    }
    el.textContent = text;
  }

  function updateUserButton() {
    const session = getSession();
    const existingName = userBtn.querySelector('.user-btn-name');
    const icon = userBtn.querySelector('svg');

    if (session && session.email) {
      const label = String(session.name || session.email || '').trim();
      let nameEl = existingName;
      if (!nameEl) {
        nameEl = document.createElement('span');
        nameEl.className = 'user-btn-name';
        nameEl.style.fontWeight = '600';
        nameEl.style.fontSize = '0.95rem';
        nameEl.style.whiteSpace = 'nowrap';
        nameEl.style.overflow = 'hidden';
        nameEl.style.textOverflow = 'ellipsis';
        nameEl.style.maxWidth = '120px';
        userBtn.appendChild(nameEl);
      }
      nameEl.textContent = label;
      userBtn.style.display = 'inline-flex';
      userBtn.style.alignItems = 'center';
      userBtn.style.justifyContent = 'center';
      userBtn.style.gap = '10px';
      userBtn.style.paddingLeft = '14px';
      userBtn.style.paddingRight = '14px';
      userBtn.style.width = 'auto';
      userBtn.style.maxWidth = '220px';

      if (icon) {
        icon.style.flexShrink = '0';
        icon.style.display = 'block';
      }
    } else if (existingName) {
      existingName.remove();
      userBtn.style.maxWidth = '';
      userBtn.style.width = '';
      userBtn.style.paddingLeft = '';
      userBtn.style.paddingRight = '';
      userBtn.style.gap = '';
      userBtn.style.justifyContent = '';
      if (icon) {
        icon.style.flexShrink = '';
        icon.style.display = '';
      }
    }
  }

  function updateUserMenu() {
    const session = getSession();
    if (session && session.email) {
      userMenu.innerHTML = `
        <button class="user-menu-item" role="menuitem" data-action="logout">Cerrar sesión</button>
      `;
    } else {
      userMenu.innerHTML = `
        <button class="user-menu-item" role="menuitem" data-action="login">Iniciar sesión</button>
        <button class="user-menu-item" role="menuitem" data-action="register">Registrarse</button>
      `;
    }

    updateUserButton();
  }

  function bindAuthHandlers() {
    const loginEmail = panelContent.querySelector('#login-email');
    const loginPassword = panelContent.querySelector('#login-password');
    const regName = panelContent.querySelector('#reg-name');
    const regEmail = panelContent.querySelector('#reg-email');
    const regPassword = panelContent.querySelector('#reg-password');
    const regPassword2 = panelContent.querySelector('#reg-password2');
    const primaryBtn = panelContent.querySelector('.btn.btn-primary');
    const form = panelContent.querySelector('form');

    if (primaryBtn) {
      primaryBtn.removeAttribute('aria-disabled');
      primaryBtn.disabled = false;
    }

    function onLogin() {
      const email = normalizeEmail(loginEmail && loginEmail.value);
      const password = String(loginPassword && loginPassword.value || '');

      if (!email || !password) {
        showInlineMessage(form, 'error', 'Completa email y contraseña.');
        return;
      }

      const users = getUsers();
      const user = users.find(u => normalizeEmail(u.email) === email);
      if (!user || user.password !== password) {
        showInlineMessage(form, 'error', 'Email o contraseña incorrectos.');
        return;
      }

      setSession({ email: user.email, name: user.name || '' });
      updateUserMenu();
      closePanel();
    }

    function onRegister() {
      const name = String(regName && regName.value || '').trim();
      const email = normalizeEmail(regEmail && regEmail.value);
      const password = String(regPassword && regPassword.value || '');
      const password2 = String(regPassword2 && regPassword2.value || '');
      const accept = !!panelContent.querySelector('input[type="checkbox"][required]')?.checked;

      if (!name || !email || !password || !password2) {
        showInlineMessage(form, 'error', 'Rellena todos los campos.');
        return;
      }
      if (!accept) {
        showInlineMessage(form, 'error', 'Debes aceptar los términos y condiciones.');
        return;
      }
      if (password.length < 6) {
        showInlineMessage(form, 'error', 'La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (password !== password2) {
        showInlineMessage(form, 'error', 'Las contraseñas no coinciden.');
        return;
      }

      const users = getUsers();
      const exists = users.some(u => normalizeEmail(u.email) === email);
      if (exists) {
        showInlineMessage(form, 'error', 'Ya existe una cuenta con ese email.');
        return;
      }

      users.push({ name, email, password });
      setUsers(users);
      setSession({ email, name });
      updateUserMenu();
      closePanel();
    }

    function onSubmit(e) {
      e.preventDefault();
      if (loginEmail && loginPassword) return onLogin();
      if (regName && regEmail && regPassword && regPassword2) return onRegister();
    }

    if (form) {
      form.addEventListener('submit', onSubmit);
    }

    if (primaryBtn) {
      primaryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginEmail && loginPassword) return onLogin();
        if (regName && regEmail && regPassword && regPassword2) return onRegister();
      });
    }
  }

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
    const prefix = (location.pathname.includes('/Tienda/') || location.pathname.includes('/Merch/') || location.pathname.includes('/Pagina%20inici/') || location.pathname.includes('/Pagina inici/'))
      ? '../'
      : './';
    const map = {
      login: { file: prefix + 'login.html', title: 'Iniciar sesión' },
      register: { file: prefix + 'register.html', title: 'Registrarse' }
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

    bindAuthHandlers();

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
    if (action === 'logout') {
      clearSession();
      updateUserMenu();
      return;
    }
    openPanel(action);
  });

  panelCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePanel();
  });

  overlay.addEventListener('click', () => {
    if (!sidePanel.hasAttribute('hidden')) closePanel();
  });

  updateUserMenu();
})();


