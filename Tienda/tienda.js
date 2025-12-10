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
  const qty = parseInt(modalQuantity.textContent, 10) || 1;
  alert(`Has comprado ${qty} unidad(es) de "${modalTitle.textContent}".`);
  // Aquí más adelante puedes integrar carrito o redirección
});
