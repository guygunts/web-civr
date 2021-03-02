me.filename=0
me.Search = function(){
$('form#frmsearch').submit(function () {
		me.loading = true;
		var page_size = $('#page_size').val();
		me.table.clear().draw();
		me.table.page.len(page_size).draw();

});
};
me.changedata=function(){
	me.filename=document.getElementById('fileName').value
	var page_size = $('#page_size').val();
	var text_search = $('#text_search').val();
	me.LoadDataconfig(1,page_size,text_search,me.filename)
	me.table.page.len(page_size).draw()
	
	
}
me.LoadDataconfig = function(page_id, page_size,readd=''){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size },
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
					if(Object.entries(me.table).length > 0){
						me.tablesub={}
						$('#tbView').DataTable().destroy();
						$("#tbView").empty();
					}			
						me.table = $('#tbView')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								columnDefs: [
									{
										"width": "5%",
										"targets": 0,
										"searchable": false
									}
								],
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								select: true,
								iDisplayLength : page_size,
								responsive: false,
								scrollX: true,
								pageLength: page_size,
								paging: true,
								lengthChange:false,
								data: data.data,
								columns: data.columns,
							});

						$('#tbView').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							let table = $('#tbView').DataTable();
						let rowData = table.rows( indexes ).data().toArray();
						$('#exampleModal').modal('show');
						document.getElementById('conf_value').value=rowData[0].conf_value
						document.getElementById('conf_name').value=rowData[0].conf_name	
						document.getElementById('conf_id').value=rowData[0].conf_id		
