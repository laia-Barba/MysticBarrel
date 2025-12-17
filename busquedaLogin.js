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

  function getCartKey() {
    const session = getSession();
    const email = session && session.email ? String(session.email) : '';
    return email ? `mb_cart_${email}` : null;
  }

  function getCart() {
    const key = getCartKey();
    if (!key) return { items: [] };
    return safeJsonParse(localStorage.getItem(key) || '{"items":[]}', { items: [] });
  }

  function setCart(cart) {
    const key = getCartKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(cart));
  }

  function showCartToast(text) {
    let host = document.getElementById('mb-cart-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'mb-cart-toast-host';
      host.style.position = 'fixed';
      host.style.right = '18px';
      host.style.bottom = '18px';
      host.style.zIndex = '10000';
      host.style.display = 'grid';
      host.style.gap = '10px';
      document.body.appendChild(host);
    }

    const toast = document.createElement('div');
    toast.style.background = 'var(--surface, #1a1816)';
    toast.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
    toast.style.borderRadius = '14px';
    toast.style.boxShadow = '0 18px 50px rgba(0,0,0,0.55)';
    toast.style.padding = '12px 14px';
    toast.style.maxWidth = '360px';
    toast.style.color = 'var(--text, #f4f4f4)';
    toast.style.display = 'grid';
    toast.style.gap = '6px';
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 180ms ease, transform 180ms ease';

    const title = document.createElement('div');
    title.textContent = 'Añadido al carrito';
    title.style.fontWeight = '800';
    title.style.color = 'var(--gold, #c5a253)';

    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.opacity = '0.92';
    msg.style.lineHeight = '1.4';

    toast.appendChild(title);
    toast.appendChild(msg);
    host.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    const ttl = 2400;
    const close = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
        if (host && !host.childElementCount) host.remove();
      }, 220);
    };

    toast.addEventListener('click', close);
    setTimeout(close, ttl);
  }

  function addCartItem(item) {
    const session = getSession();
    if (!session || !session.email) return;
    const cart = getCart();
    const id = String(item && item.id || '').trim();
    const name = String(item && item.name || '').trim();
    const unitPrice = Number(item && item.unitPrice || 0);
    const qtyToAdd = Number(item && item.qty || 0);

    if (!id || !name || !Number.isFinite(unitPrice) || unitPrice <= 0 || !Number.isFinite(qtyToAdd) || qtyToAdd <= 0) return;

    const existing = cart.items.find(i => i.id === id);
    if (existing) {
      existing.qty = Number(existing.qty || 0) + qtyToAdd;
      existing.unitPrice = unitPrice;
      existing.name = name;
    } else {
      cart.items.push({ id, name, unitPrice, qty: qtyToAdd });
    }

    setCart(cart);
    refreshCartUI();
    showCartToast(`${qtyToAdd} × ${name}`);
  }

  function calcCartTotals(cart) {
    const items = (cart && Array.isArray(cart.items)) ? cart.items : [];
    const totalQty = items.reduce((acc, it) => acc + Number(it.qty || 0), 0);
    const totalPrice = items.reduce((acc, it) => acc + (Number(it.qty || 0) * Number(it.unitPrice || 0)), 0);
    return { totalQty, totalPrice };
  }

  function removeCartItem(id) {
    const session = getSession();
    if (!session || !session.email) return;
    const cart = getCart();
    const target = String(id || '').trim();
    if (!target) return;
    const items = (cart.items || []);
    const idx = items.findIndex(i => i && i.id === target);
    if (idx === -1) return;

    const currentQty = Number(items[idx].qty || 0);
    if (currentQty > 1) {
      items[idx].qty = currentQty - 1;
    } else {
      items.splice(idx, 1);
    }

    cart.items = items;
    setCart(cart);
    refreshCartUI();
  }

  function incrementCartItem(id) {
    const session = getSession();
    if (!session || !session.email) return;
    const cart = getCart();
    const target = String(id || '').trim();
    if (!target) return;
    const items = (cart.items || []);
    const idx = items.findIndex(i => i && i.id === target);
    if (idx === -1) return;
    const currentQty = Number(items[idx].qty || 0);
    items[idx].qty = (currentQty > 0 ? currentQty : 0) + 1;
    cart.items = items;
    setCart(cart);
    refreshCartUI();
  }

  function decrementCartItem(id) {
    removeCartItem(id);
  }

  function removeCartItemAll(id) {
    const session = getSession();
    if (!session || !session.email) return;
    const cart = getCart();
    const target = String(id || '').trim();
    if (!target) return;
    cart.items = (cart.items || []).filter(i => i && i.id !== target);
    setCart(cart);
    refreshCartUI();
  }

  function ensureCartPanel() {
    let overlay = document.getElementById('mb-cart-overlay');
    let panel = document.getElementById('mb-cart-panel');

    if (overlay && panel) return { overlay, panel };

    overlay = document.createElement('div');
    overlay.id = 'mb-cart-overlay';
    overlay.hidden = true;
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.65)';
    overlay.style.backdropFilter = 'blur(6px)';
    overlay.style.zIndex = '9998';
    overlay.style.display = 'none';

    panel = document.createElement('aside');
    panel.id = 'mb-cart-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.style.position = 'fixed';
    panel.style.top = '0';
    panel.style.right = '0';
    panel.style.height = '100vh';
    panel.style.width = 'min(480px, 92vw)';
    panel.style.background = 'var(--artisan-card, linear-gradient(145deg, #2a2218 0%, #1f1810 100%))';
    panel.style.borderLeft = 'var(--artisan-border, 1px solid rgba(212, 175, 55, 0.2))';
    panel.style.boxShadow = 'var(--artisan-shadow, 0 20px 60px rgba(0,0,0,0.55))';
    panel.style.zIndex = '9999';
    panel.style.display = 'none';
    panel.style.padding = '18px 18px 16px';
    panel.style.overflow = 'hidden';
    panel.style.borderRadius = '18px 0 0 18px';
    panel.style.boxSizing = 'border-box';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '12px';

    panel.innerHTML = `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:4px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="font-family:'Playfair Display',serif;font-weight:800;font-size:1.6rem;letter-spacing:0.05em;text-transform:uppercase;background:var(--artisan-gold, linear-gradient(45deg,#d4af37 0%,#f4e4bc 50%,#d4af37 100%));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 2px 16px rgba(0,0,0,0.45);">Carrito</div>
          <div style="font-family:'Crimson Text',serif;font-size:0.95rem;color:var(--artisan-muted,#c9b79c);opacity:0.9;">Tu selección artesanal de Mystic Barrel</div>
        </div>
        <button type="button" id="mb-cart-close" style="width:40px;height:40px;border-radius:999px;background:rgba(0,0,0,0.25);border:1px solid var(--stroke, rgba(197,162,83,0.4));color:var(--artisan-text,#f5f5dc);cursor:pointer;display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,0.5);">✕</button>
      </div>
      <div style="height:1px;width:100%;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent);opacity:0.8;margin:2px 0 6px 0;"></div>
      <div id="mb-cart-items" style="flex:1 1 auto;min-height:0;display:grid;gap:10px;padding-right:4px;padding-top:4px;overflow-y:auto;">
      </div>
      <div style="margin-top:6px;padding-top:10px;border-top:1px solid rgba(212,175,55,0.25);display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;flex-direction:column;gap:2px;">
          <span style="font-size:0.85rem;font-family:'Crimson Text',serif;color:var(--artisan-muted,#c9b79c);text-transform:uppercase;letter-spacing:0.08em;">Total estimado</span>
          <span style="font-size:0.9rem;color:var(--muted,#b8b8b8);opacity:0.9;">Impuestos incluidos cuando apliquen</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <div id="mb-cart-total" style="color:var(--gold,#c5a253);font-weight:800;font-size:1.35rem;text-shadow:0 2px 12px rgba(0,0,0,0.7);">0,00€</div>
          <button type="button" id="mb-cart-checkout" style="margin-top:2px;padding:8px 18px;border-radius:999px;border:1px solid var(--artisan-border, rgba(212,175,55,0.2));background:var(--artisan-gold, linear-gradient(45deg,#d4af37 0%,#f4e4bc 50%,#d4af37 100%));color:#1a1814;font-weight:700;font-size:0.9rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.45);display:inline-flex;align-items:center;gap:8px;">
            <span>Comprar</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    const close = () => {
      overlay.hidden = true;
      overlay.style.display = 'none';
      panel.hidden = true;
      panel.style.display = 'none';
    };
    overlay.addEventListener('click', close);
    panel.querySelector('#mb-cart-close').addEventListener('click', close);

    const checkoutBtn = panel.querySelector('#mb-cart-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cart = getCart();
        const { totalQty, totalPrice } = calcCartTotals(cart);
        if (!totalQty) {
          showCartToast('Tu carrito está vacío.');
          return;
        }
        window.alert(`Total de tu compra: ${totalPrice.toFixed(2).replace('.', ',')}€`);
      });
    }

    return { overlay, panel };
  }

  function openCartPanel() {
    const session = getSession();
    if (!session || !session.email) return;
    const { overlay, panel } = ensureCartPanel();
    refreshCartUI();
    overlay.hidden = false;
    overlay.style.display = 'block';
    panel.hidden = false;
    panel.style.display = 'block';
  }

  function refreshCartUI() {
    const cartBtn = document.getElementById('mb-cart-button');
    const cart = getCart();
    const { totalQty, totalPrice } = calcCartTotals(cart);

    if (cartBtn) {
      const badge = cartBtn.querySelector('.mb-cart-badge');
      if (badge) badge.textContent = String(totalQty || 0);
    }

    const itemsEl = document.getElementById('mb-cart-items');
    const totalEl = document.getElementById('mb-cart-total');

    if (totalEl) {
      totalEl.textContent = (totalPrice || 0).toFixed(2).replace('.', ',') + '€';
    }

    if (itemsEl) {
      itemsEl.innerHTML = '';
      const items = (cart && Array.isArray(cart.items)) ? cart.items : [];

      if (!items.length) {
        const empty = document.createElement('div');
        empty.textContent = 'Tu carrito está vacío.';
        empty.style.color = 'var(--muted, #b8b8b8)';
        empty.style.padding = '10px 0';
        itemsEl.appendChild(empty);
        return;
      }

      items.forEach((it) => {
        const row = document.createElement('div');
        row.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
        row.style.borderRadius = '14px';
        row.style.padding = '12px';
        row.style.background = 'var(--bg-alt, #141312)';
        row.style.display = 'grid';
        row.style.gap = '6px';

        const top = document.createElement('div');
        top.style.display = 'flex';
        top.style.alignItems = 'center';
        top.style.justifyContent = 'space-between';
        top.style.gap = '10px';

        const name = document.createElement('div');
        name.textContent = it.name;
        name.style.fontWeight = '700';
        name.style.color = 'var(--text, #f4f4f4)';
        name.style.overflow = 'hidden';
        name.style.textOverflow = 'ellipsis';
        name.style.whiteSpace = 'nowrap';
        name.style.maxWidth = '250px';

        const qty = Number(it.qty || 0);
        const subtotal = (Number(it.unitPrice || 0) * qty);

        const subtotalEl = document.createElement('div');
        subtotalEl.textContent = subtotal.toFixed(2).replace('.', ',') + '€';
        subtotalEl.style.color = 'var(--gold, #c5a253)';
        subtotalEl.style.fontWeight = '800';

        const actions = document.createElement('div');
        actions.style.display = 'grid';
        actions.style.justifyItems = 'end';
        actions.style.gap = '8px';
        actions.style.flexShrink = '0';

        const qtyWrap = document.createElement('div');
        qtyWrap.style.display = 'inline-flex';
        qtyWrap.style.alignItems = 'center';
        qtyWrap.style.gap = '8px';
        qtyWrap.style.padding = '6px 10px';
        qtyWrap.style.borderRadius = '999px';
        qtyWrap.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
        qtyWrap.style.background = 'rgba(255,255,255,0.04)';

        const decBtn = document.createElement('button');
        decBtn.type = 'button';
        decBtn.textContent = '−';
        decBtn.setAttribute('data-cart-dec', String(it.id));
        decBtn.style.width = '28px';
        decBtn.style.height = '28px';
        decBtn.style.borderRadius = '999px';
        decBtn.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
        decBtn.style.background = 'transparent';
        decBtn.style.color = 'var(--text, #f4f4f4)';
        decBtn.style.cursor = 'pointer';
        decBtn.style.fontWeight = '800';
        decBtn.style.lineHeight = '1';

        const qtyLabel = document.createElement('div');
        qtyLabel.textContent = String(qty);
        qtyLabel.style.minWidth = '16px';
        qtyLabel.style.textAlign = 'center';
        qtyLabel.style.fontWeight = '800';
        qtyLabel.style.color = 'var(--text, #f4f4f4)';

        const incBtn = document.createElement('button');
        incBtn.type = 'button';
        incBtn.textContent = '+';
        incBtn.setAttribute('data-cart-inc', String(it.id));
        incBtn.style.width = '28px';
        incBtn.style.height = '28px';
        incBtn.style.borderRadius = '999px';
        incBtn.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
        incBtn.style.background = 'transparent';
        incBtn.style.color = 'var(--text, #f4f4f4)';
        incBtn.style.cursor = 'pointer';
        incBtn.style.fontWeight = '800';
        incBtn.style.lineHeight = '1';

        if (qty <= 1) {
          decBtn.style.opacity = '0.55';
          decBtn.disabled = true;
          decBtn.style.cursor = 'not-allowed';
        }

        qtyWrap.appendChild(decBtn);
        qtyWrap.appendChild(qtyLabel);
        qtyWrap.appendChild(incBtn);

        const removeAllBtn = document.createElement('button');
        removeAllBtn.type = 'button';
        removeAllBtn.textContent = 'Eliminar';
        removeAllBtn.setAttribute('data-cart-remove-all', String(it.id));
        removeAllBtn.style.background = 'transparent';
        removeAllBtn.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
        removeAllBtn.style.color = 'var(--text, #f4f4f4)';
        removeAllBtn.style.borderRadius = '12px';
        removeAllBtn.style.padding = '8px 10px';
        removeAllBtn.style.cursor = 'pointer';
        removeAllBtn.style.fontWeight = '700';

        actions.appendChild(removeAllBtn);
        actions.appendChild(qtyWrap);

        const meta = document.createElement('div');
        const unitPriceText = (Number(it.unitPrice || 0)).toFixed(2).replace('.', ',') + '€';
        meta.textContent = `Cantidad: ${qty} · Precio: ${unitPriceText}`;
        meta.style.color = 'var(--muted, #b8b8b8)';
        meta.style.fontSize = '0.95rem';
        meta.style.lineHeight = '1.4';

        top.appendChild(name);
        top.appendChild(subtotalEl);
        row.appendChild(top);
        row.appendChild(actions);
        row.appendChild(meta);
        itemsEl.appendChild(row);
      });

      if (!itemsEl.dataset.mbCartBound) {
        itemsEl.dataset.mbCartBound = '1';
        itemsEl.addEventListener('click', (e) => {
          const dec = e.target.closest('[data-cart-dec]');
          if (dec) {
            decrementCartItem(dec.getAttribute('data-cart-dec'));
            return;
          }
          const inc = e.target.closest('[data-cart-inc]');
          if (inc) {
            incrementCartItem(inc.getAttribute('data-cart-inc'));
            return;
          }
          const remAll = e.target.closest('[data-cart-remove-all]');
          if (remAll) {
            removeCartItemAll(remAll.getAttribute('data-cart-remove-all'));
          }
        });
      }
    }
  }

  function updateCartButton() {
    const session = getSession();
    const existing = document.getElementById('mb-cart-button');

    if (!session || !session.email) {
      if (existing) existing.remove();
      const overlay = document.getElementById('mb-cart-overlay');
      const panel = document.getElementById('mb-cart-panel');
      if (overlay) { overlay.hidden = true; overlay.style.display = 'none'; }
      if (panel) { panel.hidden = true; panel.style.display = 'none'; }
      return;
    }

    if (existing) {
      refreshCartUI();
      return;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'mb-cart-button';
    btn.className = 'cart-btn';
    btn.setAttribute('aria-label', 'Abrir carrito');
    btn.style.display = 'inline-flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.gap = '10px';
    btn.style.height = '44px';
    btn.style.padding = '0 14px';
    btn.style.borderRadius = '14px';
    btn.style.background = 'var(--bg-alt, #141312)';
    btn.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
    btn.style.color = 'var(--text, #f4f4f4)';
    btn.style.cursor = 'pointer';
    btn.style.position = 'relative';

    btn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M6 6l-2-3H1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
      </svg>
      <span class="mb-cart-badge" style="position:absolute;top:-6px;right:-6px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--gold,#c5a253);color:#000;font-weight:800;font-size:0.75rem;display:grid;place-items:center;">0</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartPanel();
    });

    userBtn.parentNode.insertBefore(btn, userBtn);
    refreshCartUI();
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
      userBtn.style.display = '';
      userBtn.style.alignItems = '';
      userBtn.style.justifyContent = '';
      userBtn.style.gap = '';
      userBtn.style.paddingLeft = '';
      userBtn.style.paddingRight = '';
      userBtn.style.width = '';
      userBtn.style.maxWidth = '';
      userBtn.style.opacity = '';
      if (icon) {
        icon.style.flexShrink = '';
        icon.style.display = '';
      }
    }

    updateCartButton();
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
    overlay.style.zIndex = '9998';
    sidePanel.style.zIndex = '9999';
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
      const ok = window.confirm('¿Seguro que quieres cerrar sesión?');
      if (!ok) return;
      clearSession();
      userBtn.disabled = false;
      userBtn.removeAttribute('aria-disabled');
      updateUserMenu();
      return;
    }
    openPanel(action);
  });

  panelCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePanel();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== overlay) return;
    if (!sidePanel.hasAttribute('hidden')) closePanel();
  });

  window.mbCart = {
    addItem: addCartItem,
    removeItem: removeCartItem,
    inc: incrementCartItem,
    dec: decrementCartItem,
    removeAll: removeCartItemAll,
    open: openCartPanel,
    refresh: refreshCartUI
  };

  updateUserMenu();
})();


