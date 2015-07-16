head.ready(function() {

// tabs
(function () {
	var link = $('.js-config-link'),
		intro = $('.js-config-intro'),
		container = $('.js-config-in'),
		hash = window.location.hash;

	function loadHouse (hash, typeShow) {
		if (hash) {
			var house = hash.substr(2);
			container.load('houses/' + house + '.html', function() {
				configColours();
			});
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

	$(window).on( 'hashchange', function() {
		var hash = window.location.hash;
		if (hash == '') {
			container.hide();
			intro.show();
		}
		else {
			loadHouse(hash, 'fadeIn');
		}
	});

}());

// color picker
function configColours () {
	var picker = $('.js-colpick');
		picker.each(function () {
			var _this = $(this),
				svg = _this.data('config'),
				defaultColor = _this.data('default');
			_this.colpick({
				flat: true,
				layout: 'rgbhex',
				submit: 0,
				color: defaultColor,
				onChange: function (hsb, hex, rgb, el, bySetColor) {
					$('.' + svg).css('fill', 'rgb(' + rgb.r + ', ' + rgb.g + ', '+ rgb.b + ')');

					_this.next().val(rgb.r + ',' + rgb.g + ',' + rgb.b);

					// var data = [],
					// 	str = '';
					// $('.js-colpick-val').each(function (i) {
					// 	var _this = $(this),
					// 		value = _this.val(),
					// 		name = _this.attr('name');
					// 	if (value.length > 0) {
					// 		data[i] = value;
					// 	};

					// });
					// console.log(data.join(", "));
					var str = $('.js-colpick-val').serializeArray();
					console.log(str);
					
					
				}
			})
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