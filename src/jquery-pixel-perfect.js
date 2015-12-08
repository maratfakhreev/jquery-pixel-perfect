((factory) => {
  if (typeof require === 'function' && typeof exports === 'object') {
    // Define as CommonJS export:
    module.exports = factory(require('jquery'), window, document);
  }
  else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define(['jquery', window, document], factory);
  }
  else {
    // Browser:
    factory(jQuery, window, document);
  }
})(($, window, document) => {
  const addCSS = (cssCode) => {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssCode;
    }
    else {
      styleElement.appendChild(document.createTextNode(cssCode));
    }

    document.getElementsByTagName("head")[0].appendChild(styleElement);
  };

  addCSS(`
    .j-pp-help {
      position: fixed;
      right: 10px;
      bottom: 10px;
      z-index: 999999;
    }

    .j-pp-help * {
      font-family: Arial, Helvetica, sans-serif;
    }

    .j-pp-help .j-pp-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0.5;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #666666;
      box-sizing: border-box;
    }

    .j-pp-help .j-pp-icon:hover {
      opacity: 1;
      cursor: pointer;
    }

    .j-pp-help .j-pp-icon:before {
      content: '?';
      position: absolute;
      height: 100%;
      width: 100%;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      color: #333;
    }

    .j-pp-help .j-pp-block {
      display: none;
      position: absolute;
      right: 50px;
      bottom: 0;
      width: 370px;
      height: auto;
      padding: 8px 10px;
      line-height: 1.6;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      font-size: 12px;
      color: #333;
    }

    .j-pp-help .j-pp-block .title {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      margin-bottom: 7px;
      padding-bottom: 3px;
      font-weight: bold;
      font-size: 14px;
    }

    .j-pp-mockup {
      background-repeat: no-repeat;
      background-color: transparent;
      position: fixed;
      z-index: 999990;
      border: 1px solid rgba(0, 0, 0, 0.1);
      cursor: default;
    }

    .j-pp-mockup:active, .j-pp-mockup:focus {
      cursor: move;
    }
  `);

  $.fn.pixelPerfect = function(options) {
    const $widgetEl = $(this);

    const rnd = (x) => {
      return Math.round(x * 100000) / 100000;
    };

    const numb = (x) => {
      return parseInt((x).replace(/[^-\d\.]/g, ''));
    };

    class JQueryPixelPerfect {
      constructor() {
        this.options = $.extend({
          path: 'images/mockup.png', //default mockup path
          draggable: true, //draggable state
          topBtnCode: 38, //default is "Up arrow" key
          rightBtnCode: 39, //default is "Right arrow" key
          bottomBtnCode: 40, //default is "Bottom arrow" key
          leftBtnCode: 37, //default is "Left arrow" key
          opacityIncBtnCode: 81, //default is "Q" key
          opacityDecBtnCode: 87, //defauls is "W" key
          positionBtnCode: 70, //default is "F" key
          visibilityBtnCode: 83 //default is "S" key
        }, options);
        this.initMockup();
        this.initInterface();
        this.draggingActions();
        this.keyboardActions();
      }

      initMockup() {
        $widgetEl
          .find('.j-pp-mockup')
          .remove()
          .end()
          .prepend(`
            <img class="j-pp-mockup-image" style="opacity: 0" src="${this.options.path}"/>
            <div class="j-pp-mockup"></div>
          `);

        const prepareMockup = () => {
          const $mockupImage = $widgetEl.find(".j-pp-mockup-image");

          $widgetEl.container = $widgetEl.find('.j-pp-mockup');
          $widgetEl.container.css({
            'top': 0,
            'left': 0,
            'width': $mockupImage.width(),
            'height': $mockupImage.height(),
            'background-image': `url(${this.options.path})`
          });
          $mockupImage.remove();
        };

        if (document.readyState === 'complete') {
          prepareMockup();
        }
        else {
          $(window).load(prepareMockup);
        }
      }

      initInterface() {
        $widgetEl
          .find('.j-pp-help')
          .remove()
          .end()
          .prepend(
            `<div class="j-pp-help">
              <div class="j-pp-icon"></div>
              <div class="j-pp-block">
                <div class="title">jQuery Pixel Perfect</div>
                <div>Use <b>"Up/Down/Left/Right arrow"</b> keys for moving mockup</div>
                <div>Use <b>"Q/W"</b> keys for changing opacity value</div>
                <div>Use <b>"S"</b> key to show/hide mockup</div>
                <div>Use <b>"F"</b> key to change fixed/absolute positioning</div>
              </div>
            </div>`
          )
          .on('click', '.j-pp-icon', () => {
            $widgetEl.find('.j-pp-block').fadeToggle(300);
          });
      }

      draggingActions() {
        if (this.options.draggable) {
          const $body = $('body');
          let dragging = false;

          $body.off(
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseleave'
          );

          $body.on('mousedown', '.j-pp-mockup', function(event) {
            $(this).attr('unselectable', 'on').addClass('draggable');
            const posY = $('.draggable').offset().top;
            const posX = $('.draggable').offset().left;
            const mouseY = event.pageY;
            const mouseX = event.pageX;

            $body.on('mousemove', (event) => {
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
      }

      keyboardActions() {
        const props = {
          top: 0,
          left: 0,
          opacity: 1.0,
          display: 'block',
          position: 'fixed'
        };

        const actions = {
          topBtnCode() {
            props.top = numb($widgetEl.container.css('top')) - 1;
          },
          rightBtnCode() {
            props.left = numb($widgetEl.container.css('left')) + 1;
          },
          bottomBtnCode() {
            props.top = numb($widgetEl.container.css('top')) + 1;
          },
          leftBtnCode() {
            props.left = numb($widgetEl.container.css('left')) - 1;
          },
          opacityIncBtnCode() {
            props.opacity = (props.opacity < 1) ? rnd(props.opacity + 0.1) : props.opacity;
          },
          opacityDecBtnCode() {
            props.opacity = (props.opacity > 0) ? rnd(props.opacity - 0.1) : props.opacity;
          },
          positionBtnCode() {
            props.position = (props.position == 'fixed') ? 'absolute' : 'fixed';
          },
          visibilityBtnCode() {
            props.display = (props.display == 'block') ? 'none' : 'block';
          }
        };

        $(document).on('keydown', (event) => {
          const keyCode = event.keyCode;

          event.preventDefault();
          props.top = $widgetEl.container.css('top');
          props.left = $widgetEl.container.css('left');

          for (let key in this.options) {
            if (keyCode === this.options[key]) actions[key]();
          };

          $widgetEl.container.css({
            'top': `${props.top}px`,
            'left': `${props.left}px`,
            'opacity': props.opacity,
            'display': props.display,
            'position': props.position
          });
        });
      }
    }

    new JQueryPixelPerfect();

    return this;
  };
});
