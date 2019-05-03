$(function(){

    var $announcement = $("#announcement");
    var $btn_p = $("#btn-p");
    var audioWelcome = document.querySelector("#audio-welcome");
    audioWelcome.play()//播放音频
    var changeRotateY_time = null;//定时器
    var $muban = $("#muban");
    var $content_sp1 = $("#content-sp1");
    var $content_sp2 = $("#content-sp2");
    var $model = $("#model");
    var $close = $("#close");
    var $quxiao = $("#quxiao");
    var $pass = $("#pass");
    var $queding = $("#queding");
    var $muban_close = $("#muban-close");

    var num = 0;//每次旋转的角度
    var opacity_num = 0;//通知栏的透明度

    //通知栏沿Y轴旋转
    function changeRotateY(){
        
      
        $announcement.css("transform","rotateY("+num+"deg)");
      
        ++num;

        if(num%36 == 0){
            opacity_num += 0.1;
            $announcement.css("opacity",opacity_num);
            
        }

       

        if(num>360){
            
            if(changeRotateY_time){
                clearInterval(changeRotateY_time);
            }
        }
    }

    changeRotateY_time = setInterval(changeRotateY,10);

    $btn_p.click(function(){
        
        $muban.slideDown(1500);
    });
    
    $content_sp2.click(function(){
        sessionStorage.setItem("kanke", 1);
        location.href = "main.html";
    });

    $content_sp1.click(function(){
        $model.fadeIn(500);
    });

    $close.click(function(){
        $model.fadeOut(100);
        $pass.val("");
    });

    $quxiao.click(function(){
        $model.fadeOut(100);
        $pass.val("");
    });

    $queding.click(function(){
        
        var passWord = $pass.val();
        if(passWord == "123456"){
            sessionStorage.setItem("kanke", 0);
            location.href = "main.html";
        }else{
            $model.fadeOut(100);
            $pass.val("");
        }
    });

    $muban_close.click(function(){
        $muban.slideUp(1500);
    })

});