var x, y, margin, origSize, currSize, timer, diff, score;
margin = 0.1;
origSize = $("#ball").height();

init();

/*** Functions ***/
function init() {
  setInterval(checker, 10);
  score = 0;
  timer = 0;
  diff = 1;
  currSize = origSize;
}

$("#ball").click(function() {
  timer = 0;
  move(this);

  $(this).css({
      backgroundColor: "#F22613"
    }).delay(100 * diff)
    .queue(function(next) {
      $(this).css({
        backgroundColor: "#1F3A93"
      });
      next();
    });
  /*    $('body').css({
          backgroundColor: "#9A12B3"
        }).delay(100 * diff)
        .queue(function(next) {
          $('body').css({
            backgroundColor: "#59abe3"
          });
          next();
        });*/

  score++;
  $("#score").text(score);

  diff *= 0.95;

  currSize = 2 * Math.sqrt((diff * (origSize * origSize * Math.PI) / 4) / Math.PI);
  $(this).height(currSize);
  $(this).width(currSize);
});

function checker() {
  timer++;
  if (timer > 300 * diff) {
    move("#ball");
    timer = 0;
  }
}

function newCoords() {
  y = currSize * margin + Math.random() * (height() - currSize - 2 * currSize * margin);
  x = currSize * margin + Math.random() * (width() - currSize - 2 * currSize * margin);
}

function newLocation(ball) {
  $(ball).animate({
      top: y,
      left: x
    }, 50 + 100 * diff,
    'swing');
}

function move(ball) {
  newCoords();
  newLocation(ball);
}

function height() {
  return window.innerHeight;
}

function width() {
  return window.innerWidth;
}