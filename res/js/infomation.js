//全选功能
function checkall(){ 
	var checkedlist=$('table').find(':checkbox');
	var type=0;
	for (i=0;i <checkedlist.length;i++){ 
        if((checkedlist[i].checked)!= true){
        	type=1;
        }
	}
	if(type==1){//选中状态
		$('table').find(':checkbox').attr('checked',true);
	}else{//取消选中状态
		$('table').find(':checkbox').attr('checked',false);
	}
}

//批量删除
function delete_info(file){
	var action = arguments[1] ? arguments[1] : 'delete';
	var info_array =new Array();
	
	$("table :checked").each(function () {//获取所有选中框
		var contentid=$(this).val();//获取id
		info_array.push(contentid);
		});
	
	if(info_array.length==0){
		alert('请选择要删除的内容！');
		return false;
	}
	var contentid = info_array.join("|");
	if(confirm('确定删除所有选中内容么？')==true){
		var data={contentid:contentid};
		 var url="?file="+file+"&action="+action;
		 $.post(url, data, function(data) {
			 if(data==1){
					alert('删除成功');
					window.location.reload(true);
				}else{
					alert('删除失败');
				}           
	       });	
		 
	}
}

function showImportData(){
    $.blockUI({
        message:$("#import_data"),
        css:{
        	 cursor: 'auto',
        	 padding:        0,
             margin:         0,
             top:            '30%', 
             left:           '35%', 
             textAlign:      'left', 
             color:          '#000', 
             border:         '2px solid #5075C3'             	
        },
        overlayCSS:  {
            backgroundColor:'#999999', 
            opacity:        '0.8' 
        }
    });
}
