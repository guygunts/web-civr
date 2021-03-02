
var grammar_id
var project_id
var project_id_sub
var grammar_id_sub
var file_id_sub
me.changedata=function(){
	var page_size = $('#page_size').val();
	let project=document.getElementById('top_project_id').value
	me.LoadData(1,page_size,project)	
}
me.LoadDatafile=function(grammar_id,page_id, page_size,project_id,readd=''){
	$.ajax({
		url: me.url + '-listdatagrammar',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ grammar_id:grammar_id,page_id : page_id , page_size : page_size ,project_id:project_id},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :

						me.table1Datafile = $('#example')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
								$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'upload Grammar',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: function ( e, dt, node, config ) {
										document.getElementById("frm_addedit").reset();
							$('#uploadfile').modal({show:true});
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

						$('#example').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
								let table = $('#example').DataTable();
								let rowID = table.row(this).index()
								let rowData = table.rows( rowID ).data().toArray();	
								$('#example1').modal({show:true});
								document.getElementById('description').value=rowData[0].file_desc							
								grammar_id_sub=rowData[0].grammar_id
								file_id_sub=rowData[0].file_id								
        } )

					me.table1Datafile.columns.adjust().draw('true');

					me.table1Datafile.buttons(0, null).container().addClass('col');


					if(data.data == null){
							me.table1Datafile.clear().draw();
					}
					if(data.name){
						$('title').text(data.name);
					}
					if(data.data){
						readd=1
						
					}
					if(readd == 1){						
if(data.data){
me.table1Datafile.clear().draw();	
						me.table1Datafile.rows.add(data.data).draw();
						
}else{
	me.table1Datafile.clear().draw();
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
me.sumbitfile=function(){
	let project_id=document.getElementById('top_project_id').value
	
	me.LoadDatafile(grammar_id,1, 25,project_id,readd='')
}
me.LoadData = function(page_id, page_size,project_id,readd=''){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size ,project_id},
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

						$('#tbView').DataTable().on('dblclick', 'tr', function ( e, dt, type, indexes ) {
								let table = $('#tbView').DataTable();
								let rowID = table.row(this).index()
								let rowData = table.rows( rowID ).data().toArray();	
								$('#myModal').modal({show:true});
								 grammar_id=rowData[0].grammar_id
								 project_id=rowData[0].project_id
								me.LoadDatafile(grammar_id,page_id, page_size,project_id,readd='')
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

me.callflowadd = function(){
	$('#exampleModal').modal('show');
	
	let data={
		 project_id:document.getElementById('top_project_id').value
	}
	            $.ajax({
                url: me.url + '-serverlist',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						me.LoadCboFileName('server',data.recs)
					}
                }
            })
	document.getElementById("grammardesc").value=''
	document.getElementById("grammarname").value=''
	document.getElementById("grammar_id").value=''
}
me.insertgrammar=function (){
		let id=document.getElementById("grammar_id").value
	
	if(id){
		let data={
			
			'project_id':document.getElementById('top_project_id').value,
			'grammar_name':document.getElementById("grammarname").value,
			'grammar_desc':document.getElementById("grammardesc").value,
			'server_id':document.getElementById("server").value,
			'grammar_id':id
	}
	var page_size = $('#page_size').val();
	let project=document.getElementById('top_project_id').value
		    alertify.confirm("Do you want edit ?",
        function () {
            $.ajax({
                url: me.url + '-Editgrammar',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
						$('#exampleModal').modal('hide');
						me.LoadData(1,page_size,project)
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
				let data={
			
			'project_id':document.getElementById('top_project_id').value,
			'grammar_name':document.getElementById("grammarname").value,
			'grammar_desc':document.getElementById("grammardesc").value,
			'server_id':document.getElementById("server").value
	}
	var page_size = $('#page_size').val();
	let project=document.getElementById('top_project_id').value
		    alertify.confirm("Do you want add ?",
        function () {
            $.ajax({
                url: me.url + '-insert',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
						$('#exampleModal').modal('hide');
						me.LoadData(1,page_size,project)
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
	}
	
}

me.editcallflow =async function (data){
	let attr = JSON.parse($(data).attr('data-item'));
	$('#exampleModal').modal('show');
		let datajson={
		 project_id:document.getElementById('top_project_id').value
	}
				await $.ajax({
                url: me.url + '-serverlist',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						me.LoadCboFileName('server',data.recs)
					}
                }
            })
	document.getElementById("grammarname").value=attr.grammar_name
	document.getElementById("grammardesc").value=attr.grammar_desc
	document.getElementById("server").value=attr.server_id
	document.getElementById("grammar_id").value=attr.grammar_id
}

me.deletecallflow =function (id,project){
	let data={
			
			'project_id':project,
			'grammar_id':id
	}
	var page_size = $('#page_size').val();
	let projects=document.getElementById('top_project_id').value
			   alertify.confirm("Do you want Delete ?",
        function () {
            $.ajax({
                url: me.url + '-Deletegrammar',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);			
						me.LoadData(1,page_size,project)
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
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
            .attr("value", result.server_id)
            .text(`${result.server_host}||${result.server_name}||${result.server_desc}`)
            .appendTo("#" + val);
    });

};
me.updategrammar =function (){
	let data={
			
			'file_desc':document.getElementById('description').value,
			'project_id':document.getElementById('top_project_id').value,
			'grammar_id':grammar_id_sub,
			'file_id':file_id_sub
	}
	console.log(data)	
	let projects=document.getElementById('top_project_id').value
			   alertify.confirm("Do you want Edit ?",
        function () {
            $.ajax({
                url: me.url + '-updategrammar',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
						$('#example1').modal('hide');						
						me.LoadDatafile(grammar_id,1, 25,projects,readd='')
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
}

me.deletegrammarfile =function (){
	let data={
			
			 "project_id": document.getElementById('top_project_id').value,
             "grammar_id" : grammar_id_sub,
             "file_id":file_id_sub
	}
	var page_size = $('#page_size').val();
	let projects=document.getElementById('top_project_id').value
			   alertify.confirm("Do you want Delete ?",
        function () {
            $.ajax({
                url: me.url + '-deletegrammarfile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
$('#example1').modal('hide');							
						me.LoadDatafile(grammar_id_sub,1, page_size,projects,readd='')
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
}

me.active = function (grammar,project){	
	let datajson={			
			"project_id":project,
			"grammar_id":grammar
		}
		console.log(datajson)
			   alertify.confirm("Do you want active ?",
        function () {
            $.ajax({
                url: me.url + '-activegrammarfile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);					
						let project_id=document.getElementById('top_project_id').value
						me.LoadDatafile(grammar_id,1, 25,project_id,readd='')
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
}

me.delete = function (data){
		let attr = JSON.parse($(data).attr('data-item'));
	let datajson={
			"project_id": document.getElementById('top_project_id').value,
			"callflow_id":attr.callflow_id,
			"file_id":attr.file_id
		}
		console.log(datajson)
			   alertify.confirm("Do you want delete xml ?",
        function () {
            $.ajax({
                url: me.url + '-deletexmlfile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);					
						me.LoadDatafile('','',1, 25,callflow_id,document.getElementById('top_project_id').value,readd='')
					}else{
						alertify.error(data.msg);
					}
                }
            });
        },
        function () {
            alertify.error('Cancel add');
        });
}
me.SetDateTime = function(){
	//$('#start_date').datetimepicker({
	//	format: 'YYYY-MM-DD',
	//	defaultDate: moment()
	//});
$('#start_date').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });
    $('#end_date').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });


	 $("#start_date").on("change.datetimepicker", function (e) {
            $('#end_date').datetimepicker('minDate', e.date);
        });
		
	$("#end_date").on("change.datetimepicker", function (e) {
            $('#start_date').datetimepicker('maxDate', e.date);
        });

};

       $('form#frm_addedit').submit(function (e) {
            e.preventDefault();
			
            
			var filedata = document.getElementsByName("file"),formdata = false;
			alertify.confirm("Do you want add ?",
        function () {
			//var DataFrom = new FormData(document.forms.namedItem("frm_addedit"));
			
		for(let i=0; i<filedata[0].files.length; i++){	
				var formdata = new FormData();		
				formdata.append("file", filedata[0].files[i]);					
				formdata.append("grammar_id", grammar_id);						
				    $.ajax({
        url: me.url + '-uploadgrammarfile',
        type: 'POST',
        dataType: 'json',
        data: formdata,
       // async: true,
        cache: false,
		beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
		complete: function() { $('.loading-container').addClass('loading-inactive'); },
		contentType: false,
        processData: false,
        success: function (data) {
            switch (data.code) {
                case 200:                 
                    alertify.success('Upload Success');	
					me.LoadDatafile(grammar_id,1, 25,document.getElementById('top_project_id').value,readd='')
									
                    break;
                default:
                    alertify.error('Upload Fail');
                    break;
            }
        }
    });
			}	
			$('#uploadfile').modal('hide');
        },
        function () {
            alertify.error('Cancel add');
        });
        });

/*================================================*\
  :: DEFAULT ::
\*================================================*/


$(document).ready(function(){
	me.SetUrl();
	me.SetDateTime();
	let project=document.getElementById('top_project_id').value
	me.LoadData(1, 25,project)


});