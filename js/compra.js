const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });


}

function procesarCompra(e) {
     e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2000,
            showConfirmButton: false
            
        }).then(function () {
            window.location = "catalago.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese Nombre del Cliente y Correo',
            timer: 2000,
            showConfirmButton: false
            
        })
    }
    else {
        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        enviado.src = '/img/mail.gif';
        enviado.style.display = 'block';
        enviado.width = '150';

            setTimeout(() => {
                cargandoGif.style.display = 'none';
                document.querySelector('#loaders').appendChild(enviado);

                setTimeout(() => {
                    compra.vaciarLocalStorage();
                    enviado.remove();
                    window.location = "catalago.html";
                }, 2000);
            }, 300);
    }
}

