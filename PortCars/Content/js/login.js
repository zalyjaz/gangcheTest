$(function () {
    // 中间登录框的高度
    $('body').css('height', window.innerHeight);
    $('#backDiv').css('height', window.innerHeight - 80);
    $('#backTop').css('height', (window.innerHeight - 630 - 80) / 2);

    // 中间登录框的高度的自适应
    $(window).resize(function () {
        $('body').css('height', window.innerHeight);
        $('#backDiv').css('height', $('body').height() - 80);
        $('#backTop').css('height', ($('body').height() - 630 - 80) / 2);
    });

    // 文本框获取焦点，提示语移动
    $('.inputText').focus(function () {
        if ($(this).attr('name') == 'account') {
            $(".noNull1,.inputError1").css("display", "none");
        }
        if ($(this).attr('name') == 'password') {
            $(".noNull2,.inputError2").css("display", "none");
        }
        if ($(this).attr('name') == 'account' && $(this).val() == '') {
            $('.inputTipAccount').animate({
                top: 10,
                fontSize: 14
            }, 200);
        } else if ($(this).attr('name') == 'password' && $(this).val() == '') {
            $('.inputTipPassword').animate({
                top: 10,
                fontSize: 14
            }, 200);
            $(".noNull2").css("display", "none");
            $(".inputError2").css("display", "none");
        }
        $(this).css('border-bottom', '1px solid #003cc8');
    })

    // 文本框失去焦点，提示语恢复
    $('.inputText').blur(function () {

        if ($(this).attr('name') == 'account' && $(this).val().length == 0) {
            $('.inputTipAccount').animate({
                top: 37,
                fontSize: 16
            }, 200);
            $(".inputError1").css("display", "none");
        } else if ($(this).attr('name') == 'password' && $(this).val().length == 0) {
            $('.inputTipPassword').animate({
                top: 37,
                fontSize: 16
            }, 200)
        }
        $(this).css('border-bottom', '1px solid #d8d8d8');
    })

        // 记住密码的多选框按钮的变化
        var isBlue = true;
        $('.checkB input').click(function () {
            if (isBlue) {
                $(this).siblings('.blueImg').css('display', 'block');
                $(this).siblings('.grayImg').css('display', 'none');
            } else {
                $(this).siblings('.grayImg').css('display', 'block');
                $(this).siblings('.blueImg').css('display', 'none');
            }
            isBlue = !isBlue;
        });
  
    //微信图标变化
        $('.wechat_icon').mouseenter(function () {
            $('.wechat_icon img').attr('src', '../../Content/img/login/wechat_color.png');
        });
        $('.wechat_icon').mouseleave(function () {
            $('.wechat_icon img').attr('src', '../../Content/img/login/wechat_Gray.png');
        });


$("input").attr("autocomplete", "off");
})

//判断输入框是否为空
function checkNull() {
    var account = $(".account").val();
    var password = $(".password").val();
    if (account === "") {
        $(".noNull1").css("display", "block");
        $(".account").css("border-bottom", "1px solid #f00");
    } else if (password === "") {
        $(".noNull2").css("display", "block");
        $(".password").css("border-bottom", "1px solid #f00");
    }
}

//短信验证码的发送
function noteVerify() {
    $(".account").keyup(function () {
        var phoneLength = $(".account").val();
        var shu = phoneLength.replace(/\D+/g, '');//限制只能输入数字
        $(".account").val(shu);
        //  计时秒数
        if (phoneLength.length == 11) {
            $(".inputError1").css("display", "none");
            $(".account").css("border-bottom", "1px solid #d8d8d8");
            $('.verific').css("color", "#003cc8");
            var timeCount = 89;
            var setIntervals = null;
            var isTimeJudge = true;
            $('.verific').click(function (event) {
                if (isTimeJudge) {
                    isTimeJudge = false;
                    $('.verific').text('90秒后重新输入');

                    setTimeout(function () {
                        $('.layerTip').text('短信验证码已发送至' + '150****1231' + '的手机号\n请注意查收');
                        $('.layerTip').fadeIn(1000);
                    }, 1000);

                    setTimeout(function () {
                        $('.layerTip').fadeOut(1000);
                    }, 5000)

                    setIntervals = setInterval(function () {
                        $('.verific').text(timeCount + '秒后重新输入');
                        timeCount--;
                        if (timeCount <= 0) {
                            clearInterval(setIntervals);
                            setIntervals = null;
                            $('.verific').text('获取验证码');
                            isTimeJudge = true;
                            timeCount = 89;
                        }
                    }, 1000)
                }
            });
        } else {
            $(".inputError1").css("display", "block");
            $(".account").css("border-bottom", "1px solid #f00");
        }
    });
}

