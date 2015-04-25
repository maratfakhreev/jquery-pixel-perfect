(function($) {
  $.fn.pixelPerfect = function(options) {
    options = $.extend({
      path: 'images/mockup.png', //default mockup path
      draggable: true, //draggable state
      topBtnCode: 38, //default is "Up arrow" key
      rightBtnCode: 39, //default is "Right arrow" key
      bottomBtnCode: 40, //default is "Bottom arrow" key
      leftBtnCode: 37, //default is "Left arrow" key
      opacityIncBtn: 81, //default is "Q" key
      opacityDecBtn: 87, //defauls is "W" key
      changePositionBtn: 70, //default is "F" key
      visibility: 83 //default is "S" key
    }, options);

    var $self = $(this);

    var rnd = function(x) {
      return Math.round(x * 100000) / 100000;
    };

    var numb = function(x) {
      return parseInt((x).replace(/[^-\d\.]/g, ''));
    };

    var initMockup = function() {
      $self.prepend('<img id="j-pp-mockup" style="opacity: 0" src="' + options.path + '"/><div class="j-pp-mockup " style=""></div>');
      $(window).load(function() {
        var $mockup = $("#j-pp-mockup");
        $self.container = $self.find('.j-pp-mockup');
        $self.container.css({
          'top': 0,
          'left': 0,
          'width': $mockup.width(),
          'height': $mockup.height(),
          'background-image': 'url(' + options.path + ')'
        });
        $mockup.remove();
      });
    };

    var initInterface = function() {
      $self.prepend(
        '<div class="j-pp-help">\
          <div class="j-pp-icon"></div>\
          <div class="j-pp-block">\
            <div class="title">jQuery Pixel Perfect ver 1.0</div>\
            <div>Use <b>"Up/Down/Left/Right arrow"</b> keys for moving mockup</div>\
            <div>Use <b>"Q/W"</b> keys for changing opacity value</div>\
            <div>Use <b>"S"</b> key to show/hide mockup</div>\
            <div>Use <b>"F"</b> key to change fixed/absolute positioning</div>\
          </div>\
        </div>'
      ).on('click', '.j-pp-icon', function() {
        var $icon = $(this);
        $icon.toggleClass('active');

        if ($icon.hasClass('active')) {
          $self.find('.j-pp-block').fadeIn(300);
        }
        else {
          $self.find('.j-pp-block').fadeOut(300);
        }
      });
    }

    var draggingActions = function() {
      if (options.draggable) {
        var dragging = false;
        var $body = $('body');
        $body.on('mousedown', '.j-pp-mockup', function(event) {
          $(this).attr('unselectable', 'on').addClass('draggable');
          var posY = $('.draggable').offset().top;
          var posX = $('.draggable').offset().left;
          var mouseY = event.pageY;
          var mouseX = event.pageX;
          $body.on('mousemove', function(event) {
            if (dragging && dragging.hasClass('draggable')) {
              dragging.offset({
                top: posY + event.pageY - mouseY,
                left: posX + event.pageX - mouseX
              });
            };
          });
          dragging = $(event.target);
        });
        $body.on('mouseup', '.draggable', function() {
          dragging = false;
          $(this).removeAttr('unselectable').removeClass('draggable');
        });
        $body.on('mouseleave', '.draggable', function() {
          $(this).removeClass('draggable');
        });
      };
    };

    var keyboardActions = function() {
      var props = {
        top: 0,
        left: 0,
        opacity: 1.0,
        display: 'block',
        position: 'fixed'
      };

      var actions = {
        topBtnCode: function() {
          props.top = numb($self.container.css('top')) - 1;
        },
        rightBtnCode: function() {
          props.left = numb($self.container.css('left')) + 1;
        },
        bottomBtnCode: function() {
          props.top = numb($self.container.css('top')) + 1;
        },
        leftBtnCode: function() {
          props.left = numb($self.container.css('left')) - 1;
        },
        opacityIncBtn: function() {
          props.opacity = (props.opacity < 1) ? rnd(props.opacity + 0.1) : props.opacity;
        },
        opacityDecBtn: function() {
          props.opacity = (props.opacity > 0) ? rnd(props.opacity - 0.1) : props.opacity;
        },
        visibility: function() {
          props.display = (props.display == 'block') ? 'none' : 'block';
        },
        changePositionBtn: function() {
          props.position = (props.position == 'fixed') ? 'absolute' : 'fixed';
        }
      };

      $(document).on('keydown', function(event) {
        event.preventDefault();
        var keyCode = event.keyCode;
        props.top = $self.container.css('top');
        props.left = $self.container.css('left');

        for (var key in options) {
          if (keyCode === options[key]) actions[key]();
        };

        $self.container.css({
          'top': props.top + 'px',
          'left': props.left + 'px',
          'opacity': props.opacity,
          'display': props.display,
          'position': props.position
        });
      });
    };

    (function() {
      initMockup();
      initInterface();
      draggingActions();
      keyboardActions();
    })();

    return this;
  };
})(jQuery);
