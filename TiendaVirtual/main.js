// CARRITO
let iconCarrito = document.querySelector('#iconCarrito');
let carrito = document.querySelector('.carrito');
let cerrarCarrito = document.querySelector('#cerrarCarrito');

// Abrir carrito
iconCarrito.addEventListener('click', function () {
    carrito.classList.toggle('mostrar');
});

// Cerrar carrito
cerrarCarrito.addEventListener('click', function () {
    carrito.classList.remove('mostrar');
});

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

// Función quitar producto
function quitarDeCarrito(event) {
    let boton = event.target;
    boton.parentElement.remove();
    actualizarTotal();
}

// Función cambiar cantidad
function cambiarCantidad(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    actualizarTotal();
}

// Función agregar producto
function agregarProducto(event) {
    let button = event.target;
    let oferta = button.parentElement;

    let titulo = oferta.getElementsByClassName('producto')[0].innerText;
    let precio = oferta.getElementsByClassName('precio')[0].innerText;
    let imagen = oferta.getElementsByClassName('productoImagen')[0].src;

    agregarProductoCarrito(titulo, precio, imagen);
    actualizarTotal();
}

// Función que agrega el producto al carrito
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

    // Crear contenedor del producto
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    let cartBoxContent = `
        <img src="${imagen}" alt="" class="productoImagen">
        <div class="detail-box">
            <div class="producto">${titulo}</div>
            <div class="precio">${precio}</div>
            <input type="number" value="1" class="cantidad">
        </div>
        <i class="fa-solid fa-trash iconRemover"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Agregar eventos al nuevo producto
    cartShopBox.getElementsByClassName('iconRemover')[0].addEventListener('click', quitarDeCarrito);
    cartShopBox.getElementsByClassName('cantidad')[0].addEventListener('change', cambiarCantidad);
}

// Función actualizar total
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

    document.getElementsByClassName('precioTotal')[0].innerText = "$" + total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}


/*
//CARRITO
let iconCarrito = document.querySelector('#iconCarrito');
let carrito = document.querySelector('.carrito');
let cerrarCarrito = document.querySelector('#cerrarCarrito');


//Abrir carrito
iconCarrito.addEventListener('click', function () {
    carrito.classList.toggle('mostrar');
});
//Cerrar carrito
cerrarCarrito.addEventListener('click', function () {
    carrito.classList.remove('mostrar');
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //Quitar productos del carrito
    let quitarProductos = document.getElementsByClassName('iconRemover');
    console.log(quitarProductos);
    for (let i = 0; i < quitarProductos.length; i++) {
        let quitar = quitarProductos[i];
        quitar.addEventListener('click', quitarDeCarrito)
    }

    //Contador de cambios
    let contadorInputs = document.getElementsByClassName('cantidad');
    for (let i = 0; i < contadorInputs.length; i++) {
        let input = contadorInputs[i];
        input.addEventListener("change", contadorCambios);
    }
    //Agregar al carrito
    let agregarCarrito = document.getElementsByClassName('btnCarrito');
    for (let i = 0; i < agregarCarrito.length; i++) {
        agregarCarrito[i].addEventListener("click", agregarProductoCarrito);
    }
}

function quitarDeCarrito(event) {
    let Hazclick = event.target;
    Hazclick.parentElement.remove();
    actualizarTotal();
}

//Contador de cambios
function contadorCambios(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    actualizarTotal();
}

//Agregar Producto
function agregarProductoCarrito(producto, precio, imagenProducto) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    let cartItems = document.getElementsByClassName('contenidoCarrito')[0];

    let cartBoxContent = `
        <img src="${imagen}" alt="" class="productoImagen">
        <div class="detail-box">
            <div class="producto">${producto}</div>
            <div class="precio">${precio}</div>
            <input type="number" value='1' class="cantidad">
        </div>
        <i class="fa-solid fa-trash iconRemover"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Agregar eventos al nuevo producto
    cartShopBox.getElementsByClassName('iconRemover')[0].addEventListener('click', quitarDeCarrito);
    cartShopBox.getElementsByClassName('cantidad')[0].addEventListener('change', contadorCambios);
}


//Actualizar Total
function actualizarTotal() {
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let precioElemento = cartBox.getElementsByClassName('precio')[0];
        let contador = cartBox.getElementsByClassName('cantidad')[0];

        let precio = parseFloat(precioElemento.innerText.replace("$", ""));
        let cantidad = parseInt(contador.value);

        total += precio * cantidad;
    }

    document.getElementsByClassName('precioTotal')[0].innerText = "$" + total.toFixed(2);
}*/
