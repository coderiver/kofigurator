head.ready(function() {

// tabs
(function () {
	// after all pictures are loaded
	var link = $('.js-config-link'),
		linkBack = $('.js-config-back'),
		intro = $('.js-config-intro'),
		container = $('.js-config-in'),
		containerLoad = $('.js-config-load'),
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
	// load house
	loadHouse(hash);
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
		return false;
	});
}());

// send
(function () {
	$('body').on('click', '.js-config-send', function () {
		var url = window.location.href;

		// ajax form
		(function () {
			var form = $('.js-form'),
				result = $('.js-form-res'),
				inputEmail = $('input[name=email]'),
				inputUrl = $('input[name=url]');

			$.validate({
				scrollToTopOnError : false,
				onSuccess : function() {

					inputUrl.val(url);

					postData = {
					    'email': inputEmail.val(), 
					    'url': inputUrl.val()
					};
					console.log(postData);
					// ajax post data to server
					$.post('*.php', postData, function (response){

					}, 'json');
					return false;

				}
			});

		}());

	});
}());

// popup
(function () {
	var body = $('body'),
		popup = $('.js-popup'),
		popupClose = $('.js-popup-close');
	body.on('click', '.js-popup-open', function () {
		var item = $(this).data('popup');
		body.addClass('no-scroll');
		$('.' + item).fadeIn();
		return false;
	});
	popupClose.on('click', function () {
		body.removeClass('no-scroll');
		popup.fadeOut();
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