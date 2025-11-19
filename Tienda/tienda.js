// Modal de producto: apertura, cierre y rellenado
(function () {
  const overlay = document.getElementById('product-overlay');
  const modal = document.getElementById('productModal');
  const btnClose = document.getElementById('productCloseBtn');
  const titleEl = document.getElementById('productTitle');
  const descEl = document.getElementById('productDescription');
  const priceEl = document.getElementById('productPrice');
  const buyBtn = document.getElementById('productBuyBtn');
  const modelEl = document.getElementById('productModel');

  if (!overlay || !modal) return;

  let lastFocused = null;
  let currentProduct = { title: '', price: '', description: '' };

  function openProductModal(data) {
    lastFocused = document.activeElement;
    currentProduct = data;

    if (titleEl) titleEl.textContent = data.title || '';
    if (descEl) descEl.textContent = data.description || '';
    if (priceEl) priceEl.textContent = data.price || '';

    const modelSrc = data.model || 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
    if (modelEl) modelEl.setAttribute('src', modelSrc);

    overlay.hidden = false;
    modal.hidden = false;
    // force reflow before adding classes for transitions
    overlay.offsetHeight; modal.offsetHeight; // eslint-disable-line no-unused-expressions
    overlay.classList.add('open');
    modal.classList.add('open');

    // focus on close for accessibility
    setTimeout(() => { if (btnClose) btnClose.focus(); }, 20);

    document.addEventListener('keydown', onKeydown);
  }

  function closeProductModal() {
    overlay.classList.remove('open');
    modal.classList.remove('open');
    const onEnd = () => {
      overlay.hidden = true;
      modal.hidden = true;
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
      if (!modal.hasAttribute('hidden')) closeProductModal();
    }
  }

  // Delegación: abrir desde cualquier .whisky-buy
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.whisky-buy');
    if (!btn) return;
    const card = btn.closest('.whisky-container');
    if (!card) return;

    const title = (card.querySelector('.whisky-title') || {}).textContent || '';
    const description = (card.querySelector('.whisky-description') || {}).textContent || '';
    const price = (card.querySelector('.whisky-price') || {}).textContent || '';

    // Optional: dataset model on container, button, or image
    const img = card.querySelector('img');
    const model = card.dataset.model || btn.dataset.model || (img && img.dataset ? img.dataset.model : '') || '';

    openProductModal({ title, description, price, model });
  });

  // Cierre
  if (btnClose) btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeProductModal();
  });

  overlay.addEventListener('click', () => {
    if (!modal.hasAttribute('hidden')) closeProductModal();
  });

  // Acción comprar (placeholder)
  if (buyBtn) buyBtn.addEventListener('click', () => {
    alert(`Añadido al carrito: ${currentProduct.title} — ${currentProduct.price}`);
  });
})();
