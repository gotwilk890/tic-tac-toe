'use strict';
//stores a token and game ID for function use
var game = {};

var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};


//$(document).ready(...
$(function() {
  //converts answerrs from form into a readable object for bac end
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  // formats info into readable back end data
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };
  // runs to catch errors and sends reults to a result block for testing.
  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };
//sends registration info and creates a user on the server
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
    $('#register').trigger("reset");
  });
//sends login info to server and when server sends back unique token
//for user stores it for other functional use.
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      game.token = data.user.token;
      //reveals scoreboard and NEW GAME button to user upon login
      $('.scoreboard').show('slow');

    };
    e.preventDefault();
    tttapi.login(credentials, cb);
    $('#login').trigger("reset");
  });
//---------------------------------------------------------------------
//Ran out of time to implement this for presentation may get back to it.
  // $('#list-games').on('submit', function(e) {
  //   var token = $(this).children('[name="token"]').val();
  //   e.preventDefault();
  //   tttapi.listGames(token, callback);
  // });
//----------------------------------------------------------------------

//create game when NEW GAME button is clicked.
//sends new game board to server.
  $("#clear").click(function(e){
    var token = game.token
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      game.id = data.game.id;
      //reveals game-board to play game on
      $('.game-board').show('slow');
    }

    e.preventDefault();
    tttapi.createGame(token, cb);
  });

//-----------------------------------------------------------
//Ran out of time to implement this for presentation may get back to it.
  // $('#show-game').on('submit', function(e) {
  //   var token = $(this).children('[name="token"]').val();
  //   var id = $('#show-id').val();
  //   e.preventDefault();
  //   tttapi.showGame(id, token, callback);
  // });
//------------------------------------------------------------

//-----------------------------------------------------------
//Ran out of time to implement this for presentation may get back to it.
  // $('#join-game').on('submit', function(e) {
  //   var token = $(this).children('[name="token"]').val();
  //   var id = $('#join-id').val();
  //   e.preventDefault();
  //   tttapi.joinGame(id, token, callback);
  // });
//------------------------------------------------------------

//when game cells are clicked sends updated gmaeboard to server
  $("#cells div").click(function(e) {
    var token = game.token;
    var id = game.id;
    var index = $(this).index();
    var value = $(this).html();
    var data = wrap('game', wrap('cell', {index: index, value: value}));


    e.preventDefault();
    tttapi.markCell(id, data, token,callback );

  });

//-----------------------------------------------------------
//Ran out of time to implement this for presentation may get back to it.
  // $('#watch-game').on('submit', function(e){
  //   var token = $(this).children('[name="token"]').val();
  //   var id = $('#watch-id').val();
  //   e.preventDefault();

  //   var gameWatcher = tttapi.watchGame(id, token);

  //   gameWatcher.on('change', function(data){
  //     var parsedData = JSON.parse(data);
  //     if (data.timeout) { //not an error
  //       this.gameWatcher.close();
  //       return console.warn(data.timeout);
  //     }
  //     var gameData = parsedData.game;
  //     var cell = gameData.cell;
  //     $('#watch-index').val(cell.index);
  //     $('#watch-value').val(cell.value);
  //   });
  //   gameWatcher.on('error', function(e){
  //     // console.error('an error has occured with the stream', e);
  //   });
  // });
//------------------------------------------------------------
});
