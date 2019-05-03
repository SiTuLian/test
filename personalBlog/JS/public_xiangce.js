$(function(){


    var $lastbtn = $("#lastbtn");
    var $closebtn = $("#closebtn");
    var $nextbtn = $("#nextbtn");
    var $bookpages = $(".bookpage");
    var $introduces = $(".introduce");
    var $role_imgs = $(".role-img");

    var $tsk = $("#tsk");
    var $tishi_p = $("#tishi-p");
    var $tishi_btn = $("#tishi-btn");


    var pageNum = 0;

    var pageTimeNext = null;
    var pageTimeLsst = null;

   var maxPageIndex = 3000;//底数为3000
   var maxImageIndex = 2999;//底数为2999
   
   var bookpages_sum = $bookpages.length;//获取相册的页数
   maxPageIndex += 2*bookpages_sum;
   maxImageIndex += 2*bookpages_sum;

   for(let i = 1; i<$bookpages.length; ++i){

       $bookpages.get(i).style.zIndex = maxPageIndex;
       

       $introduces.get(i-1).style.zIndex = maxPageIndex;
       

       maxPageIndex -= 2;
       

       $role_imgs.get(i-1).style.zIndex = maxImageIndex;
       
       maxImageIndex -= 2;

   }


   var this_role_imgs = null;
   var zIndexNum = null;

    $nextbtn.click(function(){

        if(pageTimeNext){
            clearTimeout(pageTimeNext);
            pageTimeNext = null;
        }

        if(pageNum < $bookpages.length-2){
                ++pageNum;
                console.log(pageNum);
            

            if(pageNum != 1){
            
                $bookpages.get(pageNum).style.zIndex = (this_role_imgs-0)+1+"";

                zIndexNum = $bookpages.get(pageNum).style.zIndex;
            
            }

            $bookpages.get(pageNum).classList.add("runClass");
            
            var getNum = pageNum-1;

            
            
            
            pageTimeNext = setTimeout(function(){


                if(pageNum == 1){
                    zIndexNum = $bookpages.get(pageNum).style.zIndex;
                }

                $role_imgs.get(getNum).style.zIndex = (zIndexNum-0)+1+"";

                
                this_role_imgs = $role_imgs.get(getNum).style.zIndex;
                
                
                
                // $role_imgs.get(pageNum-1).classList.remove("display-none");
                // $introduces.get(pageNum-1).classList.add("display-none");

                


            },1000);
        }else{
            $tishi_p.text("这是最后一页了");
            $tsk.css("display","block");
        }
        
        
        
    });

   
    $lastbtn.click(function(){

        if(pageTimeLsst){
            clearTimeout(pageTimeLsst);
            pageTimeLsst = null;
        }

        if(pageNum >= 1){

            var getNum = pageNum-1;

            $bookpages.get(pageNum).classList.remove("runClass");
            
            pageTimeLsst = setTimeout(function(){
                
                var zIndexNum = $introduces.get(getNum).style.zIndex;

                $role_imgs.get(getNum).style.zIndex = (zIndexNum-0)-1+"";
                $bookpages.get(pageNum).style.zIndex = zIndexNum;


                --pageNum;

            },1000);

        }else{
            $tishi_p.text("这是第一页了");
            $tsk.css("display","block");
        }

        
    });

    $tishi_btn.click(function(){
        $tsk.css("display","none");
    })

    $closebtn.click(function(){
        $(".fanye-div").css("display","none");
        $(".footclose").css("display","block");
    });

    $(".footclose").click(function(){
        $("#xiangce").css("display","none");
    });

    $(".xiangcefengmian").click(function(){
        $(".fanye-div").css("display","block");
        $(".footclose").css("display","none");
    });

    $("#xiangece-div").click(function(){
        $("#xiangce").css("display","block");
    })
});