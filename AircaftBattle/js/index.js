"use strict";
$(function () {
    //移动端设备的设配
    const BASESIZE = 75, BASEWIDTH = 375;
    let fontSize = (document.documentElement.clientWidth / BASESIZE * BASEWIDTH).toFixed(2);
    $("html").css("font-size", fontSize + 'px');

    //获取相关元素
    let main_box = $("#main-box");
    let bg_height = 0; //背景移动的量
    
    let plane = $(".plane"); //获取自己操控的飞机
    let body = $("body");
    let bullet_img = $(".bullet-img");

    let heroScore = $('.show-header-sp1');
    let heroFlie = $('.show-header-sp2');

    let game_over = $("#game-over");

    //点击开始按钮，淡出初始页面
    $("button").click(function () {
        $("#index-box").hide();
        main_box.show();

        init();
        
        
    });

    

    //英雄机初始数据
    function MyPlane(){
        this.width = plane.width();
        this.height = plane.height();
        this.score = 0;
        this.life = 2;

    }

    //移动英雄机
    let starX,starY,pl,pt,left,top,right,bottom;//接收英雄机的方位

    MyPlane.prototype.moveMyPlane = function(){
        plane.on({ 
            touchstart: function (e) {
            //获取手指按下时 手指对于屏幕的X Y轴距离
            starX = e.originalEvent.targetTouches[0].pageX;
            starY = e.originalEvent.targetTouches[0].pageY;
            //获取飞机盒子相当X Y轴偏移
            pl = plane.offset().left;
            pt = plane.offset().top;
            
            
            //计算飞机距离左边的长度
            left = starX - pl;
            //计算飞机距离右边的长度
            top = starY - pt;
            //计算飞机距离顶部的长度
            right = body.width() - plane.width() + left;
            //计算飞机距离底部的长度
            bottom = body.height() - plane.height() + top;
        },
            touchmove: function (e) {
            //实时获取手指的位置
                let oX = e.originalEvent.targetTouches[0].pageX;
                let oY = e.originalEvent.targetTouches[0].pageY;
        
                //判断飞机的距离
                if (oX < left) {
                    oX = left;
                }
                if (oX > right) {
                    oX = right;
                }
                if (oY < top) {
                    oY = top;
                }
                if (oY > bottom) {
                    oY = bottom;
                }
                //调整css样式
                $(this).css({
                    'left': oX - left + 'px',
                    'top': oY - top + 'px'
                });
            }
        });
    }

    MyPlane.prototype.dieHeroPlane = function(){

        --this.life;
        heroFlie.text(`FILE: ${this.life}`);
 
        if(this.life <= 0){
            
            
            plane.css({
                background:"url(./images/planeb.gif)",
                backgroundSize: "100% 100%"
            });
            
            view.ViewGameOver();

        }
       
        
    }

    
     //实例化英雄机
     let myPlane = new MyPlane();
   
    /*---------------------------------------------------*/

    //定义子弹初始数据
   function Bullet(){
        this.bulletWidth = 6;
		this.bulletHeight = 14;
		this.bulletImg = 'images/bullet.png';
		this.createBulletElement = null;
		this.bulletLeft = null;
		this.bulletTop = null;
    }

    //创建子弹
   
    Bullet.prototype.createBullets = function(){
        //创建好子弹的元素
        this.createBulletElement = document.createElement('img');

        //先找到飞机的位置
        let planeX = plane.position().left;
        let planeY = plane.position().top;
        
        //子弹的位置位于飞机的垂直上方，水平中间
        this.bulletLeft = planeX + myPlane.width/2 - this.bulletWidth/2;
        this.bulletTop = planeY -  this.bulletHeight;

        //创建子弹的基本属性
        $(this.createBulletElement).css({
            width:this.bulletWidth,
			height:this.bulletHeight,
			position:'absolute',
			top:this.bulletTop,
            left:this.bulletLeft
        }).attr("src",this.bulletImg);

        main_box.append($(this.createBulletElement));
        
    }


    //移动子弹
    Bullet.prototype.moveBullets = function(index){


        this.bulletTop-=2;//子弹每次前进两个像素

        //超出视图，删除
		if(this.bulletTop<0){
			this.createBulletElement.remove();
			bullets.splice(index,1);
		}
		$(this.createBulletElement).css({
			//重新赋值
			top:this.bulletTop+'px'
        })
        
        this.wreckPlane(this.bulletLeft,this.bulletTop,this.bulletWidth,index);
    }

    
    //击毁敌机
    Bullet.prototype.wreckPlane = function(bulletLeft,bulletTop,bulletWidth,index){

        for(let i = 0; i<enemyPlane_arr.length; ++i){
            if(bulletTop <= enemyPlane_arr[i].EnemyPlaneTop+enemyPlane_arr[i].enemyPlaneHeight && bulletLeft+bulletWidth >= enemyPlane_arr[i].EnemyPlaneLeft && bulletLeft<=enemyPlane_arr[i].EnemyPlaneLeft+enemyPlane_arr[i].enemyPlaneWidth){
    
                --enemyPlane_arr[i].file;
                if(enemyPlane_arr[i].file <= 0){

                    myPlane.score += enemyPlane_arr[i].score;
                    enemyPlane_arr[i].dieEnemyPlane(i);
                    
                   
                    heroScore.text(`SCORE: ${myPlane.score}`);
                }
                
   
                this.createBulletElement.remove();
			    bullets.splice(index,1);
            }
        }
    }
    

    /*-------------------------------------------------------------- */


    function EnemyPlane(){
        
        this.enemyPlaneWidth = null;
        this.enemyPlaneHeight = null;
        this.enemyPlaneImg = null;
        this.enemyPlaneDieImg = null;
        this.file = null;
        this.score = null;

        this.type = Math.random();//随机定义飞机的种类


        this.createEnemyPlaneElement = null;
		this.EnemyPlaneLeft = null;
        this.EnemyPlaneTop = null;
        
    }


    //创建敌机

    let main_box_width = main_box.width();
    let main_box_height = main_box.height();
    EnemyPlane.prototype.createEnemyPlane = function(){
        //创建敌军飞机元素
        this.createEnemyPlaneElement = document.createElement('img');
        
        //定义敌机数据
        if(this.type >= 0.9){
            this.enemyPlaneWidth = 110;
            this.enemyPlaneHeight = 164;
            this.enemyPlaneImg = "images/enemy3.png";
            this.enemyPlaneDieImg = "images/enemy3b.gif";
            this.file = 10;
            this.score = 10;
       
        }else if(this.type >=0.6 && this.type<0.9){
            this.enemyPlaneWidth = 46;
            this.enemyPlaneHeight = 164;
            this.enemyPlaneImg = "images/enemy2.png";
            this.enemyPlaneDieImg = "images/enemy2b.gif";
            this.file = 5;
            this.score = 5;
   
        }else{
            this.enemyPlaneWidth = 34;
            this.enemyPlaneHeight = 24;
            this.enemyPlaneImg = "images/enemy1.png";
            this.enemyPlaneDieImg = "images/enemy1b.gif";
            this.file = 1;
            this.score = 1;
    
        }

        //敌军飞机位置

        // this.EnemyPlaneLeft = Math.random()*main_box_width;
        this.EnemyPlaneTop = -this.enemyPlaneHeight;

        do{
            this.EnemyPlaneLeft = Math.random()*main_box_width-this.enemyPlaneWidth;
        }while(this.EnemyPlaneLeft < 0);
        

        //赋予基本属性
        $(this.createEnemyPlaneElement).css({
            width:this.enemyPlaneWidth,
            height:this.enemyPlaneHeight,
            position:'absolute',
            left:this.EnemyPlaneLeft,
            top:this.EnemyPlaneTop
        }).attr("src",this.enemyPlaneImg);

        //将创建的元素添加进去
        main_box.append($(this.createEnemyPlaneElement));

      
    }


    //移动敌机
    EnemyPlane.prototype.moveEnemyPlane = function(index){

        this.EnemyPlaneTop+=2;
		if(this.EnemyPlaneTop>main_box_height){
			this.createEnemyPlaneElement.remove();
			enemyPlane_arr.splice(index,1);
		}
		$(this.createEnemyPlaneElement).css({
			//重新赋值
			top:this.EnemyPlaneTop+'px'
        })

        this.wreckHeroPlane( this.EnemyPlaneTop,this.EnemyPlaneLeft,this.enemyPlaneWidth,this.enemyPlaneHeight,index);
       
    }

    //敌机销毁

    let planeCemetery = new Array();//敌机的墓地
    EnemyPlane.prototype.dieEnemyPlane = function(index){
        $(this.createEnemyPlaneElement).attr("src", this.enemyPlaneDieImg);
        planeCemetery.push(enemyPlane_arr[index]);
        enemyPlane_arr.splice(index,1);

    }

    //击毁英雄机
    EnemyPlane.prototype.wreckHeroPlane = function(enemyPlaneTop,enemyPlaneLeft,enemyPlaneWidth,enemyPlaneHeight,index){

        let planeX = plane.position().left;
        let planeY = plane.position().top;

       
        if(enemyPlaneTop+enemyPlaneHeight >= planeY && planeX + myPlane.width >= enemyPlaneLeft && planeX<= enemyPlaneLeft + enemyPlaneWidth && planeY + myPlane.height >= enemyPlaneTop){
            this.dieEnemyPlane(index);
            myPlane.dieHeroPlane();
        }
        
    }

    /*---------------------------------------------------------------*/

    //视图对象，定义各个部件的定时器
    function View(){
        this.bulletTimer = null;//创建子弹的定时器
        this.moveBulletTimer = null;//地洞子弹的定时器
        this.moveBgTimer = null; //移动游戏背景的定时器
        this.createEnemyPlaneTimer = null;//创建敌机的定时器
        this.moveEnemyPlane_timer = null;//移动敌机的定时器
        this.recoveryWreckagePlaneTimer = null;//回收飞机残骸的定时器

        this.gemeOver = null;//游戏结束定时器

        this.createBulletsDelay = 100;//创建子弹的频率
        this.moveBulletDelay = 5;//移动子弹的频率
        this.moveBgDelay = 10;//移动游戏背景的频率
        this.createEnemyPlaneDelay = 200;//创建敌机的频率
        this.moveEnemyPlaneDelay = 10;//移动敌机的频率
        this.recoveryWreckagePlaneDelay = 800;//回收飞机残骸的频率

        this.renovateEnemyPlane1Time = 5;//每隔1秒刷新出类型1的敌机
        this.renovateEnemyPlane2Time = 15;//每隔3秒刷新出类型2的敌机
        this.renovateEnemyPlane3Time = 50;//每隔10秒刷新出类型3的敌机
        
    }
  

    let bullets = new Array();//保存子弹的数组
    
    View.prototype.VieeCreateBullets = function(){
        this.bulletTimer = setInterval(function(){
            let bullet = new Bullet();//实例化子弹对象
            bullet.createBullets();
            bullets.push(bullet);
            
        },this.createBulletsDelay)//100
    }
    
    View.prototype.moveBullet = function(){
        this.moveBulletTimer = setInterval(function(){
            for(var i =0 ;i<bullets.length;i++){
				//调用移动的方法
				bullets[i].moveBullets(i);
			}
        },this.moveBulletDelay)//5

    }

    //移动游戏背景
    View.prototype.moveBg = function(){
        this.moveBgTimer = setInterval(function () {
            bg_height += 2;
            if (bg_height > main_box.height()) {
                bg_height = 0;
            }
            //改变css样式
            main_box.css({ 'background-position-y': bg_height + 'px' });

            
        }, this.moveBgDelay);//10
    }

    //决定机型
    View.prototype.decisionTypePlane = function(renovateEnemyPlaneTime){
        if(renovateEnemyPlaneTime <= 0){
           
        }
    }

    //创建敌机
    let enemyPlane_arr = new Array();//存放敌机1的数组
    View.prototype.createEnemyPlane = function(){

        let renovateEnemyPlane1Time = this.renovateEnemyPlane1Time;
        let renovateEnemyPlane2Time = this.renovateEnemyPlane2Time;
        let renovateEnemyPlane3Time = this.renovateEnemyPlane3Time;

        this.createEnemyPlaneTimer = setInterval(function(){
      

            --renovateEnemyPlane1Time;
            --renovateEnemyPlane2Time;
            --renovateEnemyPlane3Time;

            
            if(renovateEnemyPlane1Time <=0){
                let enemyPlane = new EnemyPlane();
                enemyPlane.createEnemyPlane();
                enemyPlane_arr.push(enemyPlane);

                renovateEnemyPlane1Time = 5;
            }
            
            if(renovateEnemyPlane2Time <=0){
                let enemyPlane = new EnemyPlane();
                enemyPlane.createEnemyPlane();
                enemyPlane_arr.push(enemyPlane);

                renovateEnemyPlane2Time = 15;
            }

            if(renovateEnemyPlane3Time <=0){
                let enemyPlane = new EnemyPlane();
                enemyPlane.createEnemyPlane();
                enemyPlane_arr.push(enemyPlane);

                renovateEnemyPlane3Time = 50;
            }

          

            

     
        },this.createEnemyPlaneDelay);//200
    }

    //移动敌机
    View.prototype.moveEnemyPlane = function(){
        this.moveEnemyPlane_timer = setInterval(function(){
            for(let i = 0; i<enemyPlane_arr.length; ++i){
                enemyPlane_arr[i].moveEnemyPlane(i);
            }
        },this.moveEnemyPlaneDelay);//10
    }

    //回收飞机残骸
    View.prototype.recoveryWreckagePlane = function(){
        this.recoveryWreckagePlaneTimer = setInterval(function(){
            for(let i = 0; i<planeCemetery.length; ++i){
           
                planeCemetery[i].createEnemyPlaneElement.remove();
                planeCemetery.splice(i,1);
            }
        },this.recoveryWreckagePlaneDelay)//800
    }

    View.prototype.ViewGameOver = function(){

        //清除定时器
        clearInterval(this.bulletTimer);
        clearInterval(this.moveBulletTimer);
        clearInterval(this.moveBgTimer);
        clearInterval(this.createEnemyPlaneTimer);
        clearInterval(this.moveEnemyPlane_timer);
        clearInterval(this.recoveryWreckagePlaneTimer);

        for(let i = 0; i<bullets.length; ++i){
            bullets[i].createBulletElement.remove();
            bullets.splice(i,1);
        }

        for(let j = 0; j<enemyPlane_arr.length; ++j){
           
            enemyPlane_arr[j].createEnemyPlaneElement.remove();
            enemyPlane_arr.splice(j,1);
        }

        main_box.hide();
        game_over.show();
        
    
    }
    
  
    let view = new View();
   

    //游戏开始触发函数
    function init(){
        view.moveBg();
        myPlane.moveMyPlane();
        view.VieeCreateBullets();
        view.moveBullet();
        view.createEnemyPlane();
        view.moveEnemyPlane();

        view.recoveryWreckagePlane();
 
    }








   



  



    

    

   

    

    
    
    
    

    
});
