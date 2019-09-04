/**
 * create time is 2019/08/31
 * finish time is 2019/09/04
 * 
 */


$(function(){

    //动态改变font-size的大小
    document.documentElement.style.fontSize = document.documentElement.clientWidth/3.6+'px';

    //获取相关DOM
    let $box = $(".box");
    let gameOver = $(".gameOver");
    let text = $('.text');
    let divBtn = $(".divBtn");

    //4X4方格的行列的位置
    let line1 = [0,1,2,3];
    let line2 = [4,5,6,7];
    let line3 = [8,9,10,11];
    let line4 = [12,13,14,15];

    let col1 = [0,4,8,12];
    let col2 = [1,5,9,13];
    let col3 = [2,6,10,14];
    let col4 = [3,7,11,15];

    //判断滑动时间向哪滑动的必要参数
    let touch = {
        startX:null,
        startY:null,
        moveEndX:null,
        moveEndY:null,
        X:null,
        Y:null,
        direction:null
    };

    
    //视图每个隐式方块的坐标，是否存在方块，及该方块的对象
    let blockArr = [
        {x:1,y:1,bool:true,block:null,note:null},{x:1,y:2,bool:true,block:null,note:null},{x:1,y:3,bool:true,block:null,note:null},{x:1,y:4,bool:true,block:null,note:null},
        {x:2,y:1,bool:true,block:null,note:null},{x:2,y:2,bool:true,block:null,note:null},{x:2,y:3,bool:true,block:null,note:null},{x:2,y:4,bool:true,block:null,note:null},
        {x:3,y:1,bool:true,block:null,note:null},{x:3,y:2,bool:true,block:null,note:null},{x:3,y:3,bool:true,block:null,note:null},{x:3,y:4,bool:true,block:null,note:null},
        {x:4,y:1,bool:true,block:null,note:null},{x:4,y:2,bool:true,block:null,note:null},{x:4,y:3,bool:true,block:null,note:null},{x:4,y:4,bool:true,block:null,note:null}
    ];

    let div_position = $('.div-position');
    for(let i = 0; i<div_position.length; ++i){
        $(div_position[i]).css({
            left:( (blockArr[i].y - 1) * 0.8 ) + 0.05 + 'rem',
            top: ( (blockArr[i].x - 1) * 0.8 ) + 0.05 + 'rem'
        })
    }

    let blockArr_length = 16;//blockArr 表示数组的长度，模拟动态改变

    //方块阶级颜色
    let blockColor = [
        {
            num:2,
            color:"#55f3d1"
        },
        {
            num:4,
            color:"#55f377"
        },
        {
            num:8,
            color:"#559af3"
        },
        {
            num:16,
            color:"#7755f3"
        },
        {
            num:32,
            color:"#a755f3"
        },
        {
            num:64,
            color:"#f355d9"
        },
        {
            num:128,
            color:"#f35584"
        },
        {
            num:256,
            color:"#55a7f3"
        },
        {
            num:512,
            color:"#f3559f"
        },
        {
            num:1024,
            color:"#d955f3"
        },
        {
            num:2048,
            color:"#9cf355"
        }
    ]

    
 

    function Block(){
        this.num = 2;//方块上的数字
 
     
        /**
         * 创造方块
         * @return $div {DOM节点}
         */
        this.createBlock = function(){
            let $div = $(`<div class='box-child'></div>`);
            $box.append($div);
      
            return $div;
            
        }

        /**
         * 
         * 设置方块的背景颜色
         * @param $select {选择器}
         * @param color {背景颜色}
         * 
         */
        this.setBgColor = function($select,color){
            $select.css({
                backgroundColor:color
            })
        }

       

        /**
         *  显示数字
         * @param $select {选择器}
         * @param num {方块要显示的数字}
         */
        this.viewNum = function($select,num){
  
            $select.text(num);
        }

        
        /**
         * 判断所传递的val在哪一行
         * 
         */
        this.getLine = function(val,AD){

           
            if(0<= val && val <=3){
                
                AD=='A'?this.moveToWhereA(line1,val):this.moveToWhereD(line1,val);
            }
            if(4<= val && val <=7){
                AD=='A'?this.moveToWhereA(line2,val):this.moveToWhereD(line2,val);
             
            }
            if(8<= val && val <=11){
                AD=='A'?this.moveToWhereA(line3,val):this.moveToWhereD(line3,val);
             
            }
            if(12<= val && val <=15){
                AD=='A'?this.moveToWhereA(line4,val):this.moveToWhereD(line4,val);
             
            }

         
        }

        this.getCol = function(val,WS){

            if(val == 0 || val == 4 || val == 8 || val == 12){
                WS=='W'?this.moveToWhereA(col1,val):this.moveToWhereD(col1,val);
            }
            if(val == 1 || val == 5 || val == 9 || val == 13){
                WS=='W'?this.moveToWhereA(col2,val):this.moveToWhereD(col2,val);
            }
            if(val == 2 || val == 6 || val == 10 || val == 14){
                WS=='W'?this.moveToWhereA(col3,val):this.moveToWhereD(col3,val);
            }
            if(val == 3 || val == 7 || val == 11 || val == 15){
                WS=='W'?this.moveToWhereA(col4,val):this.moveToWhereD(col4,val);
            }
        }

        this.moveToWhereA = function(arr,val){
            let toIndex = null;//最后移动到的位置
            let remove = null;
            let index = arr.indexOf(val);
  
            if(arr[0] != val){
               
                for(let i = index-1; i>=0; --i){
                    
                    if(blockArr[arr[i]].bool){
                      
                        toIndex = arr[i];
                       
                    }else{
                      
              
                        let toIndexNum = blockArr[arr[i]].block.num;
                        let myNum = blockArr[val].block.num;
                        if(toIndexNum == myNum){
                            toIndex = arr[i];
                            
                            
                            remove = this.eatBlock(toIndex,toIndexNum,val,myNum);
                        }else{
                            toIndex = arr[i+1];
                         
                          
                        }

                        break;
                    }

                }

                //要移动的方块val   移动到哪toIndex
                //获得移动后的位置
          
                if(toIndex == val){

                    return ;
                }

                if( !(remove == true) ){
       

                    let x = blockArr[toIndex].x;
                    let y = blockArr[toIndex].y;

                    blockArr[val].note.animate({
                        left:( (y-1) * 0.8 ) + 0.05 + 'rem',
                        top: ( (x-1) * 0.8 ) + 0.05 + 'rem'
                    },200)
                    
    
                    blockArr[val].bool = true;
                    
                    blockArr[toIndex].bool = false;
                    
               
                    blockArr[toIndex].block = blockArr[val].block;
                    blockArr[val].block = null;
    
                    blockArr[toIndex].note = blockArr[val].note;
                    blockArr[val].note = null;
                }
               
                return ;
            }else{
                
                return ;
            }
            
        }

        

        this.moveToWhereD = function(arr,val){
            let toIndex = null;//最后移动到的位置
            let remove = null;
            let index = arr.indexOf(val);
     
        
            if(arr[arr.length-1] != val){
               
                for(let i = index+1; i<4; ++i){
                    
                    if(blockArr[arr[i]].bool){
                      
                        toIndex = arr[i];
                       
                    }else{
                        
                        let toIndexNum = blockArr[arr[i]].block.num;
                        let myNum = blockArr[val].block.num;
                        if(toIndexNum == myNum){
                            
                            
                            toIndex = arr[i];
                            remove = this.eatBlock(toIndex,toIndexNum,val,myNum);
                        }else{
                            toIndex = arr[i-1];
                            
                            
                        }

                        break;
                    }

                }

       
         
                if(toIndex == val){
      
                    return ;
                }
            
                if( !(remove == true)){
                 
        

                    let x = blockArr[toIndex].x;
                    let y = blockArr[toIndex].y;

                    blockArr[val].note.animate({
                        left:( (y-1) * 0.8 ) + 0.05 + 'rem',
                        top: ( (x-1) * 0.8 ) + 0.05 + 'rem'
                    },200)
                    
    
                    blockArr[val].bool = true;
                    
                    blockArr[toIndex].bool = false;
                    
               
                    blockArr[toIndex].block = blockArr[val].block;
                    blockArr[val].block = null;
                    blockArr[toIndex].note = blockArr[val].note;
                    blockArr[val].note = null;
                }
    
                
            }else{
                
                return ;
            }
            
        }

        

        this.eatBlock = function(toIndex,toIndexNum,val,myNum){

            blockArr[toIndex].note.remove();
            blockArr[toIndex].note = null;
    
            let x = blockArr[toIndex].x;
            let y = blockArr[toIndex].y;

            blockArr[val].note.animate({
                left:( (y-1) * 0.8 ) + 0.05 + 'rem',
                top: ( (x-1) * 0.8 ) + 0.05 + 'rem'
            },200)

            
            blockArr[val].bool = true;
            blockArr[toIndex].bool = false;

            ++blockArr_length;

            blockArr[toIndex].block.num = 0;
            let sum = toIndexNum + myNum;
            blockArr[val].block.num = sum;

            

            blockArr[toIndex].block = blockArr[val].block;
            blockArr[val].block = null;

            blockArr[toIndex].note = blockArr[val].note;
            blockArr[val].note = null;


            this.viewNum(blockArr[toIndex].note,blockArr[toIndex].block.num);

            for(let i = 0; i<blockColor.length; ++i){
                if(sum == blockColor[i].num){
                    this.setBgColor(blockArr[toIndex].note,blockColor[i].color);
                    break;
                }
            }

            if(sum == 2048){
                gameOver.css({
                    display:'block'
                })
                text.text("目标达成");
                divBtn.text("再玩一次");
            }

            return true;
            
        }
        
    }
    
    
    
    function View(){

       
        //将生成的方块布局到页面上
        this.noteArrPosition = function(){
            
            let block = new Block();
            let $div = block.createBlock();
            
            let random = parseInt(Math.random()*blockArr_length);
            let obj = this.getBlockArr_xy_Value(random);
     
        

            $div.animate({
                left:( (obj.y-1) * 0.8 ) + 0.05 + 'rem',
                top: ( (obj.x-1) * 0.8 ) + 0.05 + 'rem'
            },200)


            let sum = parseInt(Math.random()*100);

            if(sum%5 == 0){
                block.num = 4;
                block.viewNum($div,4);
                block.setBgColor($div,blockColor[1].color);
            }else{
                block.viewNum($div,2);
                block.setBgColor($div,blockColor[0].color);
            }
           
            

            
            
          
            let index = ((obj.x-1) * 4 + obj.y) - 1;
            blockArr[index].block = block;
            blockArr[index].note = $div;
           
            
        }

        
        //确定创建方块的坐标
        this.getBlockArr_xy_Value = function(random){
            let count = -1;
            for(let i = 0; i<blockArr.length; ++i){
                if(blockArr[i].bool == true){
                    count++;
  
                }else{
                    continue;
                }
               
                if(count == random){
                    let obj = {};
                    obj.x = blockArr[i].x;
                    obj.y = blockArr[i].y;

                    blockArr[i].bool = false;
                    --blockArr_length;
                    return obj;
                }
            }
        }

        
        //获取视图显示方块的地区方向向左
        this.getDisplayBlockA = function(){
            let arr = new Array();
            for(let i = 0; i<blockArr.length; ++i){
                 //blockArr[i].bool == false  视图上有方块，不为空
                if(!blockArr[i].bool){
                    arr.push(i);
                }
            }

            return arr;
        }

        //获取视图显示方块的地区方向向右
        this.getDisplayBlockD = function(){
            let arr = new Array();
            for(let i = blockArr.length-1; i>=0; --i){

                 //blockArr[i].bool == false  视图上有方块，不为空
                if(!blockArr[i].bool){
                    arr.push(i);
                }
            }

    
            return arr;
        }

        this.isGameOver = function(){
     
            if(blockArr_length == 0){
                return true;
            }else{
                return false;
            }
            
        }

    }
 
    

    let view = new View();

    
    
    $box.on("touchstart", function(e) {

        // e.preventDefault();

        touch.direction = null;

        touch.startX = e.originalEvent.changedTouches[0].pageX,
    
        touch.startY = e.originalEvent.changedTouches[0].pageY;
    
    });
    
    $box.on("touchmove", function(e) {
    
        e.preventDefault();
    
        touch.moveEndX = e.originalEvent.changedTouches[0].pageX,
    
        touch.moveEndY = e.originalEvent.changedTouches[0].pageY,
    
        touch.X = touch.moveEndX - touch.startX,
    
        touch.Y = touch.moveEndY - touch.startY;
    
        
    
    
        if ( Math.abs(touch.X) > Math.abs(touch.Y) && touch.X > 0 ) {
    
      
            touch.direction = 'D'//右滑动
           
        }
    
        else if ( Math.abs(touch.X) > Math.abs(touch.Y) && touch.X < 0 ) {
    
 
            touch.direction = 'A'//左滑动
          
        }
    
        else if ( Math.abs(touch.Y) > Math.abs(touch.X) && touch.Y > 0) {
    
   
            touch.direction = 'S'//下滑动
      
        }
    
        else if ( Math.abs(touch.Y) > Math.abs(touch.X) && touch.Y < 0 ) {
    
     
            touch.direction = 'W'//上滑动
      
        }else{
            
         
        }
    
       
    
    });

    

    divBtn.click(function(){
        
        blockArr_length = 16;
        for(let i = 0; i<blockArr.length; ++i){
            blockArr[i].block = null;
            blockArr[i].note.remove();
            blockArr[i].bool = true;
            
        }

        gameOver.css({
            display:'none'
        })

        init();

    })

    $box.on("touchend",function(e){
   
        switch(touch.direction){
            case 'A':
                    
                let arr1 = view.getDisplayBlockA();
             
                for(let i = 0; i<arr1.length; ++i){
                    let index = arr1[i];
                    let block = blockArr[index].block;
                    block.getLine(index,'A');
                    
                }
                let bool1 = view.isGameOver();
                if(!bool1){
                    view.noteArrPosition();
                }else{

                    gameOver.css({
                        display:'block'
                    })
                    text.text("游戏结束");
                    divBtn.text("重玩");
                }
                
                break;
            case 'D':
                let arr2 = view.getDisplayBlockD();
             
                for(let i = 0; i<arr2.length; ++i){
                    let index = arr2[i];
                    let block = blockArr[index].block;
                    block.getLine(index,'D');
                
                }

                let bool2 = view.isGameOver();
                if(!bool2){
                    view.noteArrPosition();
                }else{
                    gameOver.css({
                        display:'block'
                    })
                    text.text("游戏结束");
                    divBtn.text("重玩");
                }
                break;
            case 'W':
                let arr3 = view.getDisplayBlockA();
             
                for(let i = 0; i<arr3.length; ++i){
                    let index = arr3[i];
                    let block = blockArr[index].block;
                    block.getCol(index,'W');
                }
                let bool3 = view.isGameOver();
                if(!bool3){
                    view.noteArrPosition();
                }else{
                    gameOver.css({
                        display:'block'
                    })
                    text.text("游戏结束");
                    divBtn.text("重玩");
                }
                break;
            case 'S':
                let arr4 = view.getDisplayBlockD();
       
                for(let i = 0; i<arr4.length; ++i){
                    let index = arr4[i];
                    let block = blockArr[index].block;
                    block.getCol(index,'S');
                }
                let bool4 = view.isGameOver();
                if(!bool4){
                    view.noteArrPosition();
                }else{
                    gameOver.css({
                        display:'block'
                    })
                    text.text("游戏结束");
                    divBtn.text("重玩");
                }
                break;
        }
        
    })

    function init(){
        view.noteArrPosition();
        view.noteArrPosition();
        
    }

    init();
  

})