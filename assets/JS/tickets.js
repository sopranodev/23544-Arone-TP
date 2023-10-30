// Seteo las variables
const valorTicket = 200;

//Selección de las card en el input de categoría

let estudiante = document.querySelector('.estudiante');
let trainee = document.querySelector('.trainee');
let junior = document.querySelector('.junior'); 

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");

let cantidad = document.getElementById("cantidad");
let categoria = document.getElementById("categoria");

let btnResumen = document.getElementById("btnResumen");
let btnBorrar = document.getElementById("btnBorrar");
let totalPago = document.getElementById("totalPago");
let totalCantidad = document.getElementById("totalCantidad");

//Selección de Card y que se muestra en el select
estudiante.addEventListener('click', function() {
    categoria.value = 'estudiante';
});

trainee.addEventListener('click', function() {
    categoria.value = 'trainee';
});

junior.addEventListener('click', function() {
    categoria.value = 'junior';
});

btnResumen.addEventListener('click', function(e) {
    e.preventDefault();
    let calcular;
    if (categoria.value == 'estudiante') {
        calcular = valorTicket * 0.2 * cantidad.value;
        totalPago.innerHTML = `${calcular}`;
        totalCantidad.innerHTML = `(${cantidad.value} ticket/s categoría ${categoria.value}: $${valorTicket*0.2} c/u)`;
    } else if (categoria.value == 'trainee') {
        calcular = valorTicket * 0.5 * cantidad.value;
        totalPago.innerHTML = `${calcular}`;
        totalCantidad.innerHTML = `(${cantidad.value} ticket/s categoría ${categoria.value}: $${valorTicket*0.5} c/u)`;
    } else if (categoria.value == 'junior') {
        calcular = valorTicket * 0.85 * cantidad.value;
        totalPago.innerHTML = `${calcular}`;
        totalCantidad.innerHTML = `(${cantidad.value} ticket/s categoría ${categoria.value}: $${valorTicket*0.85} c/u)`;
    }
})

btnBorrar.addEventListener('click', function(e) {
    e.preventDefault();
    totalPago.innerHTML = '';
    cantidad.innerHTML = '';
    totalCantidad.innerHTML = '';
}) 

