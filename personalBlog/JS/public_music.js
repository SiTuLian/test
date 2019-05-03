$(function(){

    var $music_div = $("#music-div");
    var music_time = null;

    var music_arr = {
        xuhao:[1,2,3,4,5,6,7,8,9,10,11,12],
        name:["You Say Run",
            "王者们的凯歌",
            "魑魅魍魉",
            "魁拔军歌",
            "梦在燃烧",
            "和平号角",
            "川流不息",
            "风中奇缘",
            "Take My Hand",
            "冠世一战",
            "青鸟",
            "山河令"
            ]
    }

    var $tbody = $("#tbody");
 
    

    for(let i = 0; i<music_arr.xuhao.length; ++i){
        
        var $td1 = $("<td></td>");
        $td1.text(music_arr.xuhao[i]);

        var $td2 = $("<td class='play'></td>");
        $td2.text(music_arr.name[i]);

  

        var $tr = $("<tr class='tr'></tr>");
        $tr.append($td1);
        $tr.append($td2);

        $tbody.append($tr);
    }

    var $play = $(".play");
    var audio = document.getElementById('audio');
    var last_music = 2;
    $play.get(last_music-1).style.color = "red";
    music_time = setInterval(get,1000);

    $play.dblclick(function(){
        var text = $(this).prev().text()-0;
        
        for(let i = 0; i<music_arr.xuhao.length; ++i){
            if( text == music_arr.xuhao[i]){
                
                if(last_music){
                    $play.get(last_music-1).style.color = "#000";
                }
                audio.src = "audio/audio_"+(text-1)+".mp3";
                last_music = text;
                $(this).css("color","red");
                audio.play();

                if(music_time){
                    clearInterval(music_time);
                    music_time = null;
                }

                music_time = setInterval(get,1000);

                break;
            }
        }
    });

    var $mus_close = $(".mus-close");
    $mus_close.click(function(){
        $music_div.css("display","none");
    });

    var $yinyue = $("#yinyue");
    $yinyue.click(function(){
        $music_div.css("display","block");
    });

    function get(){
        var bool = audio.ended;
        
        if(bool){
            $play.get(last_music-1).style.color = "#000";
            clearInterval(music_time);
            music_time = null;
        }
    }

    var bool_key_s = true;

    $(window).keydown(function(e){
       
        if(e.keyCode == 83){
           
            if(bool_key_s){
               
                audio.pause();
                bool_key_s = false;

            }else{
                audio.play();
                bool_key_s = true;
            }
        }
    })
    
});