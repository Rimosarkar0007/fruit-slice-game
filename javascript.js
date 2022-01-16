var playing = false;
var trialsleft;
var step;
var action;
var fruits = ['apple', 'broccoli', 'capsicum', 'green-apple', 'onion', 'orange', 'strawberry', 'tomato', 'watermelon'];
$(function() {
  // click on the start reset button
  $("#startreset").click(function() {

    //playing
    if (playing == true) {

      // reload page
      location.reload();

    } else {
      // not playing
      playing = true; //initiated the game
      score = 0;
      $("#scorevalue").html(score);
      // trials left
      $("#trialsleft").show();
      trialsleft = 3;
      addHearts();
      // hide game over box
      $("#gameOver").hide();

      // start changes to reset
      $("#startreset").html("Reset Game");
      // start sending fruits
      startAction();

    }
  });

  $("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); //update score

    document.getElementById("slicesound").play(); //play sound

    // stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit animation

    //send new fruits
    setTimeout(startAction, 500);


  });

  //slice a fruit



  // functions


  function addHearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {

      $("#trialsleft").append('<img src="game-images/heart.png" class="heart-img">');
    }
  }


  function startAction() {
    //generate a fruit
    $("#fruit1").show();
    choseFruit(); //chose a random fruit
    $("#fruit1").css({
      'left': Math.round(650 * Math.random()),
      'top': -50
    });
    //generate a random step
    step = 1 + Math.round(5 * Math.random());
    action = setInterval(function() {
      $("#fruit1").css('top', $("#fruit1").position().top + step);

      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //check trails left
        if (trialsleft > 1) {
          $("#fruit1").show();
          choseFruit(); //chose a random fruit
          $("#fruit1").css({
            'left': Math.round(650 * Math.random()),
            'top': -50
          });
          //generate a random step
          step = 1 + Math.round(5 * Math.random());
          trialsleft--;
          //populate trailsleft box
          addHearts();
        } else {
          //game over
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
          $("#trialsleft").hide();
          stopAction();
        }
      }

    }, 10);

  }


  function choseFruit() {
    $("#fruit1").attr('src', 'game-images/' + fruits[Math.round(8 * Math.random())] + '.png');
  }


  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
