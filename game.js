var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentClick = 1;

// Not sure why this has the click part in it
function playSound(name) {
  // $("#" + name).click(function () {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
  // });
}

function animatePress(currentColour, index) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 300);
}

function loopPattern() {
  for (let i = 0; i < gamePattern.length; i++) {
    let curr = gamePattern[i];
    console.log(curr);
    setTimeout(() => {
      playSound(curr);
      animatePress(curr, i);
    }, 500 * (i + 1));
  }
}

function nextSequence() {
  level++;
  userClickedPattern = [];
  currentClick = 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  loopPattern();
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(currentClick);
});

// Not sure why i needed this?
$(document).on("keydown", function (event) {
  if (event.key === "a" && level === 0) {
    nextSequence();
  } else {
  }
});

function checkAnswer(userClick) {
  if (
    userClick === level &&
    gamePattern[userClick - 1] === userClickedPattern[userClick - 1]
  ) {
    // if the last click of the current level (i.e. 2nd click on level 2), start next level sequence
    setTimeout(nextSequence, 1000);
  } else if (gamePattern[userClick - 1] === userClickedPattern[userClick - 1]) {
    currentClick++;
  } else {
    $("h1").html(
      "GAME OVER!<br>You reached level " +
        level +
        ".<br>Press the 'Start' to try again"
    );
    $("body").addClass("game-over");
    var loseSound = new Audio("sounds/wrong.mp3");
    loseSound.play();
    level = 0;
  }
}

$(document).on("keydown", function (event) {
  if (event.key === "s" && level === 0) {
    startOver();
  }
});

// adding for startBtn instead of keypress
function startBtn() {
  if (level === 0) {
    startOver();
  }
}
// adding for nextBtn instead of keypress
function nextBtn() {}

function startOver() {
  gamePattern = [];
  $("body").removeClass("game-over");
  nextSequence();
}
