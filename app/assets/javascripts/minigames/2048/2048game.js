var Minigame2048 = function (winValue, onDone) {
  this.win = false;
  this.winValue = winValue;
  this.arrayBoard = '0000000000000000'.split("").map(function(stringNum) {
    return parseInt(stringNum);
  })
  this.onDone = onDone;
}

Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)];
}

Minigame2048.prototype.exponentify = function() {
  return this.arrayBoard.map(function(integer) {
    if (integer == 0) {
      return "";
    } else {
      return Math.pow(2, integer);
    }
  });
}

Minigame2048.prototype.renderExponents = function() {
  for (var i=0; i<=15; i++) {
    $("#" + i).html(this.exponentify()[i]);
  }
}

Minigame2048.prototype.moveTile = function (index, direction) {
  if (this.arrayBoard[index] == 0) {
    //don't move- empty
  } else if (this.checkIfAtEdge(index, direction)) {
    //don't move- at wall
  } else if (this.arrayBoard[this.nextIndex(index, direction)] == 0) {
    //move- empty spot to left
    this.arrayBoard[this.nextIndex(index, direction)] = this.arrayBoard[index];
    this.arrayBoard[index] = 0;
    this.moveTile(this.nextIndex(index, direction), direction);
  } else if (this.arrayBoard[this.nextIndex(index, direction)] != this.arrayBoard[index]) {
    //don't move- at another block
  } else if (this.arrayBoard[this.nextIndex(index, direction)] == this.arrayBoard[index]) {
    //move- merge
    this.arrayBoard[index] = 0;
    this.arrayBoard[this.nextIndex(index, direction)]+= 0.5;
  }
};

Minigame2048.prototype.mergeTile = function(index) {
  this.arrayBoard[index] = Math.ceil(this.arrayBoard[index]);
}

Minigame2048.prototype.spawn = function () {
  var blankSpacesArray = [];
  for (var i=0;i<=15;i++) {
    if (this.arrayBoard[i] == 0) {
      blankSpacesArray.push(i);
    }
  }
  var newIndex = blankSpacesArray.sample();
  this.arrayBoard[newIndex] = 1;
}

Minigame2048.prototype.checkIfAtEdge = function(index, direction) {
  if (direction == "left") {
    return index % 4 == 0;
  } else if (direction == "right") {
    return index % 4 == 3;
  } else if (direction == "up") {
    return index / 4 == 0;
  } else if (direction == "down") {
    return index / 4 == 3;
  }
}

Minigame2048.prototype.nextIndex = function(index, direction) {
  if (direction == "left") {
    return index-1;
  } else if (direction == "right") {
    return index+1;
  } else if (direction == "up") {
    return index-4;
  } else if (direction == "down") {
    return index+4;
  }
}

Minigame2048.prototype.move = function(direction) {
  if (direction == "left" || direction == "up") {
    for(var i=0;i<=15;i++) {
      this.moveTile(i, direction);
    }
  } else if (direction == "down" || direction == "right") {
    for(var i=15;i>=0;i--) {
      this.moveTile(i, direction);
    }
  }

  for(var i=0;i<=15;i++) {
    this.mergeTile(i);
  }
}

Minigame2048.prototype.checkForWin = function() {
  return this.arrayBoard.includes(this.winValue);
}

Minigame2048.prototype.play = function(gamemap, meteorite) {
  var soundEffect = new Audio('../audio/move_tile.wav');
  var minigame = this;
  this.renderExponents();
  $(document).on("keydown", function(event) {
    var beforeBoard = minigame.arrayBoard.join(",");
    event.preventDefault();
    switch(event.keyCode) {
      case 37:
        minigame.move("left");
        break;

      case 38:
        minigame.move("up");
        break;

      case 39:
        minigame.move("right");
        break;

      case 40:
        minigame.move("down");
        break;
    }
    console.log(beforeBoard);
    console.log(minigame.arrayBoard.join(","));
    if(minigame.arrayBoard.join(",") != beforeBoard) {
      console.log(soundEffect);
      soundEffect.play();
    };
    if (minigame.checkForWin()) {
      minigame.renderExponents();
      minigame.win = true;
      // WIN SOUNDS
      minigame.onDone();
      $(document).off("keydown");
    } else {
      minigame.spawn();
      minigame.renderExponents();
    }
  });
}
