$(function(){

  //获取设备宽度
  const windowWidth = parseInt($(window).width())
  
  const imgWidth = parseInt($('#bg-img').width())

  let col = parseInt(imgWidth / windowWidth);
  console.log(col);

  $('.logn-img-box').remove()

  const $pages = $('.page');


  for(let i = 1; i<$pages.length; ++i){
    console.log(i*windowWidth + 'px')
    $($pages[i]).css({
      backgroundPositionX: -(i*windowWidth) + 'px'
    })
  }
  

  //获取DOM
  const $DOMAuidoControl = $('.auido-control')
  const DOMAuido = document.querySelector('audio');

  //进入页面默认播放音乐
  let play = true;
  //默认转动音乐图标
  $DOMAuidoControl.addClass('img-box-rotate');

  /*
    点击控制音频的播放和图标的转动
  */
  $DOMAuidoControl.click(function(){
    play = !play;
    if(play){
      $DOMAuidoControl.addClass('img-box-rotate');
      DOMAuido.play();
    }else{
      $DOMAuidoControl.removeClass('img-box-rotate');
      DOMAuido.pause();
    }
  })

  const audioDuration = DOMAuido.duration;
  DOMAuido.ontimeupdate = function(){
    if(DOMAuido.ended){
      DOMAuido.play();
    }
  }

  //进场时元素动画登场
  const $DOMChuan = $('.chuan')
  const $DOMPosition11 = $('.position11');

  //获取动画文字
  const $DOMPosition7 = $('.position7');
  const $DOMPosition8 = $('.position8');

  function startAn(){
    $DOMPosition7.animate({
      top: 26+'%'
    }, 2000, function(){
  
      $DOMPosition8.animate({
        top:26+'%'
      }, 2000, function(){
  
        $DOMChuan.animate({
          opacity: 1
        }, 2000, function(){
  
          $DOMPosition11.animate({
            opacity: 1
          }, 2000)
  
        })
  
      })
  
    })
  }  

  startAn();

  

  
  //获取页面盒子
  const $DOMPageBox = $('.page-box');

  const $DOMPage2Position2 = $('.page2-position2')
  const $DOMPage2Position3 = $('.page2-position3');
  
  //前进
  $DOMPosition11.click(function(){

    $DOMPageBox.animate({
      marginLeft: -(1*windowWidth)+'px'
    }, 3000, function(){

      $DOMPosition11.css({
        opacity: 0
      })
      $DOMPosition7.css({
        top: -50+'%'
      })
      $DOMPosition8.css({
        top: -50+'%'
      })

      $DOMPage2Position2.animate({
        opacity: 1,
        left: 8+'%'
      }, 2000, function(){
        $DOMPage2Position3.animate({
          opacity: 1
        },1000)
      })
    })
    
  })

  const $page4_position1 = $(".page4-position1");
  const $page4_position2 = $(".page4-position2");

  $DOMPage2Position3.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(3*windowWidth)+'px'
    }, 3000, function(){

      $DOMPage2Position2.css({
        left: 42+'%',
        opacity: 0
      })
      $DOMPage2Position3.css({
        opacity: 0
      })

      $page4_position1.animate({
        left: 4+'%',
        opacity: 1
      }, 2000, function(){
        $page4_position2.animate({
          opacity: 1
        }, 1000)
      })
    })
  })


  const $page6_position1 = $('.page6-position1')
  const $page6_position2 = $('.page6-position2')

  $page4_position2.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(5*windowWidth)+'px'
    }, 3000, function(){

      $page4_position1.css({
        left: -20+'%',
        opacity: 0
      })

      $page4_position2.css({
        opacity: 0
      })


      $page6_position1.animate({
        top: 7+'%',
        opacity: 1
      },2000, function(){
        $page6_position2.animate({
          opacity: 1
        }, 1000)
      })
    })
  })
 

  const $page9_position1 = $('.page9-position1')
  const $page9_position2 = $('.page9-position2')

  $page6_position2.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(8*windowWidth)+'px'
    }, 3000, function(){

      $page6_position1.css({
        top: -50+'%',
        opacity: 0
      })
      $page6_position2.css({
        opacity: 0
      })

      $page9_position1.animate({
        left: 10+'%',
        opacity: 1
      },2000,function(){
        $page9_position2.animate({
          opacity: 1
        })
      })
    })
  })

  const $chuan = $('.chuan')

  const $page11_position1 = $('.page11-position1')
  const $page11_position2 = $('.page11-position2')
  const $page11_position3 = $('.page11-position3')

  $page9_position2.click(function(){
    $chuan.css({
      display: 'none'
    })
    $DOMPageBox.animate({
      marginLeft: -(10*windowWidth)+'px'
    }, 3000, function(){

      $page9_position1.css({
        opacity: 0,
        left: -20+'%'
      })
      $page9_position2.css({
        opacity: 0
      })

      $page11_position1.animate({
        left: 31+'%'
      },1000, function(){
        $page11_position2.animate({
          left: 21+'%',
          opacity: 1
        }, 2000, function(){
          $page11_position3.animate({
            opacity: 1
          }, 1000)
        })
      })
    })
  })


  const $page13_position3 = $('.page13-position3')
  const $page13_position4 = $('.page13-position4')

  $page11_position3.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(12*windowWidth)+'px'
    },3000, function(){

      $page11_position1.css({
        left: -12+'%'

      })
      $page11_position2.css({
        left: -50+'%',
        opacity: 0
      })
      $page11_position3.css({
        opacity: 0
      })

      $page13_position3.animate({
        left: 44+'%',
        opacity: 1
      },2000, function(){
        $page13_position4.animate({
          opacity: 1
        }, 1000)
      })
    })
  })


  const $page15_position1 = $('.page15-position1')
  const $page15_position2 = $('.page15-position2')

  $page13_position4.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(14*windowWidth)+'px'
    },3000, function(){

      $page13_position3.css({
        left: 105+'%',
        opacity: 0
      })
      $page13_position4.css({
        opacity: 0
      })

      $page15_position1.animate({
        top: 5+'%',
        opacity: 1
      }, 2000, function(){
        $page15_position2.animate({
          opacity: 1
        }, 1000)
      })
    })
  })


  const $page17_position2 = $('.page17-position2')
  const $page17_position4 = $('.page17-position4')

  $page15_position2.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(16*windowWidth)+'px'
    }, 3000, function(){

      $page15_position1.css({
        top: -50+'%',
        opacity: 0
      })
      $page15_position2.css({
        opacity: 0
      })

      $page17_position2.animate({
        left: 20+'%',
        opacity: 1
      }, 2000, function(){
        $page17_position4.animate({
          opacity: 1
        }, 1000)
      })
    })
  })

  const $page19_position1 = $('.page19-position1')
  const $page19_position2 = $('.page19-position2')
  const $page19_position4 = $('.page19-position4')
  

  $page17_position4.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(18*windowWidth)+'px'
    }, 3000, function(){

      $page17_position2.css({
        left: -70+'%',
        opacity: 0
      })
      $page17_position4.css({
        opacity: 0
      })

      $page19_position2.animate({
        left: 63+'%',
        opacity: 1
      }, 2000, function(){
        $page19_position1.animate({
          left: 20+'%',
          opacity: 1
        }, 1000, function(){
          $page19_position4.animate({
            opacity: 1
          }, 1000)
        })
      })
    })
  })
 

  const $page21_position1 = $('.page21-position1')
  const $page21_position2 = $('.page21-position2')

  $page19_position4.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(20*windowWidth)+'px'
    }, 3000, function(){

      $page19_position1.css({
        left: -606+'%',
        opacity: 0
      })
      $page19_position2.css({
        left: 120+'%',
        opacity: 0
      })
      $page19_position4.css({
        opacity: 0
      })

      $page21_position1.animate({
        left: 10+'%',
        opacity: 1
      },2000, function(){
        $page21_position2.animate({
          opacity: 1
        }, 1000)
      })
    })
  })



  const $page23_position3 = $('.page23-position3')
  const $page23_position4 = $('.page23-position4')
  const $page23_position1 = $('.page23-position1')
  const $page23_position2 = $('.page23-position2')
  const $page23_position5 = $('.page23-position5')

  $page21_position2.click(function(){
    $DOMPageBox.animate({
      marginLeft: -(22*windowWidth)+'px'
    }, 3000, function(){

      $page21_position1.css({
        left: -60+'%',
        opacity: 0
      })
      $page21_position2.css({
        opacity: 0
      })

      $page23_position3.animate({
        opacity: 1
      }, 1000, function(){
        $page23_position4.animate({
          top: 23+'%',
          opacity: 1
        }, 1000, function(){
          $page23_position1.animate({
            opacity: 1
          }, 1000, function(){
            $page23_position2.animate({
              opacity: 1
            }, 1000, function(){
              $page23_position5.animate({
                opacity: 1
              }, 1000)
            })
          })
        })
      })
    })
  })

  $page23_position5.click(function(){

    $DOMPageBox.animate({
      marginLeft: -(0*windowWidth)+'px'
    }, 5000, function(){
      $page23_position3.css({
        opacity: 0
      })
      $page23_position4.css({
        opacity: 0,
        left: -80+'%'
      })
      $page23_position1.css({
        opacity: 0
      })
      $page23_position2.css({
        opacity: 0
      })
      $page23_position5.css({
        opacity: 0
      })

      $chuan.css({
        display: 'block',
        opacity: 0

      })

      startAn();
    })
    
  })

})