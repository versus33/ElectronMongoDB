const { ipcRenderer } = require("electron");
const sociForm = document.querySelector("#sociForm");
const NOMDP = document.querySelector("#NOMDP");
const APELDP = document.querySelector("#APELDP");
const DIRECDP = document.querySelector("#DIRECDP");
const cp = document.querySelector("#cp");
const POBLAC = document.querySelector("#POBLAC");
const PROVINCIA = document.querySelector("#PROVINCIA");
const TELDP = document.querySelector("#TELDP");
const MOVILDP = document.querySelector("#MOVILDP");
const emaildp = document.querySelector("#emaildp");

const sociList = document.querySelector("#sociList");

let updateStatus = false;
let idSociToUpdate = "";

  function deleteSoci(id) {  
  const response = confirm("¿Esta Seguro de querer borrar este asociado?");
  if (response) {
    ipcRenderer.send("delete-soci", id);
  }
  return;
}

  function editSoci(id) {
  updateStatus = true;
  idSociToUpdate = id;
  const soci = socis.find(soci => soci._id === id);  
  NOMDP.value = soci.nombre;
  APELDP.value = soci.apellido;
  DIRECDP.value = soci.direccion;
  cp.value= soci.codPostal;
  POBLAC.value= soci.poblacion;
  PROVINCIA.value = soci.provincia;
  TELDP.value= soci.telefono;
  MOVILDP.value= soci.movil;
  emaildp.value = soci.emaildp;
}

function renderSoci(socis) {
  let a = 0;
  let sum = 0;
  let dato = null;
  let x = 0;
  sociList.innerHTML = "";
  console.log(socis);
  socis.map(t => {
    a=JSON.stringify(t._id);
    dato = JSON.parse(a);
    for(x in dato){
//      sum += parseInt(dato[x].valueOf(),16);
      sum += parseInt(dato[x],16);      
    }
    sociList.innerHTML += `
    <div class="card card-body my-2 animated fadeInLeft text-white bg-primary mb-3 style="max-width: 20rem;">   
    <div class="card-header"><h4>Ficha de Asociado</h4></div>
    <div class="card-body">
      <p class="card-title" hidden>${t._id}</p>
      <h5 class="card-title">Numero de Socio :  ${(sum)}</h5>                    
      <p class="card-text">Nombre :  ${t.nombre}</p>
      <p class="card-text">Apellidos :  ${t.apellido}</p>
      <p class="card-text">Dirección Postal :  ${t.direccion}</p>
      <p class="card-text">Codigo Postal :  ${t.codPostal}</p>
      <p class="card-text">Población :  ${t.poblacion}</p>
      <p class="card-text">Provincia :  ${t.provincia}</p>
      <p class="card-text">Teléfono :  ${t.telefono}</p>
      <p class="card-text">Movil :  ${t.movil}</p>
      <p class="card-text">E-email :  ${t.emaildp}</p>
    </div>            
    <button class="btn btn-danger btn-sm" onclick="deleteSoci('${t._id}')">🗑 Borrar</button>
      <button class="btn btn-secondary btn-sm" onclick="editSoci('${t._id}')">✎ Editar</button>
    </div>
        `;
  });
}

let socis = [];

ipcRenderer.send("get-socis");

sociForm.addEventListener("submit", async e => {
  e.preventDefault();

  const soci = {
   
    nombre: NOMDP.value,
    apellido: APELDP.value,
    direccion : DIRECDP.value,
    codPostal : cp.value,
    poblacion : POBLAC.value,
    provincia : PROVINCIA.value,
    telefono : TELDP.value,
    movil : MOVILDP.value,
    emaildp : emaildp.value

  };

  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-soci", soci);
  } else {
    ipcRenderer.send("update-soci", { ...soci, idSociToUpdate });
  }

  sociForm.reset();
});

ipcRenderer.on("new-soci-created", (e, arg) => {
  console.log(arg);
  const sociSaved = JSON.parse(arg);
  socis.push(sociSaved);
  console.log(socis);
  renderSoci(socis);
  alert("Socio dado de alta Correctamente");
  NOMDP.focus();
});

ipcRenderer.on("get-socis", (e, args) => {
  const receivedSocis = JSON.parse(args);
  socis = receivedSocis;
  renderSoci(socis);
});

ipcRenderer.on("delete-soci-success", (e, args) => {
  const deletedSoci = JSON.parse(args);
  const newSocis = socis.filter(t => {
    return t._id !== deletedSoci._id;
  });
  socis = newSocis;
  renderSoci(socis);
});

ipcRenderer.on("update-soci-success", (e, args) => {
  updateStatus = false;
  const updatedSoci = JSON.parse(args);
  socis = socis.map((t, i) => {
    if (t._id === updatedSoci._id) {
      t.nombre= updatedSoci.nombre;
      t.apellido= updatedSoci.apellido;
      t.direccion= updatedSoci.direccion;
      t.codPostal= updatedSoci.codPostal;
      t.poblacion= updatedSoci.poblacion;
      t.provincia= updatedSoci.provincia;
      t.telefono= updatedSoci.telefono;
      t.movil= updatedSoci.movil;
      t.emaildp= updatedSoci.emaildp;      
   
    }
    return t;
  });
  renderSoci(socis);
});
