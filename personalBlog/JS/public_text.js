



$(function(){

    var zhuce_form_input;



    
    var t = sessionStorage.getItem("TITLE");
    var c = sessionStorage.getItem("CONTENT");

   

    $("title").text(t);
    $("#div1 h1").text(t);
    $("#div2 p").text(c);

    


    $("#fasong").click(function(){

        
        
        if(sessionStorage.getItem("fasong") == null){
            $("#zhuce").css("display","block");
        }
        if(sessionStorage.getItem("fasong") == 1){
          
            var date = new Date();

            var $div_yonghu = $("<div class='yonghu public-div'></div>");
            var $touxiang = $("<div class='touxiang'></div>");
            var $img = $("<img src></img>");
            var $span = $("<span></span>");
            var $div_huifuquyu = $("<div class='huifuquyu'></div>");
            var $div_time_loushu = $("<div class='time-loushu'></div>");
            var $hr = $("<hr/>");

            var num = sessionStorage.getItem("loushu");
            ++num;
            sessionStorage.setItem("loushu", num);

            $div_yonghu.insertBefore($(".huifukuang"));
            $div_yonghu.append($touxiang);
            $touxiang.append($img);

            $img.attr("src","img/public_text/yifangdaye.png");
            
            $div_yonghu.append($span);
            $span.text(sessionStorage.getItem("yonghu"));
            
            $div_yonghu.append($div_huifuquyu);
            $div_huifuquyu.text($("#huifu-input").val());

            $div_yonghu.append($div_time_loushu);
            $div_time_loushu.text(date.toLocaleDateString()+" "+num+"楼");
       

            
            $hr.insertBefore($(".huifukuang"));

            $("#huifu-input").val("");
        }
        

    });

    

    $("#zhuce-submit").click(function(){

        event.preventDefault();

        zhuce_form_input = $("#zhuce-form-input").val();

        if(sessionStorage.getItem("fasong") == null){

            sessionStorage.setItem("yonghu", zhuce_form_input);
            
            
            sessionStorage.setItem("fasong", 1);

            sessionStorage.setItem("loushu", 0);
        }

        

        $("#zhuce").css("display","none");




    })
});