//REFERENCIAS HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAelert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;
divAelert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');
  btnAtender.disabled = false;
  /*lblOffline.style.display = "none";
  lblOnline.style.display = "";*/
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');
  btnAtender.disabled = true;
  /*lblOnline.style.display = "none";
  lblOffline.style.display = "";*/
});

socket.on("tickets-pendientes", (pendientes) => {
  lblPendientes.innerText = pendientes;
});

/*socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});*/

btnAtender.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "NADIE";
      return (divAelert.style.display = "");
    }

    lblTicket.innerText = `Titcket ` + ticket.numero;
  });
  //const mensaje = txtMensaje.value;
  /*const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };*/
  /*socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
    console.log("Desde el server: ", ticket);
  });*/
});
