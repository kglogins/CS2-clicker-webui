
// Change "test" to any username you'd like to start a new game
var username = "kglogins";

var socket = io.connect("https://tictactoe.info/", {transports: ['websocket']});
setupSocket();


function setupSocket() {
    var name = document.getElementById('name');
    var currentGold = document.getElementById('currentGold');
    var shovel = document.getElementById('shovel');
    var excavator = document.getElementById('excavator');
    var mine = document.getElementById('mine');


    // This function is called whenever a new game state is received from the server
    socket.on('gameState', function (jsonGameState) {
        var data = JSON.parse(jsonGameState);

        // TODO: Display the game state on your GUI
        // You must display: current gold, and the name, number owned, and cost for each type of equipment

        name.innerHTML = data.username;
        currentGold.innerHTML = data.gold;
        shovel.innerHTML = `${data.equipment.shovel.name} | Buy for ${data.equipment.shovel.cost} | Owned: ${data.equipment.shovel.numberOwned}`;
        excavator.innerHTML = `${data.equipment.excavator.name} | Buy for ${data.equipment.excavator.cost} | Owned: ${data.equipment.excavator.numberOwned}`;
        mine.innerHTML = `${data.equipment.mine.name} | Buy for ${data.equipment.mine.cost} | Owned: ${data.equipment.mine.numberOwned}`;
    });
}


function initializeGame() {
    socket.emit("register", username);

    // TODO: Add any initialization code you'd like to setup your GUI
    // This function is called once when the page loads

}


// Call this function whenever the user clicks your gold button
function clickGold() {
    socket.emit("clickGold");
}


// Call this function whenever the user clicks to purchase equipment
// The parameter is the id of the equipment type to purchase
function buyEquipment(equipmentID) {
    socket.emit("buy", equipmentID);
}
