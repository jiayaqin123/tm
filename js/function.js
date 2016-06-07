//1.获取类名的兼容函数
//classname:子容器的类名，类名要加引号
//obj:父容器
//【实质：ie6-8里面可以通过先获取[所需类名的标签]，来获取[所需的类名]】
//【注意：调用这个函数的时候第一个参数是一个字符串，要加引号】
//【注意：这个函数的返回值是一个数组，所以要对获得的类名的数组中的元素操作的时候----记得加上下标】
function getClass(classname,obj){
	var objs=obj || document;//只有一个为真它就是真，【注意：obj要放在前面，因为||有短路现象】
	//如果obj在就赋值给声明的obj，如果不存在，就把document赋值给obj（声明的obj表示从哪个对象里获取）
	if(objs.getElementsByClassName){//为真表示现代浏览器可以识别【注意：判断当前的浏览器的某一对象有没有这个“属性“或”方法“，若没有返回undefined】
		return objs.getElementsByClassName(classname);//直接返回，加类名
	}else{// 否则是IE浏览器（IE浏览器不识别obj.getElementsByClassName）
		var tnt=[];//定义一个空数组
		var alls=objs.getElementsByTagName("*");//获取对象所有的标签（*表示所有）
		for(var i=0;i<alls.length;i++){//for循环遍历所有获取的标签
			if(checkClass(alls[i].className,classname)){
                tnt.push(alls[i]);
			}//如果类名等于参数classname就把这个标签给了数组tnt
		}
		return tnt;//返回数组tnt
	}
}
// 检测拥有多个类名标签eg:<div class="big small"></div>
// str 传进去的字符串
// classname 类名
function checkClass(str,classname){
	var tt=str.split(" ");//将alls[i].className的类名进行分割并赋值给tt【注意：用了数组的方法split之后的返回值就是一个数组，所有tt可以不声明为数组】
    for(var j=0;j<tt.length;j++){//遍历分割后的数组
    	if(tt[j]==classname){
    		return true;// 如果有相等的返回真
    	}//【注意：return false;不可以写到if的else这里，会出现第一个不同就终止循环的情况，因为return有终止循环的作用】
    }
    return false;//没有返回假
}
/******************************************************************************/
//2.获取与设置对象的纯文本的兼容函数   
//obj：从哪个对象里来获取纯文本
//val：表示要设置的文本
//ff obj.textContent
//ie obj.innerText
function getText(obj,val){
	if(val!=undefined){
		if(obj.textContent || obj.textContent==""){//为真表示W3C浏览器
	    	obj.textContent=val;
	    }else{//表示IE
	    	obj.innerText=val;
	    }
	}else{
		if(obj.textContent){//为真表示W3C浏览器
    	return obj.textContent;
    }else{//表示IE
    	return obj.innerText;
    }
	}
    
}
/******************************************************************************/
//3.获取外部与行内样式的属性 
//IE  对象.currentStyle.["width"]
//FF  window.getComputedStyle(对象,null)["width"]
//obj:从哪个对象中获取样式
//attr:获取哪个属性
function getStyle(obj,attr){//形参
    if(obj.currentStyle){//IE
    	return parseInt(obj.currentStyle[attr]);
    }else{
    	//alert(1);
    	return parseInt(window.getComputedStyle(obj,null)[attr]);
    }
}
/******************************************************************************/
//4.document.getElementById()
//  $(".one");
//  $("#first");
//  $("div");
function $(selector,obj){
	var objs=obj || document;
	if(typeof selector=="string"){//判断selector是否是字符串
		selector=selector.replace(/^\s*|\s*$/g,"");// /^\s*|\s*$/g  找出字符串前后的空格并用空字符串替换，替换以后的结果覆盖原来的selector
		if(selector.charAt(0)=="."){//找出selector第一个字符，如果是"."
			return getClass(selector.slice(1),objs);//获取元素时应从selector的第二个字符开始
		}else if(selector.charAt(0)=="#"){//ID
			return objs.getElementById(selector.slice(1));
		}else if(/^[a-z|1-10]{1,10}$/g.test(selector)){
			return objs.getElementsByTagName(selector);
		}
	}else if(typeof selector=="function"){
			window.onload=function(){
				selector();
			}
		}
}



/*********************************************/
//获取子节点
 function getChilds(father,type){
 	var type=type||"a";
 	var childs=father.childNodes; 	
 	var arr=[];
 	for(var i=0;i<childs.length;i++){//元素
 		if(type=="a"){
 			if(childs[i].nodeType==1){
                arr.push(childs[i]);
 		    }
 		}else if(type=="b"){//元素+文本
            if(childs[i].nodeType==1||(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&childs[i].nodeType==3)){
            	arr.push(childs[i]);
            }
 		}
 	}
 	return arr;
 }




 /********************************/
