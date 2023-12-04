function formularioCompleto() {
    removeClassError();
    if (nombre.value === "") {
        alert("Por favor, escriba su nombre");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return false;
    }
    if (apellido.value === "") {
        alert("Por favor, escriba su apellido");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return false;
    }

    if (correo.value === "") {
        alert("Por favor, escriba su correo");
        correo.classList.add("is-invalid");
        correo.focus();
        return false;
    }

    const correoValido = correo => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
    }

    if (!correoValido(correo.value)) {
        alert("Por favor, escriba un correo válido!");
        correo.classList.add("is-invalid");
        correo.focus();
        return false;
    }
    if (titulo.value === "") {
        alert("Por favor, escriba su título del tema");
        titulo.classList.add("is-invalid");
        titulo.focus();
        return false;
    }
    if (descripcion.value === "") {
        alert("Por favor, escriba su resumen");
        descripcion.classList.add("is-invalid");
        descripcion.focus();
        return false;
    }
}


btn - enviar.addEventListener('click', function () {
    if (formularioCompleto()) {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const mensaje = `Hola ${nombre} ${apellido}!\nUsted enviará los siguientes datos: su Correo es ${email}.\nLa charla que dará se titula ${titulo} \n\n Su resumen es: ${descripcion}`;
        alert(`${mensaje}`);
    }
});

document.getElementById("orador").addEventListener("submit", function (event) {
    event.preventDefault();
    if (formularioCompleto()) {

    }
});

//Función para remover los invalid de los inputs
function removeClassError() {
    let inputs = document.querySelectorAll(".form-control, .form-select");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-invalid");
    }
}