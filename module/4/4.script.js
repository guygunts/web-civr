/*================================================*\
*  Author : BoyBangkhla
*  Created Date : 24/01/2015 09:09
*  Module : Script
*  Description : Backoffice javascript
*  Involve People : MangEak
*  Last Updated : 24/01/2015 09:09
\*================================================*/
me.action.main = 'concept_id';
me.action.menu = 'getconcepts';
me.action.add = 'addconcept';
me.action.edit = 'updateconcept';
me.action.del = 'deleteconcept';
me.variation = $('div#dvvariation').clone();
me.childEditors = {};  // Globally track created chid editors

/*================================================*\
  :: FUNCTION ::
\*================================================*/
me.ClearData = function () {
	$('input[name="variation-active"]').iCheck('destroy');
	$('#frm_addedit input').val('');
	$('#frm_addedit select option:eq(0)').prop("selected", true);
	$('#frm_addedit textarea').val('');
	$('#frm_addedit input[type="checkbox"]').iCheck('uncheck');
	$('#frm_addedit input[type="checkbox"].active').val(1);
	$('#frm_addedit input[type="checkbox"].active').iCheck('check');
	$('div#variation').html('');

	// $('#frm_addedit .sub').css('display','');
	// me.DelStar('variation-concept_result');
	// me.DelStar('variation-variation_text');
	// $('#variation-concept_result').attr('required',false);
	// $('#variation-variation_text').attr('required',false);

};

me.Load = function (e) {
	me.ClearData();
	var code = $(e).attr('data-code');
	var attr = JSON.parse($(e).attr('data-item'));
	var result = [];

	for(var i in attr)
		result.push({name : i,value : attr [i]});

	ft.PutFormID('frm_addedit',result);
	$('#frm_addedit input[name="code"]').val(code);
	$('#frm_addedit input[name="menu_action"]').val(me.action.edit);
	$.each(attr.variation, function (i, result) {
		me.OpenPopupItem(result);
	});
	$('.btn_edit').show();
	$('.btn_add').hide();
	$('#modal-form').modal({backdrop: 'static', keyboard: true, show: true, handleUpdate: true});

};

me.OpenPopup_ = function (){
	if($('#frm_addedit .sub').css('display') == 'none'){
		$('#frm_addedit .sub').css('display','block');
		$('#variation-concept_result').attr('required',true);
		$('#variation-variation_text').attr('required',true);
		me.AddStar('variation-concept_result');
		me.AddStar('variation-variation_text');
	}else{
		$('#frm_addedit .sub').css('display','none');
		$('#variation-concept_result').val('');
		$('#variation-concept_result').attr('required',false);
		$('#variation-variation_text').tagsinput('removeAll');
		$('#variation-variation_text').attr('required',false);
		me.DelStar('variation-concept_result');
		me.DelStar('variation-variation_text');
	}
};

me.OpenPopup = function(){
	var cloneCount = $('div.variationsub').length;
	var cloneCount2 = $('input[name="variation-active"]').length;
	var maininput = me.variation;
	console.log(maininput);
	var mapObj = {
		'dvvariation':"dvvariation",
		'mvariation-variation_text':"mvariation-variation_text",
		'mvariation-concept_result':"mvariation-concept_result",
		'mvariation-active':"mvariation-active",
		'mconcept_variation_id':"mconcept_variation_id",
		'zero':"",
	};
	maininput = maininput[0].outerHTML.replace(/dvvariation|mvariation-variation_text|mvariation-concept_result|mvariation-active|zero|mconcept_variation_id/g, function(matched){
		return mapObj[matched]+cloneCount;
	});

	if(cloneCount == 0){

	$('div[id=variation]').append(maininput);
	}else{
		$('div[id^=dvvariation]').last().after(maininput);

	}
	// console.log('after');
	// console.log(maininput);
	$("#mvariation-variation_text"+cloneCount).tagsinput({
		trimValue: true
	});

	$('#dvvariation'+cloneCount+' input[type="checkbox"]').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		labelHover: true,
		increaseArea: '20%' // optional
	});
	$('#dvvariation'+cloneCount+' input[type="checkbox"]').val(1);
	$('#dvvariation'+cloneCount+' input[type="checkbox"]').iCheck('check');



};

