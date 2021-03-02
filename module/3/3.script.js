var columnName2
var columndataName2
var callflow_id
var project_id
var callflow_id_sub
var file_id_sub
me.changedata=function(){
	var page_size = $('#page_size').val();
	let project=document.getElementById('top_project_id').value
	me.LoadData(1,page_size,project)	
}
me.LoadDatafile=function(start_date,end_date,page_id, page_size,callflow_id,project_id,readd=''){
	$.ajax({
		url: me.url + '-listdatacallflow',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ start_date:start_date,end_date:end_date,page_id : page_id , page_size : page_size , callflow_id : callflow_id,project_id:project_id},
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
                                    text: 'upload xml',
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
								document.getElementById('descriptionsub').value=rowData[0].file_desc							
								callflow_id_sub=rowData[0].callflow_id
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
	let start =document.getElementById("start_date").value
	let stop= document.getElementById("end_date").value	
	let project_id=document.getElementById('top_project_id').value
	me.LoadDatafile(start,stop,1, 25,callflow_id,project_id,readd='')
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
					columnName2=data.columnName2
					columndataName2=data.columndataName2
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
								var objDate = new Date();
								var mount=objDate.getMonth()+1
								var newDate = objDate.getFullYear() + '-' + mount + '-' +objDate.getDate()
								 callflow_id=rowData[0].callflow_id
								 project_id=rowData[0].project_id
								document.getElementById("start_date").value=newDate + " " + '00:00:00'
								document.getElementById("end_date").value=objDate.getFullYear()+'-12-31'+' '+'23:59:59'		
								me.LoadDatafile('','',1, 25,callflow_id,project_id,readd='')
        } )
		   $('#tbView tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = me.table.row( tr );
		var datasub=[]
		datasub.push(row.data())

        if ( row.child.isShown() ) {
            row.child.hide();
			$('#tableSubfile'+row.data().RowNum).DataTable().destroy();
            tr.removeClass('shown');
        }
        else {
            let col = []
					let columnsName = ''
					let columnsdataName = ''
					let arrcolumnName
					let arrcolumndataName
					columnsName = columnName2
					columnsdataName =columndataName2
					arrcolumnName = columnsName.split(',')
					arrcolumndataName=columnsdataName.split(',')
					            for (let e = 0; e < arrcolumnName.length; e++) {
							const items = {
								'className': "text-center",
								'title': arrcolumnName[e],
								'data': arrcolumndataName[e]
								}
                col.push(items)
            }
            row.child( format(row.data().RowNum)).show();
                                     me.tablesub=  $('#tableSubfile'+row.data().RowNum)
                                .addClass('nowrap')
                                .removeAttr('width').DataTable({
                                    dom: "t",
                                    data: datasub,
                                    columns: col,
                                    iDisplayLength: page_size,
                                    ordering: false,
                                    retrieve: true,
                                    deferRender: true,
                                    stateSave: true,
                                    scrollX: true,
                                   // pageLength: page_size,
                                    //lengthMenu: [[page_size, (page_size * 2), -1], [page_size, (page_size * 2), 'All']]

                                });

                            tr.addClass('shown');
                            me.tablesub.columns.adjust().draw('true');
        }
    } );

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

function format (e) {
    return `<div class="col-md-10" style="margin: 0 auto;float: none;padding: 10px;"><table id="tableSubfile${e}" class="table table-yellow table-bordered table-striped table-condensed dataTable" style="width: 100%;"></table></div>`;
}

me.callflowadd = function(){
	$('#exampleModal').modal('show');
	document.getElementById("CallFlowName").value=''
	document.getElementById("CallFlowFileName").value=''
	document.getElementById("Description").value=''
	document.getElementById("DestinarionPath").value=''
	document.getElementById("callflow_id").value=''
}
me.insertcallflow=function (){
		let id=document.getElementById("callflow_id").value
	
	if(id){
		let data={
			
			'project_id':document.getElementById('top_project_id').value,
			'callflow_name':document.getElementById("CallFlowName").value,
			'callflow_filename':document.getElementById("CallFlowFileName").value,
			'callflow_desc':document.getElementById("Description").value,
			'destination_path':document.getElementById("DestinarionPath").value,
			'callflow_id':id
	}
	var page_size = $('#page_size').val();
	let project=document.getElementById('top_project_id').value
		    alertify.confirm("Do you want edit ?",
        function () {
            $.ajax({
                url: me.url + '-Editcallflow',
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
			'callflow_name':document.getElementById("CallFlowName").value,
			'callflow_filename':document.getElementById("CallFlowFileName").value,
			'callflow_desc':document.getElementById("Description").value,
			'destination_path':`${me.globalpath}${document.getElementById("DestinarionPath").value}`
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

me.editcallflow =function (data){
	let attr = JSON.parse($(data).attr('data-item'));
	$('#exampleModal').modal('show');
	document.getElementById("CallFlowName").value=attr.callflow_name
	document.getElementById("CallFlowFileName").value=attr.callflow_file_name
	document.getElementById("Description").value=attr.callflow_desc
	document.getElementById("DestinarionPath").value=attr.dest_path
	document.getElementById("callflow_id").value=attr.callflow_id
}

me.deletecallflow =function (id,project){
	let data={
			
			'project_id':project,
			'callflow_id':id
	}
	var page_size = $('#page_size').val();
	let projects=document.getElementById('top_project_id').value
			   alertify.confirm("Do you want Delete ?",
        function () {
            $.ajax({
                url: me.url + '-deletecall',
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
            .attr("value", result.config_filename_no)
            .text(result.configfilename)
            .appendTo("#" + val);
    });

};
me.editxmlfile =function (){
	let data={
			
			'callflow_desc':document.getElementById('descriptionsub').value,
			'project_id':document.getElementById('top_project_id').value,
			'callflow_id':callflow_id_sub,
			'file_id':file_id_sub
	}
	console.log(data)	
			   alertify.confirm("Do you want Edit ?",
        function () {
            $.ajax({
                url: me.url + '-editxmffile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
						$('#example1').modal('hide');						
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

me.deletexmlfile =function (){
		let data={
			"project_id": document.getElementById('top_project_id').value,
			"callflow_id":callflow_id_sub ,
			"file_id":file_id_sub
		}
		console.log(data)
					   alertify.confirm("Do you want delete ?",
        function () {
            $.ajax({
                url: me.url + '-deletexmlfile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: data,
                cache: false,
                success: function (data) {
					if(data.code == '200'){
						alertify.success(data.msg);
						$('#example1').modal('hide');						
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

me.active = function (data){
		let attr = JSON.parse($(data).attr('data-item'));
	let datajson={
			"project_id": document.getElementById('top_project_id').value,
			"callflow_id":attr.callflow_id,
			"file_id":attr.file_id
		}
		console.log(datajson)
			   alertify.confirm("Do you want active ?",
        function () {
            $.ajax({
                url: me.url + '-activexmffile',
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
				formdata.append("file_desc", document.getElementById('descriptionsubxml').value);				
				    $.ajax({
        url: me.url + '-uploadcallflow',
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
					me.LoadDatafile('','',1, 25,callflow_id,document.getElementById('top_project_id').value,readd='')					
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