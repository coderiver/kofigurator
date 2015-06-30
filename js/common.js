head.ready(function() {

// color picker
(function () {
	var picker = $('.js-colpick');
	picker.each(function () {
		var _this = $(this),
			svg = _this.data('config');
		_this.colpick({
			flat: true,
			layout: 'hex',
			submit: 0,
			onChange: function (hsb, hex, rgb, el, bySetColor) {
				$('.' + svg).css('fill', '#' + hex);
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
}());
	
});