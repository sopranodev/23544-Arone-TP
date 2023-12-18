//Listado
//Listar oradores
document.getElementById('btnGetUsers').addEventListener('click', listarOradores);

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
    //guardo en localStorage
    saveOradoresInFromLocal('oradores', data);
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
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-enviar" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="editar(${orador.id})">
                    <img src="../assets/imgs/editar2.png" alt="Editar" width="30%" height="30%" />  
                    <b>Editar</>
                    </button>
                    
                    <button onclick="eliminarOrador(${orador.id})" type="button" class="btn btn-borrar">
                    <img src="../assets/imgs/borrar.png" alt="Borrar" width="30%" height="30%" />    
                    <b>Eliminar</b>
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
//Borrar Listado
document.getElementById('btnBorrarList').addEventListener('click', limpiarDatos);
function limpiarDatos() {
    document.getElementById("usersRows").innerHTML="";
}


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
            Swal.fire(`se ha eliminado el orador id: ${id}`);
            listarOradores();
        })
        .catch(err => console.log(err));
}

//Actualizar
const getOradoresFromLocal = () => {
    const oradores = localStorage.getItem('oradores')
    if (oradores) {
        return JSON.parse(oradores);
    }
    return [];
}
const getOradorSeleccionado = () => {
    const obj = localStorage.getItem('oradorBuscado')
    if (obj) {
        return JSON.parse(obj);
    }
    return null;
}
const removeOradorSeleccionado = () => {
    localStorage.removeItem('oradorBuscado');
}

const saveOradoresInFromLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));//como texto
}

const editar = (id) => {
    const oradores = getOradoresFromLocal();//[]
    const oradorBuscado = oradores.find(o => o.id === id);

    //si quiero actualizar algo en un html (.innerHTML o .value)
    document.getElementById('nombreActualizar').value = oradorBuscado.nombre;
    document.getElementById('apellidoActualizar').value = oradorBuscado.apellido;
    document.getElementById('mailActualizar').value = oradorBuscado.mail;
    document.getElementById('temaActualizar').value = oradorBuscado.tema;
    document.getElementById('resumenActualizar').value = oradorBuscado.resumen;

    //guardo el id/orador del orador que se quiere actualizar
    saveOradoresInFromLocal('oradorBuscado', oradorBuscado);
}

const actualizarOrador = () => {
    const oradorSeleccionado = getOradorSeleccionado();
    if (!oradorSeleccionado) {
        return
    }

    //obtengo los datos del formulario que esta en el modal
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const email = document.getElementById('mailActualizar').value;
    const tema = document.getElementById('temaActualizar').value;
    const resumen = document.getElementById('resumenActualizar').value;

    const orador = {
        nombre,
        apellido,
        email,
        tema,
        resumen
    };
    //ahora puedo enviar al backend para actualizar
    //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
    fetch(`http://localhost:8080/web-app-23544/api/orador?id=${oradorSeleccionado.id}`, {
        method: "PUT",
        body: JSON.stringify(orador),
    })
        .then(response => response) //status code 200
        .then(json => {
            Swal.fire(`Se ha modificado el orador id:${oradorSeleccionado.id}`);
            //cargar la lista 
            listarOradores();
            removeOradorSeleccionado();
            cerrarModal();
        })
        .catch(err => console.log(err));
}
const cerrarModal = () => {
    document.getElementById('btnCerrarModal').click();
}