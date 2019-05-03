$(function(){

    function getLunTan(){
        $(".liulanban").empty();

        for(let i = 0; i<xuhao.length; ++i){
            var $liulantiezi_wenzhang = $("<div class='liulantiezi-wenzhang lf'></div");

            var $liulantiezi_text = $("<div class='liulantiezi-text'></div>");
            $liulantiezi_text.text(title[i]);
            $liulantiezi_wenzhang.append($liulantiezi_text);

            var $liulantiezi_time = $("<div class='liulantiezi-time'></div>");
            $liulantiezi_time.text(publishTime[i]);
            $liulantiezi_wenzhang.append($liulantiezi_time);

            $(".liulanban").append($liulantiezi_wenzhang);

        }
    }

    

    $(".liulantiezi-close").click(function(){
        $("#liulantiezi").css("display","none");
    });

    $("#liulan").click(function(){

        getLunTan();

        $("#liulantiezi").css("display","block");
    });

    $(".liulanban").on("click",".liulantiezi-wenzhang",function(){
        
        var num = -1;
        var temp_title = $(this).children().eq(0).text();

        for(let i = 0; i<title.length; ++i){
            if(temp_title == title[i]){
                num = i;
                break;
            }
        }

        var temp_content = content[num];
        

        sessionStorage.setItem("TITLE", temp_title);
        sessionStorage.setItem("CONTENT", temp_content);
        window.open("public_text.html");
        
    });
    
});