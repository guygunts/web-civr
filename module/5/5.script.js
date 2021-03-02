me.filename=0
me.Search = function(){
$('form#frmsearch').submit(function () {
		me.loading = true;
		var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		me.table.clear().draw();
		me.LoadDataconfig(1, page_size,text_search,me.filename)
		me.table.page.len(page_size).draw();

});
};
me.changedata=function(){
	me.filename=document.getElementById('fileName').value
	var page_size = $('#page_size').val();
	var text_search = $('#text_search').val();
	me.LoadDataconfig(1,page_size,text_search,me.filename)
	me.table.page.len(page_size).draw()
	if(me.filename ==0){
		document.getElementById("add").disabled=true	
	}else{
		document.getElementById("add").disabled=false
	}
}
me.LoadDataNameFile=function(page_id, page_size,search = '',readd=''){
	$.ajax({
		url: me.url + '-Viewfilename',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size , text_search : search},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :

						me.table = $('#example')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
								$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'Add',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: function ( e, dt, node, config ) {
									$('#exampleModal1').modal('show');
									document.getElementById('config_filename_no').value=''
									document.getElementById("configfilename").value=''
									document.getElementById("dumppath").value=''							
									document.getElementById("deletenamefile").disabled=true	
										}
                                })	
								],
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

						$('#example').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							let table = $('#example').DataTable();
						let rowData = table.rows( indexes ).data().toArray();
						$('#exampleModal1').modal({show:true});
						
						document.getElementById('config_filename_no').value=rowData[0].config_filename_no
						document.getElementById('configfilename').value=rowData[0].configfilename
						document.getElementById('dumppath').value=rowData[0].dumppath
						document.getElementById("deletenamefile").disabled=false
											
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
					$('a.toggle-vis').on( 'click', function (e) {
						e.preventDefault();

						// Get the column API object
						var column = me.table.column( $(this).attr('data-column') );

						// Toggle the visibility
						column.visible( ! column.visible() );
					} );
					
					break;
				default :
					alertify.alert(data.msg);
					break;
			}
		}
	});
				
}
me.LoadDataconfig = function(page_id, page_size,search = '',config_filename_no,readd=''){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size , text_search : search,config_filename_no:config_filename_no},
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
								dom: 'Bfrtip',
								buttons: [
								$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'Management',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: function ( e, dt, node, config ) {
										$('#myModal').modal('show');	
										me.LoadDataNameFile(1, 25,search = '',readd='')
										
										}
                                }),$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'Deploy',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: function ( e, dt, node, config ) {
									if(me.filename !== 0){
										me.generate()
									}
									
										}
                                })
									
								],
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
						document.getElementById("delete").disabled=false
						document.getElementById("Page").value=rowData[0].Page
						document.getElementById("item").value=rowData[0].item
						document.getElementById("value").value=rowData[0].value
						document.getElementById("config_no").value=rowData[0].config_no
						document.getElementById("valiablename").value=rowData[0].valiablename							
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
					me.LoadCboFileName('fileName',data.dropdown)
					if(me.filename != '0'){
					document.getElementById('fileName').value=me.filename
					}
					//$('a.toggle-vis').on( 'click', function (e) {
					//	e.preventDefault();

						// Get the column API object
					//	var column = me.table.column( $(this).attr('data-column') );

						// Toggle the visibility
					//	column.visible( ! column.visible() );
					//} );
					
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
	document.getElementById("Page").value=''
	document.getElementById("item").value=''
	document.getElementById("value").value=''
	document.getElementById("config_no").value=''
