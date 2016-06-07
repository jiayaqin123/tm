window.onload=function(){
	var imgs=getClass("imgBox")[0].getElementsByTagName("a");
	var btns=getClass("btnBox")[0].getElementsByTagName("li");
	var wheel=getClass("wheel")[0];
	var wheelBackground=["#FFEFCE","#E8E8E8","#C51925","#E8E8E8","#FF0066","#E90129"];
	var index=0;
	var t=setInterval(move,2000)//必须使时间函数成为一个全局变量，这样有利于使整个轮播只开启一个时间函数，否则会造成混乱
	function move(){
		index++;
		if(index>imgs.length-1){
			index=0;
		}
		if(index<0){//为左按钮而加
			index=imgs.length-1;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.zIndex="0";
			btns[i].style.background="#a5a5a5";	
		};
		imgs[index].style.zIndex="1";
		btns[index].style.background="#f3f3f3";
		wheel.style.background=wheelBackground[index];


	}

	for (var i = 0; i < btns.length; i++) {
		btns[i].index=i;

		btns[i].onclick=function(){
			for (var j = 0; j < btns.length; j++) {
				imgs[j].style.zIndex="0";
				btns[j].style.background="#a5a5a5";

			};
			imgs[this.index].style.zIndex="1";
		    this.style.background="#f3f3f3";
		    index=this.index;//使下一次从单击的下一个开始	
		}
	};
	
	wheel.onmouseover=function(){
		clearInterval(t);
	}
	wheel.onmouseout=function(){
		t=setInterval(move,2000)
	}
	












	var rmppBtnBox=getClass("rmppBtnBox")[0];//先获取大div的目的---1、缩小查找范围2、防止标签重复
	var rmppBtns=rmppBtnBox.getElementsByTagName("li");
	var rmppImgs=getClass("rmppImg");
	for (var i = 0; i < rmppBtns.length; i++) {
		rmppBtns[i].aa=i;//通过index这个属性，把 for循环的i 和 事件源的i 统一起来
		rmppBtns[i].onmouseover=function(){
			//console.log(rmppImgs[this.aa].style.zIndex)
			for (var j = 0; j < rmppImgs.length; j++) {
				rmppImgs[j].style.zIndex="0";//rmppImgs[j].style["z-index"]="0";访问属性也可以这样
			};//因为预解析是先对变量名和函数名解析，所以会出现i==3的情况
			rmppImgs[this.aa].style.zIndex="1";//this是指当前的事件源
		}
	};


















}