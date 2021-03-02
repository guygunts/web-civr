let datapostjson=[]
$('form#frm_addedit').submit(function (){
											let grammarName=document.getElementById('grammarNameadd').value
											let intentName=document.getElementById('intentNameadd').value
											let page_size=document.getElementById('page_sizeadd').value
											me.LoadDataconfigadd(1, page_size,grammarName,intentName,readd='')
											me.table.page.len(page_size).draw();
})
me.Search = function(){
$('form#frmsearch').submit(function () {
	let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
		me.table.page.len(page_size).draw();	
});
};

me.LoadDataconfig =  function(page_id, page_size,grammar_id,intent_id,readd=''){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size , grammar_id : grammar_id,intent_id:intent_id},
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
                                    text: 'add file',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										$('#exampleModal').modal({show:true});
										if(me.table1){
									 $('#tbView1').DataTable().clear().draw();		
					}					
											//let grammarName=document.getElementById('grammarNameadd').value
											let intentName=document.getElementById('intentNameadd').value
											let page_size=document.getElementById('page_sizeadd').value
											me.LoadDataconfigadd(1, page_size,'',intentName,readd='')
											me.table.page.len(page_size).draw();
											document.getElementById('frm_addedit').reset()
											document.getElementById('test').disabled=true	
																
										}
                                })	],								
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
							});

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
						me.table.page.len(page_size).draw();	
						
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


me.adddata= function (number){
	let data=[]
//	if(document.getElementById('grammarNameadd').value ==''){
//		    alertify.alert('Alert Error', 'please select grammar', function(){ alertify.success('Ok'); });
//		return false
	//}
	
	if(document.getElementById('grammarversion').value ==''){
		    alertify.alert('Alert Error', 'please select Version', function(){ alertify.success('Ok'); });
		return false
	}
	let dataselect = document.getElementById('grammarNameadd');
		let textselect = dataselect.options[dataselect.selectedIndex].text;
	


	let datajson={
			'grammar_id':document.getElementById('grammarNameadd').value,
			'intent_id':document.getElementById('intentNameadd').value,
			'grammar_version':document.getElementById('grammarversion').value,
			'grammar_name':textselect,
			'datajson':datapostjson
		}
				   	if(number ==0){

			            $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                success: function (data) {                 											
						 $('.modal').modal('hide');
						 if(data.code){
							alertify.error('Add Fail');
						return false							
						 }
                          alertify.success('Add success');						
                    }
                
            });
	}else{
		 $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                success: function (data) {                 											
						$('.modal').modal('hide');
						if(data.code){
							alertify.error('Add Fail'); 
							return false
						 }
                          alertify.success('Add success');							
                    }
		 })
	}
				  
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

me.LoadCbogrammar = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.grammar_id)
            .text(result.grammar_name)
            .appendTo("#" + val);
    });

};

me.LoadCboversion = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.build_version)
            .text(result.build_version)
            .appendTo("#" + val);
    });

};

me.LoadCbointent = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.intent_id)
            .text(result.intent_tag)
            .appendTo("#" + val);
    });

};

me.LoadCboconcept = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", `${result.concept_name}|${result.concept_result}`)
            .text(`${result.concept_name}|${result.concept_result}`)
            .appendTo("#" + val);
    });

};

me.changedataadd= function (){
		let myData= {
		"grammar_id":document.getElementById('grammarNameadd').value
	}
	            $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentNameadd',data.dropdownintent)	
						
                    }
                
            });
	
}

me.changedata= function (){
		let myData= {
		"grammar_id":document.getElementById('grammarName').value
	}
	            $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentName',data.dropdownintent)						
                    }
                
            });
			let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
	
}

me.changedata1= function(){
	let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
	
}


me.changedataadd= function (){
		let myData= {
		"grammar_id":document.getElementById('grammarNameadd').value
	}
	            $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentNameadd',data.dropdownintent)							
                    }
                
            });
			let grammarName=document.getElementById('grammarNameadd').value
	let intentName=document.getElementById('intentNameadd').value
	let page_size=document.getElementById('page_sizeadd').value
		me.LoadDataconfigadd(1, page_size,grammarName,intentName,readd='')
											me.table.page.len(page_size).draw();
	
}

