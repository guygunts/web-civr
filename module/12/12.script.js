
me.action.main = 'user_id';
me.action.menu = 'listpackget';
me.action.add = 'adduser';
me.action.edit = 'updateuser';
me.action.del = 'deleteuser';
/*================================================*\
  :: FUNCTION ::
\*================================================*/
function changetype(){
let type = document.getElementById('type_size').value;
	if(type == 'Unlimit'){
		document.getElementById("DATA_GB").disabled = true;
}else{
		document.getElementById("DATA_GB").disabled = false;
}
}
me.SetDateTime = function(){

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
			me.Loaddropdown('PACKAGEGROUP', data.drowdowntypegrop);
			me.Loaddropdown('GROUP', data.drowdowngroup);
			me.Loaddropdown('SPEED', data.drowdownspeed);
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
		me.LoadDatalistpackget(me.action.menu, 1, page_size,group,enable,text_search,1)
		me.table.page.len(page_size).draw();

});
};
me.add= function (){
	
   let datajson={ 
	"startdate": document.getElementById("START_DATE").value,
	"enddate": document.getElementById("END_DATE").value,
	"Package_Type": document.getElementById("PACKAGE_TYPE").value,
	"Group": document.getElementById("GROUP").value,
	"Package_Group": document.getElementById("PACKAGEGROUP").value,
	"Mobile_Type": document.getElementById("MOBILE_TYPE").value,
	"Price": document.getElementById("PRICE").value,
	"Package_Name": document.getElementById("PACKAGE_NAME").value,
	"Package_Code": document.getElementById("PACKAGE_CODE").value,
	"Speed": document.getElementById("SPEED").value,
	"Data_GB": document.getElementById("DATA_GB").value,
	"type_size": document.getElementById("type_size").value,
	"Voice_Min": document.getElementById("VOICE_MIN").value,
	"File_Name": document.getElementById("FILE_NAME").value,
	"File_Info": document.getElementById("FILE_INFO").value,
	"Name_Script": document.getElementById("NAME_SCRIPT").value,
	"Info_Script": document.getElementById("INFO_SCRIPT").value,
	"Enable": document.getElementById("ENABLE").value,
	"type_size":document.getElementById("type_size").value
	}
	if(datajson.File_Name.search(".wav") >=0 || datajson.File_Name ==''){
		datajson.File_Name=document.getElementById("FILE_NAME").value
	}else{
		datajson.File_Name=document.getElementById("FILE_NAME").value+'.wav'
	}
	
		if(datajson.File_Info.search(".wav") >=0 || datajson.File_Info ==''){
		datajson.File_Info=document.getElementById("FILE_INFO").value
	}else{
		datajson.File_Info=document.getElementById("FILE_INFO").value+'.wav'
	}
	
	if(document.getElementById('PACK_ID').value){
		let datajson={ 
	"startdate": document.getElementById("START_DATE").value,
	"enddate": document.getElementById("END_DATE").value,
	"Package_Type": document.getElementById("PACKAGE_TYPE").value,
	"Group": document.getElementById("GROUP").value,
	"Package_Group": document.getElementById("PACKAGEGROUP").value,
	"Mobile_Type": document.getElementById("MOBILE_TYPE").value,
	"Price": document.getElementById("PRICE").value,
	"Package_Name": document.getElementById("PACKAGE_NAME").value,
	"Package_Code": document.getElementById("PACKAGE_CODE").value,
	"Speed": document.getElementById("SPEED").value,
	"Data_GB": document.getElementById("DATA_GB").value,
	"type_size": document.getElementById("type_size").value,
	"Voice_Min": document.getElementById("VOICE_MIN").value,
	"File_Name": document.getElementById("FILE_NAME").value,
	"File_Info": document.getElementById("FILE_INFO").value,
	"Name_Script": document.getElementById("NAME_SCRIPT").value,
	"Info_Script": document.getElementById("INFO_SCRIPT").value,
	"Enable": document.getElementById("ENABLE").value,
	"type_size":document.getElementById("type_size").value,
	"PACK_ID":document.getElementById('PACK_ID').value
	}
	if(datajson.File_Name.search(".wav") >=0){
		datajson.File_Name=document.getElementById("FILE_NAME").value
	}else{
		datajson.File_Name=document.getElementById("FILE_NAME").value+'.wav'
	}
	if(datajson.File_Info.search(".wav") >=0 || datajson.File_Info ==''){
		datajson.File_Info=document.getElementById("FILE_INFO").value
	}else{
		datajson.File_Info=document.getElementById("FILE_INFO").value+'.wav'
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
		me.LoadDatalistpackget(me.action.menu,1, page_size,group,enable,text_search,1)
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
		me.LoadDatalistpackget(me.action.menu,1, page_size,group,enable,text_search,1)
		me.LoadDataList();
		break;
		}
		},error(err){
	console.log(err)
}		
        
    });
	
}
me.reset=function (){
	document.getElementById("START_DATE").value=''
	document.getElementById("END_DATE").value=''
	document.getElementById("PACK_ID").value=''
	document.getElementById("PACKAGE_TYPE").value=''
	document.getElementById("GROUP").value=''
	document.getElementById("PACKAGEGROUP").value=''
	document.getElementById("MOBILE_TYPE").value=''
	document.getElementById("PRICE").value=''
	document.getElementById("PACKAGE_NAME").value=''
	document.getElementById("PACKAGE_CODE").value=''
	document.getElementById("SPEED").value=''
	document.getElementById("DATA_GB").value=''
	document.getElementById("VOICE_MIN").value=''
	document.getElementById("FILE_NAME").value=''
	document.getElementById("FILE_INFO").value=''
	document.getElementById("NAME_SCRIPT").value=''
	document.getElementById("INFO_SCRIPT").value=''
	document.getElementById("PACKAGE_TYPE").value='General Package'
		//$('#start_date').datetimepicker({
	//	format: 'YYYY-MM-DD',
	//	defaultDate: moment()
	//});
/*
$('#START_DATE').datetimepicker({
		defaultDate: dateTime
});
$('#END_DATE').datetimepicker({
		defaultDate: dateend
});*/
var objDate = new Date();

/* Convert the date object to string with format of your choice */
var mount=objDate.getMonth()+1
var newDate = objDate.getFullYear() + '-' + mount + '-' +objDate.getDate()  ;

/* Get the time in your format */

var newTime = objDate.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second: 'numeric', hour12: true });

