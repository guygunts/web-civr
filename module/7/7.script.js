
me.action.main = 'user_id';
me.action.menu = 'SR';
me.action.add = 'adduser';
me.action.edit = 'updateuser';
me.action.del = 'deleteuser';
me.chnn = '';
var buttonCommon = {
	exportOptions: {
		format: {
			body: function (data, row, column, node) {

				if (column === 2) {
					data = $(data).attr('href');
				} else if (column === 3 || column === 4) {
					data = $(data).attr('chnn');

				} 
				/*else if (column === 11) {
					if ($('option:selected', data).val() != '') {
						data = $('option:selected', data).text();
					} else {
						data = '';
					}
				} else if (column === 12) {
			//		if ($('option:selected', data).val() != '') {
			//			data = $('option:selected', data).text();
				//	} else {
			//			data = '';
//}
//} 
				else if (column === 13 || column === 14) {
					data = data.toString().replace(/<.*?>/ig, "");
				} else if (column === 15 || column === 16) {
					data = '';*/
					
				return data;
				}


			//}
		}
	}
};
var buttonCommonSub = {
	exportOptions: {
		format: {
			body: function (data, row, column, node) {

				if (column === 2) {
					data = $(data).find('source').attr('src');
				}

				return data;

			}
		}
	}
};

/*================================================*\
  :: FUNCTION ::
\*================================================*/
me.SetDateTime = function(){
	let today=new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	$('#start_date').datetimepicker({
		format: 'YYYY-MM-DD HH:mm:ss',
		defaultDate: moment(date + ' ' + '00:00:00')
	});
	$('#end_date').datetimepicker({
		format: 'YYYY-MM-DD HH:mm:ss',
		defaultDate: moment()
	});
};


me.Search = function(){
	$('form#frmsearch').submit(function () {
		me.loading = true;
		$('#frmresult').css('display','none');
		var page_size = $('#page_size').val();
		var compare = $('#compare').val();
		var txtsearch = $('#text_search').val();
		var start = $('#start_date').data().date;
		var stop = $('#end_date').data().date;
		var cnt = 0;
		var eyesview = document.getElementById('eyeview').value
		if(start !== undefined){
			++cnt;
		}
		if(stop !== undefined){
			++cnt;
		}

		if(cnt != 2)return false;
		//me.table.page.len(page_size).draw();
		// me.table.ajax.reload();
		// me.table.clear().destroy();
		// $('#tbView').empty();
		 me.table.clear();
		 me.LoadDataReport(me.action.menu,me.page,page_size,start,stop,eyesview,compare,txtsearch,'');

	});

};

