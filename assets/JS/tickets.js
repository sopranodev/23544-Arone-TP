// Código realizado por CGA 
// Seteo las variables
const valorTicket = 200;

//Selección de las card en el input de categoría
const cardEstudiante = document.getElementById('cardEstudiante');
const cardTrainee = document.getElementById('cardTrainee');
const cardJunior = document.getElementById('cardJunior');

//Valores que toman cantidad y categoría
const cantidadInput = document.getElementById("cantidad");
const categoriaSelect = document.getElementById("categoria");

//Valores que toman botones y totales
const btnResumen = document.getElementById("btnResumen");
const btnBorrar = document.getElementById("btnBorrar");
const totalPago = document.getElementById("totalPago");
const totalCantidad = document.getElementById("totalCantidad");


document.getElementById("comprar_tickets").addEventListener("submit", function (event) {
    event.preventDefault();
    if (formularioCompleto()) {
        const categoria = categoriaSelect.value;
        const cantidad = parseFloat(cantidadInput.value);
        let descuento = 0;
    
        if (categoria === 'estudiante') {
            descuento = 0.8;
        } else if (categoria === 'trainee') {
            descuento = 0.5;
        } else if (categoria === 'junior') {
            descuento = 0.15;
        }
    
        const total = cantidad * valorTicket * (1 - descuento);
        const entrada = valorTicket * (1 - descuento);
        totalPago.textContent = total > 0 ? `${total.toFixed(0)}` : 'Total a pagar: $';
        totalCantidad.textContent = entrada > 0 ? `(${cantidad.toFixed(0)} ticket/s categoría ${categoria}: $${entrada.toFixed(0)} c/u)` : "";
    }
});

//Función para remover los invalid de los inputs
function removeClassError() {
    let inputs = document.querySelectorAll(".form-control, .form-select");
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-invalid");
    }
}

function formularioCompleto() {
    removeClassError();
    if(nombre.value === ""){
        alert("Por favor, escriba su nombre");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return false;
    }
    if(apellido.value === ""){
        alert("Por favor, escriba su apellido");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return false;
    }

    if(correo.value === ""){
        alert("Por favor, escriba su correo");
        correo.classList.add("is-invalid");
        correo.focus();
        return false;
    }

    const correoValido = correo => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
    }

    if(!correoValido(correo.value)){
        alert("Por favor, escriba un correo válido!");
        correo.classList.add("is-invalid");
        correo.focus();
        return false;
    }

    if((cantidad.value == 0) || (isNaN(cantidad.value))){
        alert("Por favor, ingrese una cantidad válida!");
        cantidad.classList.add("is-invalid");
        cantidad.focus();
        return false;
    }

    if(categoria.value == ""){
        alert("Por favor, seleccione una categoría");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return false;
    }
    return true;
}

//cambio de selección de cards
function activarCard(card) {
    cardEstudiante.classList.remove('card-active');
    cardTrainee.classList.remove('card-active');
    cardJunior.classList.remove('card-active');
    totalCantidad.textContent = "";
    card.classList.add('card-active');
}

function actualizarTotal() {
    const categoria = categoriaSelect.value;
    const cantidad = parseFloat(cantidadInput.value);
    let descuento = 0;
    formularioCompleto();

    if (categoria === 'estudiante') {
        descuento = 0.8;
        activarCard(cardEstudiante);
    } else if (categoria === 'trainee') {
        descuento = 0.5;
        activarCard(cardTrainee);
    } else if (categoria === 'junior') {
        descuento = 0.15;
        activarCard(cardJunior);
    }

    const total = cantidad * valorTicket * (1 - descuento);
    const entrada = valorTicket * (1 - descuento);
    

    if (isNaN(total) || total <= 0) {
        totalPago.textContent = "";
        totalCantidad.textContent = "";
    } else {
        totalPago.textContent = total > 0 ? `${total.toFixed(0)}` : 'Total a pagar: $';
        totalCantidad.innerHTML = entrada > 0 ? `(${cantidad.toFixed(0)} ticket/s categoría ${categoria}: $${entrada.toFixed(0)} c/u)` : "";
    }
}

cardEstudiante.addEventListener('click', function () {
    categoriaSelect.value = 'estudiante';
    activarCard(cardEstudiante);
    actualizarTotal();
});

cardTrainee.addEventListener('click', function () {
    categoriaSelect.value = 'trainee';
    activarCard(cardTrainee);
    actualizarTotal();
});

cardJunior.addEventListener('click', function () {
    categoriaSelect.value = 'junior';
    activarCard(cardJunior);
    actualizarTotal();
});

categoriaSelect.addEventListener('change', function () {
    actualizarTotal();
});

cantidadInput.addEventListener('input', function () {
    actualizarTotal();
});

btnResumen.addEventListener('click', function () {
    if(formularioCompleto()) {
        actualizarTotal();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cantidad = cantidadInput.value;
        const categoria = categoriaSelect.options[categoriaSelect.selectedIndex].text;
        const mensaje = `Hola ${nombre} ${apellido}!\nUsted va a comprar ${cantidad} ticket(s) de ${categoria} \n\n Total a pagar: $${totalPago.textContent}`;
        alert(`${mensaje}`);
    }
});

document.getElementById('btnBorrar').addEventListener('click', function () {
    document.getElementById('comprar_tickets').reset();
    removeClassError();
    totalPago.textContent = "";
    totalCantidad.innerHTML = "";
    totalCantidad.textContent = "";
    cardEstudiante.classList.remove('card-active');
    cardTrainee.classList.remove('card-active');
    cardJunior.classList.remove('card-active');

});

window.addEventListener("beforeunload", function (e) {
    // Restablece los valores de los campos del formulario o simplemente restablece el formulario
    document.getElementById('comprar_tickets').reset();
    removeClassError();
    cardEstudiante.classList.remove('card-active');
    cardTrainee.classList.remove('card-active');
    cardJunior.classList.remove('card-active');
    
    e.returnValue = '¿Estás seguro de que deseas abandonar la página?'; 
});
