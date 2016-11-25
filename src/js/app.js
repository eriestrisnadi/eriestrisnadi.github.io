$(document).ready(function() {
  var container = $('.role-words'),
      words = $('.role-words li'),
      cursor = 0;

  var xDelay = 350,
      yDelay = 850,
      totalDelay = xDelay + yDelay;

  words.find('a').addClass('text-warning');

  function advanceCursor() { cursor = (cursor + 1) % words.length; }
  function current() { return $(words[cursor]); }
  function next() { return $(words[(cursor+1) % words.length]); }
  function getDelay() { return totalDelay + (current().find('span').text().length * 25); }
  function cycle() {
    var currentWidth = current().find('span').width() + 5,
        newWidth = next().find('span').width() + 5,
        prevAll = next().prevAll(),
        top = 0;

    for (var i = 0; i < prevAll.length; i++) {
      top -= $(prevAll[i]).height();
    }

    var firstAnimation = {width: newWidth},
        secondAnimation = {'margin-top': top};

    var firstDelay = xDelay, secondDelay = yDelay;

    if (newWidth < currentWidth) {
      var t = firstAnimation;
      firstAnimation = secondAnimation;
      secondAnimation = t;

      firstDelay = yDelay;
      secondDelay = xDelay;
    }

    container.animate(firstAnimation, firstDelay, function() {
      container.animate(secondAnimation, secondDelay, function() {
        advanceCursor();

        setTimeout(cycle, getDelay());
      });
    });
  }

  container.width(current().find('span').width() + 5);
  setTimeout(cycle, getDelay());

});
