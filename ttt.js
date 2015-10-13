

var turns = 0;
var player = 'x'

var playerTurn = function playerTurn(){

  if($(this).is(':empty')){
    if(player === 'o'){
      $(this).text('x');
      console.log("added x");
      turns++;
      console.log(turns);
      player = 'x';
    }
    else{
      $(this).text('o');
      console.log("added o");
      turns++;
      console.log(turns);
      player = 'o';
    }
  }
};

$("#cells div").click(playerTurn);
