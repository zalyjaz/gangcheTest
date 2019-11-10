var urlArray=[];
$(function(){
    // 欢迎页面的高度
    $(".pc-welcome,.pc-right-content").css("height",$(window).height()-54-20-41);
    $(window).resize(function(){
        $(".pc-welcome,.pc-right-content").css("height",$(window).height()-54-20-41);
        removeNav();
     });
    //顶部菜单栏点击事件
    var topIndex;
    $(".pc-menu-Btn").on("click",function(){
    	topIndex=$(this).parent().index();
    	var url=$(this).attr('url');
    	if(url!==undefined){
    		loadViews(url,'leftMenu');
    	}
        $(this).addClass("pc-menu-active").parent().siblings().children().removeClass('pc-menu-active');
        $(".pc-left-nav").eq(topIndex).show().siblings().hide();
        $(".pc-left-nav").eq(topIndex).attr("topindex",topIndex);
    });
    $(".pc-menu-Btn").mouseover(function(){
        $(this).addClass("pc-menu-mouseOver");
    });
    $(".pc-menu-Btn").mouseout(function(){
        $(this).removeClass("pc-menu-mouseOver");
    });

    // 绑定追加元素的父元素上，解决append追加后js方法无效
    // 历史导航栏按钮
    $(".pc-top-nav").on("click","li .pc-nav-btn",function(){
        $(this).parent().addClass("pc-nav-active").siblings().removeClass('pc-nav-active');
        var navUrl=$(this).attr('url');
        loadViews(navUrl,'content');
        // 右边导航栏加选中事件
        leftTopSelected($(this).parent(),navUrl);
    });
    $(".pc-top-nav").on("mouseover","li .pc-nav-btn",function(){
        $(this).addClass('pc-nav-mouseover');
    });
    $(".pc-top-nav").on("mouseout","li .pc-nav-btn",function(){
        $(this).removeClass('pc-nav-mouseover');
    });
    // 删除历史导航栏按钮
    $(".pc-top-nav").on("click","li .pc-nav-out",function(){
        var navLen=$(".pc-top-nav li").length-1;//获取历史标签共有几个
        var navIndex=$(this).parent().index();//获取被删标签的在ul的位置
        var navUrl=$(this).siblings().attr("url");//获取被删标签的url地址
        var navActive=$(this).parent().attr("class");//用于判断被删标签是否处于选中状态
        var preUrl;//记录被删标签的前一个url地址
        var nextUrl;//记录被删标签的下一个url地址
        var preI; //记录被删标签，在数组中上一个标签位置
        var nextI;//记录被删标签，在数组中下一个标签位置
        for(var i=0;i<=urlArray.length-1;i++){
            if(urlArray[i]===navUrl){
                preUrl=urlArray[i-1];
                nextUrl=urlArray[i+1];
                preI=i;
                nextI=i+2;
                urlArray.splice(i,1);
            }
        }
        // 被删标签处于最后一个并且处于选中的状态
        if(navIndex===navLen&&navActive==="pc-nav-active"){
            $(".pc-top-nav li").eq(preI).addClass("pc-nav-active");
            loadViews(preUrl,"content");
            leftTopSelected($(this).parent().prev(),preUrl);
        }
        // 被删标签不是最后一个元素，且处于选中状态
        if(navIndex!==navLen&&navActive==="pc-nav-active"){
            $(".pc-top-nav li").eq(nextI).addClass("pc-nav-active");
            loadViews(nextUrl,"content");
            leftTopSelected($(this).parent().next(),nextUrl);
        }

        $(this).parent().remove();
    });
    $(".pc-top-nav").on("mouseover","li .pc-nav-out",function(){
        $(this).addClass('pc-out-mouseover');

    });
    $(".pc-top-nav").on("mouseout","li .pc-nav-out",function(){
        $(this).removeClass('pc-out-mouseover');
    });
});
//ajax实现页面的跳转
function loadViews(url,id){
	$('#'+id).html('');
	$.ajax({
		type:'get',
		url:url,
		async:false,
		success:function(url){
			$('#'+id).html(url);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
            var er=XMLHttpRequest.status;
            if(er===404){
            	alert("404")
            }else if(er===500){
            	alert("500");
            }else{
                alert("服务错误！");
            }
		}
	});
}

// 点击或删除导航栏时，顶部菜单和左边菜单的选中事件
function leftTopSelected(t,u){
    $(".pc-left-nav ul li").removeClass("pc-left-mouseActive");
    var topIndex=$(t).attr('topIndex');
    // 顶部标签加选中事件
    $(".pc-top-menu li").eq(topIndex).children().addClass("pc-menu-active").parent().siblings().children().removeClass("pc-menu-active");
    $(".pc-left-nav ul li").find("span").each(function(){
        if($(this).attr("url")===u){
            $(this).parent().addClass("pc-left-mouseActive").siblings().removeClass("pc-left-mouseActive");
        }else{
            $(".pc-left-nav").eq(topIndex).show().siblings().hide();
        }
    });  
}

// 历史导航栏溢出时，删除第一个li标签
function removeNav(){
    var navWidth=0;
    var ulWidth=$(".pc-top-nav").width();
    $(".pc-top-nav li").each(function(){
        var liWidth=$(this).width()+16;
        navWidth+=liWidth;
    });
    var difWidth=ulWidth-navWidth-3;
    var secondUrl= $(".pc-top-nav li").eq(1).children('.pc-nav-btn').attr("url");
    // 当页面由较大的宽度变到较小的宽度，删除历史导航栏一至多个
    if(difWidth<0){
      var ceil= Math.ceil(Math.abs(difWidth)/95);//Math.abs()负变正，Math.ceil()向上取正
      for(var c=0;c<=ceil;c++){
          for(var i=0;i<=urlArray.length-1;i++){
            if(urlArray[i]===secondUrl){
                urlArray.splice(i,1);
            }
          }
      $(".pc-top-nav li").eq(1).remove();
      }
    }else if(difWidth<77){
          for(var i=0;i<=urlArray.length-1;i++){
            if(urlArray[i]===secondUrl){
                urlArray.splice(i,1);
            }
          }
      $(".pc-top-nav li").eq(1).remove();
    }
}

// 页面刷新
function homePage(){
    window.location.reload();
}