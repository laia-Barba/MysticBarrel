// Define las imágenes por color para cada producto
const productImages = {
  camiseta: {
    black: ['fotos/Camiseta delante1.png', 'fotos/camiseta atras1.png'],  // Negro: adelante, atrás
    white: ['fotos/camiseta delante2.png', 'fotos/camiseta atras2.png'],  // Blanco: adelante, atrás
    red: ['fotos/camiseta delante3.png', 'fotos/camiseta atras3.png'],    // Rojo: adelante, atrás
    blue: ['fotos/camiseta delante4.png', 'fotos/camiseta atras4.png']    // Azul: adelante, atrás
  },
  sudadera: {
    black: ['fotos/sudaD1.png', 'fotos/sudaA1.png'],  // Negro: atrás, adelante
    grey: ['fotos/sudaD2.png', 'fotos/sudaA2.png'],   // Gris: atrás, adelante
    green: ['fotos/sudaD3.png', 'fotos/sudaA3.png']   // Verde: atrás, adelante
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
      <img src="merch3.jpg" alt="Copa de Whisky" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Copa de Whisky</h2>
      <p style="color:#6c6c6c;">Cristal templado, grabado Mystic Barrel. Diseño exclusivo.</p>
    `
  },
  gorra: {
    html: `
      <img src="merch4.jpg" alt="Gorra Premium" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Gorra Premium</h2>
      <p style="color:#6c6c6c;">Gorra negra ajustable, logo dorado Mystic Barrel centrado.</p>
    `
  },
  botella: {
    html: `
      <img src="merch5.jpg" alt="Botella Colección" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Botella Colección</h2>
      <p style="color:#6c6c6c;">Botella exclusiva con logo y numeración original Mystic Barrel.</p>
    `
  },
  llavero: {
    html: `
      <img src="merch6.jpg" alt="Llavero Limited" style="height:200px;margin-bottom:18px;">
      <h2 style="font-family:'Playfair Display';color:#2b2b2b;margin-bottom:8px;">Llavero Limited</h2>
      <p style="color:#6c6c6c;">Llavero metálico con logo Mystic Barrel grabado.</p>
    `
  }
};

// Mostrar popup merch
document.querySelectorAll('.merch-card').forEach(card => {
  card.addEventListener('click', function () {
    const key = card.getAttribute('data-popup');
    const overlay = document.getElementById('merch-popup-overlay');
    const content = document.getElementById('merch-popup-content');
    if (popups[key]) {
      content.innerHTML = popups[key].html;
      overlay.classList.add('active');
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
  // Colores para camisetas
  if (e.target.classList.contains("merch-color-option")) {
    const color = e.target.dataset.color;
    const colorContainer = e.target.closest('.merch-popup-colors');
    
    if (colorContainer) {
      // Actualizar estado visual del botón de color
      colorContainer.querySelectorAll(".merch-color-option").forEach(b => b.classList.remove("selected"));
      e.target.classList.add("selected");
      
      // Determinar si es camiseta o sudadera
      const isShirt = colorContainer.id === 'shirt-colors';
      const productType = isShirt ? 'camiseta' : 'sudadera';
      const mainImgId = isShirt ? 'main-shirt-img' : 'main-hoodie-img';
      const thumbnailsId = isShirt ? 'shirt-thumbnails' : 'hoodie-thumbnails';
      
      const mainImg = document.getElementById(mainImgId);
      const thumbnailsContainer = document.getElementById(thumbnailsId);
      
      if (productImages[productType] && productImages[productType][color]) {
        const images = productImages[productType][color];
        
        // Actualizar imagen principal
        mainImg.src = images[0];
        
        // Actualizar miniaturas
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
    
    // Cambiar imagen principal correspondiente (camiseta o sudadera)
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
