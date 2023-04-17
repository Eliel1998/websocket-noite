$(() => {
    const socket = io();
    console.log("Conectado ao servidor");

    $('form').submit(() => {
        socket.emit('message', $('#texto').val());
        return false;
    });

    $('#texto').keydown(() => {socket.emit("status","Está digitando")});
    $('#texto').keyup(() => {socket.emit("status","")});

    socket.on('message', (texto) => {
        $('#mensagens').append($('<li>').text(texto));
        console.log("Mensagem recebida: " + texto)
     });

    socket.on('status', (texto) => {
        $('#status').html(texto);
        console.log("Mensagem recebida: " + texto)
     } );

     socket.on('login', (login) => {
        $('#user').html(login);
        console.log("Mensagem recebida: " + texto)
     } );
})