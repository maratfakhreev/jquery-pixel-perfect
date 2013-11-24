(function($){

	$.fn.pixelPerfect = function(options){
		_this = $(this);

		options = $.extend({
			path: "images/mockup.png", //default mockup path
			draggable: true, //draggable state
			topBtnCode: 38, //default is "Up arrow" key
			rightBtnCode: 39, //default is "Right arrow" key
			bottomBtnCode: 40, //default is "Bottom arrow" key
			leftBtnCode: 37, //default is "Left arrow" key
			opacityIncBtn: 81, //default is "Q" key
			opacityDecBtn: 87, //defauls is "W" key
			visibility: 83 //default is "S" key
		}, options);

		var rnd = function(x){
			return Math.round(x * 100000) / 100000;
		};

		var numb = function(x){
			return parseInt((x).replace(/[^-\d\.]/g, ''));
		};

		var initMockup = function(){
			_this.prepend('<img id="j-pp-mockup" style="opacity: 0" src="' + options.path + '"/><div class="j-pp-mockup " style=""></div>');
			$(window).load(function(){
				var m = $("#j-pp-mockup");
				_this.container = _this.find('.j-pp-mockup');
				_this.container.css({
					'width': m.width(),
					'height': m.height(),
					'top': 0,
					'left': 0,
					'background-image': 'url(' + options.path + ')'
				})
				m.remove();
			});
		};

		var initInterface = function(){
			_this.prepend('<div class="j-pp-help">\
				<div class="j-pp-icon"></div>\
				<div class="j-pp-block">\
					<div class="title">jQuery-pixel-perfect. ver 1.0</div>\
					<div>Use "Up/Down/Left/Right arrow" keys for moving mockup</div>\
					<div>Use "Q/W" keys for changing opacity value</div>\
					<div>Use "S" key to show/hide mockup</div>\
					<div class="ver">created by Fakhreev Marat</div>\
				</div>\
			</div>');
			_this.on('click', '.j-pp-icon', function(){
				that = $(this);
				that.toggleClass('active');
				if (that.hasClass('active')){
					_this.find('.j-pp-block').fadeIn(300);
				}
				else {
					_this.find('.j-pp-block').fadeOut(300);
				}
			})
		}

		var draggingActions = function(){
			if (options.draggable){
				var dragging = false,
						_body = $('body');
				_body.on("mousedown", '.j-pp-mockup', function(event){
					$(this).attr('unselectable', 'on').addClass('draggable');
					var posY = $('.draggable').offset().top,
							posX = $('.draggable').offset().left,
							mouseY = event.pageY,
							mouseX = event.pageX;
					_body.on("mousemove", function(event){
						if (dragging && dragging.hasClass('draggable')){
							dragging.offset({
								top: posY + event.pageY - mouseY,
								left: posX + event.pageX - mouseX
							});
						}
					});
					dragging = $(event.target);
				});
				_body.on("mouseup", ".draggable", function(event){
					dragging = false;
					$(this).removeAttr('unselectable').removeClass('draggable');
				});
				_body.on("mouseleave", ".draggable", function(event){
					$(this).removeClass('draggable');
				});
			};
		};

		var keyboardActions = function(){
			var p = {
				top: 0, 
				left: 0, 
				opacity: 1.0, 
				display: 'block',
				isVisible: true
			};
			$(document).on('keydown', function(event){
				p.top = _this.container.css('top');
				p.left = _this.container.css('left');
				switch (event.keyCode) {
					case options.topBtnCode:
						p.top = numb(_this.container.css('top')) - 1;
						break;
					case options.rightBtnCode:
						p.left = numb(_this.container.css('left')) + 1;
						break;
					case options.bottomBtnCode:
						p.top = numb(_this.container.css('top')) + 1;
						break;
					case options.leftBtnCode:
						p.left = numb(_this.container.css('left')) - 1;
						break;
					case options.opacityIncBtn:
						p.opacity = (p.opacity < 1) ? rnd(p.opacity + 0.1) : p.opacity;
						break;
					case options.opacityDecBtn:
						p.opacity = (p.opacity > 0) ? rnd(p.opacity - 0.1) : p.opacity;
						break;
					case options.visibility:
						p.display = (p.isVisible) ? 'none' : 'block'
						p.isVisible = !p.isVisible;
						break;
				};
				_this.container.css({
					'top': p.top +'px',
					'left': p.left +'px',
					'opacity': p.opacity,
					'display': p.display
				});
			});
		};

		var init = function(){
			initMockup();
			initInterface();
			draggingActions();
			keyboardActions();
		};

		init();
		return this;
	};

})(jQuery);
