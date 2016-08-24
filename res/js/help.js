function delete_questions(){
	var checkbox= $(":checkbox");
	var contentid=new Array();
	var j=-1;
	for(var i=0;i<checkbox.length;i++){
		if(checkbox[i].checked==true){
			j++;
			contentid[j]=checkbox[i].value;
		}
	}
	if(j==-1){
		alert("请选择修改项");
		return;
	}
	if(confirm("确定删除选中问题？")){
		var url="?file=help&action=delete"
		$.post(url,{contentid:contentid},function(data){
			if(data.success==true){
				alert('删除成功');
				location.href="?file=help&action=manage";
			}else{
				alert('删除失败');
				location.href="?file=help&action=manage";
			}
		},'json')
	}
}