me.OpenPopupItem = function(data){
	var cloneCount = $('div.variationsub').length;
	var cloneCount2 = $('input[name="variation-active"]').length;
	var maininput = me.variation;
	console.log(maininput);
	var mapObj = {
		'dvvariation':"dvvariation",
		'mvariation-variation_text':"mvariation-variation_text",
		'mvariation-concept_result':"mvariation-concept_result",
		'mvariation-active':"mvariation-active",
		'mconcept_variation_id':"mconcept_variation_id",
		'zero':"",
	};
	maininput = maininput[0].outerHTML.replace(/dvvariation|mvariation-variation_text|mvariation-concept_result|mvariation-active|zero|mconcept_variation_id/g, function(matched){
		return mapObj[matched]+cloneCount;
	});

	if(cloneCount == 0){

		$('div[id=variation]').append(maininput);
	}else{
		$('div[id^=dvvariation]').last().after(maininput);

	}
	// console.log('after');
	// console.log(maininput);


	$('#mconcept_variation_id'+cloneCount).val(data.concept_variation_id);
	$('#mvariation-concept_result'+cloneCount).val(data.concept_result);
	$('#mvariation-variation_text'+cloneCount).val(data.variation_text);
	$('#mvariation-active'+cloneCount).val(data.active);
	if(data.active == 1){
		$('#mvariation-active'+cloneCount).iCheck('check');
	}

	$("#mvariation-variation_text"+cloneCount).tagsinput({
		trimValue: true
	});

	$('#dvvariation'+cloneCount+' input[type="checkbox"]').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		labelHover: true,
		increaseArea: '20%' // optional
	});


};

me.RemoveSub = function (e){
	var code = $(e).attr('data-code');
	$('#'+code).remove();
}

me.Add = function () {
	$('#btnsubmit').click(function (e) {
		e.stopPropagation();
		if($('#variation-variation_text').attr('required') == 'required'){
			if(!$('#variation-variation_text').val()){
				$('#variation-variation_text').tagsinput('focus');
				return false;
			}
		}
		$('form#frm_addedit').submit(function () {
			var form = $(this);
			$('.modal').modal('hide');
			alertify.confirm("Do you want Add.",
				function () {
					$.ajax({
						url: me.url + '-Add',
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: form.serialize({
							checkboxesAsBools: true
						}),
						success: function (data) {
							switch (data.success) {
								case 'COMPLETE':
									$('.modal').modal('hide');
									alertify.success(data.msg);
									// $('#btnsearchsubmit').click();
									// me.table.clear().draw();
									me.LoadData(me.action.menu, 1, 30, 1);
									break;
								default:
									alertify.error(data.msg);
									break;
							}
						}
					});
				},
				function () {
					alertify.error('Cancel Add');
				});

		});

	}).click();
};me.Add = function () {
	$('#btnsubmit').click(function (e) {
		e.stopPropagation();
		if($('#variation-variation_text').attr('required') == 'required'){
			if(!$('#variation-variation_text').val()){
				$('#variation-variation_text').tagsinput('focus');
				return false;
			}
		}
		$('form#frm_addedit').submit(function () {
			var form = $(this);
			$('.modal').modal('hide');
			alertify.confirm("Do you want Add.",
				function () {
					$.ajax({
						url: me.url + '-Add',
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: form.serialize({
							checkboxesAsBools: true
						}),
						success: function (data) {
							switch (data.success) {
								case 'COMPLETE':
									$('.modal').modal('hide');
									alertify.success(data.msg);
									// $('#btnsearchsubmit').click();
									// me.table.clear().draw();
									me.LoadData(me.action.menu, 1, 30);
									break;
								default:
									alertify.error(data.msg);
									break;
							}
						}
					});
				},
				function () {
					alertify.error('Cancel Add');
				});

		});

	}).click();
};

me.LoadData = function(menu,page_id,page_size,readd=''){

	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ menu_action : menu , page_id : page_id , page_size : page_size},
		success:function(data){
			switch(data.success){
				case 'COMPLETE' :
					if(me.table){
					if(Object.entries(me.table).length > 0){
						$('#tbView').DataTable().destroy();
						$("#tbView").empty();
					}	
					}	
					
						me.table = $('#tbView')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
								columnDefs: [
									{
										"width": "5%",
										"targets": 0,
										"searchable": false,
										"orderable": false
									},
									{
										"width": "5%",
										"targets": 1,
										"searchable": false
									},
									{
										"width": "5%",
										"targets": -1,
										"searchable": false,
										"orderable": false
									}
								],
								createdRow: function( row, data, dataIndex ) {
									// Set the data-status attribute, and add a class
									$( row ).find('td:eq(0)')
										.attr('data-name', data.variation);
								},

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
						$('#tbView').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
								$('#myModal').modal({show:true});
								let table = $('#tbView').DataTable();
								let rowID = table.row(this).index()
								let rowData = table.rows( rowID ).data().toArray();	
								document.getElementById('concept_id').value=rowData[0].concept_id
							me.LoadDatavariation(1,25,rowData[0].concept_id)
        } )

										if(data.data){
						readd=1
						
					}
					if(readd == 1){						
if(data.data){
me.table.clear().draw();	
						me.table.rows.add(data.data).draw();
						me.table.page.len(page_size).draw();	
						
}else{
	me.table.clear().draw();
}
					}
					me.dataold = data.data;
					me.table.columns.adjust().draw('true');

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

