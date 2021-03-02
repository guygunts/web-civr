
me.action.main = 'user_id';
me.action.menu = 'ontopprepaid';
me.action.add = 'adduser';
me.action.edit = 'updateuser';
me.action.del = 'deleteuser';
/*================================================*\
  :: FUNCTION ::
\*================================================*/

function changetype(){
let type = document.getElementById('Data_pack_type').value;
	if(type == 'Unlimit'){
		document.getElementById("Data_pack").disabled = true;
}else{
		document.getElementById("Data_pack").disabled = false;
}
}
me.SetDateTime = function(){
	//$('#start_date').datetimepicker({
	//	format: 'YYYY-MM-DD',
	//	defaultDate: moment()
	//});
$('#START_DATE').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });
    $('#END_DATE').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });


	 $("#START_DATE").on("change.datetimepicker", function (e) {
            $('#END_DATE').datetimepicker('minDate', e.date);
        });
		
	$("#END_DATE").on("change.datetimepicker", function (e) {
            $('#START_DATE').datetimepicker('maxDate', e.date);
        });

};
me.LoadDataList = function(){
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{page_id : 1 , page_size : 25},
		success:function(data){
			me.Loaddropdown('Package_group', data.drowdowntypegrop);
			me.Loaddropdown('Package_Group', data.drowdowntypegrop);
			me.Loaddropdown('GROUP', data.drowdowngroup);
			me.Loaddropdown('Speed', data.drowdownspeed);
		},
		error: function(error) {
			 console.log(error)
		}
	});
};


