$(document).ready(function(){

    //悬浮显示小红叉和半透明的色板
    $("#list li").live("hover",function(){
        $(this).children("a").css({opacity: 0.5});
        $(this).children("div .color_board").css({opacity: 0.5});
    });
    $("#list li").live("mouseleave",function(){
        $(this).children("a").css({opacity: 0});
        $(this).children("div .color_board").css({opacity: 0});
    });

    $(".destroy").live("hover",function(){
        $(this).css({opacity:1});
    });
    $(".destroy").live("mouseleave",function(){
        $(this).css({opacity:0.5});
    });

    $(".color_board").live("hover",function(){
        $(this).css({opacity:1});
    });
    $(".color_board").live("mouseleave",function(){
        $(this).css({opacity:0.5});
    });

    //鼠标悬浮弹出侧边栏
    $("#trigger").live("click",function(){
        $("#edit_area").animate({left: 0},200,function(){
            $("#trigger").hide();
            $("#note_button").css("margin-right","0");
            $("#input_color_board").css("margin-right","0");
        });
    });
    //点击空白处，隐藏侧边栏
    document.onclick=function(e){
        var e=e?e:window.event;
        var tar = e.srcElement?e.srcElement:e.target;
        if(tar.id!="edit_area" && tar.id!="note_input" && tar.id!="note_button" && tar.id!="trigger" && tar.parentNode.id!="input_color_board"){
            $("#edit_area").animate({left: -260},200,function(){
                $("#trigger").show();
                $("#note_button").css("margin-right","54px");
                $("#input_color_board").css("margin-right","54px");
            });
        }
    }

    //侧边栏随滚动条浮动
    $(window).scroll(function(){
        var temp_top = 100 + $(window).scrollTop();
        $("#edit_area").css("top",temp_top);
    });

    //随机生成li的margin，制造凌乱效果
//    $("#list li").each(function(){
//        var ran_margin = parseInt(Math.random()*(60-10+1)+0);
//        $(this).css("margin",ran_margin);
//    });
//    $("#note_button").live("click",function(){
//        $("#list li").each(function(){
//            var ran_margin = parseInt(Math.random()*(60-10+1)+0);
//            $(this).css("margin",ran_margin);
//        });
//    });

});