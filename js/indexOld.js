$(function(){
            var img_url='';
            var resources = [
                img_url+'images/img_top.png',
                img_url+'images/img_qhg.png',
                img_url+'images/img_qmsht.png',
                img_url+'images/img_mqgy.png',
                img_url+'images/img_mhg.png',
                img_url+'images/img_gzj.png',
                img_url+'images/logo.png',
                img_url+'images/icon_hg.png',
                img_url+'images/icon_hg_star.png',
                img_url+'images/btn_right.png',
                img_url+'images/btn_left.png',
                img_url+'images/people_bg.png',
                img_url+'images/logo_tx.png',
                img_url+'images/p1_btn_wyzt.png',
                img_url+'images/p2_title.png',
                img_url+'images/p2_qkg.png',
                img_url+'images/p2_piaodai.png',
                img_url+'images/p2_text_qkg.png',
                img_url+'images/p2_qmsht.png',
                img_url+'images/p2_text_qmsht.png',
                img_url+'images/p2_mqgy.png',
                img_url+'images/p2_text_mqgy.png',
                img_url+'images/p2_mhg.png',
                img_url+'images/p2_text_mhg.png',
                img_url+'images/p2_gzj.png',
                img_url+'images/p2_text_gzj.png',
                img_url+'images/p2_btn_ljzt.png',
                img_url+'images/icon_tx_kuang.png',
                img_url+'images/white_star.png',
                img_url+'images/icon_qi.png',
                img_url+'images/p3_pr_lrbg.png',
                img_url+'images/icon_dz.png',
                img_url+'images/icon_dz_time.png',
                img_url+'images/icon_f_left.png',
                img_url+'images/icon_f_right.png',
                img_url+'images/pop_bg_top.png',
                img_url+'images/pop_bg.png',
                img_url+'images/pop_bg_bottom.png',
                img_url+'images/p2_piaodai.png',
                img_url+'images/pop_title_yxgz.png',
                img_url+'images/gz_text01.png',
                img_url+'images/gz_text02.png',
                img_url+'images/btn_playgame.png',
                img_url+'images/pop_title_phb.png',
                img_url+'images/icon_shangdian.png',
                img_url+'images/btn_phb.png',
                img_url+'images/btn_playagrin.png',
                img_url+'images/pop_title_zxcg.png',
                img_url+'images/icon_heart.png',
                img_url+'images/cg_text.png',
                img_url+'images/btn_fxhy.png'
            ];
            var loadCount=0;
            function loaded(){
                loadCount++;
                var percent = parseInt(loadCount/resources.length*100);
                if(resources.length==loadCount){
                    //百分比进度
                    $("#lo_pr_bg").css("width",percent+'%');
                    $('.current').text(percent+'%');
                    startView();//开始页面
                }else{
                    $("#lo_pr_bg").css("width",percent+'%');
                    $('.current').text(percent+'%');
                }
            }
            function loadImg(src){
                var image = new Image();
                image.onload = loaded;
                image.onerror = loaded;
                image.src = src;
            }
            for(var i in resources){
                loadImg(resources[i]);

            }

});
function  startView() {
    $(".loading_page").fadeOut(300);
    $(".index_page").show().addClass("index_animation");
}
$(function(){
    $(".btn_music").bind('touchstart',function(){
        if ($(this).hasClass('rotate')){
            $(this).removeClass("rotate");
            $(this).find("audio").get(0).pause();
        }else{
            $(this).find("audio").get(0).play();
            $(this).addClass("rotate");
        }

    });
    //我要追星按钮
    $(".p1_btn_wyzt").bind('touchstart',function(){
        $(".index_page").fadeOut(300);
        $(".track_sel").fadeIn(300);
    });
    //立即追她
    $(".btn_ljzt").bind('touchstart',function(){
        var i=$(".flex-active-slide").index()+1;
        $(".track_sel").fadeOut(300);
        $(".game_page").fadeIn(300);
        $(".game_star").fadeIn(300);
        $(".game_bg").find("img").eq(i).fadeIn(300);
        $(".pop_box").fadeIn(300);
        var sceneI=$("#hd_scene");
        switch(i)
        {
            case 1:
                sceneI.html("秦王宫");
                break;
            case 2:
                sceneI.html("清明上河图");
                break;
            case 3:
                sceneI.html("明清宫苑");
                break;
            case 4:
                sceneI.html("梦幻谷");
                break;
            case 5:
                sceneI.html("广州街");
                break;
            default:
                return;
        }
        $(".btn_music").addClass("playgaming");
        $(".people_run").css("bottom","80px");

    });
    //开始游戏按钮
    $(".btn_playgame").bind('touchstart',function(){
       $(".page_gz_box,.pop_box").fadeOut(300);
        gameInit();

    });
    //游戏开始初始化
    function gameInit(){
        btnNumNow=0;
        gameTimeNow=gameTime;
        $("#meterNow").html(0+"m");
        $("#prBg").css("width","1%");
        timeNow=setInterval(function(){
            gameTimeNow--;
            if(gameTimeNow>=0){
                $("#game_time i").html(gameTimeNow+"秒");
            }else{
                clearInterval(timeNow);
                $(".page_sb_box,.pop_box").fadeIn(300);
                $("#game_time i").html(0+"秒");
            }

        },1000)
    }

    var leftTime;//定义点击左脚当前时间值；
    var rightTime;//定义点击右脚当前时间值；
    var btnTime;//定义两按钮时间差；
    var gameTime=30;//定义游戏时间；
    var gameTimeNow=gameTime;//定义游戏时间；
    var btnNum=100;//定义游戏按钮次数；
    var btnNumNow=0;//定义已按游戏按钮次数；
    var meterNum=1000;//定义游戏米数；
    var meterNumNow=0;//定义已走米数；
    var prBgNow=0;//定义进度条；
    var btnNumMete=Math.ceil(meterNum/btnNum);//定义点击一次走的米数；
   var gameScene=$(".game_scene");
   var peopleRun=$(".people_run");
    function paused(){
        gameScene.addClass("paused");
        peopleRun.addClass("paused");
    }
    pause=setTimeout(paused,1000);
    clearTimeout(pause);
    var runSel;
    //左脚按钮
    $(".btn_left").bind('touchstart',function(){
        leftTime= new Date().getTime();
        btnTime=Math.abs(leftTime-rightTime);
        if(btnTime<350){
            if(gameScene.has("fast")||peopleRun.has("fast")) {
                gameScene.addClass("game_anmation");
                peopleRun.addClass("run_ani");
            }
        }
        clearTimeout(pause);
        if(runSel==undefined){
            runSel=true;
        }
        if(runSel) {
            runSel=false;
            gameBtn()
        }else{
            gameScene.addClass("paused");
            peopleRun.addClass("paused");
        }
        if (peopleRun.has("run_ani")) {
            pause=setTimeout(paused, 1000);
        }
    });

    $(".btn_right").bind('touchstart',function(){
        rightTime= new Date().getTime();
        btnTime=Math.abs(leftTime-rightTime);
        if(btnTime<350){
            if(!gameScene.has("fast")||peopleRun.has("fast")) {
                gameScene.addClass("fast");
                peopleRun.addClass("fast");
            }
        }else{
            if(!gameScene.has("fast")||peopleRun.has("fast")) {
                gameScene.removeClass("fast");
                peopleRun.removeClass("fast");
            }
        }
        clearTimeout(pause);
        if(runSel==undefined){
            runSel=false;
        }
        if(!runSel) {
            runSel=true;
            gameBtn();
        }else{
            gameScene.addClass("paused");
            peopleRun.addClass("paused");
        }
        if (peopleRun.has("run_ani")) {
            pause=setTimeout(paused, 1000);
        }
    });
    function gameBtn(){
        gameScene.removeClass("paused");
        peopleRun.removeClass("paused");
        gameScene.addClass("game_anmation");
        peopleRun.addClass("run_ani");
        if(btnNumNow<btnNum){
            btnNumNow++;
            meterNumNow=btnNumMete*btnNumNow;
            prBgNow=(btnNumNow/btnNum)*100+"%";
            $("#prBg").css("width",prBgNow);
            if(meterNumNow<meterNum){
                $("#meterNow").html(meterNumNow+"m");
            }else{
                clearInterval(timeNow);
                $("#meterNow").html(meterNum+"m");
                $(".page_cg_box,.pop_box").fadeIn(300);
                $("#cg_time").html(gameTime-gameTimeNow+"S");
            }
        }else{
            $(".page_cg_box,.pop_box").fadeIn(300);
        }
    }
    //排行榜关闭按钮
    $(".btn_close").bind('touchstart',function(){
        $(".pop_box,.page_phb_box").fadeOut(300);

    });
    //打开排行榜按钮
    $(".btn_phb").bind('touchstart',function(){
        $(".page_phb_box").fadeIn(300);
        $(".page_sb_box").fadeOut(300);
        loaded();
    });
    //
    $(".btn_z").bind('touchstart',function(){
        $(".pop_box,.page_phb_box").fadeOut(300);
        gameInit();
    });
    $(".btn_p").bind('touchstart',function(){
        $(".page_phb_box").fadeIn(300);
        $(".page_cg_box").fadeOut(300);
        loaded();
    });
    $(".btn_playagrin").bind('touchstart',function(){
        $(".pop_box,.page_sb_box").fadeOut(300);
        gameInit();
    });
});
