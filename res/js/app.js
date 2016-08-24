// JavaScript Document<script>
	function init(){
		var winW=document.documentElement.clientWidth;
		var winH=document.documentElement.clientHeight;
		var bg=document.getElementById("bg");
		var conH=bg.scrollHeight;
		if(conH<winH){
			bg.style.height=winH+"px";
			bg.style.backgroundSize=winW+"px "+winH+"px";    
		}else{
			bg.style.height=conH+"px";
			bg.style.backgroundSize=winW+"px "+conH+"px";
		}
	}