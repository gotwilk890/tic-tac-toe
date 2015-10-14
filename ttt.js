
// var possibleWins = [7, 56, 73, 84, 146, 273, 292, 448];
var turns = 0;
var player = "o"
var gameArray = [];
var winner;
var playerTurn = function playerTurn(){
  gameArray = [];

  if($(this).is(':empty')){
    if(player === "o"){
      $(this).text("x");
      console.log("added x");
      turns++;
      console.log(turns);
      player = "x";
    }
    else{
      $(this).text("o");
      console.log("added o");
      turns++;
      console.log(turns);
      player = "o";
    }
    $('#cells div').each(function(){
      gameArray.push($(this).text());
    });
  }
  // if(winnerIsX(player) || turns === 9){
  //   (clearBoard());
  // }


  console.log("There is a " + winnerIsX(player));
};


//gameArray:
//[0][1][2]
//[3][4][5]
//[6][7][8]

var allThreeX = function allThreeX(player, cell1, cell2, cell3){
  return (cell1 === player) && (cell2 === player) && (cell3 === player);
};

var winsRowX = function winsRowX(player){
  return allThreeX(player, gameArray[0], gameArray[1], gameArray[2]) ||
         allThreeX(player, gameArray[3], gameArray[4], gameArray[5]) ||
         allThreeX(player, gameArray[6], gameArray[7], gameArray[8]);
};


var winsColumnX = function winsColumnX(player) {
  return allThreeX(player, gameArray[0], gameArray[3], gameArray[6]) ||
         allThreeX(player, gameArray[1], gameArray[4], gameArray[7]) ||
         allThreeX(player, gameArray[2], gameArray[5], gameArray[8]);
};

var winsDiagonalX = function winsDiagonalX(player) {
  return allThreeX(player, gameArray[0], gameArray[4], gameArray[8]) ||
         allThreeX(player, gameArray[2], gameArray[4], gameArray[6]);
}

var winnerIsX = function winnerIsX(player) {
  if(winsRowX(player) || winsColumnX(player) || winsDiagonalX(player)){
    $(".title h2").text("The winner is " + player);

    return player;
  }
  else if(turns === 9){
    $(".title h2").text("Cats Game");
  }
};

var clearBoard = function clearBoard(){
    $("#cells div").text("");
    turns = 0;
  }



$("#cells div").click(playerTurn);
$("#cells").click(function(){
  if(winnerIsX(player) || turns === 9){
    clearBoard();
  };
});
