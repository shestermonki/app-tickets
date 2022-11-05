//REFERENCIAS HTML
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');
  btnCrear.disabled = false;
  /*lblOffline.style.display = "none";
  lblOnline.style.display = "";*/
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');
  btnCrear.disabled = true;
  /*lblOnline.style.display = "none";
  lblOffline.style.display = "";*/
});

socket.on("ultimo-ticket", (ultimo) => {
  lblNuevoTicket.innerText = "Ticket " + ultimo;
});

/*socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});*/

btnCrear.addEventListener("click", () => {
  //const mensaje = txtMensaje.value;
  /*const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };*/

  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
    console.log("Desde el server: ", ticket);
  });
});
