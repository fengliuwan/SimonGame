var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function () {
  if (!started) {
    // on game start, change title
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  ++level;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);

}

$(".btn").on("click", function () {
  // user $(this) to select current element being clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // animate and play sound
  animatePress(userChosenColor);
  playSound(userChosenColor);
  // check answer
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  var itemClass = "#" + color;
  $(itemClass).addClass("pressed");
  setTimeout(function() {
    $(itemClass).removeClass("pressed");
  }, 100);
}

function checkAnswer(pos){
  if (gamePattern[pos] == userClickedPattern[pos]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
      // reset userClickedPattern to empty for new Level
      userClickedPattern = [];
    }
  } else {
    // if current answer is wrong, play sound, flash buttonColors
    // and start over
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