me.LoadDataReport = function(menu, page_id, page_size, start, stop,eyesview, compare ='',search = '', readd='',current=1){
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : page_size , start_date : start , end_date : stop ,eyesview:eyesview, compare : compare , text_search : search},
		success:function(data){
			console.log(data)
			switch(data.success){
				case 'COMPLETE' :
						
					me.table = $('#tbView')
						.addClass('nowrap')
						.removeAttr('width')
						.DataTable({
							destroy: true,
							bFilter: false,
							dom: 'Bfrtip',
							buttons: [
								$.extend(true, {}, buttonCommon, {
									text: 'ย้อนกลับ',
									className: 'float-left hidden',
									attr: {
										title: 'Copy',
										id: 'btnback',
										disabled: 'disabled'
									}
								}),
								$.extend(true, {}, buttonCommon, {
									extend: 'excelHtml5',
									text: 'Excel',
									className: 'float-right',
									charset: 'utf-8',
									bom: true
								}),
								$.extend(true, {}, buttonCommon, {
									extend: 'csvHtml5',
									text: 'CSV',
									className: 'float-right',
									charset: 'utf-8',
									bom: true
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
							stateSave: false,
							responsive: false,
							scrollX: true,
							pageLength: page_size,
							paging: true,
							lengthChange:false,
							columns: data.columns,
							data:data.data,
							serverSide: true,
							ajax: {
								"url": me.url + "-View",
								"type": "POST",
								"data": function (d) {
									d.page_id = (d.start / d.length) + 1;
									d.page_size = $('#page_size').val();
									d.start_date = $('#start_date').data().date;
									d.end_date = $('#end_date').data().date;
									d.text_search = $('#text_search').val();
									d.eyesview = document.getElementById('eyeview').value						
								}
							}
						});

					if(data.data.length !== 0){
						readd=1
					}
					//me.table.buttons(0, null).container().addClass('col');
					if(readd){
						 var dataold = me.table.rows().data();
						me.applyData(me.table,data.data,true);
					}
					if(data.data.length == 0){
						me.table.clear().draw();
					}

					if(data.name){
						$('title').text(data.name);
					}
 
					//let table = $('#tbView').DataTable();
					me.table.page(current-1).draw('page');

					//$('a.toggle-vis').on( 'click', function (e) {
					//	e.preventDefault();

						// Get the column API object
						//var column = me.table.column( $(this).attr('data-column') );

						// Toggle the visibility
						//column.visible( ! column.visible() );
					//} );
					//me.TextSerch();
					// $('#tbViewSub_wrapper').css('display','none');
					// $('#tbView_wrapper').css('display','');
					//me.LoadDataVOICE('',1,25,moment().format('YYYY-MM-DD')+' 00:00:00',moment().format('YYYY-MM-DD')+' 23:59:59');
					break;
			}
		},error(error){
			console.log(error)
		}
	});
};

me.LoadDataCHNNLOG = function(menu, page_id, page_size, start, stop, readd=''){

	$.ajax({
		url: me.url + '-ViewLOG',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : 25 , start_date : start , end_date : stop},
		success:function(data){
			switch(data.success){
				case 'COMPLETE' :
					console.log(data.data.length);
					if(data.data.length == 0){
						alertify.alert('No data, Please select other date');
						return false;
					}
					if(Object.entries(me.tablesub).length > 0){
						me.tablesub={}
						$('#tbViewSub').DataTable().destroy();
						$("#tbViewSub").empty();
					}
					
					// me.tablesub={}
					me.tablesub = $('#tbViewSub')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
									// 'excelHtml5',
									{
										text: 'ย้อนกลับ',
										className: 'float-left',
										action: function ( e, dt, node, config ) {

											me.loading = true;

											var page_size = $('#page_size').val();
											var compare = $('#compare').val();
											var txtsearch = $('#text_search').val();
											var start = $('#start_date').data().date;
											var stop = $('#end_date').data().date;
											var cnt = 0;

											if(start !== undefined){
												++cnt;
											}
											if(stop !== undefined){
												++cnt;
											}

											if(cnt != 2)return false;
											// me.tablesub.clear().destroy();
											// me.table.clear().destroy();
											// $('#tbViewSub').empty();
											// $('#tbView').empty();

											$('#tbViewSub_wrapper').css('display','none');
											$('#tbView_wrapper').css('display','');
											$('#frmsearch').css('display','');
											// me.table.clear();
											me.LoadDataReport(me.action.menu,1,page_size,start,stop,compare,txtsearch,1,page_id);
											// $('#btnsearchsubmit').click();
										}
									},
									{
										extend: 'excelHtml5',
										text: 'Excel',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},
									{
										extend: 'csvHtml5',
										text: 'CSV',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},

								],
								// columnDefs: [
								// 	{
								// 		"width": "5%",
								// 		"targets": 0,
								// 		"searchable": false
								// 	}
								// ],
								// bFilter: false,
								searching: false,
								// retrieve: true,
								// deferRender: true,
								// stateSave: true,
								iDisplayLength : page_size,
								// responsive: false,
								 scrollX: true,
								pageLength: page_size,
								// paging: false,
								// bInfo: false,
								// lengthChange:false,
								data: data.data,
								columns: data.columns
							});

					if(Object.entries(me.tablesub).length > 0){
						readd = 1
					}
					$('#tbViewSub_wrapper').css('display','');
					$('#frmsearch').css('display','none');
					if(readd){
						me.tablesub.clear().draw();
						me.tablesub.rows.add(data.data).draw();
						
					}

					me.tablesub.columns.adjust().draw('true');
					me.tablesub.buttons(0, null).container().addClass('col');

					if(data.name){
						$('title').text(data.name);
					}
					$('#frmresult').css('display','');
					$('#chnn').val(data.chnn);


					$('a.toggle-vis').on( 'click', function (e) {
						e.preventDefault();
						// Get the column API object
						var column = me.tablesub.column( $(this).attr('data-column') );

						// Toggle the visibility
						column.visible( ! column.visible() );
					} );
					$('#tbView_wrapper').css('display','none');
					$('#tbViewSub').css('display','');
					break;
				default :
					alertify.alert(data.msg);
					break;
			}
		}
	});
};

