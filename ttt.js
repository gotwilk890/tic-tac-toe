

var playerTurn = function playerTurn(){
    $(this).text('x');
    console.log("added x");

};

$("#cells div").click(playerTurn);