me.changedata1add= function(){
	let grammarName=document.getElementById('grammarNameadd').value
	let intentName=document.getElementById('intentNameadd').value
	let page_size=document.getElementById('page_sizeadd').value
		me.LoadDataconfigadd(1, page_size,grammarName,intentName,readd='',1)
											me.table.page.len(page_size).draw();
	
}

me.LoadDataconfigadd =  function(page_id, page_size,grammar_id,intent_id,readd='',changedata=''){
	
	$.ajax({
		url: me.url + '-Viewadd',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size , grammar_id : grammar_id,intent_id:intent_id},
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
					if(me.table1){
					if(Object.entries(me.table1).length > 0){
						$('#tbView1').DataTable().destroy();
						$("#tbView1").empty();
					}	
					}					
						me.table1 = $('#tbView1')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({							
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
								columns: data.columns,dom: 'Blfrtip',
    buttons: [
        'selectAll',
        'selectNone'
    ],
    language: {
        buttons: {
            selectAll: "Select all items",
			enable:true
        },
		buttons: {
            selectNone: "Select none"
        }
    }
							});

					$('#tbView1').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							
						let rowData = $('#tbView1').DataTable().rows(indexes).data().toArray()

						for(let i=0; i<rowData.length; i++){
							if(datapostjson.length == 0){
								datapostjson.push(rowData[i])
								document.querySelector('#selecttotal').textContent = datapostjson.length;
								continue
							}
							
								let number=rowData[i].voice_id
								let datamatch=datapostjson.filter(function(e){
										return e.voice_id === number
								});
								if(datamatch.length == 0){
									datapostjson.push(rowData[i])
								}
								document.querySelector('#selecttotal').textContent = datapostjson.length;
							
						}
					
							if($('#tbView1').DataTable().rows('.selected').data().length > 0){
								document.getElementById('test').disabled=false
							}
													
        } )
		$('#tbView1').DataTable().on( 'deselect', function ( e, dt, type, indexes ) {
			let rowData = $('#tbView1').DataTable().rows(indexes).data().toArray()
			let num =datapostjson.length
			let number1=0
			if(rowData.length >1){
			for(let i=0; i<datapostjson.length; i++){
					
								let number=datapostjson[i].voice_id
								let datamatch=rowData.filter(function(e){
										return e.voice_id === number
								});
								if(datamatch.length !== 0){
									//delete datapostjson[i]
									datapostjson.pop(); 	
									i=-1									
								document.querySelector('#selecttotal').textContent = datapostjson.length;
							
						}
						}
			}else{
				for(let i=0; i<datapostjson.length; i++){
					
								
								if(datapostjson[i].voice_id ==rowData[0].voice_id){
									datapostjson.splice(i,1);																
								document.querySelector('#selecttotal').textContent = datapostjson.length;
								break
						}
						}
			}
				/*		if(num !== datapostjson.length){
							for(const[key,value] of Object.entries(rowData)){
							let number=value.voice_id
							let datamatch=datapostjson.filter(function(e){
										return e.voice_id === number
								});
										if(datamatch.length !== 0){
									//delete datapostjson[i]
									datapostjson.splice(0, Number(key)); 
						
								document.querySelector('#selecttotal').textContent = datapostjson.length;
							
						}
							}
							
						}*/
						
							if($('#tbView1').DataTable().rows('.selected').data().length == 0){
								document.getElementById('test').disabled=true
							}	
										
        } )
		if(changedata){
			$('.buttons-select-all').removeClass('disabled');
			document.getElementById('alltest').disabled=true 
		}else{
			$('.buttons-select-all').addClass('disabled');
		}		
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

function downloaddata(data,name){
	
            axios.get(me.download + '/geniespeech/downloadtesttool?grammar_test_id='+data,{responseType: 'blob'}).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data],{'type':"application/octet-stream",'Content-Disposition':'attachment; filename='+name,'Content-Length':response.data.size}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            }).catch(function (error) {
				alertify.alert('Alert Error', 'no such file or directory'); 
                
            });	;	
	}

