$(function(){
	// 不记录历史
    $("input[type=text],select").attr("autocomplete", "off");
// 按钮

	$('.pc-btn-primary').mouseover(function(){
		$(this).css("background","#4679D3");
	});
	$('.pc-btn-primary').mouseout(function(){
		$(this).css("background","#1858c8");
	});

   $('.pc-btn-secondary,.pc-blue').mouseover(function(){
		$(this).css("color","#1858c8");
	});
	$('.pc-btn-secondary,.pc-blue').mouseout(function(){
		$(this).css("color","#000");
	});

	 $('.pc-line').mouseover(function(){
		$(this).css("text-decoration","underline");
	});
	$('.pc-line').mouseout(function(){
		$(this).css("text-decoration","none");
	});
 // 当文本框获取焦点
 //   $("input[type='text']").focus(function () {
	//     $(this).css("border-color", "#1858c8");
	// })
	// $("input[type='text']").blur(function () {
	//     $(this).css("border-color", "#c3ccd9");
	// });


	// 只读文本readonly
	$(".pc-text-readonly").each(function(){
		$(this).attr("readonly","readonly");
	})
	//禁用disabled
	$(".pc-btn-primary-disabled,.pc-btn-secondary-disabled,.pc-text-disabled").each(function(){
		$(this).attr("disabled","disabled");
	});

	// 下拉列表
	//给下拉框中选项添加白色背景
    $(".pc-select-background > option").attr("class", "white");

	$(".pc-select").on("click", function () {
        $(this).toggleClass("selectUp");
    })
    $(".pc-select").on("blur", function () {
        $(this).removeClass("selectUp");
    })
   
    $(".pc-select-background").on("click", function () {
        $(this).toggleClass("selectUp-background");
    })
     $(".pc-select-background").on("blur", function () {
        $(this).removeClass("selectUp-background");
    })
    $(".pc-select-background").on("change", function () {
        $(this).find("option:selected").addClass("blue").siblings().removeClass("blue");
    })

// 搜索框实现
   $(".pc-select-search1").each(function(){
            $(this).editableSelect({
		        effects: 'slide',
		        filter: 'true',
		        onShow: function (element) {
		            $(element).addClass("selectUp");
		        },
		        onHide: function (element) {
		            $(element).removeClass("selectUp");
		        },
		        onSelect: function (element) {
		            $(element).removeClass("selectUp");
		            $(element).addClass("blue").siblings().removeClass("blue");
		        }
		    });
		})
		$(".pc-select-search2").each(function(){
            $(this).editableSelect({
		        effects: 'slide',
		        filter: 'true',
		        onShow: function (element) {
		            $(element).addClass("selectUp-background");
		        },
		        onHide: function (element) {
		            $(element).removeClass("selectUp-background");
		        },
		        onSelect: function (element) {
		            $(element).removeClass("selectUp-background");
		            $(element).addClass("blue").siblings().removeClass("blue");
		        }
		    });
		})
    
    // 单选变多选
    $(".pc-checkbox-toRadio").click(function(){
		$(this).attr("checked",true);//设置当前选中checkbox的状态为checked
		$(this).siblings().attr("checked",false); //设置当前选中的checkbox同级(兄弟级)其他checkbox状态为未选中
		});

     
     // 日历
     $(".pc-date").each(function(){
			var datePikaday=new Pikaday({
				field:$(this)[0],
				firstDay:1,
				yearRange:[2000,2030]
			});
			$(this).attr("placeholder","请选择日期");
			$(this).attr("readonly","readonly");
		});

     // 为开始和结束时间加‘-’
	$(".pc-date-end").before('<span style="padding:0 4px 0 0px;">-</span>');

	// 限制开始时间和结束时间
	$(".pc-date-start").on("change",function(){
		var startDateVal=$(this).val();
		var endDateVal=$(this).siblings(".pc-date-end").val();
		// console.log("开始1："+startDateVal+"结束时间1："+endDateVal)
		if(endDateVal!==""){
			if(startDateVal > endDateVal){
				layer.alert('开始时间应小于等于结束时间！',{
					title:'提示',
					shade:0.03,
					move:false,
					time:0,
					skin:'layui-layer-lan',
					closeBtn:0
				});
				$(this).val("");
			}
		}
	});

   $(".pc-date-end").on("change",function(){
   	    var startDateVal=$(this).siblings(".pc-date-start").val();
		var endDateVal=$(this).val();
		// console.log("开始："+startDateVal+"结束时间："+endDateVal)
		if(startDateVal!==""){
			if(startDateVal > endDateVal){
				layer.alert('结束时间应大于等于开始时间！',{
					title:'提示',
					shade:0.03,
					move:false,
					time:0,
					skin:'layui-layer-lan',
					closeBtn:0
				});
				$(this).val("");
			}
		}
   });

   // 计算到期日
   $(".pc-date-begin").on("change",function(){
   	    var beginDateVal=$(this).val();
   	    date='"'+beginDateVal+'"';
   	    days=$('.pc-date-deadline').val();
   	    if(days!==""){
   	    	var daysInt=parseInt(days);
   	    	var addVal=addDate(date,daysInt);
   	    	$(".pc-date-finish").val(addVal);
   	    }else{
   	    	$(".pc-date-finish").val(beginDateVal);
   	    }
   });

   $(".pc-date-deadline").keyup(function(){
   	var beginDateVal=$(".pc-date-begin").val();
   	if(beginDateVal!==""){
   		date='"'+beginDateVal+'"';
   		days=$(this).val();
   		if(days!==""){
   			var daysInt=parseInt(days);
   			var addVal=addDate(date,daysInt);
   			$(".pc-date-finish").val(addVal);
   		}else{
   			$(".pc-date-finish").val(beginDateVal);
   		}
   	}else{
   		layer.alert('请先选择开始日期',{
   			title:'提示',
   			shade:0.03,
   			move:false,
   			time:0,
   			skin:'layui-layer-lan',
   			closeBtn:0
   		});
   		$(".pc-date-begin").addClass("pc-red");
   		$(this).val("");
   	}
   });
   // 让到期日，变成只读，不可输入
   $(".pc-date-finish").attr("readonly","readonly");
    $(".pc-date-finish").attr("placeholder","到期日");
   // 当开始日期获取焦点时
   $(".pc-date-begin").focus(function(){
   	   $(this).removeClass("pc-red");
   });

   $(".pc-num").keyup(function(){
       var inputSelf=$(this);
   	   var reg=/\D+/g;
   	   var val=inputSelf.val();
   	   if(reg.test(val)){
   	   	layer.alert('只能输入数字！',{
   	   		title:'提示',
     			shade:0.03,
     			move:false,
     			time:0,
     			skin:'layui-layer-lan',
     			closeBtn:0
        }, function(index){
           inputSelf.focus();
           layer.close(index);

     	   	});
   	   }
   	   inputSelf.val(val.replace(reg,''));
   });

   $(".pc-numPoint").keyup(function(){
       var inputSelf=$(this);
   	   var reg=/[^\d.]/g;
   	   var val=inputSelf.val();
   	   if(reg.test(val)){
   	   	layer.alert('只能输入数字和小数点！',{
   	   		title:'提示',
     			shade:0.03,
     			move:false,
     			time:0,
     			skin:'layui-layer-lan',
     			closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
     	   	});
        }
   	   inputSelf.val(val.replace(reg,''));
   });

   $(".pc-cn").blur(function(){
       var inputSelf=$(this);
   	   var reg=/[^\u4E00-\u9FA5]/g;
   	   var val=inputSelf.val();
   	   if(reg.test(val)){
   	   	layer.alert('只能输入汉字！',{
   	   		title:'提示',
     			shade:0.03,
     			move:false,
     			time:0,
     			skin:'layui-layer-lan',
     			closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
   	   }
   	   inputSelf.val(val.replace(reg,''));
   });

    $(".pc-usa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入英文字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

     $(".pc-numUsa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字和英文字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-numCn").blur(function(){
       var inputSelf=$(this);
       var reg=/[^\0-9\u4E00-\u9FA5]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字和汉字！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-cnUsa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z\u4E00-\u9FA5]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入汉字和英文字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-numCnUsa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字、汉字和英文字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });
   
   
    $(".pc-cnBracket").blur(function(){
       var inputSelf=$(this);
       var reg=/[^\u4E00-\u9FA5/\(\)\（\）]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入汉字和（）！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });
   
    $(".pc-numUsaLine").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\-]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字、英文和-！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });


  $(".pc-numUsaSep").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\/]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字、英文和/！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-numUsaLineSep").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\-\/]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字、英文、-和/！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-numUsaSpace").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\ ]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入数字、英文和空格！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });
   
    $(".pc-numCnUsaSpace").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入中文、英文、数字和空格！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

   $(".pc-numCnUsaPointSpace").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.\ ]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入中文、英文、数字、小数点和空格！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-onSpace").keyup(function(){
       var inputSelf=$(this);
       var reg=/\s{2,}/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('不能连续输入两个空格！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-smUsa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\a-\z]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入小写字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });

    $(".pc-bigUsa").keyup(function(){
       var inputSelf=$(this);
       var reg=/[^\A-\Z]/g;
       var val=inputSelf.val();
       if(reg.test(val)){
        layer.alert('只能输入大写字母！',{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
        },function(index){
          inputSelf.focus();
          layer.close(index);
          });
       }
       inputSelf.val(val.replace(reg,''));
   });
   
   // 表格的每行选中事件,可选多行
   $(".pc-table-tr-mulChecked tbody tr").click(function(){
       // 如果slt不等于1，多选框选中，并加背景颜色，否则多选框去掉选中，去掉背景色
        if($(this).attr("slt")==="1"){
          $(this).children().children("input").prop("checked",false);
          $(this).removeClass("pc-table-tr-checkedBackground");
          $(this).attr("slt","0");
        }else{
          $(this).children().children("input").prop("checked",true);
          $(this).addClass("pc-table-tr-checkedBackground");
          $(this).attr("slt","1");
        }
   });

    // 表格的每行选中事件,只能选一行
   $(".pc-table-tr-oneChecked tbody tr").click(function(){
       // 如果slt不等于1，多选框选中，并加背景颜色，否则多选框去掉选中，去掉背景色
        if($(this).attr("slt")==="1"){
          $(this).children().children("input").prop("checked",false);
          $(this).removeClass("pc-table-tr-checkedBackground");
          $(this).attr("slt","0");
        }else{
          $(this).children().children("input").prop("checked",true);
          $(this).siblings().children().children("input").prop("checked",false);
          $(this).addClass("pc-table-tr-checkedBackground").siblings().removeClass("pc-table-tr-checkedBackground");
          $(this).attr("slt","1").siblings().attr("slt","0");
        }
   });

    // 表格的每行选中事件,选中时后面的操作显示，否者隐藏
   $(".pc-table-tr-operateChecked tbody tr").click(function(){
       // 如果slt不等于1，多选框选中，并加背景颜色，否则多选框去掉选中，去掉背景色
        if($(this).attr("slt")==="1"){
          $(this).children().children("input").prop("checked",false);
          $(this).removeClass("pc-table-tr-checkedBackground");
          $(this).children().find(".pc-table-operateBtn").hide();
          $(this).attr("slt","0");
        }else{
          $(this).children().children("input").prop("checked",true);
          $(this).siblings().children().children("input").prop("checked",false);
          $(this).addClass("pc-table-tr-checkedBackground").siblings().removeClass("pc-table-tr-checkedBackground");
          $(this).children().find(".pc-table-operateBtn").show();
          $(this).siblings().children().find(".pc-table-operateBtn").hide();
          $(this).attr("slt","1").siblings().attr("slt","0");
        }
   });

   // 表格的全选
   $(".pc-table-checkboxAll").click(function(){
      var tableThis = $(this).parent().parent().parent().parent();
      // 判断全选按钮的多选框是否选中，若选中为此所在的表格的tbody中所有的多选框加选中和背景，否则反之
      if($(this).prop("checked")){
        tableThis.find("tbody tr td input").prop("checked",true);
        tableThis.find("tbody tr").addClass("pc-table-tr-checkedBackground");
        tableThis.find("tbody tr").attr("slt","1");
      }else{
         tableThis.find("tbody tr td input").prop("checked",false);
         tableThis.find("tbody tr").removeClass("pc-table-tr-checkedBackground");
         tableThis.find("tbody tr").attr("slt","0");
      }
   });
   // 如果全选中有一个不选中，那么全选按钮全选按钮取消
   $(".pc-table-all tbody tr").click(function(){
    // 点击每一行时，判断此行的多选框是否选中，若选中去多选框选中事件和背景，否则加多选框选中事件和背景
      if($(this).attr("slt")==="1"){
        $(this).children().children("input").prop("checked",false);
        $(this).removeClass("pc-table-tr-checkedBackground");
        $(this).attr("slt","0");
      }else{
        $(this).children().children("input").prop("checked",true);
        $(this).addClass("pc-table-tr-checkedBackground");
        $(this).attr("slt","1");
      }
      // 获取表格中有几个多选框
      var chkAll=$(this).parent().find(".pc-table-checkbox").length;
      var chk=0;
      // 计算被选中的多选框有多少个
      $(this).parent().find(".pc-table-checkbox").each(function(){
        if($(this).prop("checked")){
          chk++;
        }
      });
      // 判断总共的多选框和被选中的多选框是否相等，若相等全选按钮选中，否则全选去掉选中
      if(chkAll===chk){
        $(this).parent().parent().find(".pc-table-checkboxAll").prop("checked",true);
      }else{
        $(this).parent().parent().find(".pc-table-checkboxAll").prop("checked",false);
      }
   });

    // 选项卡
    // 包裹选项卡
   $(".pc-tab-nav a").click(function(){
      // 为点击的a的父元素li加选中样式，其余去样式
      $(this).parent().addClass("pc-tab-navActive").siblings().removeClass("pc-tab-navActive");
      // 获取li是第几个
      var liIndex=$(this).parent().index();
      // 对应的显示第几个面板
      $(this).parent().parent().parent().find(".pc-tab-panel").eq(liIndex).addClass("pc-tab-panelActive").siblings().removeClass("pc-tab-panelActive");
    });

   // 简洁选项卡
   $(".pc-tab-simNav a").click(function(){
      $(this).parent().addClass("pc-tab-navActive").siblings().removeClass("pc-tab-navActive");
      var liIndex=$(this).parent().index();
      $(this).parent().parent().parent().find(".pc-tab-panel").eq(liIndex).addClass("pc-tab-panelActive").siblings().removeClass("pc-tab-panelActive");
    });

    // 卡片选项卡
   $(".pc-tab-cardNav a").click(function(){
      $(this).parent().addClass("pc-tab-navActive").siblings().removeClass("pc-tab-navActive");
      var liIndex=$(this).parent().index();
      $(this).parent().parent().parent().find(".pc-tab-panel").eq(liIndex).addClass("pc-tab-panelActive").siblings().removeClass("pc-tab-panelActive");
   });

   // 搜索
   $(".pc-search-text,.pc-search-itext").focus(function(){
       $(this).val("");
   })
   // 时间段搜索
   $(".pc-search-dateCondition").on("change",function(){
        if($(this).val()===""){
          $(".pc-date-start,.pc-date-end").val("");
        }
   });
   // 条件和输入框
   $(".pc-search-inputCondition").on("change",function(){
      if($(this).val()===""){
        $(".pc-search-text").val("");
      }
   });
   // 条件和输入框或下拉框
   $(".pc-search-inputSelectCondition").on("change",function(){
      if($(this).val()===""){
        $("#search").val("");
      }
      var parentVal=$(this).val();
      var childrenOption;
      var childrenVal=['性别'];
      if(parentVal==='性别'){
        childrenOption='<option value="">--请选择--</option><option value="男">男</option><option value="女">女</option>'
      }else{
        $(".pc-search-select").css("display","none");
        $(".pc-search-select").attr("id","search1");
        $(".pc-search-itext").attr("id","search");
        $(".pc-search-itext").css("display","inline-block");
      }
      var isSelect=false;
      childrenVal.forEach(function(vals,index,array){
        if(array[index]===parentVal){
          isSelect=true;
        }
      });
      if(isSelect){
        $(".pc-search-select").html(childrenOption);
        $(".pc-search-select").css("display","inline-block");
        $(".pc-search-select").attr("id","search");
        $(".pc-search-itext").attr("id","search1");
        $(".pc-search-itext").css("display","none");
       }
   });

  // 时间
  startTime();
  // 倒计时
  countDown();
  
});

