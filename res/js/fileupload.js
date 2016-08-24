 function ajaxFileUpload(elementid,file)
{	
	var id = arguments[2] ? arguments[2] : '';
	$.ajaxFileUpload
	(
		{
			url:'?file='+file+'&action=upload',
			secureuri:false,
			fileElementId:elementid,
			dataType: 'json',
			success: function (data, status)
			{
				if(typeof(data.error) != 'undefined')
				{
					if(data.error)
					{
						alert(data.error);
					}else
					{
						alert('上传成功，文件信息'+data.msg);
						if(id == ''){
							$("#thumb").val(data.url);
							$('#thumb_show').attr('src',data.url);
						}else{
							$("#"+id).val(data.url);
							$('#'+id+'_show').attr('src',data.url);
						}

					}
				}
			},
			error: function (data, status, e){
				alert(e);
			}
		});
}