function deletedata(data){

	let datajson={
		'grammar_test_id':data
	}
		            $.ajax({
                url: me.url + '-Delete',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                success: function (data) {  				
                        alertify.success('delete success');
						let grammarName=document.getElementById('grammarName').value
					let intentName=document.getElementById('intentName').value
					let page_size=document.getElementById('page_size').value
					me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
					me.table.page.len(page_size).draw();	
                    }
                
            });
}

function totalresult(){
	$('#myModal').modal({show:true});
	document.getElementById('deletedata').disabled=true
	document.getElementById('testdata').disabled=false
	let columnsname=[{className: "text-center", title: "No", data: "no"},
	{className: "text-left", title: "sentence", data: "sentence"},
	{className: "text-left", title: "grammar_name", data: "grammar_name"},
	{className: "text-left", title: "intent_tag", data: "intent_tag"},
	{className: "text-left", title: "voice_name", data: "voice_name"},
	{className: "text-left", title: "audio", data: "path"},
	{className: "text-left", title: "concept", data: "concept"},
	{className: "text-left", title: "create_date", data: "create_date"}]
					if(me.tabletotal){
						me.tabletotal={}
						$('#exampleModal1').DataTable().destroy();
						$("#exampleModal1").empty();
					}
							me.tabletotal=$('#exampleModal1')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({							
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								select: true,
								iDisplayLength : 5,
								responsive: false,
								scrollX: true,
								pageLength: 5,
								paging: true,
								lengthChange:false,
								data: datapostjson,
								columns: columnsname,
							},);
							
									$('#exampleModal1').DataTable().on( 'deselect', function ( e, dt, type, indexes ) {
										
							if($('#exampleModal1').DataTable().rows('.selected').data().length == 0){
								document.getElementById('deletedata').disabled=true
							}	
										
        } )
		
							$('#exampleModal1').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							
	
					
							if($('#exampleModal1').DataTable().rows('.selected').data().length > 0){
								document.getElementById('deletedata').disabled=false
							}
													
        } )

							
	}

function deletetableselect(){
	

		let data=$('#exampleModal1').DataTable().rows('.selected').indexes()
		let datajson=$('#exampleModal1').DataTable().rows('.selected').data().toArray()
	
    $('#exampleModal1').DataTable().row(data).remove().draw();
	
	for(let i=0; i<datapostjson.length; i++){
					
								
								if(datajson[0].voice_id ==datapostjson[i].voice_id){
									datapostjson.splice(i,1);																
								document.querySelector('#selecttotal').textContent = datapostjson.length;
								break
						}
						}
						if(datapostjson.length ==0){
							document.getElementById('testdata').disabled=true
						}else{
							document.getElementById('testdata').disabled=false
						}
}

function testselect(){
	if(document.getElementById('grammarversion').value ==''){
		    alertify.alert('Alert Error', 'please select Version', function(){ alertify.success('Ok'); });
		return false
	}
	let dataselect = document.getElementById('grammarNameadd');
		let textselect = dataselect.options[dataselect.selectedIndex].text;

	let datajson={
			'grammar_id':document.getElementById('grammarNameadd').value,
			'intent_id':'',
			'grammar_version':document.getElementById('grammarversion').value,
			'grammar_name':textselect,
			'datajson':datapostjson
		}
		

			            $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                success: function (data) {                 											
						 $('.modal').modal('hide');
						 if(data.code){
							alertify.error(data.mess);
						return false							
						 }
                          alertify.success('Add success');						
                    }
                
            });
	
}
	
/*================================================   $('#tbView').DataTable().rows('.selected').data()  *\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();
	me.Search();

document.getElementById('test').disabled  =true
	let myData= {
		"grammar_id":""
	}
	            $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                
                        me.LoadCbogrammar('grammarName',data.dropdowngrammar)
						me.LoadCbogrammar('grammarNameadd',data.dropdowngrammar)  											
						me.LoadCbointent('intentName',data.dropdownintent)		
						me.LoadCboversion('grammarversion',data.dropdownnameversion)
                    }
                
            });
	me.LoadDataconfig(1, 25,'','')
});

$(".select2").select2({ width: '110%' });