me.LoadDatavariation =  function(page_id, page_size,concept_id,readd=''){
	
	$.ajax({
		url: me.url + '-ViewVariation',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size , concept_id : concept_id},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
					if(me.table1){
					if(Object.entries(me.table1).length > 0){
						$('#example').DataTable().destroy();
						$("#example").empty();
					}	
					}					
						me.table1 = $('#example')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({
							dom: 'Bfrtip',
                            buttons: [
							$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'add variation',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										$('#exampleModal').modal({show:true});			
										document.getElementById('frm_addedit_variation').reset()
										document.getElementById('concept_variation_id').value=''
										}
                                })	],								
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								select: {
							style: 'multi'
									},
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
                                "url": me.url + "-ViewVariation",
                                "type": "POST",
                                "data": function (d) {
                                    d.page_id = (d.start / d.length) + 1;
									d.page_size=$('#page_size').val();
                                    d.concept_id = concept_id;
                                }
                            }
							});
				
				$('#example').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
								$('#exampleModal').modal({show:true});
								let table = $('#example').DataTable();
								let rowID = table.row(this).index()
								let rowData = table.rows( rowID ).data().toArray();	
								document.getElementById('concept_result').value=rowData[0].concept_result
								document.getElementById('variation_text').value=rowData[0].variation_text
								document.getElementById('concept_variation_id').value=rowData[0].concept_variation_id
        } )
		
		$('#example').DataTable().on( 'select', function ( e, dt, type, indexes ) {

						let rowData = $('#example').DataTable().rows('.selected').data()
							if($('#example').DataTable().rows('.selected').data().length > 0){
								document.getElementById('delete').disabled=false
							}
													
        } )
		$('#example').DataTable().on( 'deselect', function ( e, dt, type, indexes ) {
							if($('#example').DataTable().rows('.selected').data().length == 0){
								document.getElementById('delete').disabled=true
							}		
        } )
		
					me.table.columns.adjust().draw('true');

					me.table.buttons(0, null).container().addClass('col');


				
					if(data.data){
						readd=1
						
					}
					if(readd == 1){						
if(data.data){
me.table1.clear().draw();	
						me.table1.rows.add(data.data).draw();
						me.table1.page.len(page_size).draw();	
						
}else{
	me.table1.clear().draw();
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
$('form#frm_addedit_variation').submit(function (e) {
	let data = $('#frm_addedit_variation').serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
}, {});
if(document.getElementById('concept_variation_id').value == ''){
			alertify.confirm("Do you want Add variation.",
				function () {
					$.ajax({
						url: me.url + '-Addvariation',
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: data,
						success: function (data) {
							switch (data.success) {
								case 'COMPLETE':
									$('#exampleModal').modal('hide');
									alertify.success(data.msg);
									me.table1.ajax.reload();
									break;
								default:
									alertify.error(data.msg);
									break;
							}
						}
					});
				},
				function () {
					alertify.error('Cancel Add');
				});
}else{
	alertify.confirm("Do you want Update variation.",
				function () {
					$.ajax({
						url: me.url + '-Editvariation',
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: data,
						success: function (data) {
							switch (data.success) {
								case 'COMPLETE':
									$('#exampleModal').modal('hide');
									alertify.success(data.msg);
									me.table1.ajax.reload();
									break;
								default:
									alertify.error(data.msg);
									break;
							}
						}
					});
				},
				function () {
					alertify.error('Cancel Edit');
				});	
}	
})

me.deltedata=function (){	
let datajson=[]
for(let i=0; i<$('#example').DataTable().rows('.selected').data().length; i++){
			let data={'concept_variation_id':$('#example').DataTable().rows('.selected').data()[i].concept_variation_id}
			datajson.push(data)
		}
	let data={
			'concept_id':document.getElementById('concept_id').value,
			'variation_del':datajson
		}
		
			alertify.confirm("Do you want Update variation.",
				function () {
					$.ajax({
						url: me.url + '-Delvariation',
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: data,
						success: function (data) {
							switch (data.success) {
								case 'COMPLETE':
									$('#exampleModal').modal('hide');
									alertify.success(data.msg);
									me.table1.ajax.reload();
									document.getElementById('delete').disabled=true
									break;
								default:
									alertify.error(data.msg);
									break;
							}
						}
					});
				},
				function () {
					alertify.error('Cancel Edit');
				});	
}

/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();

	me.LoadData(me.action.menu,1,30);
});