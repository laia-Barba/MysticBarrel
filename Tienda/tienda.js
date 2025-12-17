// Seleccionar todos los productos
const productCards = document.querySelectorAll('.whisky-container');
const modal = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('productModalClose');

const modalImage = document.getElementById('productModalImage');
const modalModel = document.getElementById('productModalModel');
const modalTitle = document.getElementById('productModalTitle');
const modalDescription = document.getElementById('productModalDescription');
const modalUnitPrice = document.getElementById('productModalUnitPrice');
const modalQuantity = document.getElementById('productModalQuantity');
const modalTotal = document.getElementById('productModalTotal');

const qtyButtons = modal.querySelectorAll('.qty-btn');
const buyButton = modal.querySelector('.product-modal-buy');

let currentUnitPrice = 0;

// Restringir movimiento vertical del modelo 3D en el popup
function restrictModelVerticalMovement() {
  if (modalModel) {
    modalModel.addEventListener('load', () => {
      const cameraControls = modalModel.cameraControls;
      if (cameraControls) {
        // Bloquear zoom y movimiento vertical
        cameraControls.enableZoom = false;
        cameraControls.enablePan = false;
        
        // Restringir el orbit solo a horizontal
        cameraControls.addEventListener('change', () => {
          const currentOrbit = cameraControls.getCameraOrbit();
          // Mantener theta (horizontal) pero resetear phi (vertical) a 0
          cameraControls.setCameraOrbit(currentOrbit.theta, 0, currentOrbit.radius);
        });
      }
    });
  }
}

// Función para convertir "45,35€" -> 45.35
function parsePrice(text) {
  const cleaned = text.replace('€', '').trim().replace('.', '').replace(',', '.');
  return parseFloat(cleaned);
}

// Función para formatear número -> "45,35€"
function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + '€';
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem('mb_session') || 'null');
  } catch {
    return null;
  }
}

function showAuthRequiredPopup() {
  const existing = document.getElementById('mb-auth-required-overlay');
  if (existing) {
    existing.hidden = false;
    existing.style.display = 'flex';
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'mb-auth-required-overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.72)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.padding = '24px';

  const card = document.createElement('div');
  card.style.background = 'var(--surface, #1a1816)';
  card.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
  card.style.borderRadius = '18px';
  card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.55)';
  card.style.maxWidth = '520px';
  card.style.width = '100%';
  card.style.padding = '18px 18px 16px 18px';

  const title = document.createElement('div');
  title.textContent = 'Inicia sesión para continuar';
  title.style.fontFamily = "'Playfair Display', serif";
  title.style.fontWeight = '700';
  title.style.fontSize = '1.5rem';
  title.style.color = 'var(--gold, #c5a253)';
  title.style.marginBottom = '8px';

  const msg = document.createElement('div');
  msg.textContent = 'Para añadir productos al carrito necesitas iniciar sesión.';
  msg.style.color = 'var(--text, #f4f4f4)';
  msg.style.opacity = '0.9';
  msg.style.lineHeight = '1.5';
  msg.style.marginBottom = '14px';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.justifyContent = 'flex-end';
  actions.style.gap = '10px';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.textContent = 'Cerrar';
  closeBtn.style.background = 'var(--bg-alt, #141312)';
  closeBtn.style.border = '1px solid var(--stroke, rgba(255,255,255,0.12))';
  closeBtn.style.color = 'var(--text, #f4f4f4)';
  closeBtn.style.borderRadius = '12px';
  closeBtn.style.padding = '10px 14px';
  closeBtn.style.cursor = 'pointer';

  closeBtn.onclick = () => {
    overlay.hidden = true;
    overlay.style.display = 'none';
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) closeBtn.onclick();
  };

  actions.appendChild(closeBtn);
  card.appendChild(title);
  card.appendChild(msg);
  card.appendChild(actions);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function openProductModal(card) {
  const title = card.querySelector('.whisky-title').textContent;
  const description = card.querySelector('.whisky-description').textContent;
  const priceText = card.querySelector('.whisky-price').textContent;
  const img = card.querySelector('.whisky-image');
  const model = card.querySelector('.whisky-model');

  currentUnitPrice = parsePrice(priceText);

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalUnitPrice.textContent = priceText;

  // Si el producto tiene un modelo 3D, lo mostramos; si no, imagen
  if (model) {
    const modelSrc = model.getAttribute('src');
    modalImage.hidden = true;
    modalModel.hidden = false;
    modalModel.setAttribute('src', modelSrc);
    modalModel.setAttribute('alt', title + ' 3D');
    
    // Activar restricciones de movimiento vertical
    setTimeout(() => {
      restrictModelVerticalMovement();
    }, 200);
  } else {
    modalImage.hidden = false;
    modalModel.hidden = true;
    modalImage.src = img ? img.src : '';
    modalImage.alt = img ? img.alt + ' - ' + title : title;
    // Limpiar el src del modelo para que no se quede cargado
    modalModel.removeAttribute('src');
  }

  // Reset cantidad a 1
  modalQuantity.textContent = '1';
  modalTotal.textContent = priceText;

  modal.hidden = false;
}

function closeProductModal() {
  modal.hidden = true;
  // Ocultar ambos elementos para evitar que el modelo 3D quede visible al abrir otros productos
  modalImage.hidden = true;
  modalModel.hidden = true;
}

// Abrir modal al hacer click en "VER PRODUCTO"
productCards.forEach(card => {
  const button = card.querySelector('.whisky-buy');
  if (!button) return;

  button.addEventListener('click', () => {
    openProductModal(card);
  });
});

// Botón cerrar
modalCloseBtn.addEventListener('click', closeProductModal);

// Cerrar con click fuera del contenido
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeProductModal();
  }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) {
    closeProductModal();
  }
});

// Manejo de cantidad
qtyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    let qty = parseInt(modalQuantity.textContent, 10) || 1;

    if (btn.dataset.action === 'increase') {
      qty += 1;
    } else if (btn.dataset.action === 'decrease' && qty > 1) {
      qty -= 1;
    }

    modalQuantity.textContent = String(qty);
    const total = currentUnitPrice * qty;
    modalTotal.textContent = formatPrice(total);
  });
});

// Acción de comprar (de momento solo muestra alert, lo puedes cambiar luego)
buyButton.addEventListener('click', () => {
  const session = getSession();
  if (!session || !session.email) {
    showAuthRequiredPopup();
    return;
  }
  const qty = parseInt(modalQuantity.textContent, 10) || 1;
  const title = String(modalTitle.textContent || '').trim();
  const unitPriceText = String(modalUnitPrice.textContent || '').trim();
  const unitPrice = parsePrice(unitPriceText);

  if (window.mbCart && typeof window.mbCart.addItem === 'function') {
    window.mbCart.addItem({
      id: `tienda:${title.toLowerCase().replace(/\s+/g, '-')}`,
      name: title,
      unitPrice,
      qty
    });
  }
});
