

$(function(){

    

    var $tbody = $("#houtaiguanli-table tbody");

    $("#btn-X").click(function(){
        $("#bianjiboke").css("display","none");

    });
    $("#bianji").click(function(){
        $("#bianjiboke").css("display","block");
        $("#erciyuan").css("background-color","rgb(67, 202, 150)");
    });

    $("#houtai").click(function(){
        $(".dongman").css("display","none");
        $(".houtaiguanli").css("display","block");

        $(this).css("background-color","rgb(67, 202, 150)");
        $("#erciyuan").css("background-color","");

        getTable();
    })

    $("#erciyuan").click(function(){
        $(".houtaiguanli").css("display","none");
        $(".dongman").css("display","block");

        $(this).css("background-color","rgb(67, 202, 150)");
        $("#houtai").css("background-color","");

        
    });

    

 

    

    
    $("#submit").click(function(){
        
        event.preventDefault();

        date = new Date();

        ++num;

        titleOne = $("#form-input").val();
        contentOne = $("#form-textarea").val();
        

        time= date.toLocaleDateString();
  
       

        xuhao.push(num);
        title.push(titleOne);
        content.push(contentOne);
        author_arr.push(author);
        publishTime.push(time);

       
        alert("发布成功！");

        $("#form-input").val("");
        $("#form-textarea").val("");
        
    });
    
    function getTable(){
        
        
        $tbody.empty();

        for(let i = 0; i<xuhao.length; ++i){

            $tr = $("<tr></tr>");
            
            $td1 = $("<td></td>");
            $td1.text(xuhao[i]);
            $tr.append($td1);

            $td2 = $("<td></td>");
            $td2.text(title[i]);
            $tr.append($td2);


            $td3 = $("<td></td>");
            $td3.text(content[i]);
            $tr.append($td3);

            $td4 = $("<td></td>");
            $td4.text(publishTime[i]);
            $tr.append($td4);

            $td5= $("<td class='table-td-delete'></td>");
            $td5.text("删除");
            $tr.append($td5);

            $tbody.append($tr);
        }

   
    }

    var str_num;
    
    $("#houtaiguanli-table").on("click",".table-td-delete",function(){
        var str = $(this).prev().prev().prev().prev().text();

        for(let i = 0; i<xuhao.length; ++i){
            if(str == xuhao[i]){
                str_num = i;
                break;
            }
        }

        xuhao.splice(str_num,1);  
        title.splice(str_num,1);
        content.splice(str_num,1);
        author_arr.splice(str_num,1);
        publishTime.splice(str_num,1);

        $(this).parent().remove();
    });
   

   

});