document.getElementById("valiablename").value=''	
	document.getElementById("delete").disabled=true	
}
me.deleteconfig= function (){
	if(document.getElementById("config_no").value == ''){
		return false
	}
	 var myData = {
		data:{
			"config_filename_no":me.filename,
			"config_no":document.getElementById("config_no").value,
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
                            alertify.success(data.msg);
							//me.table.clear().draw();
						   me.LoadDataconfig(1,page_size,'',me.filename)
                            //me.table.ajax.reload();
                            break;
                        default:
                            alertify.error(data.msg);
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
	if(document.getElementById("config_no").value == ''){	
    $('.modal').modal('hide');
					 var myData = {
		data:{
			"Page":document.getElementById("Page").value,
			"item":document.getElementById("item").value,
			"value":document.getElementById("value").value,
			"valiablename":document.getElementById("valiablename").value,
			"config_filename_no":me.filename
		}
    }
	var page_size = $('#page_size').val();

        var text_search = $('#text_search').val();
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
                            alertify.success('Add success');
							me.LoadDataconfig(1,page_size,text_search,me.filename)
						   
                            //me.table.ajax.reload();
                            break;
                        default:
                            alertify.error('add Fail!!');
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
			"Page":document.getElementById("Page").value,
			"item":document.getElementById("item").value,
			"value":document.getElementById("value").value,
			"config_no":document.getElementById("config_no").value,
			"valiablename":document.getElementById("valiablename").value,
			"config_filename_no":me.filename
		}
    }

		var page_size = $('#page_size').val();

        var text_search = $('#text_search').val();

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
                            alertify.success('Update success');
							me.LoadDataconfig(1,page_size,text_search,me.filename)
						   
                            //me.table.ajax.reload();
                            break;
                        default:
                            alertify.error('Update Fail!!!');
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

me.generate = function (){
		 var myData = {
		data:{
			"config_filename_no":me.filename
		}
    }
	    alertify.confirm("Do you want generate ?",
        function () {
            $.ajax({
                url: me.url + '-generate',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.mess);
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel generate');
        });
}
me.LoadCboFileName = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.config_filename_no)
            .text(result.configfilename)
            .appendTo("#" + val);
    });

};

me.addnamefile=function(){
	if(document.getElementById('config_filename_no').value == ''){
	if(document.getElementById("configfilename").value =='' ||document.getElementById("dumppath").value == ''){
		return false
	}
	
		 var myData = {
		data:{
			"configfilename":document.getElementById("configfilename").value,
			"dumppath":document.getElementById("dumppath").value,
		}
    }
	let checkdata = myData.data.dumppath.split('')
	if(checkdata.slice(-1).pop() != '/'){
		alertify.alert('Error', 'dumppath is wrong !');
		return false
	}
	    $('#exampleModal1').modal('hide');
		var page_size = $('#page_size').val();
       var text_search = $('#text_search').val();
	    alertify.confirm("Do you want add ?",
        function () {
            $.ajax({
                url: me.url + '-insertfilename',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.mess);
						me.LoadDataNameFile(1,page_size,text_search)
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
	}else{
		   var myData = {
		data:{
			"configfilename":document.getElementById("configfilename").value,
			"dumppath":document.getElementById("dumppath").value,
			"config_filename_no":document.getElementById('config_filename_no').value
			
		}
    }
	let checkdata = myData.data.dumppath.split('')
	if(checkdata.slice(-1).pop() != '/'){
		alertify.alert('Error', 'dumppath is wrong !');
		return false
	}
	var page_size = $('#page_size').val();
       var text_search = $('#text_search').val();
    $('#exampleModal1').modal('hide');
    alertify.confirm("Do you want Update.",
        function () {
            $.ajax({
                url: me.url + '-updatenamefile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            alertify.success(data.msg);
							me.LoadDataNameFile(1,page_size,text_search)
                            break;
                        default:
                            alertify.error(data.msg);
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Update');
        });
	}
}
me.deletenamefile=function(){
	if(document.getElementById("config_filename_no").value == ''){
		return false
	}
	 var myData = {
		data:{
			"config_filename_no":document.getElementById("config_filename_no").value,
		}
    }
    $('#exampleModal1').modal('hide');
		var page_size = $('#page_size').val();
        var text_search = $('#text_search').val();
    alertify.confirm("Do you want Delete.",
        function () {
            $.ajax({
                url: me.url + '-Deletefilename',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            alertify.success(data.msg);
							me.LoadDataNameFile(1,page_size,text_search)
                            break;
                        default:
                            alertify.error(data.msg);
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
	
}

function isNumber(evt, element) {

  var charCode = (evt.which) ? evt.which : event.keyCode

  if (
    (charCode != 45 || $(element).val().indexOf('-') != -1) && // “-” CHECK MINUS, AND ONLY ONE.
    (charCode != 46 || $(element).val().indexOf('.') != -1) && // “.” CHECK DOT, AND ONLY ONE.
    (charCode < 48 || charCode > 57))
    return false;

  return true;
}

/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	  $('.inputNumberDot').keypress(function(event) {
    return isNumber(event, this)
  });
	me.SetUrl();
	me.Search();
	me.LoadDataconfig(1, 25,'')
	if(me.filename ==0){
		document.getElementById("add").disabled=true	
	}else{
		document.getElementById("add").disabled=false
	}
});