/* Concatenate new date and new time */
//$('#START_DATE').datetimepicker({date:newDate + " " + newTime});
//document.getElementById("START_DATE").value=newDate + " " + newTime
//$('#END_DATE').datetimepicker({date:objDate.getFullYear()+'-12-31'+' '+'11:59:59'});objDate.toLocaleTimeString('en-GB')
document.getElementById("START_DATE").value=newDate + " " +'00:00:00' 
	document.getElementById("END_DATE").value=objDate.getFullYear()+'-12-31'+' '+'23:59:59'
} 

function getdata(data){
	$.ajax({
		url: me.url + '-getdata',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{PACK_ID:data},
		success:function(data){
			let startdate = new Date(data.data[0].START_DATE);
			let startdatemount=startdate.getMonth()+1
			let newDatestartdate = startdate.getFullYear() + '-' + startdatemount + '-' +startdate.getDate()  ;
			let enddate = new Date(data.data[0].END_DATE);
			let enddatemount=enddate.getMonth()+1
			let newDateenddate = enddate.getFullYear() + '-' + enddatemount + '-' +enddate.getDate()  ;
	document.getElementById("PACK_ID").value=data.data[0].PACK_ID
	document.getElementById("START_DATE").value=newDatestartdate+" "+startdate.toLocaleTimeString('en-GB')
	document.getElementById("END_DATE").value=newDateenddate+" "+enddate.toLocaleTimeString('en-GB')
	document.getElementById("PACKAGE_TYPE").value=data.data[0].PACKAGE_TYPE
	document.getElementById("GROUP").value=data.data[0].GROUP
	document.getElementById("PACKAGEGROUP").value=data.data[0].PACKAGE_GROUP
	document.getElementById("MOBILE_TYPE").value=data.data[0].MOBILE_TYPE
	document.getElementById("PRICE").value=data.data[0].PRICE
	document.getElementById("PACKAGE_NAME").value=data.data[0].PACKAGE_NAME
	document.getElementById("PACKAGE_CODE").value=data.data[0].PACKAGE_CODE
	document.getElementById("SPEED").value=data.data[0].SPEED
	document.getElementById("DATA_GB").value=data.data[0].DATA_GB
	document.getElementById("VOICE_MIN").value=data.data[0].VOICE_MIN
	let datareplace=data.data[0].FILE_NAME.indexOf(".wav")
		if(datareplace>0){
			 datareplace=data.data[0].FILE_NAME.replace(".wav",'')
		}else{
			datareplace=data.data[0].FILE_NAME
		}
		let datareplace1=data.data[0].FILE_INFO.indexOf(".wav")
		if(datareplace1>0){
			datareplace1=data.data[0].FILE_INFO.replace(".wav",'')
		}else{
			datareplace1=data.data[0].FILE_INFO
		}
	document.getElementById("FILE_NAME").value=datareplace
	document.getElementById("FILE_INFO").value=datareplace1
	
	document.getElementById("NAME_SCRIPT").value=data.data[0].NAME_SCRIPT
	document.getElementById("INFO_SCRIPT").value=data.data[0].INFO_SCRIPT
	document.getElementById("ENABLE").value=data.data[0].ENABLE
	document.getElementById("type_size").value=data.data[0].DATA_GB_TYPE
		if(data.data[0].DATA_GB_TYPE == 'Unlimit'){
		document.getElementById("DATA_GB").disabled = true;
		}
		
		},error(err){
	console.log(err)
}		
	});


}
function deletedata(data){

        	$.ajax({
		url: me.url + '-Del',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{PACK_ID:data} ,
		success:function(data){		
	
		me.loading = true;
		var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var group =$('#Package_group').val();
		var enable = document.getElementById('enable').value
		me.table.clear().draw();
				me.table.ajax.reload();
		//me.table.page.len(page_size).draw();
		},error(err){
	console.log(err)
}		 
	});  		
}
function changedata(){
	var page_size = $('#page_size').val();
		var text_search = $('#text_search').val();
		var group =$('#Package_group').val();
		var enable = document.getElementById('enable').value
				//me.table.clear().draw();
			me.LoadDatalistpackget(me.action.menu,1, page_size,group,enable,text_search,1)
			//	me.table.page.len(page_size).draw();
}
me.LoadDatalistpackget = function(menu, page_id, page_size,group,enable,search = '',readd){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : page_size ,packagegroup:group,enable:enable, text_search : search},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
							if(data.data == null){
								data.data=[]
							}
						me.table = $('#tbView')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
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
								columns: data.columns,                          
								serverSide: true,
                            ajax: {
                                "url": me.url + "-View",
                                "type": "POST",
                                "data": function (d) {
                                    d.page_id = (d.start / d.length) + 1;
									d.page_size=$('#page_size').val();
                                    d.menu_action = me.action.menu;
                                    d.packagegroup = $('#Package_group').val();
                                    d.enable = $('#enable').val();
                                    d.text_search = $('#text_search').val();
									//me.table.page.len($('#page_size').val()).draw();
                                }
                            }
							});

					

					//me.table.columns.adjust().draw('true');

					//me.table.buttons(0, null).container().addClass('col');


					if(data.data.length == 0){
						//let tbView = $('#tbView').DataTable();
						//tbView.clear().draw();	
							//me.table.clear();
							me.table.clear().destroy();
					}
					if(data.name){
						$('title').text(data.name);
					}
					if(data.data.length > 0){
						readd=1
						
					}

					if(readd == 1){	
me.table.clear().draw();

me.table.row.add(data.data)
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
				
};
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
	//me.Search();
	me.LoadDataList();
	//document.getElementById('FlagPack_').value='0'
	let group =$('#Package_group').val();
	let	enable = document.getElementById('enable').value
	me.LoadDatalistpackget(me.action.menu, 1, 25,group,enable,'','')
	//$('#Enable_').prop('checked', true)
	// me.LoadCbo('project','getprojects','project_id','project_name');
	// me.LoadCbo('role_id','getroles','role_id','role_name');
});