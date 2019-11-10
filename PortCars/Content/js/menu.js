$(function(){
    $('.content').css('height',$(window).height()-54);
      window.onresize = function () {
        $('.content').css('height',$(window).height()-54);
    }
// 顶部菜单
	$('.headerMenu ul li').mouseover(function(){
		$(this).addClass("liHover");
	});
	$('.headerMenu ul li').mouseout(function(){
		$(this).removeClass("liHover");
	});

	$('.headerMenu ul li').click(function(){
		$(this).addClass("liActive").siblings().removeClass("liActive");
	});


// 左边菜单
   $('.leftMenu ul li').mouseover(function(){
		$(this).addClass("leftHover");
	});
	$('.leftMenu ul li').mouseout(function(){
		$(this).removeClass("leftHover");
	});

	$('.leftMenu ul li a').click(function(){
			$(this).parent().addClass("leftActive").siblings().removeClass("leftActive");
		});
})