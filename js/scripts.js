/*
 * Get Viewport Dimensions
*/
function updateViewportDimensions() {
	"use strict";
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();

$(document).ready(function(){
	
	"use strict";
	
	viewport = updateViewportDimensions();
	
	if(/CriOS/i.test(navigator.userAgent) &&
	/iphone|ipod|ipad/i.test(navigator.userAgent)) {
		$('body').addClass('ios-chrome');
		$('.pt-page').css( 'min-height', viewport.height );
	}
	
	var $window = $(window),
		$animation_elements = $('.icon, .title-card .text, .icon-alt'),
		$photo = $('.photo-panel');
	
	if( !$('body').hasClass('ios-chrome') ) {
		$photo.each(function(i, el){
			var photoFromTop = $(this).offset().top,
				photoHeight = $(this).outerHeight();

			$window.scroll(function(){
				var scrolledY = $window.scrollTop();

				if( scrolledY > photoFromTop && scrolledY <= (photoFromTop+photoHeight) ) {
					$(el).addClass('fixed');
				} else {
					$(el).removeClass('fixed');
				}
			});
		});
	}

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);

	  $.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);

		//check to see if this current container is within viewport
		if ((element_bottom_position >= window_top_position) &&
		  (element_top_position <= window_bottom_position)) {
		  $element.addClass('in-view');
		} else {
		  $element.removeClass('in-view');
		}
	  });
	}

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');
	
});