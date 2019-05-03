$(function(){

    var bool = sessionStorage.getItem("kanke");

    if(bool == 1){
        $("#bianji").css("display","none");
    }else{
        $("#bianji").css("display","block");
    }
 

    var $dialog_box = $(".dialog-box");
    var $body = $("body");
    var $main_divs = $(".main-div");

    $body.mousemove(function(e){

        var x = e.clientX+20;
        var y = e.clientY;

        $dialog_box.css({"left":x,"top":y});
    });

    $main_divs.each(function(){
        
        $(this).hover(function(){
           
            $dialog_box.text($(this).attr("name"));
            $dialog_box.css("display","block");
        },function(){
            $dialog_box.css("display","none");
        })
    });

    

    
});