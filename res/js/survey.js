//批量删除
function delete_question(){
	var info_array =new Array();
	
	$("table :checked").each(function () {//获取所有选中框
		var contentid=$(this).val();//获取id
		info_array.push(contentid);
		});
	
	if(info_array.length==0){
		alert('请选择要删除的内容！');
		return false;
	}
	if(confirm('确定删除所有选中内容么？')==true){
		var data={contentid:info_array};
		 var url="?file=survey&action=delete_question";
		 $.post(url, data, function(data) {
			 if(data==1){
					alert('删除成功');
					window.location.reload(true);
				}else{
					alert('删除失败')
				}           
	       });			 
	}
}