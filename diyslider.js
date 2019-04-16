//用该方法创建对象
// var a= new scrollPic({
//   box:'',//插入图片组的节点
//   time:2,//设置时间
//   picList:pic//图片组

// })
// 使用该对象的方法

function scrollPic(opt){
  this.box = $(opt.box);
  this.picList = opt.picList;
  this.time = opt.times || 3;
  this.init();
  this.create();
}
scrollPic.prototype = {
  init:function(){
    //获取整个框架的宽高
    this.boxWid = this.box.innerWidth();
    this.boxHei = this.box.innerHeight();
  },
  create:function(){
    var box = this.box;
    var w = this.boxWid;
    var h = this.boxHei;
    var list = this.picList;
    var len = list.length;
    var oUl = "";
    var oSpan = "";
    //创建图片容器和切换按钮
    for(var i = 0;i<list.length;i++){
      oUl+= "<li><a href="+list[i].href+"alt='' title=''><img src="+list[i].url+"></a></li>"//长串字符串
      oSpan+= "<span></span>";
    }
    oUl = "<ul>" + oUl + "</ul>";
    oSpan = "<div>"+oSpan+"</div>";
    //创建上一张和下一张点击按钮
    var prev = "<a id='prev'>&lt;</a>";
    var next = "<a id='next'>&gt;</a>";
 

    //插入到大容器中
    box.append(oUl);
    box.append(oSpan);
    box.append(prev);
    box.append(next);
    //给图片容器、切换按钮、上一张、下一张创建样式
    box.find('ul li').css({
      width:w+'px',
      height:h+'px',
      listStyle:'none',
      opacity:'1',
      ilter:'alpha(opacity=100)'
    
    })
    box.find('ul li a').css({
      display:'block',
      width:'100%',
      height:'100%',
      border:0
    })
    box.find('ul li a img').css({
      display:'block',
      width:'100%',
      height:'100%',
      border:0,
      
    })
    box.find('div').css({
      width:w*0.3 + 'px',
      position:"absolute",
      bottom:"10%",
      left:w*0.35+'px'
    })
    box.find('div span').css({
      display:"block",
      float:"left",
      width:((w*0.1)-(len*10*1))/len+'px',
      height:((w*0.1)-(len*10*1))/len+'px',
      borderRadius:"50%",
      backgroundColor:"pink",
      opacity:.5,
      margin:"0 10px"
    })
    box.find('#prev').css({
      width:h*0.15 + 'px',
      height:h*0.1 + 'px',
      lineHeight:h*0.1 + 'px',
      fontSize:h*0.1+ 'px',
      textAlign:"center",
      display:'block',
      position:'absolute',
      left:'0',
      top:h*0.45+'px',
      textDecoration:"none",
      color:"pink",
      background:'rgba(0,0,0,.2)',
      display:"none"
    })
    box.find('#next').css({
      width:h*0.15 + 'px',
      height:h*0.1 + 'px',
      lineHeight:h*0.1 + 'px',
      fontSize:h*0.1+ 'px',
      textAlign:"center",
      display:'block',
      position:'absolute',
      right:'0',
      top:h*0.45+'px',
      textDecoration:"none",
      color:"pink",
      background:'rgba(0,0,0,.2)',
      display:"none"
    })
  },
  // 无缝轮播图
  move:function(){
    var box = this.box;
    var w = this.boxWid; //获取容器宽度
    var h = this.boxHei;//获取容器高度
    var list = this.picList;
    var ball = box.find('ul');
    var cells = ball.find('li');
    var prev = box.find('#prev');
    var next = box.find('#next');
    var btns = box.find('div span');
    var bigW = (cells.length + 1)*w + 'px';//多留一张图片的宽度实现无缝
    var time = this.time;
    var animated =true;
    btns.eq(0).css('backgroundColor','red');
    if(timer){
      clearInterval(timer);
    }
    var timer;
    var _Index = 0;
    var len = cells.length;//图片张数
    box.css({
      position:"relative",
      overflow:"hidden"
    });
    ball.css({
      position:"absolute",
      left:"0",
      top:"0",
      overflow:"hidden",
      width:bigW,
      padding:"0",
      margin:"0"
    })
    cells.css({
      float:"left"
    })
    cells.eq(0).clone().appendTo(ball);
    timer = setInterval(autoPlay,time*1000);
    //鼠标滑动到上面
    box.hover(function(){
         clearInterval(timer);
         prev.show();
         next.show();
    },function(){
         timer=setInterval(autoPlay,time*1000);
         prev.hide();
         next.hide();
    })
    //点击每一个按钮
    btns.click(function(){
       _Index=$(this).index();
       changeView()
     })
     //切换图片
    function changeView(){
      animated = false;
      ball.stop().animate({
        "left":-_Index*w
      },function(){
          animated = true;
          if(_Index>=len){
          ball.css('left',0);
        }
      })
      btns.css('backgroundColor','pink').eq(_Index%len).css('backgroundColor','red');
    }
    //下一张
    next.click(function(){
        if(!animated){
            return
        }
        if(_Index>=len){
            _Index=0;
            ball.css({"left":0})
        }
        _Index++;
        changeView()
    })
    //上一张
    prev.click(function(){
         if(!animated){
             return
         }
         if(_Index<=0){
             _Index=len;
             ball.css({"left":-_Index*w})
         }
         _Index--;

         changeView()
    })
//自动播放
    function autoPlay(){
      if(_Index>=len){
        _Index = 0;
        ball.css("left","0")
      }
      _Index++;
      changeView();
    }
  },
 
}
