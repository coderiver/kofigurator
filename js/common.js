head.ready(function() {

// tabs
(function () {
	var link = $('.js-config-link'),
		linkBack = $('.js-config-back'),
		intro = $('.js-config-intro'),
		container = $('.js-config-in'),
		containerLoad = $('.js-config-load'),
		btnSend = $('.js-config-send'),
		hash = window.location.hash;
	function loadHouse (hash, typeShow) {
		if (hash) {
			var house = hash.substr(2,6),
				colours = hash.substr(9).split('&');
			// loade house
			containerLoad.load('houses/' + house + '.html', function() {
				configColours();
				// colours
				colours.map(function(i, j) {
					var name = i.substr(0,1),
						value = i.substr(2);
					$('.js-colpick-val').each(function () {
						var _this = $(this),
							colpickEl = _this.prev(),
							inputName = _this.attr('name');
						if (inputName == name) {
							_this.val(value);
							var rgbArray = value.split(',');
							var rgb = {
								'r': rgbArray[0],
								'g': rgbArray[1],
								'b': rgbArray[2]
							};
							colpickEl.colpickSetColor(rgb, true);
						};
					});
				});
			});
			// show/hide blocks
			intro.hide();
			if (typeShow == 'fadeIn') {
				container.fadeIn();
			}
			if (typeShow == 'show') {
				container.show();
			}
		};
	}
	loadHouse(hash, 'show');
	// go
	link.on('click', function () {
		var hash = $(this).attr('href');
		loadHouse(hash, 'fadeIn');
	});
	// back
	linkBack.on('click', function () {
		var hash = $(this).attr('href');
		window.location.hash = hash;
		container.hide();
		intro.fadeIn();
	});
	// send
	btnSend.on('click', function () {
		html2canvas($('#config'), {
		    onrendered: function(canvas) {
		        theCanvas = canvas;
		        document.body.appendChild(canvas);

		        // Convert and download as image 
		        Canvas2Image.saveAsPNG(canvas); 
		        $("#ppp").append(canvas);
		        // Clean up 
		        //document.body.removeChild(canvas);
		    }
		});
	});
}());

// color picker
function configColours () {
	var picker = $('.js-colpick');
		picker.each(function () {
			var _this = $(this),
				svg = _this.data('config'),
				defaultColor = _this.data('default'),
				hash = window.location.hash;
			_this.colpick({
				flat: true,
				layout: 'rgbhex',
				submit: 0,
				onChange: function (hsb, hex, rgb, el, bySetColor) {
					$('.' + svg).css('fill', 'rgb(' + rgb.r + ', ' + rgb.g + ', '+ rgb.b + ')');
					_this.next().val(rgb.r + ',' + rgb.g + ',' + rgb.b);
					var data = '';
					var str = $('.js-config-form').serializeArray();
					str.map(function(i, j) {
						if (i.value !== '') {
							data += '&';
							data += i.name;
							data += '=';
							data += i.value;
						};
					});
					window.location.hash = hash.substr(0,8) + data;
				}
			});
			var rgb1 = $.colpick.hexToRgb(defaultColor)
			_this.colpickSetColor(rgb1, true);
		});

	var accordTitle = $('.js-config-accord-title'),
		accordBody = $('.js-config-accord-body');
	accordTitle.on('click', function () {
		var _this = $(this);
		if (!_this.hasClass('is-active')) {
			if (_this.parent().parent().hasClass('js-config-accord-body')) {
				var _thisParent = _this.parent().parent()
					accordTitleIn = _thisParent.find('.js-config-accord-title'),
					accordBodyIn = _thisParent.find('.js-config-accord-body');
				accordTitleIn.removeClass('is-active');
				accordBodyIn.slideUp();
				_this.addClass('is-active');
				_this.next().slideDown();
			}
			else {
				accordTitle.removeClass('is-active');
				accordBody.slideUp();
				_this.addClass('is-active');
				_this.next().slideDown();
			}
		}
		else {
			if (_this.parent().parent().hasClass('js-config-accord-body')) {
				var _thisParent = _this.parent().parent()
					accordTitleIn = _thisParent.find('.js-config-accord-title'),
					accordBodyIn = _thisParent.find('.js-config-accord-body');
				accordTitleIn.removeClass('is-active');
				accordBodyIn.slideUp();
			}
			else {
				accordTitle.removeClass('is-active');
				accordBody.slideUp();
			}
		}
	});
}
	
});