var player_name = "BLANK";
var player_color = "WHITE";

const onPlayerCreated = (sock) => (e) => {
    e.preventDefault();

    player_name = document.querySelector('#player_name').value;
    player_color = document.querySelector('#player_color').value.toUpperCase();
    console.log(player_name + " " + player_color);
    sock.emit('message', player_name + ' (' + player_color + ') just joined the game!');

};

(() => {
    const sock = io();
    sock.on('message', (text) => {
        console.log(text);
    });

    document
        .querySelector('#playerform')
        .addEventListener('submit', onPlayerCreated(sock)); //TODO: this prevents it from changing to game.html

})();
