;
(function (window, $) {
    var sjPager = window.sjPager = {
        opts: {
            pageSize: 20,
            curPage: 1,
            lastPage: null,
            direct: 0,
            len: null,
            page: null,
            begin: null,
            end:null,
            tbodyName:null,
            paging:null,
            url: "",
            type: "POST",
            dataType: "JSON",
            postData:null,
            tbody:null,
            success: null,
            error: function () {
                parent.layer.msg("抱歉,请求出错,请重新请求！", {
                    title: '提示',
                    skin: 'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time: 0,
                    btn: ["确定"]
                });
            }
        },
        pagerElement:null,
        GetTableInit: function (obj, op) {
            var _self = this;

            _self.opts = $.extend({}, _self.opts, op);
            _self.pagerElement = obj;

            _self.doPage(_self.opts.curPage, _self.opts.pageSize);

            return _self.opts;
        },
        doPage:function(index,pageSize){
            var _self = this;

            _self.opts.curPage = index;
            _self.opts.pageSize = pageSize;

            $.ajax({
                type: _self.opts.type,
                data: $.extend({}, {
                    page: _self.opts.curPage,
                    example_length: _self.opts.pageSize || 6,
                }),
                dataType: _self.opts.dataType,
                url: _self.opts.url,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _self.opts.error(XMLHttpRequest, textStatus, errorThrown);
                },
                success: function (res) {
                    _self.opts.success(res.Data);
                    var trList = '';
                    data = JSON.parse(res.Data.list);
                    for (var i = 0; i < data.length; i++) {
                        var jsonH = data[i];
                        trList += '<tr><td><input type="checkbox" name="checkbox_name" onclick="" value="' + jsonH.id + '" /></td>';
                        var arr = [];
                        for (var k in jsonH) {
                            arr.push(jsonH[k]);
                        }
                    
                        for (var j = 1; j < arr.length; j++)
                        {
                            reg3a = /.*\..*/;   //判断是否含有小数点
                            comma = /[,]/g;    //判断是否含有逗号
                            //console.log(typeof(arr[j]));
                            if (j == 1) {
                                //trList += '<td class="i-number" onclick="canelchange()">' + arr[j] + '</td>';
                                trList += '<td class="i-number">' + arr[j] + '</td>';
                            } else if (typeof (arr[j]) === "number" || (reg3a.test(arr[j]) && comma.test(arr[j])))
                            { //如果数据是数据类型或则含有小数点，数字居右
                                trList += '<td class="shuju">' + arr[j] + '</td>';
                            } else{
                                trList += '<td>' + arr[j] + '</td>';
                            }
                        }
                        trList += '</tr>'
                    }
                    _self.opts.tbody.html(trList);

                    _self.opts.curPage = res.Data.page;
                    _self.opts.pageSize = res.Data.pagesize;
                    _self.opts.len = res.Data.count;

                    _self.CreatePagingHtml(_self.pagerElement);
                    _self.displayPageTools(_self.opts.curPage, _self.opts.pageSize, _self.opts.len);

                    return _self.opts;
                }
              

            });
        },
        displayPageTools: function (curpage, pagesize, len) {
            var _self = this;

            _self.opts.curPage = curpage;
            _self.opts.pageSize = pagesize;
            _self.opts.len = len;

            _self.opts.page = _self.opts.len % _self.opts.pageSize == 0 ? _self.opts.len / _self.opts.pageSize : Math.floor(_self.opts.len / _self.opts.pageSize) + 1;//根据记录条数，计算页数
            document.getElementById("btn0").innerHTML = "当前 " + _self.opts.curPage + "/" + _self.opts.page + " 页    每页 ";  // 显示当前多少页
            document.getElementById("sjzl").innerHTML = "数据总量 " + _self.opts.len + "";   // 显示数据量
            document.getElementById("pageSize").value = _self.opts.pageSize;


            $("#btn1").off('click').on('click', function firstPage() {    // 首页
                _self.opts.curPage = 1;
                _self.opts.direct = 0;
                _self.displayPage();
            });
            $("#btn2").off('click').on('click', function frontPage() {    // 上一页
                _self.opts.direct = -1;
                _self.displayPage();
            });
            $("#btn3").off('click').on('click', function nextPage() {    // 下一页
                _self.opts.direct = 1;
                _self.displayPage();
            });
            $("#btn4").off('click').on('click', function lastPage() {    // 尾页
                _self.opts.curPage = _self.opts.page;
                _self.opts.direct = 0;
                _self.displayPage();
            });
            $("#btn5").off('click').on('click', function changePage() {    // 转页
                _self.opts.curPage = document.getElementById("changePage").value * 1;
                if (!/^[1-9]\d*$/.test(_self.opts.curPage)) {
                    layer.msg("请输入正整数", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                if (_self.opts.curPage > _self.opts.page) {
                    layer.msg("超出数据页面", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                _self.opts.direct = 0;
                _self.displayPage();
            });


            $("#pageSizeSet").off('click').on('click', function setPageSize() {    // 设置每页显示多少条记录
                _self.opts.pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
                if (!/^[1-9]\d*$/.test(_self.opts.pageSize)) {
                    layer.msg("请输入正整数", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                _self.opts.page = _self.opts.len % _self.opts.pageSize == 0 ? _self.opts.len / _self.opts.pageSize : Math.floor(_self.opts.len / _self.opts.pageSize) + 1;//根据记录条数，计算页数
                _self.opts.curPage = 1;        //当前页
                _self.opts.direct = 0;        //方向
                _self.displayPage();

            });

            return _self.opts;
        },
        displayPage: function () {
            var _self = this;
            
            if (_self.opts.curPage <= 1 && _self.opts.direct == -1) {
                _self.opts.direct = 0;
                layer.msg("已经是第一页了", {
                    title:'提示',
                    skin:'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time:0,
                    btn:["确定"]
                });
                return _self.opts;
            } else if (_self.opts.curPage >= _self.opts.page && _self.opts.direct == 1) {
                _self.opts.direct = 0;
                layer.msg("已经是最后一页了", {
                    title: '提示',
                    skin: 'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time: 0,
                    btn: ["确定"]
                });
                return _self.opts;
            }

            _self.opts.lastPage = _self.opts.curPage;

            // 修复当len=1时，curPage计算得0的bug
            if (_self.opts.len > _self.opts.pageSize) {
                _self.opts.curPage = ((_self.opts.curPage + _self.opts.direct + _self.opts.len) % _self.opts.len);
            } else {
                _self.opts.curPage = 1;
            }


            document.getElementById("btn0").innerHTML = "当前 " + _self.opts.curPage + "/" + _self.opts.page + " 页    每页 ";        // 显示当前多少页

            _self.opts.begin = (_self.opts.curPage - 1) * _self.opts.pageSize + 1;// 起始记录号
            _self.opts.end = _self.opts.begin + 1 * _self.opts.pageSize - 1;    // 末尾记录号

            if (_self.opts.end > _self.opts.len) _self.opts.end = _self.opts.len;

            _self.GetTableInit(_self.pagerElement,{
                url: _self.opts.url,
                postData: 'page=' + _self.opts.curPage + '&example_length=' + _self.opts.pageSize,
                tbody: _self.opts.tbody,
                curPage: _self.opts.curPage,
            });

            return self.opts;
        },
        CreatePagingHtml: function (pagerelement) {
            var _self = this;
            _self.pagerElement = pagerelement;
            var htmlStr = '';
            htmlStr += '<span id="btn0" ></span>' +
                       '<input id="pageSize" type="text" size="1" maxlength="2" value="getDefaultValue()" />' +
                       '<span> 条 </span>' +
                       '<a href="#" id="pageSizeSet">设置</a>' +
                       '<span id="sjzl"></span>' +
                       '<a href="#" id="btn1">首页</a>' +
                       '<a href="#" id="btn2">上一页</a>' +
                       '<a href="#" id="btn3">下一页</a>' +
                       '<a href="#" id="btn4">尾页</a>' +
                       '<span>转到 </span>' +
                       '<input id="changePage" type="text" size="1" maxlength="4" />' +
                       '<span>页 </span>' +
                       '<a href="#" id="btn5">跳转</a>';

            _self.pagerElement.html(htmlStr);

        }

    }

    $.fn.sjAjaxPager = function (option) {
        return sjPager.GetTableInit($(this), option);
    };




    var sjPager2 = window.sjPager2 = {
        opts: {
            pageSize: 20,
            curPage: 1,
            lastPage: null,
            direct: 0,
            len: null,
            page: null,
            begin: null,
            end: null,
            tbodyName: null,
            paging: null,
            url: "",
            type: "POST",
            dataType: "JSON",
            postData: null,
            tbody: null,
            success: null,
            error: function () {
                parent.layer.msg("抱歉,请求出错,请重新请求！", {
                    title: '提示',
                    skin: 'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time: 0,
                    btn: ["确定"]
                });
            }
        },
        pagerElement: null,
        GetTableInit: function (obj, op) {
            var _self = this;

            _self.opts = $.extend({}, _self.opts, op);
            _self.pagerElement = obj;

            _self.doPage(_self.opts.curPage, _self.opts.pageSize);

            return _self.opts;
        },
        doPage: function (index, pageSize) {
            var _self = this;

            _self.opts.curPage = index;
            _self.opts.pageSize = pageSize;

            $.ajax({
                type: _self.opts.type,
                data: $.extend({}, {
                    page: _self.opts.curPage,
                    example_length: _self.opts.pageSize || 6,
                }),
                dataType: _self.opts.dataType,
                url: _self.opts.url,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _self.opts.error(XMLHttpRequest, textStatus, errorThrown);
                },
                success: function (res) {
                    _self.opts.success(res.Data);
                    var trList = '';
                    data = JSON.parse(res.Data.list);
                    for (var i = 0; i < data.length; i++) {
                        var jsonH = data[i];
                        trList += '<tr><td><input type="checkbox" name="checkbox_name" onclick="" value="' + jsonH.id + '" /></td>';
                        var arr = [];
                        for (var k in jsonH) {
                            arr.push(jsonH[k]);
                        }

                        for (var j = 1; j < arr.length; j++) {
                            reg3a = /.*\..*/;   //判断是否含有小数点
                            comma = /[,]/g;    //判断是否含有逗号
                            //console.log(typeof(arr[j]));
                            if (j == 1) {
                                trList += '<td class="i-number">' + arr[j] + '</td>';
                            } else if (typeof (arr[j]) === "number" || (reg3a.test(arr[j]) && comma.test(arr[j]))) { //如果数据是数据类型或则含有小数点，数字居右
                                trList += '<td class="shuju">' + arr[j] + '</td>';
                            } else {
                                trList += '<td>' + arr[j] + '</td>';
                            }
                        }
                        trList += '</tr>'
                    }
                    _self.opts.tbody.html(trList);

                    _self.opts.curPage = res.Data.page;
                    _self.opts.pageSize = res.Data.pagesize;
                    _self.opts.len = res.Data.count;

                    _self.CreatePagingHtml(_self.pagerElement);
                    _self.displayPageTools(_self.opts.curPage, _self.opts.pageSize, _self.opts.len);

                    return _self.opts;
                }


            });
        },
        displayPageTools: function (curpage, pagesize, len) {
            var _self = this;

            _self.opts.curPage = curpage;
            _self.opts.pageSize = pagesize;
            _self.opts.len = len;

            _self.opts.page = _self.opts.len % _self.opts.pageSize == 0 ? _self.opts.len / _self.opts.pageSize : Math.floor(_self.opts.len / _self.opts.pageSize) + 1;//根据记录条数，计算页数
            document.getElementById("btn0").innerHTML = "当前 " + _self.opts.curPage + "/" + _self.opts.page + " 页    每页 ";  // 显示当前多少页
            document.getElementById("sjzl").innerHTML = "数据总量 " + _self.opts.len + "";   // 显示数据量
            document.getElementById("pageSize").value = _self.opts.pageSize;


            $("#btn1").off('click').on('click', function firstPage() {    // 首页
                _self.opts.curPage = 1;
                _self.opts.direct = 0;
                _self.displayPage();
            });
            $("#btn2").off('click').on('click', function frontPage() {    // 上一页
                _self.opts.direct = -1;
                _self.displayPage();
            });
            $("#btn3").off('click').on('click', function nextPage() {    // 下一页
                _self.opts.direct = 1;
                _self.displayPage();
            });
            $("#btn4").off('click').on('click', function lastPage() {    // 尾页
                _self.opts.curPage = _self.opts.page;
                _self.opts.direct = 0;
                _self.displayPage();
            });
            $("#btn5").off('click').on('click', function changePage() {    // 转页
                _self.opts.curPage = document.getElementById("changePage").value * 1;
                if (!/^[1-9]\d*$/.test(_self.opts.curPage)) {
                    layer.msg("请输入正整数", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                if (_self.opts.curPage > _self.opts.page) {
                    layer.msg("超出数据页面", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                _self.opts.direct = 0;
                _self.displayPage();
            });


            $("#pageSizeSet").off('click').on('click', function setPageSize() {    // 设置每页显示多少条记录
                _self.opts.pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
                if (!/^[1-9]\d*$/.test(_self.opts.pageSize)) {
                    layer.msg("请输入正整数", {
                        title: '提示',
                        skin: 'layui-layer-lan',
                        move: false,
                        shade: 0.03,
                        time: 0,
                        btn: ["确定"]
                    });
                    return;
                }
                _self.opts.page = _self.opts.len % _self.opts.pageSize == 0 ? _self.opts.len / _self.opts.pageSize : Math.floor(_self.opts.len / _self.opts.pageSize) + 1;//根据记录条数，计算页数
                _self.opts.curPage = 1;        //当前页
                _self.opts.direct = 0;        //方向
                _self.displayPage();

            });

            return _self.opts;
        },
        displayPage: function () {
            var _self = this;

            if (_self.opts.curPage <= 1 && _self.opts.direct == -1) {
                _self.opts.direct = 0;
                layer.msg("已经是第一页了", {
                    title: '提示',
                    skin: 'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time: 0,
                    btn: ["确定"]
                });
                return _self.opts;
            } else if (_self.opts.curPage >= _self.opts.page && _self.opts.direct == 1) {
                _self.opts.direct = 0;
                layer.msg("已经是最后一页了", {
                    title: '提示',
                    skin: 'layui-layer-lan',
                    move: false,
                    shade: 0.03,
                    time: 0,
                    btn: ["确定"]
                });
                return _self.opts;
            }

            _self.opts.lastPage = _self.opts.curPage;

            // 修复当len=1时，curPage计算得0的bug
            if (_self.opts.len > _self.opts.pageSize) {
                _self.opts.curPage = ((_self.opts.curPage + _self.opts.direct + _self.opts.len) % _self.opts.len);
            } else {
                _self.opts.curPage = 1;
            }


            document.getElementById("btn0").innerHTML = "当前 " + _self.opts.curPage + "/" + _self.opts.page + " 页    每页 ";        // 显示当前多少页

            _self.opts.begin = (_self.opts.curPage - 1) * _self.opts.pageSize + 1;// 起始记录号
            _self.opts.end = _self.opts.begin + 1 * _self.opts.pageSize - 1;    // 末尾记录号

            if (_self.opts.end > _self.opts.len) _self.opts.end = _self.opts.len;

            _self.GetTableInit(_self.pagerElement, {
                url: _self.opts.url,
                postData: 'page=' + _self.opts.curPage + '&example_length=' + _self.opts.pageSize,
                tbody: _self.opts.tbody,
                curPage: _self.opts.curPage,
            });

            return self.opts;
        },
        CreatePagingHtml: function (pagerelement) {
            var _self = this;
            _self.pagerElement = pagerelement;
            var htmlStr = '';
            htmlStr += '<span id="btn0" ></span>' +
                       '<input id="pageSize" type="text" size="1" maxlength="2" value="getDefaultValue()" />' +
                       '<span> 条 </span>' +
                       '<a href="#" id="pageSizeSet">设置</a>' +
                       '<span id="sjzl"></span>' +
                       '<a href="#" id="btn1">首页</a>' +
                       '<a href="#" id="btn2">上一页</a>' +
                       '<a href="#" id="btn3">下一页</a>' +
                       '<a href="#" id="btn4">尾页</a>' +
                       '<span>转到 </span>' +
                       '<input id="changePage" type="text" size="1" maxlength="4" />' +
                       '<span>页 </span>' +
                       '<a href="#" id="btn5">跳转</a>';

            _self.pagerElement.html(htmlStr);

        }

    }

    $.fn.sjAjaxPager2 = function (option) {
        return sjPager2.GetTableInit($(this), option);
    };



})(window,jQuery);

//控制页数
function GetIframeBodyHeight(data, bodyheight, iframeName)
{
    var ifram = parent.document.getElementById(iframeName);//获取iframe父元素的名字

    var len = data.count;//获取一共有多少条数据
    var pageindex = data.page;
    var pagesize = data.pagesize;

    var page = len % pagesize == 0 ? len / pagesize : Math.floor(len / pagesize) + 1;
    var height = pageindex != page ? bodyheight + (pagesize * 30) : bodyheight + ((len % pagesize) * 30);
    ifram.style.height = height + 'px';
}



   



