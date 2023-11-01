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
});

function formularioCompleto() {
    const nombre = document.getElementById('nombre').value;
    const cantidad = cantidadInput.value;
    return nombre !== '' && cantidad !== '';
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
        totalCantidad = entrada > 0 ? `(${cantidad.toFixed(0)} ticket/s categoría ${categoria}: $${entrada.toFixed(0)} c/u)` : "";
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

actualizarTotal();

btnResumen.addEventListener('click', function () {
    if (formularioCompleto()) {
        const nombre = document.getElementById('nombre').value;
        const cantidad = cantidadInput.value;
        const categoria = categoriaSelect.options[categoriaSelect.selectedIndex].text;

        const mensaje = `Hola ${nombre.toUpperCase()}!\n Vas a comprar '${cantidad}' ticket(s)\n de '${categoria}'\n\n${totalPago.textContent}`;

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = mensaje;

        document.body.appendChild(popup);

        setTimeout(function () {
            popup.remove();
        }, 5000);
    } else {
        alert('Por favor, completa los datos en el formulario.');
    }
});

document.getElementById('btnBorrar').addEventListener('click', function () {
    document.getElementById('comprar_tickets').reset();
    totalPago.textContent = "";
    totalCantidad.textContent = "";
    cardEstudiante.classList.remove('card-active');
    cardTrainee.classList.remove('card-active');
    cardJunior.classList.remove('card-active');

});