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

    if (mail.value === "") {
        alert("Por favor, escriba su correo");
        mail.classList.add("is-invalid");
        mail.focus();
        return false;
    }

    const correoValido = mail => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }

    if (!correoValido(mail.value)) {
        alert("Por favor, escriba un correo válido!");
        mail.classList.add("is-invalid");
        mail.focus();
        return false;
    }
    if (tema.value === "") {
        alert("Por favor, escriba su título del tema");
        tema.classList.add("is-invalid");
        tema.focus();
        return false;
    }
    if (resumen.value === "") {
        alert("Por favor, escriba su resumen");
        resumen.classList.add("is-invalid");
        resumen.focus();
        return false;
    }
}


// btn-enviar.addEventListener('click', function () {
//     if (formularioCompleto()) {
//         const nombre = document.getElementById('nombre').value;
//         const apellido = document.getElementById('apellido').value;
//         const email = document.getElementById('email').value;
//         const tema = document.getElementById('tema').value;
//         const resumen = document.getElementById('resumen').value;
//         const mensaje = `Hola ${nombre} ${apellido}!\nUsted enviará los siguientes datos: su Correo es ${email}.\nLa charla que dará se titula ${titulo} \n\n Su resumen es: ${descripcion}`;
//         alert(`${mensaje}`);
//     }
// });
//Crear orador
crearOrador = () => {
    const orador = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        mail: document.getElementById("mail").value,
        tema: document.getElementById("tema").value,
        resumen: document.getElementById("resumen").value
    };

    //debo enviar estos datos al sevidor
    fetch(`http://localhost:8080/web-app-23544/api/orador`, {
        method: "POST",
        body: JSON.stringify(orador),
    })
        .then(response => response.json())
        .then(json => {
            alert(`alta de orador id:${json.id}] ok`);
        })
        .catch(err => console.log(err));
}
document.getElementById("btnEnviar").addEventListener('click', crearOrador);

//Función para remover los invalid de los inputs
function removeClassError() {
    let inputs = document.querySelectorAll(".form-control, .form-select");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-invalid");
    }
}

//Listado
function listarOradores() {/*f2*/
    //1 preparar
    const respuesta = fetch(`http://localhost:8080/web-app-23544/api/orador`);

    //2 invocar
    respuesta
        .then(response => response.json())
        .then(data => procesarListado(data))//fulfilled
        .catch(error => dibujarError(error))//rejected
}
function procesarListado(data) {
    const listarOradores = data;
    let rows = '';
    for (let orador of listarOradores) {
        console.log(orador);
        rows += `
                <tr>
                    <th scope="row">${orador.id}</th>
                    <td>${orador.nombre}</td>
                    <td>${orador.apellido}</td>
                    <td>${orador.mail}</td>
                    <td>${orador.tema}</td>
                    <td>${orador.resumen}</td>
                    <td>
                        <button>Editar</button>
                        <button onclick="eliminarOrador(${orador.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `
    }
    document.getElementById('usersRows').innerHTML = rows;
}

function dibujarError(error) {
    console.log(error);
    const alerta = `<div class="alert alert-danger" role="alert">
                ${error.toString()}
            </div>`;
    document.getElementById('msj').innerHTML = alerta;
}

document.getElementById('btnGetUsers').addEventListener('click', listarOradores);

//eliminar
eliminarOrador = (id) => {
    if (!confirm('SEGURO?')) {
        return;
    }

    fetch(`http://localhost:8080/web-app-23544/api/orador?id=${id}`, {
        method: "DELETE",
    })
        .then(response => response)
        .then(json => {
            alert(`se ha eliminado el orador id: ${id}`);
            listarOradores();
        })
        .catch(err => console.log(err));
}
