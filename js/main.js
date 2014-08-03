'use strict';

var current;

var colormap = {
    "cec-yellow": "rgb(250, 226, 45)",
    "white": "white"
  };

var paneOrder = new Array();

var paning = 
  {
    "#home": {
      href: "#home",
      index: 0,
      color: "cec-yellow"
    },
    "#about": {
      href: "#about",
      index: 1,
      color: "white"
    },
    "#films": {
      href: "#films",
      index: 2,
      color: "white"
    },
    "#festivals": {
      href: "#festivals",
      index: 3,
      color: "white"
    },
    "#concerts": {
      href: "#concerts",
      index: 4,
      color: "white"
    },
    "#speakers": {
      href: "#speakers",
      index: 5,
      color: "white"
    },
    "#gm": {
      href: "#gm",
      index: 6,
      color: "white"
    },
    "#om": {
      href: "#om",
      index: 7,
      color: "white"
    },
    "#print": {
      href: "#print",
      index: 8,
      color: "white"
    },
    "#media": {
      href: "#media",
      index: 9,
      color: "white"
    },
    "#contact": {
      href: "#contact",
      index: 10,
      color: "cec-yellow"
    }
  };

function switchToPane(pane, shouldPush)
{
  if (typeof pane === "undefined") return;

  $('.pane_link').not(pane.href+'_link').removeClass('selected');
  $(pane.href+'_link').addClass('selected');
  $('.horizontal_slider').animate({'left': -(pane.index*100) +'%',
                                   'backgroundColor': colormap[pane.color]});
  current = pane;

  if (pane.index == 0) 
  {
    $('.left_arrow').addClass('disabled');
  }
  else if (pane.index == 10)
  {
    $('.right_arrow').addClass('disabled');
  }
  else
  {
    $('.arrow').removeClass('disabled');
  }

  if (shouldPush && typeof history.pushState == 'function') { history.pushState(current, null, current.href); }
}

$(document).ready(function() {

  var e;
  for (e in paning) {(function () {
    var pane = paning[e];
    paneOrder[pane.index] = pane;
    $(pane.href+"_link").click(function () { 
      switchToPane(pane, true);
    });
  })();}

  // only if we can handle addEventListener
  if (typeof window.addEventListener == 'function' )
  {
    window.addEventListener('popstate', function(e) {
      var pane = e.state;
      if (pane == null)
      {
        return;
      }
      switchToPane(pane, false);
    });
  }

  $(document).keydown(function(e) {
    if (e.keyCode == 37 /* LEFT */ ) {
      switchToPane(paneOrder[current.index-1], true);
    } 
    else if (e.keyCode == 39 /* RIGHT */ ) {
      switchToPane(paneOrder[current.index+1], true);
    } 
  });

  $('.left_arrow').click(function () { switchToPane(paneOrder[current.index-1], true); });
  $('.right_arrow').click(function () { switchToPane(paneOrder[current.index+1], true); });
  
//  $('.left_arrow').on('mouseover', function () { $('.left_arrow').css({"border-right-color": "red"}) });
//  $('.right_arrow').on('mouseover', function () { $('.right_arrow').css({"border-left-color": "red"}) });


  current = paning[window.location.hash];

  if (current == null) current = paning["#home"];
  switchToPane(current, false);

  $('.horizontal_slider').animate({'left': -(current.index*100) +'%'}); 
});