me.LoadDataCHNN = function(menu, page_id, page_size, start, stop, readd=''){

	$.ajax({
		url: me.url + '-ViewCHNN',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : 10000 , start_date : start , end_date : stop},
		success:function(data){
			switch(data.success){
				case 'COMPLETE' :
					if(readd){
						me.table.clear().draw();
						me.table.rows.add(data.data).draw();

					}else{

						me.table = $('#tbView')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
									// 'excelHtml5',

									{
										text: 'ย้อนกลับ',
										className: 'float-left',
										action: function ( e, dt, node, config ) {
											$('#btnsearchsubmit').click();
										}
									},
									{
										extend: 'excelHtml5',
										text: 'Excel',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},
									{
										extend: 'csvHtml5',
										text: 'CSV',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},
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
								iDisplayLength : page_size,
								responsive: false,
								scrollX: true,
								pageLength: page_size,
								paging: true,
								lengthChange:false,
								data: data.data,
								columns: data.columns
							});

					}

					me.table.columns.adjust().draw('true');

					me.table.buttons(0, null).container().addClass('col');



					if(data.name){
						$('title').text(data.name);
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

me.LoadDataVOICE = function(menu, page_id, page_size, start, stop, readd=''){

	$.ajax({
		url: me.url + '-ViewVOICE',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : 25 , start_date : start , end_date : stop},
		success:function(data){
			switch(data.success){
				case 'COMPLETE' :
					me.tablesub = $('#tbViewSub')
						.addClass('nowrap')
						.removeAttr('width')
						.DataTable({

							bFilter: false,
							dom: 'Bfrtip',
							buttons: [
								$.extend(true, {}, buttonCommonSub, {
									text: 'ย้อนกลับ',
									className: 'float-left',
									action: function ( e, dt, node, config ) {
										me.loading = true;
										$('#tbViewSub_wrapper').css('display','none');
										$('#tbView_wrapper').css('display','');
										$('#frmsearch').css('display','');
									}
								}),
								
								$.extend(true, {}, buttonCommonSub, {
									extend: 'excelHtml5',
									text: 'Excel',
									className: 'float-right',
									charset: 'utf-8',
									bom: true
								}),
								$.extend(true, {}, buttonCommonSub, {
									extend: 'csvHtml5',
									text: 'CSV',
									className: 'float-right',
									charset: 'utf-8',
									bom: true
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
							stateSave: false,
							responsive: false,
							scrollX: true,
							pageLength: page_size,
							paging: true,
							lengthChange:false,
							columns: data.columns,
							serverSide: true,
							ajax: {
								"url": me.url + "-ViewVOICE",
								"type": "POST",
								"data": function (d) {

									d.page_id = (d.start / d.length) + 1;
									d.menu_action = me.chnn;
									d.page_size = $('#page_size').val();
									d.start_date = $('#start_date').data().date;
									d.end_date = $('#end_date').data().date;
									d.text_search = $('#text_search').val();
									
								}
							}
						});

					me.tablesub.buttons(0, null).container().addClass('col');
					// $('#tbViewSub_wrapper').css('display','none');
					// if(data.name){
					// 	$('title').text(data.name);
					// }
					// $('#chnn').val(data.chnn);


					// $('a.toggle-vis').on( 'click', function (e) {
					// 	e.preventDefault();
					//
					// 	// Get the column API object
					// 	var column = me.tablesub.column( $(this).attr('data-column') );
					//
					// 	// Toggle the visibility
					// 	column.visible( ! column.visible() );
					// } );
				$('#tbViewSub_wrapper').css('display','none');
					break;
			}
		}
	});
};

me.LoadDataVOICE_ = function(menu, page_id, page_size, start, stop, readd=''){

	$.ajax({
		url: me.url + '-ViewVOICE',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : 10000 , start_date : start , end_date : stop},
		success:function(data){
			switch(data.success){
				case 'COMPLETE' :
					
					console.log(data.data.length);
					if(data.data.length == 0){
						alertify.alert('No data, Please select other date');
						return false;
					}
					if(Object.entries(me.tablesub).length > 0){
						me.tablesub={}
						$('#tbViewSub').DataTable().destroy();
						$("#tbViewSub").empty();
					}
					
					// me.tablesub={}
					me.tablesub = $('#tbViewSub')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								dom: 'Bfrtip',
								buttons: [
									// 'excelHtml5',
									{
										text: 'ย้อนกลับ',
										className: 'float-left',
										action: function ( e, dt, node, config ) {

											me.loading = true;

											var page_size = $('#page_size').val();
											var compare = $('#compare').val();
											var txtsearch = $('#text_search').val();
											var start = $('#start_date').data().date;
											var stop = $('#end_date').data().date;
											var cnt = 0;

											if(start !== undefined){
												++cnt;
											}
											if(stop !== undefined){
												++cnt;
											}

											if(cnt != 2)return false;
											// me.tablesub.clear().destroy();
											// me.table.clear().destroy();
											// $('#tbViewSub').empty();
											// $('#tbView').empty();

											$('#tbViewSub_wrapper').css('display','none');
											$('#tbView_wrapper').css('display','');
											$('#frmsearch').css('display','');
											// me.table.clear();
											me.LoadDataReport(me.action.menu,1,page_size,start,stop,compare,txtsearch,1,page_id);
											
											// $('#btnsearchsubmit').click();
										}
									},
									{
										extend: 'excelHtml5',
										text: 'Excel',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},
									{
										extend: 'csvHtml5',
										text: 'CSV',
										className: 'float-right',
										charset: 'utf-8',
										bom: true
									},

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
								stateSave: false,
								responsive: false,
								scrollX: true,
								pageLength: page_size,
								paging: true,
								lengthChange: false,
								data: data.data,
								columns: data.columns
							});

					if(Object.entries(me.tablesub).length > 0){
						readd = 1
					}

					if(readd){
						me.tablesub.clear().draw();
						me.tablesub.rows.add(data.data).draw();
						
					}
					$('#tbViewSub_wrapper').css('display','');
					$('#frmsearch').css('display','none');
					me.tablesub.columns.adjust().draw('true');
					me.tablesub.buttons(0, null).container().addClass('col');

					if(data.name){
						$('title').text(data.name);
					}
					$('#frmresult').css('display','');
					$('#chnn').val(data.chnn);

					$('a.toggle-vis').on( 'click', function (e) {
						e.preventDefault();
						// Get the column API object
						var column = me.tablesub.column( $(this).attr('data-column') );

						// Toggle the visibility
						column.visible( ! column.visible() );
					} );
					$('#tbView_wrapper').css('display','none');
					$('#tbViewSub').css('display','');
					break;
				default :
					alertify.alert(data.msg);
					break;
			}
		}
	});
};

me.OpenCHNN = function(code,page_id,page_size,start,stop){

	// me.table.clear().destroy();
	// $('#tbView').empty();
	me.LoadDataCHNN(code,page_id,page_size,start,stop);

};

me.OpenVOICE = function(code,page_id,page_size,start,stop){
	// var page_size = $('#page_size').val();

	//$('#tbViewSub_wrapper').css('display','');
	// $('#tbView_wrapper').css('display','none');
	 //$('#frmsearch').css('display','none');
	 me.chnn = code;
	me.LoadDataVOICE_(code,page_id,page_size,start,stop)
	// me.tablesub.page.len(page_size).draw();

};

me.UpdateVoice = function(){
	var chnn = $('#chnn').val();
	var result = $('#result').val();
	var chk = [];
	$('input[name="pass"]').each(function (i) {
		var val = $(this).is(':checked')?1:0;
		var name = $(this).attr('ref');
		chk.push({'voice_name' : name ,'pass' : val});
	});

	// console.log(chk);

	$('.modal').modal('hide');
	alertify.confirm("Do you want Update.",
		function () {
			$.ajax({
				url: me.url + '-Add',
				type: 'POST',
				dataType: 'json',
				cache: false,
				data: { chnn : chnn , voices : chk , result : result},
				success: function (data) {
					switch (data.success) {
						case 'COMPLETE':
							$('.modal').modal('hide');
							alertify.success(data.msg);
							$('input[name="pass"]').prop('checked',false);
							$('#result').val('');
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
};

me.TextSerch = function () {
	$('#text_search').on('keyup',function (e) {
		me.loading = false;
		me.table.draw();
	});
};


  me.shownumberbar=function (type,data,id){
		 if(type <2){
			document.getElementById(id).innerHTML=$(data).attr('chnn')
		 }else{
			 alertify.error('permission denied by username');
		 } 
	
  }
  
  
  $("#eyeview").click(function() {
let table = $('#tbView').DataTable();
let data = table.rows().data().toArray();

 if($("#eyeview")[0].classList.length ==2){
	 $("#eyeview").toggleClass("glyphicon-eye-close");
	 // for(let i=0; i<data.length; i++){
		// document.getElementById(data[i].session_id).innerHTML=$("#"+data[i].session_id).attr('chnn')
	 // }
	 document.getElementById('eyeview').value=0
	 var page_size = $('#page_size').val();
		var compare = $('#compare').val();
		var txtsearch = $('#text_search').val();
		var start = $('#start_date').data().date;
		var stop = $('#end_date').data().date;
		var cnt = 0;
		var eyesview = document.getElementById('eyeview').value
		 me.LoadDataReport(me.action.menu,me.page,page_size,start,stop,eyesview,compare,txtsearch,'');
 }else{
	 $("#eyeview").toggleClass("glyphicon-eye-close");
	 // for(let i=0; i<data.length; i++){
		// document.getElementById(data[i].session_id).innerHTML=data[i].mobile_bar
	 // }
	 document.getElementById('eyeview').value=1
	 var page_size = $('#page_size').val();
		var compare = $('#compare').val();
		var txtsearch = $('#text_search').val();
		var start = $('#start_date').data().date;
		var stop = $('#end_date').data().date;
		var cnt = 0;
		var eyesview = document.getElementById('eyeview').value
		 me.LoadDataReport(me.action.menu,me.page,page_size,start,stop,eyesview,compare,txtsearch,'');
 }
  });
/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	$(".glyphicon").toggleClass("glyphicon-eye-close");
	 if($("#eyeview")[0].classList.length ==2){
		 document.getElementById('eyeview').value=1
	 }else{
		 document.getElementById('eyeview').value=0
	 }
	me.SetUrl();
	me.SetDateTime();
	me.Search();
	let today=new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	// me.ChangePage();
	me.LoadDataReport(me.action.menu,1,25,moment(date + ' ' + '00:00:00').format("YYYY-MM-DD HH:mm:ss"),moment(date + ' ' + '23:59:59').format("YYYY-MM-DD HH:mm:ss"),'','');

	// me.LoadCbo('project','getprojects','project_id','project_name');
	// me.LoadCbo('role_id','getroles','role_id','role_name');
});