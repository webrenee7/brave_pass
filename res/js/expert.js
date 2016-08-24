//全选功能
function checkallreply(){
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

function showHideWindow(winId,closeId,cancelId){
	//---------------居中显示，获取浏览器居中值----------
	var __widowWidth = $(window).width();
	var __popWidth = $("#"+winId).width(); //要显示的弹出框的id
	var __left = (__widowWidth - __popWidth)/2 + 'px';
	var __windowHeight = $(window).height();
	var __popHeight = $("#"+winId).height();
	var __top = (__windowHeight-__popHeight)/2 + 'px'; 
	//---------------E-------------------------------
	$.blockUI({
    	theme:true,
        message: $('#'+winId),
        themedCSS: {
          	 left:__left,
          	 top:__top,
          	 position:'fixed'
        }
    });
	if(typeof cancelId != "undefined"){
		$('#'+cancelId).click(function () {
	        $.unblockUI();
	    });
	}
	if(typeof closeId != "undefined"){
		$('#'+closeId).click(function () {
	        $.unblockUI();
	    });
	}
}


//批量删除
function delete_info(){
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
		var url = '?action=delete';
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

/*删除一个用户*/
function deleteOneInfo(contentid){
	var contentid = parseInt(contentid);
	if(confirm("确定删除吗？")){
		var data={contentid:contentid};
		var url = '?action=delete';
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

/**
 * 显示回复框
 */
function showReply(contentid){
	$(".reply").hide();
	$("#reply"+contentid).show();
	$("#answer"+contentid).val('');
}

function answer(contentid){
	var content = $.trim($("#answer"+contentid).val());
	if(content == ''){
		alert('回答内容不能为空');
		$("#answer"+contentid).focus();
		return;
	}
	var url = '?action=answer';
	var data = {
			content:content,
			contentid:contentid
	};
	$.post(url,data,function(msg){
		if(msg == 'success'){
			alert('提交成功');
			window.location.reload(true);
		}else if(msg == 'parameter_error'){
			alert("参数错误");
		}else{
			alert('提交失败，请重新提交');
			return;
		}
	});
}

function showAddWindow(){
	$('#titleInfo').html('新增');
	$('#contentid').val(0);
	$('#content').val('');
	showHideWindow('addoreditwindow','cancel','close');
	
}

function showEditWindow(contentid){
	var url = '?action=showedit';
	var data = {
			contentid:contentid
	};
	$.post(url,data,function(json){
		$('#titleInfo').html('编辑');
		$('#contentid').val(json['contentid']);
		$('#content').val(json['title']);
		showHideWindow('addoreditwindow','cancel','close');
	},'json');

}

//添加或修改常用回复语
function doInfo(){
	var contentid = $.trim($("#contentid").val());
	var content = $.trim($("#content").val());
	if(!content){
		alert("内容不能为空");
		$("#content").focus();
		return;
	}
	
	if(contentid != 0){//如果有信息表示编辑
		var url = '?action=editreply';
		var data = {
				content:content,
				contentid:contentid
		};
		$.post(url,data,function(res){
				if(res == 'success'){
					alert("编辑成功");
					window.location.reload();
				}else if(res == 'parameter_error'){
					alert("参数错误");
				}else {
					alert("编辑失败");
				}
		});
	}else{
		var url = '?action=addreply';
		var data = {
				content:content
		};
		$.post(url,data,function(res){
				if(res == 'success'){
					alert("新增成功");
					window.location.reload();
				}else if(res == 'parameter_error'){
					alert("参数错误");
				}else {
					alert("新增失败");
				}
		});
	}
}

//弹出常用回复语
function showreplywindow(contentid){
	$('#current_contentid').val(contentid);
	$("input[name=replys]").attr('checked',false);
	showHideWindow('showreplywindow','cancel','close');
}

//获取选中的reply，并将其输出到回复框中
function seletedreply(){
	var contentid = $('#current_contentid').val();
	var obj = $("input[name=replys]:checked");
	var str = '';
	if(obj.length != 0){
		obj.each(function(){
			if(str){
				str += ',' ;
			}
			str += $(this).val();
		});
		$('#answer'+contentid).val(str);
	}
	$.unblockUI();
}