me.Search = function(){
$('form#frmsearch').submit(function () {
		me.loading = true;
		var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var group =$('#Package_group').val();
		let enable=document.getElementById('enable').value
		me.table.clear().draw();
		me.LoadDataontopprepaid(me.action.menu, 1, page_size,enable,text_search)
		me.table.page.len(page_size).draw();

});
};
me.add= function (){
	
    datajson={ 

            "startdate":document.getElementById("START_DATE").value,
            "enddate":document.getElementById("END_DATE").value,
			"Mobile_Type":document.getElementById("Mobile_Type").value,
			"Type_Group_Day":document.getElementById("Type_Group_Day").value,
			"Enable":document.getElementById("Enable").value,								
						"History_Package_Name":document.getElementById("History_Package_Name").value,
						"History_Package_Code":document.getElementById("History_Package_Code").value,
						"Upsell_Package_Group":document.getElementById("Upsell_Package_Group").value,
						"Upsell_Package_Name":document.getElementById("Upsell_Package_Name").value,
						"Upsell_Package_Code":document.getElementById("Upsell_Package_Code").value,
						"Upsell_Group_Code":document.getElementById("Upsell_Group_Code").value,
						"Upsell_Package_Sub_Code":document.getElementById("Upsell_Package_Sub_Code").value,
						"Upsell_File_Name":document.getElementById("Upsell_File_Name").value,
						"Upsell_file_info":document.getElementById("Upsell_file_info").value,
						"productId":document.getElementById("productId").value,
						"productSequenceId":document.getElementById("productSequenceId").value,
						"Upsell_Package_Day":document.getElementById("Upsell_Package_Day").value,
						"Upsell_price":document.getElementById("Upsell_price").value,
						"Upsell_Package_Type":document.getElementById("Upsell_Package_Type").value,
	}
	if(datajson.Upsell_File_Name.search(".wav") >=0 || datajson.Upsell_File_Name ==''){
		datajson.Upsell_File_Name=document.getElementById("Upsell_File_Name").value
	}else{
		datajson.Upsell_File_Name=document.getElementById("Upsell_File_Name").value+'.wav'
	}
	if(datajson.Upsell_file_info.search(".wav") >=0){
		datajson.Upsell_file_info=document.getElementById("Upsell_file_info").value
	}else{
		datajson.Upsell_file_info=document.getElementById("Upsell_file_info").value+'.wav'
	}
	if(document.getElementById('upsell_id').value){
		 datajson={ 

            "startdate":document.getElementById("START_DATE").value,
            "enddate":document.getElementById("END_DATE").value,
			"Mobile_Type":document.getElementById("Mobile_Type").value,
			"Type_Group_Day":document.getElementById("Type_Group_Day").value,
			"Enable":document.getElementById("Enable").value,								
						"History_Package_Name":document.getElementById("History_Package_Name").value,
						"History_Package_Code":document.getElementById("History_Package_Code").value,
						"Upsell_Package_Group":document.getElementById("Upsell_Package_Group").value,
						"Upsell_Package_Name":document.getElementById("Upsell_Package_Name").value,
						"Upsell_Package_Code":document.getElementById("Upsell_Package_Code").value,
						"Upsell_Group_Code":document.getElementById("Upsell_Group_Code").value,
						"Upsell_Package_Sub_Code":document.getElementById("Upsell_Package_Sub_Code").value,
						"Upsell_File_Name":document.getElementById("Upsell_File_Name").value,
						"Upsell_file_info":document.getElementById("Upsell_file_info").value,
						"productId":document.getElementById("productId").value,
						"productSequenceId":document.getElementById("productSequenceId").value,
						"Upsell_Package_Day":document.getElementById("Upsell_Package_Day").value,
						"Upsell_price":document.getElementById("Upsell_price").value,
						"Upsell_Package_Type":document.getElementById("Upsell_Package_Type").value,
						"upsell_id":document.getElementById('upsell_id').value
	}
	if(datajson.Upsell_File_Name.search(".wav") >=0){
		datajson.Upsell_File_Name=document.getElementById("Upsell_File_Name").value
	}else{
		datajson.Upsell_File_Name=document.getElementById("Upsell_File_Name").value+'.wav'
	}
	if(datajson.Upsell_file_info.search(".wav") >=0){
		datajson.Upsell_file_info=document.getElementById("Upsell_file_info").value
	}else{
		datajson.Upsell_file_info=document.getElementById("Upsell_file_info").value+'.wav'
	}
		       	$.ajax({
		url: me.url + '-Edit',
		type:'POST',
		dataType:'json',
		cache:false,
		data:datajson,
		success:function(data){	
		switch (data.success) {
                case 'COMPLETE' :	
            $("#Modal").modal("hide");

		me.loading = true;
		var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var group =$('#Package_group').val();
		var enable = document.getElementById('enable').value
		me.table.clear().draw();
		me.LoadDataontopprepaid(me.action.menu,1, page_size,group,enable,text_search)
		//me.table.page.len(page_size).draw();
		me.LoadDataList()
	 break;
}
		},error(err){
	console.log(err)
}		
	});
	return false;
	}

     	$.ajax({
		url: me.url + '-Add',
		type:'POST',
		dataType:'json',
		cache:false,
		data:datajson ,
		success:function(data){	
		switch (data.success) {
                case 'COMPLETE' :	
            $("#Modal").modal("hide");
		me.loading = true;
		var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var group =$('#Package_group').val();
		let enable=document.getElementById('enable').value
		me.table.clear().draw();
		me.LoadDataontopprepaid(me.action.menu,1, page_size,group,enable,text_search)
		me.LoadDataList();
		break;
		}
		},error(err){
	console.log(err)
}		
        
    });
	
}
me.reset=function (){
						document.getElementById("upsell_id").value=''
						document.getElementById("Mobile_Type").value=''	
						document.getElementById("Type_Group_Day").value=''
						document.getElementById("Enable").value=''								
						document.getElementById("History_Package_Name").value=''
						document.getElementById("History_Package_Code").value=''
						document.getElementById("Upsell_Package_Group").value=''
						document.getElementById("Upsell_Package_Name").value=''
						document.getElementById("Upsell_Package_Code").value=''
						document.getElementById("Upsell_Group_Code").value=''
						document.getElementById("Upsell_Package_Sub_Code").value=''
						document.getElementById("Upsell_File_Name").value=''
						document.getElementById("Upsell_file_info").value=''
						document.getElementById("productId").value=''
						document.getElementById("productSequenceId").value=''
						document.getElementById("Upsell_Package_Day").value=''
						document.getElementById("Upsell_price").value=''
						document.getElementById("Upsell_Package_Type").value='General Package'
		var objDate = new Date();

var mount=objDate.getMonth()+1
var newDate = objDate.getFullYear() + '-' + mount + '-' +objDate.getDate()  ;
//objDate.toLocaleTimeString('en-GB')

var newTime = objDate.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second: 'numeric', hour12: true });
document.getElementById("START_DATE").value=newDate + " " + '00:00:00'
	document.getElementById("END_DATE").value=objDate.getFullYear()+'-12-31'+' '+'23:59:59'
	document.getElementById("delete").disabled=true
} 