//获取第一个子节点
 function getFirst(father){
 	return getChilds(father)[0];
 }
 /********************************************/
 //获取最后一个节点
 function getLast(father){
 	return getChilds(father)[getChilds(father).length-1];
 }
 /*********************************************/
 //获取指定的子节点
 function getnum(father,num){
 	return getChilds(father)[num];
 }
/*********************************************/
 //获取下一个兄弟节点
    function getDown(obj){
      var down=obj.nextSibling;
      while(down.nodeType==3||down.nodeType==8){
        down=down.nextSibling;
        if(down==null){
          return false;
        }
      }
      return down;
    }
/*********************************************/
//获取上一个兄弟节点
      function getUp(obj){
      var up=obj.previousSibling;
      if(up==null){
          return false;
        }
      while(up.nodeType==3||up.nodeType==8){
        up=up.previousSibling;
        if(up==null){
          return false;
        }
      }
      return up;
    }
// *********************************************
// 节点
// 插入到某个对象之后b
// 对象共有的方法一般是加载在原型上。原型只能给构造函数添加，
// 所以共有的方法是添加到对象的构造函数的原型上。
// this：指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象
Object.prototype.insertAfter=function(newobj,obj){
        var down=getDown(obj);//获取obj的下一个兄弟节点
        if(down){//如果存在下一个兄弟节点
          this.insertBefore(newobj,down);//将newobj放在兄弟节点的前面（也就是obj的后面）
        }else{//如果不存在表示obj是最后一个节点
          this.appendChild(newobj);//直接放在最后
        }
       }
// *********************************************
//将一个元素对象作为一个漂浮窗口
//div:漂浮窗口
//span:关闭按钮
//speedx:x轴的速度
//speedy:y轴的速度
function floatwindow(div,span,speedx,speedy){
	    div.style.position="fixed";
    	var div=$(".box")[0];
    	var span=$(".cha")[0];
    	var cheight=document.documentElement.clientHeight;//浏览器的高
    	var cwidth=document.documentElement.clientWidth;//浏览器的宽
    	var speedx=speedx||10;//x 速度
    	var speedy=speedy||10;//y 速度
    	var sheight=div.offsetHeight;//本身的高度
    	var swidth=div.offsetWidth;//本身的宽度
    	var t=setInterval(move,60);
    	function move(){
    		var selfleft=div.offsetLeft;//在左边的实际位置
    		var selftop=div.offsetTop;
    		var newleft=selfleft+speedx;
    		var newtop=selftop+speedy;
    		window.onresize=function(){
    			cheight=document.documentElement.clientHeight;
    			cwidth=document.documentElement.clientWidth;
    		}
    		if(newtop>=(cheight-sheight)){//下
    			newtop=cheight-sheight;
    			speedy*=-1;
    		}
    		if(newtop<=0){//上
    			newtop=0;
    			speedy*=-1;
    		}
    		if(newleft>=(cwidth-swidth)){//右
    			newleft=cwidth-swidth;
    			speedx*=-1;
    		}
    		if(newleft<=0){//左
    			newleft=0;
    			speedx*=-1;
    		}
    		div.style.left=newleft+"px";
    		div.style.top=newtop+"px";
    	}
    	div.onmouseover=function(){
    		clearInterval(t);
    	}
    	div.onmouseout=function(){
    		t=setInterval(move,60);
    	}
    	span.onclick=function(){
    		div.style.display="none";
    	}
    }

/*********************************************/
//同一事件添加多个处理程序的兼容函数
function addEvent(obj,event,fun){
    if(obj.addEventListener){
        return obj.addEventListener(event,fun,false);
    }else{
        return obj.attachEvent("on"+event,fun);
    }
}
/*********************************************/
//滚轮往上往下兼容
function mouseWheel(obj,upfun,downfun){
    if(obj.attachEvent){ 
        obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera
    }else if(obj.addEventListener){ 
        obj.addEventListener("mousewheel",scrollFn,false);  //chrome,safari    -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz-
    }

    function scrollFn(e){
        var ev=e||window.event;
        if(ev.preventDefault){
            ev.preventDefault();//阻止默认浏览器动作(W3C)
        }else{
            ev.returnValue=false;//IE中阻止函数器默认动作的方式
        }
        if(ev.detail==-3 || ev.wheelDelta==120){
            if(upfun){
                upfun();
            }
        }
        if(ev.detail==3 || ev.wheelDelta==-120){
            if(downfun){
                downfun();
            }
        }
    }
}


//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

/********************************/


//阻止事件流的兼容函数
//obj：事件对象
function stopEvent(obj){
    if(obj.stopPrppagation){
         obj.stopPrppagation();//FF
    }else{
        obj.cancelBubble=true;//IE
    }
}

/*************************************************/
//阻止浏览器的默认行为的兼容函数
function stopClient(obj){
    if(obj.preventDefault){
        obj.preventDefault();//阻止默认浏览器动作(W3C)
    }else{
        obj.returnValue=false;//IE中阻止函数器默认动作的方式
    }
}