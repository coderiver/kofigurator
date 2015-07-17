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
	function loadHouse (hash) {
		if (hash) {
			var house = hash.substr(2,6),
				colours = hash.substr(9).split('&');
			// load house
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
			container.fadeIn();
		};
	}
	// preload
	var preload = ['img/house1/p0.png',
				   'img/house1/p1.png',
				   'img/house1/p2.png',
				   'img/house1/p3.png',
				   'img/house1/p4.png',
				   'img/house1/p5.png',
				   'img/house1/p6.png',
				   'img/house1/p7.png',
				   'img/house1/p8.png',
				   'img/house1/p9.png',
				   'img/house1/p10.png',
				   'img/house1/p11.png',
				   'img/house1/p12.png',
				   'img/house1/p13.png',
				   'img/house2/p0.png',
				   'img/house2/p1.png',
				   'img/house2/p2.png',
				   'img/house2/p3.png',
				   'img/house2/p4.png',
				   'img/house2/p5.png',
				   'img/house2/p6.png',
				   'img/house2/p7.png',
				   'img/house2/p8.png',
				   'img/house2/p9.png',
				   'img/house2/p10.png',
				   'img/house2/p11.png',
				   'img/house2/p12.png',
				   'img/house3/p0.png',
				   'img/house3/p1.png',
				   'img/house3/p2.png',
				   'img/house3/p3.png',
				   'img/house3/p4.png',
				   'img/house3/p5.png',
				   'img/house3/p6.png',
				   'img/house3/p7.png',
				   'img/house3/p8.png',
				   'img/house3/p9.png',
				   'img/house3/p10.png',
				   'img/house3/p11.png',
				   'img/house3/p12.png']
	var promises = [];
	for (var i = 0; i < preload.length; i++) {
	    (function(url, promise) {
	        var img = new Image();
	        img.onload = function() {
	        	promise.resolve();
	        };
	        img.src = url;
	    })(preload[i], promises[i] = $.Deferred());
	}
	$.when.apply($, promises).done(function() {
		// load house
		loadHouse(hash);
	});
	// go
	link.on('click', function () {
		var hash = $(this).attr('href');
		loadHouse(hash);
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

		        // Canvas2Image.saveAsPNG(canvas);
		        $("#ppp").append(canvas);
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