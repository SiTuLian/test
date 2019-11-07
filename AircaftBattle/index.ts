$(function(){

    //移动端设备的设配
    const BASESIZE:number = 75,BASEWIDTH:number = 375;
    let fontSize:any = (document.documentElement.clientWidth/BASESIZE * BASEWIDTH).toFixed(2);
    $("html").css("font-size",fontSize+'px');

    //获取相关元素
    let main_box:any = $("#main-box");
    let bg_height:number = 0;//背景移动的量
    let setMoveBg:any = null;//移动游戏背景的定时器变量
    let myPlane:any = $(".plane");//获取自己操控的飞机
    let body:any = $("body");
    let my_Plane:any = new MyPlane();
    let bullet:any = null;
    //点击开始按钮，淡出初始页面
    $("button").click(function(){
        
        $("#index-box").hide();
        main_box.show();
        moveBg();

  
        my_Plane.moveMyPlane();


        
    });
    
    function moveBg():void{

        

        setMoveBg = setInterval(function(){
            bg_height+=2;
			if(bg_height>main_box.height()){
				bg_height=0
			}
			//改变css样式
			main_box.css({'background-position-y':bg_height+'px'})
        },10);
    }

    


    class MyPlane{
        
        private starX:number = 0;
        private starY:number = 0;
        private pl:number = 0;
        private pt:number = 0;
        private left:number = 0;
        private right:number = 0;
        private top:number = 0;
        private bottom:number = 0;

        public oX:number = 0;
        public oY:number = 0;

        bullet = new Bullet();

        moveMyPlane():void{
            myPlane.on({touchstart:function(e:any):void{
                //获取手指按下时 手指对于屏幕的X Y轴距离
                this.starX = e.originalEvent.targetTouches[0].pageX;
                this.starY = e.originalEvent.targetTouches[0].pageY;

                //获取飞机盒子相当X Y轴偏移
				this.pl = myPlane.offset().left
				this.pt = myPlane.offset().top
                
                //计算飞机距离左边的长度
				this.left = this.starX - this.pl;
				//计算飞机距离右边的长度
				this.top = this.starY - this.pt;
				//计算飞机距离顶部的长度
				this.right = body.width() - myPlane.width()+this.left;
				//计算飞机距离底部的长度
                this.bottom = body.height() - myPlane.height()+this.top;
                
              
            },
                touchmove:function(e:any):void{
                    //实时获取手指的位置
                    this.oX = e.originalEvent.targetTouches[0].pageX;
                    this.oY = e.originalEvent.targetTouches[0].pageY;
                  
                    //判断飞机的距离
                    if(this.oX<this.left){this.oX=this.left}
                    if(this.oX>this.right){this.oX=this.right}
                    if(this.oY<this.top){this.oY=this.top}
                    if(this.oY>this.bottom){this.oY=this.bottom}
                        //调整css样式
                    $(this).css({
                        'left':this.oX - this.left+'px',
                        'top':this.oY - this.top+'px'
                    })
                }
            });
        }

     
      
    }

    class Bullet{


        createImgNote(left:number,top:number):void{
            let img = $("<img class='bullet-img'></img>");
            img.css({"top":top+'px',"left":left+'px'});      
            main_box.append(img);
        }

        
        moveBullet(oX:number,oY:number):void{
            let bullet_img:any = $(".bullet-img");

            let moveBulletTimer = setInterval(function(){
                let newTop:number = oY + 20;
                let newLeft:number = oX;
                bullet_img.css({"left":newLeft+'px',"top":newTop+'px'});
            },20);

            
        }
    }
})