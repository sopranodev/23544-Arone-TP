// Código realizado por CGA 
//Función para validar los campos de alta de orador
function formularioCompleto() {
    removeClassError();
    if(nombre.value === ""){
        Swal.fire({
            text: "Por favor, escriba su nombre"
        }).then(function() {
            document.getElementById("nombre").focus();});
        nombre.classList.add("is-invalid");
        nombre.focus();
        return false;
    }

    if(apellido.value === ""){
        Swal.fire({
            text: "Por favor, escriba su apellido"
        }).then(function() {
            document.getElementById("apellido").focus();});
        apellido.classList.add("is-invalid");
        apellido.focus();
        return false;
    }

    if(mail.value === ""){
        Swal.fire({
            text: "Por favor, escriba su mail"
        }).then(function() {
            document.getElementById("mail").focus();});
        mail.classList.add("is-invalid");
        mail.focus();
        return false;
    }

    const mailValido = mail => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }

    if(!mailValido(mail.value)){
        Swal.fire({
            text: "Por favor, escriba una dirección de correo válida"
        }).then(function() {
            document.getElementById("mail").focus();});
        mail.classList.add("is-invalid");
        mail.focus();
        return false;
    }
    if (tema.value === "") {
        Swal.fire("Por favor, escriba su título del tema");
        tema.classList.add("is-invalid");
        tema.focus();
        return false;
    }
    if (resumen.value === "") {
        Swal.fire("Por favor, escriba su resumen");
        resumen.classList.add("is-invalid");
        resumen.focus();
        return false;
    }
    return true;
}

//Crear orador
crearOrador = () => {
    const orador = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("mail").value,
        tema: document.getElementById("tema").value,
        resumen: document.getElementById("resumen").value
    };
    if (formularioCompleto()) {
        //debo enviar estos datos al sevidor
        fetch(`http://localhost:8080/web-app-23544/api/orador`, {
            method: "POST",
            body: JSON.stringify(orador),
        })
            .then(response => response.json())
            .then(json => {
                Swal.fire(`Se dio de alta al orador nombre: ${json.nombre} apellido: ${json.apellido}`);
                limpiarDatos();
            })
            .catch(err => console.log(err));
    }
}
document.getElementById("btnEnviar").addEventListener('click', crearOrador);

//Función para remover los invalid de los inputs
function removeClassError() {
    let inputs = document.querySelectorAll(".form-control");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-invalid");
    }
}

limpiarDatos = () => {
    nombre.value = "";
    apellido.value = "";
    mail.value = "";
    tema.value = "";
    resumen.value = "";
    removeClassError()
}

document.getElementById('btnBorrar').addEventListener('click', limpiarDatos);

 window.addEventListener("beforeunload", function (e) {
     // Restablece los valores de los campos del formulario o simplemente restablece el formulario
     limpiarDatos();
     e.returnValue = '¿Está seguro de que desea abandonar la página?';
 });