document.getElementById("delete").disabled=false						
        } )

					me.table.columns.adjust().draw('true');

					me.table.buttons(0, null).container().addClass('col');


					if(data.data == null){
							me.table.clear().draw();
					}
					if(data.name){
						$('title').text(data.name);
					}
					if(data.data){
						readd=1
						
					}
					if(readd == 1){						
if(data.data){
me.table.clear().draw();	
						me.table.rows.add(data.data).draw();
						
}else{
	me.table.clear().draw();
}
					}
		
					break;
				default :
					alertify.alert(data.msg);
					break;
			}
		}
	});
				
};
me.configadd = function(){
	$('#exampleModal').modal('show');
	document.getElementById("delete").disabled=true
	document.getElementById("frmadd").reset();
	
}
me.deleteconfig= function (){
	if(document.getElementById("conf_id").value == ''){
		return false
	}
	 var myData = {
		
		data:{
			"conf_id":document.getElementById("conf_id").value
		}
    }
	var page_size = $('#page_size').val();
    $('.modal').modal('hide');
    alertify.confirm("Do you want Delete.",
        function () {
            $.ajax({
                url: me.url + '-Delete',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
							me.LoadDataconfig(1, page_size)
                            alertify.success('Delete Success');
                            break;
                        default:
                            alertify.error('Delete Fail!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
}
me.configEdit = function () {
	if(document.getElementById("conf_id").value == ''){	
    $('.modal').modal('hide');
					 var myData = {
		data:{
			"conf_name":document.getElementById('conf_name').value,
			"conf_value":document.getElementById('conf_value').value
		}
    }
	var page_size = $('#page_size').val();

    alertify.confirm("Do you want Add.",
        function () {
            $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
							me.LoadDataconfig(1, page_size)
                            alertify.success('Add Success');							
                            break;
                        default:
                            alertify.error('Add Fail!!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Update');
        });
		
	}else{
    var myData = {
		data:{
			"conf_name":document.getElementById('conf_name').value,
			"conf_value":document.getElementById('conf_value').value,
			"conf_id":document.getElementById("conf_id").value
		}
    }

		var page_size = $('#page_size').val();


    $('.modal').modal('hide');
    alertify.confirm("Do you want Update.",
        function () {
            $.ajax({
                url: me.url + '-Edit',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
                            alertify.success('Update Success');
							me.LoadDataconfig(1, page_size)
                            break;
                        default:
                            alertify.error('Update Fail!!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Update');
        });
		}
};




me.filenameinput=0
me.Search = function(){
$('form#frmsearch_input').submit(function () {
		me.loading = true;
		var page_size = $('#page_size_input').val();
		me.tableinput.clear().draw();
		me.tableinput.page.len(page_size).draw();

});
};
me.changedatainput=function(){
	me.filenameinput=document.getElementById('fileName_input').value
	var page_size = $('#page_size_input').val();
	var text_search = $('#text_search').val();
	me.LoadDataconfiginput(1,page_size,text_search,me.filenameinput)
	me.tableinput.page.len(page_size).draw()
	
	
}
me.LoadDataconfiginput = function(page_id, page_size,readd=''){
	
	$.ajax({
		url: me.url + '-Viewinput',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size },
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
					if(me.tableinput){
					
						$('#tbView_input').DataTable().destroy();
						$("#tbView_input").empty();
					}			
						me.tableinput = $('#tbView_input')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								columnDefs: [
									{
										"width": "5%",
										"targets": 0,
										"searchable": false
									}
								],
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								select: true,
								iDisplayLength : page_size,
								responsive: false,
								scrollX: true,
								pageLength: page_size,
								paging: true,
								lengthChange:false,
								data: data.data,
								columns: data.columns,
							});

						$('#tbView_input').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							let table = $('#tbView_input').DataTable();
						let rowData = table.rows( indexes ).data().toArray();
						$('#exampleModal_input').modal('show');
						document.getElementById('conf_input_value').value=rowData[0].conf_input_value
						document.getElementById('conf_input_name').value=rowData[0].conf_input_name	
						document.getElementById('conf_input_id').value=rowData[0].conf_input_id	
document.getElementById("delete_input").disabled=false						
        } )

					me.tableinput.columns.adjust().draw('true');

					me.tableinput.buttons(0, null).container().addClass('col');


					if(data.data == null){
							me.tableinput.clear().draw();
					}
					if(data.name){
						$('title').text(data.name);
					}
					if(data.data){
						readd=1
						
					}
					if(readd == 1){						
if(data.data){
me.tableinput.clear().draw();	
						me.tableinput.rows.add(data.data).draw();
						
}else{
	me.tableinput.clear().draw();
}
					}
		
					break;
				default :
					alertify.alert(data.msg);
					break;
			}
		}
	});
				
};
me.configaddinput = function(){
	$('#exampleModal_input').modal('show');
	document.getElementById("delete_input").disabled=true
	document.getElementById("frmadd_input").reset();
	
}
me.deleteconfiginput= function (){
	if(document.getElementById("conf_input_id").value == ''){
		return false
	}
	 var myData = {
		
		data:{
			"conf_input_id":document.getElementById("conf_input_id").value
		}
    }
	var page_size = $('#page_size').val();
    $('.modal').modal('hide');
    alertify.confirm("Do you want Delete.",
        function () {
            $.ajax({
                url: me.url + '-Deleteinput',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
							me.LoadDataconfiginput(1, page_size)
                            alertify.success('Delete Success');
                            break;
                        default:
                            alertify.error('Delete Fail!!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
}
me.configEditinput = function () {
	if(document.getElementById("conf_input_id").value == ''){	
    $('.modal').modal('hide');
					 var myData = {
		data:{
			"conf_input_name":document.getElementById('conf_input_name').value,
			"conf_input_value":document.getElementById('conf_input_value').value
		}
    }
	var page_size = $('#page_size_input').val();

    alertify.confirm("Do you want Add.",
        function () {
            $.ajax({
                url: me.url + '-Addinput',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
							me.LoadDataconfiginput(1, page_size)
                            alertify.success('Add Success');							
                            break;
                        default:
                            alertify.error('Add Fail!!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Update');
        });
		
	}else{
    var myData = {
		data:{
			"conf_input_name":document.getElementById('conf_input_name').value,
			"conf_input_value":document.getElementById('conf_input_value').value,
			"conf_input_id":document.getElementById("conf_input_id").value
		}
    }

		var page_size = $('#page_size_input').val();


    $('.modal').modal('hide');
    alertify.confirm("Do you want Update.",
        function () {
            $.ajax({
                url: me.url + '-Editinput',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
                            alertify.success('Update Success');
							me.LoadDataconfiginput(1, page_size)
                            break;
                        default:
                            alertify.error('Update Fail!!');
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Update');
        });
		}
};



/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();
	me.Search();
	me.LoadDataconfig(1, 25)
	me.LoadDataconfiginput(1, 25)
});