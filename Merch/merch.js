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
            <img src="fotos/camiseta atras1.png" class="merch-thumbnail" data-index="1" alt="Vista atrás"/>
          </div>
          <div class="merch-popup-colors" id="shirt-colors">
            <button class="merch-color-option merch-color-black selected" data-color="black" aria-label="Negro"></button>
            <button class="merch-color-option merch-color-white" data-color="white" aria-label="Blanco"></button>
            <button class="merch-color-option merch-color-red" data-color="red" aria-label="Rojo"></button>
            <button class="merch-color-option merch-color-blue" data-color="blue" aria-label="Azul"></button>
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
            <img src="fotos/sudaA1.png" class="merch-thumbnail" data-index="1" alt="Vista delantera"/>
          </div>
          <div class="merch-popup-colors" id="hoodie-colors">
            <button class="merch-color-option merch-color-black selected" data-color="black" aria-label="Negro"></button>
            <button class="merch-color-option merch-color-grey" data-color="grey" aria-label="Gris"></button>
            <button class="merch-color-option merch-color-green" data-color="green" aria-label="Verde"></button>
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
      <img src="merch4.jpg" alt="Gorra Premium" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Gorra Premium</h2>
      <p style="color:#6c6c6c;">Gorra negra ajustable, logo dorado Mystic Barrel centrado.</p>
      <div class="quantity-selector">
        <span class="quantity-label">Cantidad:</span>
        <button class="quantity-btn" onclick="decreaseQuantity('gorra')">-</button>
        <span class="quantity-value" id="quantity-gorra">1</span>
        <button class="quantity-btn" onclick="increaseQuantity('gorra')">+</button>
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
  llavero: {
    html: `
      <img src="merch6.jpg" alt="Llavero Limited" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Llavero Limited</h2>
      <p style="color:#6c6c6c;">Llavero metálico con logo Mystic Barrel grabado.</p>
      <div class="quantity-selector">
        <span class="quantity-label">Cantidad:</span>
        <button class="quantity-btn" onclick="decreaseQuantity('llavero')">-</button>
        <span class="quantity-value" id="quantity-llavero">1</span>
        <button class="quantity-btn" onclick="increaseQuantity('llavero')">+</button>
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
    copa: 9.95
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
    copa: 9.95
  };
  const basePrice = prices[product];
  const totalPrice = (basePrice * quantity).toFixed(2);
  
  // Obtener información del producto
  const productInfo = {
    camiseta: { name: 'Camiseta Vintage', price: 25 },
    sudadera: { name: 'Sudadera Classic', price: 40 },
    copa: { name: 'Vaso de Whisky Mystic Barrel', price: 9.95 }
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
      
      // Solo carga el visor FBX si es el vaso
      if (key === "copa") {
        setTimeout(() => { initVaso3D(); }, 100);
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
    const color = e.target.dataset.color;
    const colorContainer = e.target.closest('.merch-popup-colors');
    if (colorContainer) {
      colorContainer.querySelectorAll(".merch-color-option").forEach(b => b.classList.remove("selected"));
      e.target.classList.add("selected");
      const isShirt = colorContainer.id === 'shirt-colors';
      const productType = isShirt ? 'camiseta' : 'sudadera';
      const mainImgId = isShirt ? 'main-shirt-img' : 'main-hoodie-img';
      const thumbnailsId = isShirt ? 'shirt-thumbnails' : 'hoodie-thumbnails';
      const mainImg = document.getElementById(mainImgId);
      const thumbnailsContainer = document.getElementById(thumbnailsId);
      if (productImages[productType] && productImages[productType][color]) {
        const images = productImages[productType][color];
        mainImg.src = images[0];
        thumbnailsContainer.innerHTML = images.map((img, index) =>
          `<img src="${img}" class="merch-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}" alt="Vista ${index === 0 ? 'delantera' : 'trasera'}"/>`
        ).join('');
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
