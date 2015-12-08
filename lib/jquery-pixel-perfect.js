'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (factory) {
  if (typeof require === 'function' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // Define as CommonJS export:
    module.exports = factory(require('jquery'), window, document);
  } else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define(['jquery', window, document], factory);
  } else {
    // Browser:
    factory(jQuery, window, document);
  }
})(function ($, window, document) {
  var addCSS = function addCSS(cssCode) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssCode;
    } else {
      styleElement.appendChild(document.createTextNode(cssCode));
    }

    document.getElementsByTagName("head")[0].appendChild(styleElement);
  };

  addCSS('\n    .j-pp-help {\n      position: fixed;\n      right: 10px;\n      bottom: 10px;\n      z-index: 999999;\n    }\n\n    .j-pp-help * {\n      font-family: Arial, Helvetica, sans-serif;\n    }\n\n    .j-pp-help .j-pp-icon {\n      position: absolute;\n      right: 0;\n      bottom: 0;\n      opacity: 0.5;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      background-color: #fff;\n      border: 1px solid #666666;\n      box-sizing: border-box;\n    }\n\n    .j-pp-help .j-pp-icon:hover {\n      opacity: 1;\n      cursor: pointer;\n    }\n\n    .j-pp-help .j-pp-icon:before {\n      content: \'?\';\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      text-align: center;\n      line-height: 28px;\n      font-size: 14px;\n      color: #333;\n    }\n\n    .j-pp-help .j-pp-block {\n      display: none;\n      position: absolute;\n      right: 50px;\n      bottom: 0;\n      width: 370px;\n      height: auto;\n      padding: 8px 10px;\n      line-height: 1.6;\n      border-radius: 15px;\n      background-color: rgba(255, 255, 255, 0.9);\n      border: 1px solid rgba(0, 0, 0, 0.3);\n      box-sizing: border-box;\n      font-size: 12px;\n      color: #333;\n    }\n\n    .j-pp-help .j-pp-block .title {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.3);\n      margin-bottom: 7px;\n      padding-bottom: 3px;\n      font-weight: bold;\n      font-size: 14px;\n    }\n\n    .j-pp-mockup {\n      background-repeat: no-repeat;\n      background-color: transparent;\n      position: fixed;\n      z-index: 999990;\n      border: 1px solid rgba(0, 0, 0, 0.1);\n      cursor: default;\n    }\n\n    .j-pp-mockup:active, .j-pp-mockup:focus {\n      cursor: move;\n    }\n  ');

  $.fn.pixelPerfect = function (options) {
    var $widgetEl = $(this);

    var rnd = function rnd(x) {
      return Math.round(x * 100000) / 100000;
    };

    var numb = function numb(x) {
      return parseInt(x.replace(/[^-\d\.]/g, ''));
    };

    var JQueryPixelPerfect = (function () {
      function JQueryPixelPerfect() {
        _classCallCheck(this, JQueryPixelPerfect);

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

      _createClass(JQueryPixelPerfect, [{
        key: 'initMockup',
        value: function initMockup() {
          var _this = this;

          $widgetEl.find('.j-pp-mockup').remove().end().prepend('\n            <img class="j-pp-mockup-image" style="opacity: 0" src="' + this.options.path + '"/>\n            <div class="j-pp-mockup"></div>\n          ');

          var prepareMockup = function prepareMockup() {
            var $mockupImage = $widgetEl.find(".j-pp-mockup-image");

            $widgetEl.container = $widgetEl.find('.j-pp-mockup');
            $widgetEl.container.css({
              'top': 0,
              'left': 0,
              'width': $mockupImage.width(),
              'height': $mockupImage.height(),
              'background-image': 'url(' + _this.options.path + ')'
            });
            $mockupImage.remove();
          };

          if (document.readyState === 'complete') {
            prepareMockup();
          } else {
            $(window).load(prepareMockup);
          }
        }
      }, {
        key: 'initInterface',
        value: function initInterface() {
          $widgetEl.find('.j-pp-help').remove().end().prepend('<div class="j-pp-help">\n              <div class="j-pp-icon"></div>\n              <div class="j-pp-block">\n                <div class="title">jQuery Pixel Perfect</div>\n                <div>Use <b>"Up/Down/Left/Right arrow"</b> keys for moving mockup</div>\n                <div>Use <b>"Q/W"</b> keys for changing opacity value</div>\n                <div>Use <b>"S"</b> key to show/hide mockup</div>\n                <div>Use <b>"F"</b> key to change fixed/absolute positioning</div>\n              </div>\n            </div>').on('click', '.j-pp-icon', function () {
            $widgetEl.find('.j-pp-block').fadeToggle(300);
          });
        }
      }, {
        key: 'draggingActions',
        value: function draggingActions() {
          if (this.options.draggable) {
            (function () {
              var $body = $('body');
              var dragging = false;

              $body.off('mousedown', 'mousemove', 'mouseup', 'mouseleave');

              $body.on('mousedown', '.j-pp-mockup', function (event) {
                $(this).attr('unselectable', 'on').addClass('draggable');
                var posY = $('.draggable').offset().top;
                var posX = $('.draggable').offset().left;
                var mouseY = event.pageY;
                var mouseX = event.pageX;

                $body.on('mousemove', function (event) {
                  if (dragging && dragging.hasClass('draggable')) {
                    dragging.offset({
                      top: posY + event.pageY - mouseY,
                      left: posX + event.pageX - mouseX
                    });
                  };
                });
                dragging = $(event.target);
              });

              $body.on('mouseup', '.draggable', function () {
                dragging = false;
                $(this).removeAttr('unselectable').removeClass('draggable');
              });

              $body.on('mouseleave', '.draggable', function () {
                $(this).removeClass('draggable');
              });
            })();
          };
        }
      }, {
        key: 'keyboardActions',
        value: function keyboardActions() {
          var _this2 = this;

          var props = {
            top: 0,
            left: 0,
            opacity: 1.0,
            display: 'block',
            position: 'fixed'
          };

          var actions = {
            topBtnCode: function topBtnCode() {
              props.top = numb($widgetEl.container.css('top')) - 1;
            },
            rightBtnCode: function rightBtnCode() {
              props.left = numb($widgetEl.container.css('left')) + 1;
            },
            bottomBtnCode: function bottomBtnCode() {
              props.top = numb($widgetEl.container.css('top')) + 1;
            },
            leftBtnCode: function leftBtnCode() {
              props.left = numb($widgetEl.container.css('left')) - 1;
            },
            opacityIncBtnCode: function opacityIncBtnCode() {
              props.opacity = props.opacity < 1 ? rnd(props.opacity + 0.1) : props.opacity;
            },
            opacityDecBtnCode: function opacityDecBtnCode() {
              props.opacity = props.opacity > 0 ? rnd(props.opacity - 0.1) : props.opacity;
            },
            positionBtnCode: function positionBtnCode() {
              props.position = props.position == 'fixed' ? 'absolute' : 'fixed';
            },
            visibilityBtnCode: function visibilityBtnCode() {
              props.display = props.display == 'block' ? 'none' : 'block';
            }
          };

          $(document).on('keydown', function (event) {
            var keyCode = event.keyCode;

            event.preventDefault();
            props.top = $widgetEl.container.css('top');
            props.left = $widgetEl.container.css('left');

            for (var key in _this2.options) {
              if (keyCode === _this2.options[key]) actions[key]();
            };

            $widgetEl.container.css({
              'top': props.top + 'px',
              'left': props.left + 'px',
              'opacity': props.opacity,
              'display': props.display,
              'position': props.position
            });
          });
        }
      }]);

      return JQueryPixelPerfect;
    })();

    new JQueryPixelPerfect();

    return this;
  };
});