//开始时间加期限
function addDate(beginDate,days){
	var time=parseDate(beginDate);//转化日期
	time.setDate(time.getDate()+days);//d.getDate()获取日，然后与期限相加
    var m=time.getMonth()+1;
    return time.getFullYear()+'-'+m+'-'+time.getDate();
}
// 转化时间
function parseDate(input){
	var parseDateVal=input.match(/(\d+)/g);
	return new Date(parseDateVal[0],parseDateVal[1]-1,parseDateVal[2]);
}

// 搜索
// 搜索时间段
function searchDateBtn(){
  var dateCondition=$(".pc-search-dateCondition").val();
  var startVal=$(".pc-date-start").val();
  var endVal=$(".pc-date-end").val();
  if(dateCondition!==""&&startVal!==""&&endVal!==""){
      layer.alert("正在进行搜索！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }else{
     layer.alert("请输入完整的搜索条件！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }
}

// 条件和输入框搜索
function searchInputBtn(){
  var inputCondition=$(".pc-search-inputCondition").val();
  var inputVal=$(".pc-search-text").val();
  if(inputCondition!==""&&inputVal!==""){
      layer.alert("正在进行搜索！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }else{
     layer.alert("请输入完整的搜索条件！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }
}

// 条件和输入框或下拉框搜索
function searchInputSelectBtn(){
  var inputCondition=$(".pc-search-inputSelectCondition").val();
  var searchVal=$("#search").val();
  if(inputCondition!==""&&searchVal!==""){
      layer.alert("正在进行搜索！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }else{
     layer.alert("请输入完整的搜索条件！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }
}

  // 时间段与条件和输入框组合
  function searchBtn(){
  var dateCondition=$(".pc-search .pc-search-dateCondition").val();
  var startVal=$(".pc-search .pc-date-start").val();
  var endVal=$(".pc-search .pc-date-end").val();
  var inputCondition=$(".pc-search .pc-search-inputCondition").val();
  var inputVal=$(".pc-search .pc-search-text").val();
  if(((dateCondition!==""&&startVal!==""&&endVal!=="")&&(inputCondition!==""&&inputVal!==""))||((dateCondition!==""&&startVal!==""&&endVal!=="")&&(inputCondition===""&&inputVal===""))||((dateCondition===""&&startVal===""&&endVal==="")&&(inputCondition!==""&&inputVal!==""))){
      layer.alert("正在进行搜索！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }else{
     layer.alert("请输入完整的搜索条件！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }
}

 // 时间段与条件和输入框组合
  function searchBtn1(){
  var dateCondition=$(".pc-search1 .pc-search-dateCondition").val();
  var startVal=$(".pc-search1 .pc-date-start").val();
  var endVal=$(".pc-search1 .pc-date-end").val();
 var inputCondition=$(".pc-search1 .pc-search-inputSelectCondition").val();
  var inputVal=$(".pc-search1 #search").val();
  if(((dateCondition!==""&&startVal!==""&&endVal!=="")&&(inputCondition!==""&&inputVal!==""))||((dateCondition!==""&&startVal!==""&&endVal!=="")&&(inputCondition===""&&inputVal===""))||((dateCondition===""&&startVal===""&&endVal==="")&&(inputCondition!==""&&inputVal!==""))){
      layer.alert("正在进行搜索！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }else{
     layer.alert("请输入完整的搜索条件！",{
          title:'提示',
          shade:0.03,
          move:false,
          time:0,
          skin:'layui-layer-lan',
          closeBtn:0
      });
  }
}

// 时间
  function startTime() {
      var today = new Date();//定义日期对象   
      var yyyy = today.getFullYear();//通过日期对象的getFullYear()方法返回年    
      var MM = today.getMonth() + 1;//通过日期对象的getMonth()方法返回年    
      var dd = today.getDate();//通过日期对象的getDate()方法返回年     
      var hh = today.getHours();//通过日期对象的getHours方法返回小时   
      var mm = today.getMinutes();//通过日期对象的getMinutes方法返回分钟   
      var ss = today.getSeconds();//通过日期对象的getSeconds方法返回秒   
      // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09   
      MM = checkTime(MM);
      dd = checkTime(dd);
      mm = checkTime(mm);
      ss = checkTime(ss);
      var day; //用于保存星期（getDay()方法得到星期编号）
      if (today.getDay() == 0) day = "星期日 "
      if (today.getDay() == 1) day = "星期一 "
      if (today.getDay() == 2) day = "星期二 "
      if (today.getDay() == 3) day = "星期三 "
      if (today.getDay() == 4) day = "星期四 "
      if (today.getDay() == 5) day = "星期五 "
      if (today.getDay() == 6) day = "星期六 "
      $('.pc-time-show').text(yyyy + "年" + MM + "月" + dd + "日" + "  " + hh + ":" + mm + ":" + ss + "   " + day);
      $('.pc-time-YMDHMSshow').text(yyyy + "年" + MM + "月" + dd + "日" + "  " + hh + ":" + mm + ":" + ss);
        $('.pc-time-YMDHMshow').text(yyyy + "年" + MM + "月" + dd + "日" + "  " + hh + ":" + mm);
        $('.pc-time-YMDshow').text(yyyy + "年" + MM + "月" + dd + "日");
        $('.pc-time-HMSshow').text( hh + ":" + mm + ":" + ss );
        $('.pc-time-Dayshow').text(day);
        $('.pc-time-Yshow').text(yyyy + "年");
        $('.pc-time-Mshow').text(MM + "月");
        $('.pc-time-Dshow').text( dd + "日");
        $('.pc-time-Hshow').text(hh+"点");
        $('.pc-time-Mmshow').text( mm + "分");
        $('.pc-time-Sshow').text(ss+ "秒");
      
      setTimeout('startTime()', 1000);//每一秒中重新加载startTime()方法 
  }
  
  // 倒计时
   var timer=setInterval(countDown,1000);//每秒执行一次
  function countDown(){
    var nowTime=new Date();//获取当前时间
    var endTime=new Date(2019,1,1,8,0,0);//设置截止时间，并转换为何nowTime相同的格式，Data里面的参数(年,月,日,时,分,秒)
    var t=Math.floor((endTime-nowTime)/1000);//计算相差的时间，单位是秒
    var D=Math.floor(Math.floor(t/86400));//天（86400=24*3600）
    var H=Math.floor(t%86400/3600);//时
    var M=Math.floor((t%3600)/60);//分
    var S=t%60;//秒
    // 判断如果相差时间等于0，则停止
    if(t==0){
      clearInterval(timer);//清除执行
      $(".pc-time-countDownShow").text("成功起飞！");
    }else{
      $(".pc-time-countDownShow").text("距离结束时间还有："+checkTime(D)+"天"+checkTime(H)+":"+checkTime(M)+":"+checkTime(S));
    }
  }
   // 判断如果时间小于10前面补零
  function checkTime(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }