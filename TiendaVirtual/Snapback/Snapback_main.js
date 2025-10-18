// CARRITO
let iconCarrito = document.querySelector('#iconCarrito');
let carrito = document.querySelector('.carrito');
let cerrarCarrito = document.querySelector('#cerrarCarrito');

// Abrir carrito
iconCarrito.addEventListener('click', () => carrito.classList.toggle('mostrar'));

// Cerrar carrito
cerrarCarrito.addEventListener('click', () => carrito.classList.remove('mostrar'));

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Quitar productos existentes
    let quitarProductos = document.getElementsByClassName('iconRemover');
    for (let i = 0; i < quitarProductos.length; i++) {
        quitarProductos[i].addEventListener('click', quitarDeCarrito);
    }

    // Cambiar cantidad
    let cantidadInputs = document.getElementsByClassName('cantidad');
    for (let i = 0; i < cantidadInputs.length; i++) {
        cantidadInputs[i].addEventListener('change', cambiarCantidad);
    }

    // Botón agregar al carrito
    let agregarCarrito = document.getElementsByClassName('btnCarrito');
    for (let i = 0; i < agregarCarrito.length; i++) {
        agregarCarrito[i].addEventListener('click', agregarProducto);
    }

    // Inicializar total
    actualizarTotal();
}

// Quitar producto del carrito
function quitarDeCarrito(event) {
    event.target.closest('.cart-box').remove();
    actualizarTotal();
}

// Cambiar cantidad
function cambiarCantidad(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) input.value = 1;
    actualizarTotal();
}

// Agregar producto al carrito
function agregarProducto(event) {
    let button = event.target;
    let item = button.closest('.item'); // sube al contenedor del producto

    let titulo = item.querySelector('h2').innerText;
    let precio = item.querySelector('.price').innerText;
    let imagen = item.querySelector('.productoImagen').src;

    agregarProductoCarrito(titulo, precio, imagen);
    actualizarTotal();
}

// Crear elemento en el carrito
function agregarProductoCarrito(titulo, precio, imagen) {
    let cartItems = document.getElementsByClassName('contenidoCarrito')[0];
    let cartBoxNames = cartItems.getElementsByClassName('producto');

    // Evitar duplicados
    for (let i = 0; i < cartBoxNames.length; i++) {
        if (cartBoxNames[i].innerText === titulo) {
            alert('Este producto ya está en el carrito');
            return;
        }
    }

    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    cartShopBox.innerHTML = `
        <img src="${imagen}" alt="" class="productoImagen">
        <div class="detail-box">
            <div class="producto">${titulo}</div>
            <div class="precio">${precio}</div>
            <input type="number" value="1" class="cantidad">
        </div>
        <i class="fa-solid fa-trash iconRemover"></i>
    `;

    cartItems.append(cartShopBox);

    // Agregar eventos al nuevo producto
    cartShopBox.getElementsByClassName('iconRemover')[0].addEventListener('click', quitarDeCarrito);
    cartShopBox.getElementsByClassName('cantidad')[0].addEventListener('change', cambiarCantidad);
}

// Actualizar total
function actualizarTotal() {
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let precioElemento = cartBox.getElementsByClassName('precio')[0];
        let cantidadElemento = cartBox.getElementsByClassName('cantidad')[0];

        let precio = parseFloat(precioElemento.innerText.replace("$", "").replace(",", ""));
        let cantidad = parseInt(cantidadElemento.value);

        total += precio * cantidad;
    }

    document.getElementsByClassName('precioTotal')[0].innerText =
        "$" + total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
