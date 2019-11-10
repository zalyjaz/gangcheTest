$(function(){
	// 左边导航栏的点击事件
    $(".pc-left-nav ul li").on('click',function(){
        //为未被选中的去掉样式
        $(".pc-left-nav ul li").each(function(){
             $(this).removeClass();
        });
        //为选中的加样式
        $(this).addClass('pc-left-mouseActive');
        var leftUrl=$(this).children().attr('url');
        loadViews(leftUrl,'content');
        var leftName=$(this).children().text();
        // 获取顶部标签第几个
        var topInd=$(this).parent().parent().attr('topindex');
        // 判断历史标签中是否有，此点击标签的url地址
        $(".pc-top-nav li").removeClass("pc-nav-active"); // 为li去掉选中事件
        if($.inArray(leftUrl,urlArray)===-1){
        	urlArray.push(leftUrl);
	        var $li='<li class="pc-nav-active" topIndex="'+topInd+'">'+
	                 '<span class="pc-nav-btn" url="'+leftUrl+'">'+leftName+'</span>'+
	                 '<span class="pc-nav-out"></span>'+
	                 '</li>'
	        $('.pc-top-nav').append($($li));
        }else{
            $(".pc-top-nav").find(".pc-nav-btn").each(function(){
            	if($(this).attr("url")===leftUrl){
            		$(this).parent().addClass("pc-nav-active");
            	}
            });
        }
        // 历史导航栏溢出时，删除第一个li标签
         removeNav();
        $('.pc-top-nav').trigger("create");//重新加载标签样式,解决append追加元素后css不起作用
    });
    // 当鼠标经过时，添加样式
    $(".pc-left-nav ul li").mouseover(function(){
        $(this).addClass('pc-left-mouseOver');
    });
    // 当鼠标走掉时，去掉样式
    $(".pc-left-nav ul li").mouseout(function(){
        $(this).removeClass('pc-left-mouseOver');
    });
});