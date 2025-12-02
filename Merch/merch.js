// Define las imágenes por color para cada producto
const productImages = {
  camiseta: {
    black: ['fotos/Camiseta delante1.png', 'fotos/camiseta atras1.png'],
    white: ['fotos/camiseta delante2.png', 'fotos/camiseta atras2.png'],
    red:   ['fotos/camiseta delante3.png', 'fotos/camiseta atras3.png'],
    blue:  ['fotos/camiseta delante4.png', 'fotos/camiseta atras4.png']
  },
  sudadera: {
    black: ['fotos/sudaD1.png', 'fotos/sudaA1.png'],
    grey:  ['fotos/sudaD2.png', 'fotos/sudaA2.png'],
    green: ['fotos/sudaD3.png', 'fotos/sudaA3.png']
  }
};

// Define los popups y el HTML para cada producto
const popups = {
  camiseta: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col">
          <img src="fotos/Camiseta delante1.png" alt="Camiseta Vintage Mystic Barrel" class="merch-popup-image" id="main-shirt-img"/>
          <div class="merch-popup-thumbnails" id="shirt-thumbnails">
            <img src="fotos/Camiseta delante1.png" class="merch-thumbnail active" data-index="0" alt="Vista adelante"/>
            <img src="fotos/Camiseta atras1.png" class="merch-thumbnail" data-index="1" alt="Vista atrás"/>
          </div>
          <div class="merch-popup-colors" id="shirt-colors">
            <button class="merch-color-option merch-color-black selected" data-color="black" data-front="fotos/Camiseta delante1.png" data-back="fotos/Camiseta atras1.png" aria-label="Negro"></button>
            <button class="merch-color-option merch-color-white" data-color="white" data-front="fotos/Camiseta delante2.png" data-back="fotos/camiseta atras2.png" aria-label="Blanco"></button>
            <button class="merch-color-option merch-color-red" data-color="red" data-front="fotos/Camiseta delante3.png" data-back="fotos/camiseta atras3.png" aria-label="Rojo"></button>
            <button class="merch-color-option merch-color-blue" data-color="blue" data-front="fotos/Camiseta delante4.png" data-back="fotos/camiseta atras4.png" aria-label="Azul"></button>
          </div>
          <div class="merch-popup-sizes" id="shirt-sizes">
            <button class="merch-size-option">XS</button>
            <button class="merch-size-option">S</button>
            <button class="merch-size-option">M</button>
            <button class="merch-size-option">L</button>
            <button class="merch-size-option">XL</button>
            <button class="merch-size-option">XXL</button>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('camiseta')">-</button>
            <span class="quantity-value" id="quantity-camiseta">1</span>
            <button class="quantity-btn" onclick="increaseQuantity('camiseta')">+</button>
          </div>
          <p id="price-camiseta" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">25,00€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('camiseta')">
            Añadir al carrito
          </button>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Camiseta Vintage</div>
          <div class="merch-popup-desc">Las camisetas Mystic Barrel están pensadas para quienes valoran la comodidad y el estilo auténtico en cualquier momento del año.
          Confeccionadas con algodón premium y detalles resistentes, ofrecen un ajuste versátil y transpirable apto para todos los públicos.
          Su diseño destaca por estampados únicos de inspiración vintage y whisky, disponibles en tonos exclusivos que realzan el logotipo de la marca.
          Estas prendas son fáciles de cuidar, ideales para uso diario o para regalar a amantes de Mystic Barrel.
          Elige tu color y talla para vestir la esencia elegante y moderna de la colección.</div>
        </div>
      </div>
    `
  },
  sudadera: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col">
          <img src="fotos/sudaD1.png" alt="Sudadera Classic Mystic Barrel" class="merch-popup-image" id="main-hoodie-img"/>
          <div class="merch-popup-thumbnails" id="hoodie-thumbnails">
            <img src="fotos/sudaD1.png" class="merch-thumbnail active" data-index="0" alt="Vista trasera"/>
            <img src="fotos/SudaA1.png" class="merch-thumbnail" data-index="1" alt="Vista delantera"/>
          </div>
          <div class="merch-popup-colors" id="hoodie-colors">
            <button class="merch-color-option merch-color-black selected" data-color="black" data-front="fotos/sudaD1.png" data-back="fotos/SudaA1.png" aria-label="Negro"></button>
            <button class="merch-color-option merch-color-grey" data-color="grey" data-front="fotos/sudaD2.png" data-back="fotos/sudaA2.png" aria-label="Gris"></button>
            <button class="merch-color-option merch-color-green" data-color="green" data-front="fotos/sudaD3.png" data-back="fotos/sudaA3.png" aria-label="Verde"></button>
          </div>
          <div class="merch-popup-sizes" id="hoodie-sizes">
            <button class="merch-size-option">S</button>
            <button class="merch-size-option">M</button>
            <button class="merch-size-option selected">L</button>
            <button class="merch-size-option">XL</button>
            <button class="merch-size-option">XXL</button>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('sudadera')">-</button>
            <span class="quantity-value" id="quantity-sudadera">1</span>
            <button class="merch-size-option quantity-btn" onclick="increaseQuantity('sudadera')">+</button>
          </div>
          <p id="price-sudadera" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">40,00€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('sudadera')">
            Añadir al carrito
          </button>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Sudadera Classic</div>
          <div class="merch-popup-desc">La Sudadera Classic de Mystic Barrel combina comodidad y estilo con su diseño premium.
          Fabricada en algodón suave y cálido, es perfecta para los días más fríos.
          Presenta el icónico logo de Mystic Barrel bordado en hilo dorado, añadiendo un toque de elegancia.
          <br><br><strong>Características:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>80% algodón, 20% poliéster</li>
            <li>Corte clásico con capucha</li>
            <li>Bolsillo canguro</li>
            <li>Bajo y puños acanalados</li>
            <li>Disponible en varios colores</li>
          </ul></div>
        </div>
      </div>
    `
  },
  copa: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col" style="align-items:center;">
          <div id="vaso-3d-viewer" style="width:320px;height:320px;background:#141312;border-radius:16px;box-shadow:0 8px 36px rgba(197, 162, 83, 0.15);"></div>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Vaso de Whisky Mystic Barrel</div>
          <div class="merch-popup-desc">
            Cristal templado, grabado Mystic Barrel. Diseño exclusivo.
            <br><br>
            Capacidad: 330 ml<br>
            Precio: <span style="color:var(--gold);font-weight:700;font-size:1.2rem;">9,95€</span>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('copa')">-</button>
            <span class="quantity-value" id="quantity-copa">1</span>
            <button class="quantity-btn" onclick="increaseQuantity('copa')">+</button>
          </div>
          <p id="price-copa" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">9,95€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('copa')">
            Añadir al carrito
          </button>
        </div>
      </div>
    `
  },
  gorra: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col" style="align-items:center;">
          <div id="gorra-3d-viewer" style="width:320px;height:320px;background:#141312;border-radius:16px;box-shadow:0 8px 36px rgba(197, 162, 83, 0.15);"></div>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Gorra Premium Mystic Barrel</div>
          <div class="merch-popup-desc">
            Gorra negra ajustable, logo dorado Mystic Barrel centrado.
            <br><br>
            Material: Algodón premium<br>
            Ajuste: Correa trasera regulable<br>
            Precio: <span style="color:var(--gold);font-weight:700;font-size:1.2rem;">25,00€</span>
          </div>
          <div class="merch-popup-colors">
            <div class="merch-color-label">Color:</div>
            <button class="merch-color-option selected" data-color="verde" data-model="Gorra.glb" style="background:#2d5016;"></button>
            <button class="merch-color-option" data-color="rojo" data-model="Gorra2.glb" style="background:#8b0000;"></button>
            <button class="merch-color-option" data-color="azul" data-model="Gorra3.glb" style="background:#1e3a8a;"></button>
            <button class="merch-color-option" data-color="rosa" data-model="Gorra4.glb" style="background:#be185d;"></button>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('gorra')">-</button>
            <span class="quantity-value" id="quantity-gorra">1</span>
            <button class="quantity-btn" onclick="increaseQuantity('gorra')">+</button>
          </div>
          <p id="price-gorra" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">25,00€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('gorra')">
            Añadir al carrito
          </button>
        </div>
      </div>
    `
  },
  botella: {
    html: `
      <img src="merch5.jpg" alt="Botella Colección" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Botella Colección</h2>
      <p style="color:#6c6c6c;">Botella exclusiva con logo y numeración original Mystic Barrel.</p>
      <div class="quantity-selector">
        <span class="quantity-label">Cantidad:</span>
        <button class="quantity-btn" onclick="decreaseQuantity('botella')">-</button>
        <span class="quantity-value" id="quantity-botella">1</span>
        <button class="quantity-btn" onclick="increaseQuantity('botella')">+</button>
      </div>
    `
  },
  taza: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col" style="align-items:center;">
          <div id="taza-3d-viewer" style="width:320px;height:320px;background:#141312;border-radius:16px;box-shadow:0 8px 36px rgba(197, 162, 83, 0.15);"></div>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Taza Mystic Barrel</div>
          <div class="merch-popup-desc">
            Taza de cerámica premium con logo Mystic Barrel grabado.
            <br><br>
            Material: Cerámica de alta calidad<br>
            Capacidad: 350ml<br>
            Acabado: Brillante con logo dorado<br>
            Precio: <span style="color:var(--gold);font-weight:700;font-size:1.2rem;">12,00€</span>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('taza')">-</button>
            <span class="quantity-value" id="quantity-taza">1</span>
            <button class="quantity-btn" onclick="increaseQuantity('taza')">+</button>
          </div>
          <p id="price-taza" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">12,00€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('taza')">
            Añadir al carrito
          </button>
        </div>
      </div>
    `
  },
  llavero: {
    html: `
      <div style="display:flex; flex-direction:row; gap:48px;">
        <div class="merch-popup-col" style="align-items:center;">
          <div id="llavero-3d-viewer" style="width:320px;height:320px;background:#141312;border-radius:16px;box-shadow:0 8px 36px rgba(197, 162, 83, 0.15);"></div>
        </div>
        <div class="merch-popup-info">
          <div class="merch-popup-title">Llavero Limited Mystic Barrel</div>
          <div class="merch-popup-desc">
            Llavero metálico con logo Mystic Barrel grabado.
            <br><br>
            Material: Acero inoxidable<br>
            Acabado: Pulido brillante<br>
            Precio: <span style="color:var(--gold);font-weight:700;font-size:1.2rem;">15,00€</span>
          </div>
          <div class="merch-popup-colors">
            <div class="merch-color-label">Color:</div>
            <button class="merch-color-option selected" data-color="rosa" data-model="LLavero4.glb" style="background:#be185d;"></button>
            <button class="merch-color-option" data-color="rojo" data-model="LLavero2.glb" style="background:#8b0000;"></button>
            <button class="merch-color-option" data-color="azul" data-model="LLavero3.glb" style="background:#1e3a8a;"></button>
          </div>
          <div class="quantity-selector">
            <span class="quantity-label">Cantidad:</span>
            <button class="quantity-btn" onclick="decreaseQuantity('llavero')">-</button>
            <span class="quantity-value" id="quantity-llavero">1</span>
            <button class="quantity-btn" onclick="increaseQuantity('llavero')">+</button>
          </div>
          <p id="price-llavero" style="margin: 20px 0; font-size: 1.5em; color: #c5a253; font-weight: bold;">15,00€</p>
          <button class="merch-add-to-cart" style="width:100%;padding:12px;background:#c5a253;color:#000;border:none;border-radius:4px;font-size:1em;cursor:pointer;font-weight:bold;transition:all 0.3s ease;" onclick="addToCart('llavero')">
            Añadir al carrito
          </button>
        </div>
      </div>
    `
  }
};

// Funciones para manejar la cantidad
function decreaseQuantity(product) {
  const quantityElement = document.getElementById(`quantity-${product}`);
  const currentQuantity = parseInt(quantityElement.textContent);
  if (currentQuantity > 1) {
    quantityElement.textContent = currentQuantity - 1;
    updatePrice(product);
  }
}

function updatePrice(product) {
  const quantity = parseInt(document.getElementById(`quantity-${product}`).textContent);
  const prices = {
    camiseta: 25,
    sudadera: 40,
    copa: 9.95,
    gorra: 25.00,
    taza: 12.00,
    llavero: 15.00
  };
  const basePrice = prices[product];
  const totalPrice = (basePrice * quantity).toFixed(2);
  
  // Actualizar el elemento de precio específico del producto
  const priceElement = document.getElementById(`price-${product}`);
  if (priceElement) {
    priceElement.textContent = `${totalPrice}€`;
  }
  
  console.log(`Precio actualizado para ${product}: ${quantity} x ${basePrice}€ = ${totalPrice}€`);
}

function increaseQuantity(product) {
  const quantityElement = document.getElementById(`quantity-${product}`);
  if (quantityElement) {
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updatePrice(product);
  }
}

function decreaseQuantity(product) {
  const quantityElement = document.getElementById(`quantity-${product}`);
  if (quantityElement) {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
      updatePrice(product);
    }
  }
}

function addToCart(product) {
  const quantity = parseInt(document.getElementById(`quantity-${product}`).textContent);
  const prices = {
    camiseta: 25,
    sudadera: 40,
    copa: 9.95,
    gorra: 25.00,
    llavero: 15.00
  };
  const basePrice = prices[product];
  const totalPrice = (basePrice * quantity).toFixed(2);
  
  // Obtener información del producto
  const productInfo = {
    camiseta: { name: 'Camiseta Vintage', price: 25 },
    sudadera: { name: 'Sudadera Classic', price: 40 },
    copa: { name: 'Vaso de Whisky Mystic Barrel', price: 9.95 },
    gorra: { name: 'Gorra Premium Mystic Barrel', price: 25.00 },
    llavero: { name: 'Llavero Limited Mystic Barrel', price: 15.00 }
  };
  
  const info = productInfo[product];
  
  // Mostrar mensaje de confirmación
  console.log(`Añadido al carrito: ${quantity} x ${info.name} = ${totalPrice}€`);
  
  // Aquí podrías integrar con un sistema de carrito real
  alert(`✅ ${quantity} ${info.name}(s) añadido(s) al carrito\nTotal: ${totalPrice}€`);
  
  // Opcional: Cerrar el popup después de añadir
  // closePopup();
}

// Mostrar popup merch
document.querySelectorAll('.merch-card').forEach(card => {
  card.addEventListener('click', function () {
    const key = card.getAttribute('data-popup');
    const overlay = document.getElementById('merch-popup-overlay');
    const content = document.getElementById('merch-popup-content');
    if (popups[key]) {
      content.innerHTML = popups[key].html;
      overlay.classList.add('active');
      
      // Inicializar el precio del producto
      setTimeout(() => { updatePrice(key); }, 50);
      
      // Solo carga el visor FBX si es el vaso, la gorra, la taza o el llavero
      if (key === "copa") {
        setTimeout(() => { initVaso3D(); }, 100);
      } else if (key === "gorra") {
        setTimeout(() => { initGorra3D(); }, 100);
      } else if (key === "taza") {
        setTimeout(() => { initTaza3D(); }, 100);
      } else if (key === "llavero") {
        setTimeout(() => { initLlavero3D(); }, 100);
      }
    }
  });
});

// Cerrar popup (botón o click en overlay)
document.getElementById('merch-popup-close').onclick = () => {
  document.getElementById('merch-popup-overlay').classList.remove('active');
};
document.getElementById('merch-popup-overlay').onclick = function(e) {
  if (e.target === this) {
    this.classList.remove('active');
  }
};

// Delegación de eventos SOLO para color/talla/miniaturas en popup dinámico
document.getElementById('merch-popup-content').addEventListener('click', function(e) {
  // Colores para camisetas y sudaderas
  if (e.target.classList.contains("merch-color-option")) {
    const colorsContainer = e.target.closest('.merch-popup-colors');
    if (colorsContainer) {
      colorsContainer.querySelectorAll(".merch-color-option").forEach(b => b.classList.remove("selected"));
      e.target.classList.add("selected");
      
      // Cambiar imágenes para camiseta y sudadera
      if (e.target.dataset.front && e.target.dataset.back) {
        const frontImg = e.target.dataset.front;
        const backImg = e.target.dataset.back;
        
        // Determinar si es camiseta o sudadera
        const isShirt = colorsContainer.id === 'shirt-colors';
        const isHoodie = colorsContainer.id === 'hoodie-colors';
        
        if (isShirt) {
          // Actualizar imagen principal y thumbnails de camiseta
          const mainImg = document.getElementById('main-shirt-img');
          const thumbnails = document.getElementById('shirt-thumbnails');
          
          if (mainImg) {
            mainImg.src = frontImg;
          }
          
          if (thumbnails) {
            const thumbnailImgs = thumbnails.querySelectorAll('.merch-thumbnail');
            if (thumbnailImgs[0]) thumbnailImgs[0].src = frontImg;
            if (thumbnailImgs[1]) thumbnailImgs[1].src = backImg;
          }
        } else if (isHoodie) {
          // Actualizar imagen principal y thumbnails de sudadera
          const mainImg = document.getElementById('main-hoodie-img');
          const thumbnails = document.getElementById('hoodie-thumbnails');
          
          if (mainImg) {
            mainImg.src = frontImg;
          }
          
          if (thumbnails) {
            const thumbnailImgs = thumbnails.querySelectorAll('.merch-thumbnail');
            if (thumbnailImgs[0]) thumbnailImgs[0].src = frontImg;
            if (thumbnailImgs[1]) thumbnailImgs[1].src = backImg;
          }
        }
      }
      
      // Si es la gorra o el llavero, cambiar el modelo 3D
      if (e.target.dataset.model) {
        const modelFile = e.target.dataset.model;
        console.log('Cambiando a modelo:', modelFile);
        
        // Determinar qué producto es basado en el modelo
        if (modelFile.includes('Gorra')) {
          // Recargar el visor 3D de la gorra con el nuevo modelo
          setTimeout(() => {
            initGorra3D(modelFile);
          }, 100);
        } else if (modelFile.includes('LLavero')) {
          // Recargar el visor 3D del llavero con el nuevo modelo
          setTimeout(() => {
            initLlavero3D(modelFile);
          }, 100);
        }
      }
    }
  }
  
  // Miniaturas
  if (e.target.classList.contains("merch-thumbnail")) {
    const thumbnails = e.target.parentElement.querySelectorAll(".merch-thumbnail");
    thumbnails.forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    const popupCol = e.target.closest('.merch-popup-col');
    if (popupCol) {
      const mainImg = popupCol.querySelector('.merch-popup-image');
      if (mainImg) {
        mainImg.src = e.target.src;
      }
    }
  }
  
  // Tallas
  if (e.target.classList.contains("merch-size-option")) {
    const sizesContainer = e.target.closest('.merch-popup-sizes');
    if (sizesContainer) {
      sizesContainer.querySelectorAll(".merch-size-option").forEach(b => b.classList.remove("selected"));
      e.target.classList.add("selected");
    }
  }
});

// Función para el visor 3D de la gorra en la sección principal (sin controles)
function initGorra3DMain() {
  console.log('Iniciando visor 3D de la gorra principal...');
  
  const container = document.getElementById('gorra-3d-viewer-main');
  if (!container) {
    console.error('No se encontró el contenedor gorra-3d-viewer-main');
    return;
  }
  
  console.log('Contenedor de gorra encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor de gorra no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initGorra3DMain(), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor (adaptado al tamaño de la tarjeta)
  container.style.width = '100%';
  container.style.height = '240px'; // Mismo tamaño que las imágenes
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones de gorra forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo artesanal consistente
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1810); // Color artesanal consistente
  
  // Configurar la cámara igual que el popup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3); // Ligeramente elevado y más cerca
  camera.lookAt(0, 0, 0);
  
  // Configurar el renderizador con mejor manejo de transparencia (igual que popup)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Mejorar el renderizado de objetos transparentes
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  // Configurar luces exactamente igual que el popup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Mostrar indicador de carga
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  // Cargar el modelo GLB/GLTF de la gorra
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo: Gorra.glb');
  
  loader.load(
    'Gorra.glb',
    function(gltf) {
      console.log('Modelo de gorra cargado:', gltf);
      console.log('Escena del modelo de gorra:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo exactamente igual que el popup
      const model = gltf.scene;
      
      // Centrar el modelo (igual que popup)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir el modelo para mejor visualización
      model.position.y += 0.4; // Subir la gorra
      
      // Ajustar escala si es necesario (más pequeño para el contenedor)
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Más pequeño que el popup
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales exactamente igual que el popup
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.2;
            node.material.roughness = 0.8;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Iniciar animación de rotación automática (sin controles)
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotación automática constante
        model.rotation.y += 0.008;
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      // Mostrar progreso de carga
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo de gorra:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button-gorra" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button-gorra').addEventListener('click', () => {
        initGorra3DMain();
      });
    }
  );
  
  // Manejar redimensionamiento
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize);
}

// Función para el visor 3D de la taza en la sección principal (sin controles)
function initTaza3DMain() {
  console.log('Iniciando visor 3D de taza principal...');
  
  const container = document.getElementById('taza-3d-viewer-main');
  if (!container) {
    console.error('No se encontró el contenedor taza-3d-viewer-main');
    return;
  }
  
  console.log('Contenedor de taza encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor de taza no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initTaza3DMain(), 100);
    return;
  }
  
  // Limpiar y forzar dimensiones del contenedor
  container.innerHTML = '';
  container.style.width = '100%';
  container.style.height = '240px'; // Mismo tamaño que las imágenes
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones de taza forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo artesanal consistente
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1810); // Color artesanal consistente
  
  // Configurar la cámara para mejor visualización de la taza
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.1, 3); // Más bajo para ver la taza desde un ángulo mejor
  camera.lookAt(0, 0, 0);
  
  // Configurar el renderizador
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  // Configurar luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Cargar el modelo GLB/GLTF de la taza
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo: Taza.glb');
  
  loader.load(
    'Taza.glb',
    function(gltf) {
      console.log('Modelo de taza cargado:', gltf);
      console.log('Escena del modelo de taza:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Configurar el modelo
      const model = gltf.scene;
      
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir el modelo para mejor visualización
      model.position.y += 0.2; // Más arriba (era 0.4, ahora 0.6)
      
      // Rotar el modelo para que se vea de pie (vertical)
      model.rotation.x = (-320 * Math.PI) / 180; // Rotar 90 grados en X para ponerlo de pie
      model.rotation.y = 0; // Sin rotación en Y para mostrar la otra cara
      
      // Centrar horizontalmente (mover un poco a la derecha)
      model.position.x += 0.6; // Mover ligeramente a la derecha
      
      // Ajustar escala si es necesario (más pequeño para el contenedor)
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim; // Más pequeño (era 1.2, ahora 1.0)
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales para mejor visualización
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.8;
            node.material.roughness = 0.2;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Iniciar animación de rotación automática (sin controles)
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotación automática constante en horizontal (eje Y)
        model.rotation.y += 0.008;
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    function(error) {
      console.error('Error al cargar el modelo de taza:', error);
      
      // Mostrar mensaje de error
      container.innerHTML = '<div style="color: #c5a253; text-align: center; padding: 20px; font-family: Inter, sans-serif;">Error al cargar el modelo 3D</div>';
    }
  );
}

// Función para el visor 3D del llavero en la sección principal (sin controles)
function initLlavero3DMain() {
  console.log('Iniciando visor 3D del llavero principal...');
  
  const container = document.getElementById('llavero-3d-viewer-main');
  if (!container) {
    console.error('No se encontró el contenedor llavero-3d-viewer-main');
    return;
  }
  
  console.log('Contenedor de llavero encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor de llavero no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initLlavero3DMain(), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor (adaptado al tamaño de la tarjeta)
  container.style.width = '100%';
  container.style.height = '240px'; // Mismo tamaño que las imágenes
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones de llavero forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo artesanal consistente
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1810); // Color artesanal consistente
  
  // Configurar la cámara igual que el popup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3); // Ligeramente elevado y más cerca
  camera.lookAt(0, 0, 0);
  
  // Configurar el renderizador con mejor manejo de transparencia (igual que popup)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Mejorar el renderizado de objetos transparentes
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  // Configurar luces exactamente igual que el popup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Mostrar indicador de carga
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  // Cargar el modelo GLB/GLTF del llavero
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo: LLavero4.glb');
  
  loader.load(
    'LLavero4.glb',
    function(gltf) {
      console.log('Modelo de llavero cargado:', gltf);
      console.log('Escena del modelo de llavero:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo exactamente igual que el popup
      const model = gltf.scene;
      
      // Centrar el modelo (igual que popup)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir el modelo para mejor visualización
      model.position.y += 0.6; // Más arriba (era 0.4, ahora 0.6)
      
      // Rotar el modelo para que se vea de pie (vertical)
      model.rotation.x = (-320 * Math.PI) / 180; // Rotar 90 grados en X para ponerlo de pie
      model.rotation.y = 0; // Sin rotación en Y para mostrar la otra cara
      
      // Ajustar escala si es necesario (más pequeño para el contenedor)
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.0 / maxDim; // Más pequeño (era 1.2, ahora 1.0)
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales exactamente igual que el popup
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.8; // Más brillante para metal
            node.material.roughness = 0.2; // Más pulido
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Iniciar animación de rotación automática (sin controles)
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotación automática constante del llavero sobre su propio eje
        model.rotation.y += 0.008;
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      // Mostrar progreso de carga
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo de llavero:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button-llavero" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button-llavero').addEventListener('click', () => {
        initLlavero3DMain();
      });
    }
  );
}
function initVaso3DMain() {
  console.log('Iniciando visor 3D principal...');
  
  const container = document.getElementById('vaso-3d-viewer-main');
  if (!container) {
    console.error('No se encontró el contenedor vaso-3d-viewer-main');
    return;
  }
  
  console.log('Contenedor encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initVaso3DMain(), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor (adaptado al tamaño de la tarjeta)
  container.style.width = '100%';
  container.style.height = '240px'; // Mismo tamaño que las imágenes
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo artesanal consistente
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1810); // Color artesanal consistente
  
  // Configurar la cámara igual que el popup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3); // Ligeramente elevado y más cerca
  camera.lookAt(0, 0, 0);
  
  // Configurar el renderizador con mejor manejo de transparencia (igual que popup)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Mejorar el renderizado de objetos transparentes
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  // Configurar luces exactamente igual que el popup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Mostrar indicador de carga
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  // Cargar el modelo GLB/GLTF con la misma configuración que el popup
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo: VASOB.glb');
  
  loader.load(
    'VASOB.glb',
    function(gltf) {
      console.log('Modelo cargado:', gltf);
      console.log('Escena del modelo:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo exactamente igual que el popup
      const model = gltf.scene;
      
      // Centrar el modelo (igual que popup)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir el modelo para mejor visualización
      model.position.y += 0.8; // Subir el vaso
      
      // Ajustar escala si es necesario (más pequeño para el contenedor)
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.3 / maxDim; // Más pequeño que el popup
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales exactamente igual que el popup
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.2;
            node.material.roughness = 0.8;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Iniciar animación de rotación automática (sin controles)
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotación automática constante
        model.rotation.y += 0.008;
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      // Mostrar progreso de carga
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button-main" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button-main').addEventListener('click', () => {
        initVaso3DMain();
      });
    }
  );
  
  // Manejar redimensionamiento
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize);
}

// Inicializar los visores 3D principales cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Esperar un poco para asegurar que el DOM esté completamente cargado
  setTimeout(() => {
    initVaso3DMain();
    initGorra3DMain();
    initTaza3DMain();
    initLlavero3DMain();
  }, 100);
});

// Función para el visor 3D de la gorra en el popup (con controles)
function initGorra3D(modelFile = 'Gorra.glb') {
  console.log('Iniciando visor 3D de la gorra...');
  console.log('THREE disponible:', typeof THREE);
  console.log('GLTFLoader disponible:', typeof THREE.GLTFLoader);
  console.log('Modelo a cargar:', modelFile);
  
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('GLTFLoader no está disponible');
    return;
  }
  
  const container = document.getElementById('gorra-3d-viewer');
  if (!container) {
    console.error('No se encontró el contenedor gorra-3d-viewer');
    return;
  }
  
  console.log('Contenedor de gorra encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  console.log('Estilos del contenedor:', container.style.cssText);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor de gorra no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initGorra3D(modelFile), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor
  container.style.width = '320px';
  container.style.height = '320px';
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones de gorra forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo negro como el popup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x141312); // Fondo negro como el popup
  
  // Configurar la cámara para ver la gorra de frente
  const camera = new THREE.PerspectiveCamera(
    55, // FOV más pequeño para perspectiva más alejada
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(1, 1, 13); // Posición inicial
  camera.lookAt(0, 0, 0);
  
  // Rotar la cámara para ver la gorra de frente (mostrar la visera)
  camera.position.x = 2; // Mover a la derecha
  camera.position.z = 2; // Mover hacia adelante
  camera.lookAt(0, 1, 0); // Mirar al centro de la gorra (elevado)
  
  // Configurar el renderizador con mejor manejo de transparencia
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Mejorar el renderizado de objetos transparentes
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  console.log('Renderizador de gorra creado y añadido al contenedor');
  
  // Configurar controles con zoom y minimizado desactivados
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Movimiento suave
  controls.dampingFactor = 0.05;
  controls.enableZoom = false; // Desactivar zoom
  controls.minDistance = 2; // Distancia mínima
  controls.maxDistance = 4; // Distancia máxima
  controls.enablePan = false; // Desactivar minimizar/pan
  controls.autoRotate = false; // Sin rotación automática
  controls.enableKeys = false; // Desactivar teclas
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE, // Solo rotar con botón izquierdo
    MIDDLE: THREE.MOUSE.DOLLY, // Desactivado
    RIGHT: THREE.MOUSE.ROTATE // Rotar con botón derecho también
  };
  
  // Configurar luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Mostrar indicador de carga
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  // Cargar el modelo GLB/GLTF de la gorra
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo de gorra:', modelFile);
  
  loader.load(
    modelFile,
    function(gltf) {
      console.log('Modelo de gorra cargado:', gltf);
      console.log('Escena del modelo de gorra:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo
      const model = gltf.scene;
      
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Rotar el modelo -60 grados horizontalmente para que la visera quede hacia adelante
      model.rotation.y = (-80 * Math.PI) / 180; // -60 grados en radianes
      
      // Subir el modelo para mejor visualización
      model.position.y += 0.4; // Subir la gorra
      
      // Ajustar escala si es necesario
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Escala para el popup
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.2;
            node.material.roughness = 0.8;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Iniciar animación con controles
      function animate() {
        requestAnimationFrame(animate);
        
        // Actualizar controles
        controls.update();
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      // Mostrar progreso de carga
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo de gorra:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button-gorra-popup" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button-gorra-popup').addEventListener('click', () => {
        initGorra3D(modelFile);
      });
    }
  );
}

// Función para el visor 3D de la taza en el popup (con controles)
function initTaza3D() {
  console.log('Iniciando visor 3D de la taza...');
  console.log('THREE disponible:', typeof THREE);
  console.log('GLTFLoader disponible:', typeof THREE.GLTFLoader);
  
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('GLTFLoader no está disponible');
    return;
  }
  
  const container = document.getElementById('taza-3d-viewer');
  if (!container) {
    console.error('No se encontró el contenedor taza-3d-viewer');
    return;
  }
  
  console.log('Contenedor encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  console.log('Estilos del contenedor:', container.style.cssText);
  
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initTaza3D(), 100);
    return;
  }
  
  container.innerHTML = '';
  container.style.width = '320px';
  container.style.height = '320px';
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312';
  
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.style.fontSize = '16px';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x141312);
  
  // Configurar la cámara para ver la taza de frente con mejor ángulo
  const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.1, 3); // Más bajo como en la página principal
  camera.lookAt(0, 0, 0);
  
  // Rotar la cámara para ver la taza de frente
  camera.position.x = 0; // Centrado
  camera.position.z = 3; // Distancia adecuada
  camera.lookAt(0, 0, 0); // Mirar al centro de la taza
  
  // Configurar el renderizador
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Configurar OrbitControls para la taza
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = false;
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI / 2;
  
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo:', 'Taza.glb');
  
  loader.load(
    'Taza.glb',
    function(gltf) {
      console.log('✅ Modelo de taza cargado exitosamente:', gltf);
      console.log('Escena del modelo:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo
      const model = gltf.scene;
      
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir el modelo para mejor visualización de la taza (igual que página principal)
      model.position.y += 0.2; // Igual que en la página principal
      model.position.x += 0.6; // Igual que en la página principal
      
      // Ajustar escala si es necesario - misma escala que página principal
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim; // Igual que en la página principal
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.8;
            node.material.roughness = 0.2;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      
      // Animación con controles
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo de taza:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button-taza" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button-taza').addEventListener('click', () => {
        initTaza3D();
      });
    }
  );
}

// Función para el visor 3D del llavero en el popup (con controles)
function initLlavero3D(modelFile = 'LLavero4.glb') {
  console.log('=== INICIANDO VISOR 3D DEL LLAVERO ===');
  console.log('Modelo a cargar:', modelFile);
  console.log('THREE disponible:', typeof THREE);
  console.log('GLTFLoader disponible:', typeof THREE.GLTFLoader);
  
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('ERROR: GLTFLoader no está disponible');
    return;
  }
  
  const container = document.getElementById('llavero-3d-viewer');
  console.log('Container encontrado:', container);
  
  if (!container) {
    console.error('ERROR: No se encontró el contenedor llavero-3d-viewer');
    return;
  }
  
  console.log('Container dimensions:', container.clientWidth, 'x', container.clientHeight);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('Container sin dimensiones, reintentando en 100ms...');
    setTimeout(() => initLlavero3D(modelFile), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor
  container.style.width = '320px';
  container.style.height = '320px';
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312';
  
  console.log('Dimensiones forzadas:', container.style.width, 'x', container.style.height);
  
  // Mostrar indicador de carga inmediato
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.textContent = 'Iniciando visor 3D...';
  container.appendChild(loadingText);
  
  // Configurar la escena con fondo negro como el popup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x141312);
  
  // Configurar la cámara para ver el llavero de frente
  const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(10, 2, 29); // Más alejado (era 13)
  camera.lookAt(0, 0, 0);
  
  // Rotar la cámara para ver el llavero de frente
  camera.position.x = 3; // Más a la derecha y alejado (era 2)
  camera.position.z = 5; // Más alejado (era 2)
  camera.lookAt(0.9, 0.9, 0); // Mirar al centro del llavero (ajustado a nueva posición)
  
  // Configurar el renderizador
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  
  console.log('Renderizador creado y añadido');
  
  // Configurar controles
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.minDistance = 2;
  controls.maxDistance = 4;
  controls.enablePan = false;
  controls.autoRotate = false;
  controls.enableKeys = false;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };
  
  // Configurar luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  console.log('Escena configurada, iniciando carga del modelo...');
  
  // Actualizar texto de carga
  loadingText.textContent = 'Cargando modelo 3D...';
  
  // Cargar el modelo GLB/GLTF del llavero
  const loader = new THREE.GLTFLoader();
  console.log('Cargando modelo:', modelFile);
  
  loader.load(
    modelFile,
    function(gltf) {
      console.log('✅ Modelo cargado exitosamente:', gltf);
      console.log('Escena del modelo:', gltf.scene);
      console.log('Número de hijos:', gltf.scene.children.length);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Configurar el modelo
      const model = gltf.scene;
      
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      // Subir y mover a la derecha el modelo para mejor visualización del llavero
      model.position.y += 0.8; // Más elevación para el llavero
      model.position.x += 0.9; // Mover a la derecha
      
      // Ajustar escala si es necesario - llavero necesita ser más grande
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Escala mayor para el llavero (era 2)
      model.scale.multiplyScalar(scale);
      
      // Ajustar materiales
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            node.material.metalness = 0.8;
            node.material.roughness = 0.2;
            node.material.envMapIntensity = 1;
            
            if (node.material.map) {
              node.material.map.encoding = THREE.sRGBEncoding;
            }
            
            node.material.side = THREE.DoubleSide;
          }
        }
      });
      
      scene.add(model);
      console.log('Modelo añadido a la escena');
      
      // Iniciar animación con controles
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      
      animate();
      console.log('✅ Animación iniciada');
    },
    function(xhr) {
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      console.log(`📊 Progreso de carga: ${percentLoaded}%`);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('❌ Error al cargar el modelo:', error);
      console.error('Error details:', error.message || error);
      loadingText.innerHTML = `
        <div style="color:#ff6b6b; text-align:center;">
          ❌ Error al cargar el modelo 3D<br>
          <small>Archivo: ${modelFile}</small><br>
          <button id="retry-button-llavero-popup" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">
            Reintentar
          </button>
        </div>
      `;
      document.getElementById('retry-button-llavero-popup').addEventListener('click', () => {
        console.log('🔄 Reintentando carga...');
        initLlavero3D(modelFile);
      });
    }
  );
}

// Función para el visor 3D del vaso de whisky
function initVaso3D() {
  console.log('Iniciando visor 3D...');
  console.log('THREE disponible:', typeof THREE);
  console.log('GLTFLoader disponible:', typeof THREE.GLTFLoader);
  
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('GLTFLoader no está disponible');
    return;
  }
  
  const container = document.getElementById('vaso-3d-viewer');
  if (!container) {
    console.error('No se encontró el contenedor vaso-3d-viewer');
    return;
  }
  
  console.log('Contenedor encontrado:', container);
  console.log('Dimensiones del contenedor:', container.clientWidth, 'x', container.clientHeight);
  console.log('Estilos del contenedor:', container.style.cssText);
  
  // Si el contenedor no tiene dimensiones, esperar un poco y reintentar
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.log('El contenedor no tiene dimensiones, reintentando en 100ms...');
    setTimeout(() => initVaso3D(), 100);
    return;
  }
  
  // Limpiar el container por si acaso
  container.innerHTML = '';
  
  // Forzar dimensiones del contenedor
  container.style.width = '320px';
  container.style.height = '320px';
  container.style.display = 'block';
  container.style.position = 'relative';
  container.style.background = '#141312'; // Mismo color que los demás popups
  
  console.log('Dimensiones forzadas:', container.style.width, 'x', container.style.height);
  
  // Configurar la escena con fondo blanco como tu referencia
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x141312); // Fondo blanco puro
  
  // Configurar la cámara
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3); // Ligeramente elevado y más cerca
  camera.lookAt(0, 0, 0);
  
  // Configurar el renderizador con mejor manejo de transparencia
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Mejorar el renderizado de objetos transparentes
  renderer.sortObjects = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);
  
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '10';
  console.log('Renderizador creado y añadido al contenedor');
  
  // Configurar controles con zoom y minimizado desactivados
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Movimiento suave
  controls.dampingFactor = 0.05;
  controls.enableZoom = false; // Desactivar zoom
  controls.minDistance = 2; // Distancia mínima
  controls.maxDistance = 4; // Distancia máxima
  controls.enablePan = false; // Desactivar minimizar/pan
  controls.autoRotate = false; // Sin rotación automática
  controls.enableKeys = false; // Desactivar teclas
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE, // Solo rotar con botón izquierdo
    MIDDLE: THREE.MOUSE.DOLLY, // Desactivado
    RIGHT: THREE.MOUSE.ROTATE // Rotar con botón derecho también
  };

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Luz ambiental alta para fondo blanco
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Luz principal suave
  directionalLight.position.set(3, 5, 3);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3); // Luz de relleno muy suave
  fillLight.position.set(-3, 2, -3);
  scene.add(fillLight);
  
  // Luz puntual suave desde arriba
  const topLight = new THREE.PointLight(0xffffff, 0.4, 8);
  topLight.position.set(0, 6, 0);
  scene.add(topLight);
  
  // Mostrar indicador de carga
  const loadingText = document.createElement('div');
  loadingText.style.position = 'absolute';
  loadingText.style.top = '50%';
  loadingText.style.left = '0';
  loadingText.style.width = '100%';
  loadingText.style.textAlign = 'center';
  loadingText.style.color = '#c5a253';
  loadingText.style.transform = 'translateY(-50%)';
  loadingText.style.fontFamily = 'Inter, sans-serif';
  loadingText.style.fontSize = '16px';
  loadingText.textContent = 'Cargando modelo 3D...';
  container.appendChild(loadingText);
  
  // Añadir un objeto de prueba para verificar que el visor funciona
  const testGeometry = new THREE.BoxGeometry(1, 1, 1);
  const testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const testCube = new THREE.Mesh(testGeometry, testMaterial);
  scene.add(testCube);
  
  // Cargar el modelo GLB/GLTF
  const loader = new THREE.GLTFLoader();
  loader.load(
    'VASOB.glb',
    function(gltf) {
      console.log('Modelo cargado:', gltf);
      console.log('Escena del modelo:', gltf.scene);
      
      // Ocultar indicador de carga
      if (loadingText.parentNode) {
        container.removeChild(loadingText);
      }
      
      // Añadir mensaje de estado
      if (gltf.scene.children.length === 0) {
        const statusText = document.createElement('div');
        statusText.style.position = 'absolute';
        statusText.style.bottom = '10px';
        statusText.style.left = '0';
        statusText.style.width = '100%';
        statusText.style.textAlign = 'center';
        statusText.style.color = '#c5a253';
        statusText.style.fontSize = '12px';
        statusText.textContent = 'Modelo VASOB.glb está vacío - Mostrando cubo de prueba';
        container.appendChild(statusText);
      }
      
      // Quitar el cubo de prueba solo si el modelo tiene contenido
      if (gltf.scene.children.length > 0) {
        scene.remove(testCube);
        console.log('Modelo tiene contenido, quitando cubo de prueba');
      } else {
        console.log('El modelo está vacío, manteniendo el cubo de prueba visible');
        // Hacer el cubo más grande y visible
        testCube.scale.set(2, 2, 2);
      }
      
      // Configurar el modelo
      const model = gltf.scene;
      
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // Centrar el modelo
      
      // Ajustar escala si es necesario
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.2 / maxDim; // Escala más precisa para el tamaño del vaso
      model.scale.multiplyScalar(scale);
      
      // Ajustar posición vertical para centrar el vaso
      model.position.y = -size.y * scale / 2; // Bajar un poco para centrar la base
      
      console.log('Tamaño del modelo:', size);
      console.log('Escala aplicada:', scale);
      
      // Ajustar materiales - cristal transparente, líquido más visible
      let meshIndex = 0;
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          if (node.material) {
            // Guardar propiedades importantes del material original
            const originalColor = node.material.color ? node.material.color.clone() : new THREE.Color(0x8F8F8F);
            const originalMap = node.material.map;
            const originalAlphaMap = node.material.alphaMap;
            const originalNormalMap = node.material.normalMap;
            
            console.log('Mesh detectado:', {
              index: meshIndex,
              color: originalColor ? originalColor.getHex().toString(16) : 'sin color',
              hasMap: !!originalMap,
              position: node.position
            });
            
            // El segundo mesh (índice 1) es el líquido interior
            const isLiquid = meshIndex === 1;
            
            if (isLiquid) {
              // Líquido interior - más visible y con propiedades para verse a través del cristal
              node.material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0.8, // Más visible para que se vea a través del cristal
                metalness: 0.15, // Un poco más de brillo
                roughness: 0.15, // Menos rugoso para más transparencia
                side: THREE.DoubleSide,
                color: originalColor, // Mantener color original
                map: originalMap, // Mantener textura si existe
                alphaMap: originalAlphaMap, // Mantener transparencias si existen
                normalMap: originalNormalMap, // Mantener detalles de superficie
                envMapIntensity: 1.0 // Reflejos moderados
              });
              console.log('Mesh', meshIndex, 'configurado como líquido');
            } else {
              // Cristal exterior - más opaco pero aún transparente
              node.material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0.15, // Más opaco para que el vaso sea más visible
                metalness: 0.02, // Casi sin metal
                roughness: 0.05, // Muy pulido
                side: THREE.DoubleSide,
                color: new THREE.Color(0x8F8F8F), // Gris cristalino
                map: originalMap, // Mantener textura si existe
                alphaMap: originalAlphaMap, // Mantener transparencias si existen
                normalMap: originalNormalMap, // Mantener detalles de superficie
                envMapIntensity: 0.8 // Reflejos normales
              });
              console.log('Mesh', meshIndex, 'configurado como cristal');
            }
            
            meshIndex++;
          }
        }
      });
      
      scene.add(model);
      console.log('Modelo añadido a la escena');
      console.log('Total de objetos en escena:', scene.children.length);
      console.log('Posición de la cámara:', camera.position);
      
      // Iniciar animación
      function animate() {
        requestAnimationFrame(animate);
        
        // Actualizar controles de cámara
        controls.update();
        
        // Sin rotación automática - control manual del usuario
        
        renderer.render(scene, camera);
      }
      
      animate();
    },
    function(xhr) {
      // Mostrar progreso de carga
      const percentLoaded = Math.round((xhr.loaded / (xhr.total || 1)) * 100);
      loadingText.textContent = `Cargando modelo 3D... ${percentLoaded}%`;
    },
    function(error) {
      console.error('Error al cargar el modelo:', error);
      console.log('Error completo:', error);
      loadingText.innerHTML = 'Error al cargar el modelo 3D. <button id="retry-button" style="margin-top:10px; padding:8px 16px; background:#c5a253; color:#1b1a17; border:none; border-radius:4px; cursor:pointer;">Reintentar</button>';
      loadingText.style.color = '#ff6b6b';
      document.getElementById('retry-button').addEventListener('click', () => {
        initVaso3D();
      });
    }
  );
  
  // Manejar redimensionamiento
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize);
}