function deletedata(){

        	$.ajax({
		url: me.url + '-Del',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{'upsell_id':document.getElementById('upsell_id').value} ,
		success:function(data){		
		$("#Modal").modal("hide");
		me.loading = true;
		var page_size = $('#page_size').val();
		var enable = document.getElementById('enable').value
			me.table.clear().draw();
				me.LoadDataontopprepaid(me.action.menu,1, page_size,enable,text_search,1)
		//me.table.page.len(page_size).draw();
		},error(err){
	console.log(err)
}		 
	});  		
}
function changedata(){
	var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var enable = document.getElementById('enable').value
				me.table.clear().draw();
				me.LoadDataontopprepaid(me.action.menu,1, page_size,enable,text_search,1)
			//	me.table.page.len(page_size).draw();
}
me.LoadDataontopprepaid = function(menu, page_id, page_size,enable,search = '',readd){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : 10000 ,enable:enable, text_search : search},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :

						me.table = $('#tbView')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
									$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'Deploy',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: function ( e, dt, node, config ) {
									me.genxml()
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
								select: true,
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								iDisplayLength : page_size,
								responsive: false,
								scrollX: true,
								pageLength: page_size,
								paging: true,
								lengthChange:false,
								data: data.data,
								columns: data.columns
							});
						$('#tbView').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
							let table = $('#tbView').DataTable();
							let rowID = table.row(this).index()
						let rowData = table.rows( rowID ).data().toArray();	
						$('#Modal').modal('show');
						document.getElementById("delete").disabled=false
						document.getElementById("upsell_id").value=rowData[0].upsell_id
						document.getElementById("Mobile_Type").value=rowData[0].Mobile_Type
						document.getElementById("Type_Group_Day").value=rowData[0].Type_Group_Day				
						document.getElementById("History_Package_Name").value=rowData[0].History_Package_Name
						document.getElementById("History_Package_Code").value=rowData[0].History_Package_Code
						document.getElementById("Upsell_Package_Group").value=rowData[0].Upsell_Package_Group
						document.getElementById("Upsell_Package_Name").value=rowData[0].Upsell_Package_Name
						document.getElementById("Upsell_Package_Code").value=rowData[0].Upsell_Package_Code
						document.getElementById("Upsell_Group_Code").value=rowData[0].Upsell_Group_Code
						document.getElementById("Upsell_Package_Sub_Code").value=rowData[0].Upsell_Package_Sub_Code
						document.getElementById("Upsell_File_Name").value=rowData[0].Upsell_File_Name
						document.getElementById("Upsell_file_info").value=rowData[0].Upsell_file_info
						document.getElementById("Upsell_File_Name").value=rowData[0].Upsell_File_Name
						document.getElementById("START_DATE").value=rowData[0].START_DATE
						document.getElementById("END_DATE").value=rowData[0].END_DATE
						document.getElementById("productId").value=rowData[0].productId
						document.getElementById("productSequenceId").value=rowData[0].productSequenceId
						document.getElementById("Upsell_Package_Day").value=rowData[0].Upsell_Package_Day
						document.getElementById("Upsell_price").value=rowData[0].Upsell_price
						document.getElementById("Upsell_Package_Type").value=rowData[0].Upsell_Package_Type
						if(rowData[0].Enable == 'Y'){
							document.getElementById("Enable").value=1
						}else{
							document.getElementById("Enable").value=0
						}		
												
        } ),
					

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

me.genxml=function (){
		 var myData = {
		data:{}
    }
    alertify.confirm("Do you want generate XML.",
        function () {
            $.ajax({
                url: me.url + '-genxml',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
                            alertify.success(data.msg);
                            break;
                        default:
                            alertify.error(data.msg);
                            break;
                    }
                }
            });
        },
        function () {
            alertify.error('Cancel generate');
        });
	
	
}
/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();
	me.SetDateTime();
	me.Search();
	me.LoadDataList();
	var today = new Date();

		

	//document.getElementById('FlagPack_').value='0'
	let group =$('#Package_group').val();
	let	enable = document.getElementById('enable').value
	me.LoadDataontopprepaid(me.action.menu, 1, 25,enable,'','')
	//$('#Enable_').prop('checked', true)
	// me.LoadCbo('project','getprojects','project_id','project_name');
	// me.LoadCbo('role_id','getroles','role_id','role_name');
});