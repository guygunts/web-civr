let datapostjson=[]
let datapostcolumns
me.intent_id=0
async function submitdata(){
	 if(document.getElementById('grammarNameadd').value== ""){
    alertify.alert('Error','please select grammar.');  
    return false
  }
  
   if(document.getElementById('intentNameadd').value== ""){
    alertify.alert('Error','please select intent.');  
    return false
  }
  
  if(document.getElementById('sentence').value== "" && document.getElementById('customFile').files.length ==0){
    alertify.alert('Error','please insert sentence or upload file sentence.');  
    return false
  }
  
  
	let textconcept=''
	let dataepo=''
	if(document.getElementById('concept').value !== ""){
		for(let i=0; i<$("#concept").select2("val").length; i++){
		if(i+1 == $("#concept").select2("val").length){
		textconcept+=`${$("#concept").select2("val")[i]}`
		break
	}
		textconcept+=`${$("#concept").select2("val")[i]},`
	}
	}
		if(file=document.getElementById('customFile').files.length >0){
		let file=document.getElementById('customFile').files
		 dataepo=await readFileAsync(file[0])	
		 console.log(dataepo)
		}
		
			   	let datajson={
		"grammar_id":document.getElementById('grammarNameadd').value,
		"intent_id":document.getElementById('intentNameadd').value,
		"concept_name":textconcept,
		"sentence_name":document.getElementById('sentence').value,
		"datafile":dataepo
	}
	if(document.getElementById('test_sentence_id').value == ''){
			            $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
				beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
				complete: function() { $('.loading-container').addClass('loading-inactive'); },
                cache: false,
                data: datajson,
                success: function (data) {                 											
						 $('.modal').modal('hide');
						 let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
		me.table.page.len(page_size).draw();
						 if(data.code){
							alertify.error('Add Fail');
						return false							
						 }
                          alertify.success('Add success');						
                    }
                
            });
	}else{
		let datasplit=document.getElementById('sentence').value
		let split=datasplit.split(',')
		split
		if(split.length > 1){
    alertify.alert('Error','please insert sentence only one.');  
    return false
  }
		datajson.test_sentence_id=document.getElementById('test_sentence_id').value
		$.ajax({
                url: me.url + '-Edit',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: datajson,
                success: function (data) {                 											
						 $('.modal').modal('hide');
							let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
		me.table.page.len(page_size).draw();
						 if(data.code !== 200){
							alertify.error('Add Fail');
						return false							
						 }
                          alertify.success('Add success');						
                    }
                
            });

	}
		
	}
	
function changedatafilename(data){
  let obj = dataexcel.find(datafind => datafind[data.value]);

  let datacupo=[]
  for(const [key, value] of Object.entries(obj[data.value])){
    for(const [keys, values] of Object.entries(value)){
      datacupo.push(keys)
    }
    
  }
  LoadCboFileName('sheet', datacupo)
}
 function readFileAsync(file) {
  
  return new Promise((resolve, reject) => {
	  
    let reader = new FileReader();

    reader.onload = function (e) {
		try{
      // var data = e.target.result;
      
         var bytes = new Uint8Array(e.target.result);
      var length = bytes.byteLength;
      var binary = "";
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var workbook =  XLSX.read(binary, {
        type: true ? 'binary' : 'array'
      });
    let datajsonfile=[]
	 workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        resolve(XL_row_object)

      })
    
	}catch(error){ 
  alertify.alert('Error', error.message);
  }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  
    
  })
  
}

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
											$('#grammarNameadd').val(null).trigger('change');
											me.intent_id=null
											$('#concept').val(null).trigger('change');
											$('#sentence').tagsinput('removeAll');
											document.getElementById('test_sentence_id').value=null
											document.getElementById("customFile").value = null;
											document.getElementById("filediv").style.display = "block";
											document.getElementById('deletetest').disabled=true
											
											
																
										}
                                }),$.extend(true, {}, {                                  
                                    text: 'Select All',
                                    className: 'buttons-select-all',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										me.table.rows({page: 'all'}).select();
										$('.buttons-select-none').removeClass('disabled');	
																
										}
                                }),$.extend(true, {}, {                          
                                    text: 'Select None',
                                    className: 'buttons-select-none',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										me.table.rows({page: 'all'}).deselect();
										$('.buttons-select-none').addClass('disabled');	
																
										}
                                }),$.extend(true, {}, {                          
                                    text: 'Result Test',
                                    className: '',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										$('#myModal1').modal({show:true});
										var start = $('#start_date').data().date;
										var stop = $('#end_date').data().date;
										me.LoadDataconfigadd(1, 10,start,stop,readd='',1)									
										}
                                })	],								
								searching: false,
								retrieve: true,
								deferRender: true,
								select: {
										style: 'multi'
										},
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
							datapostcolumns=data.columns
												$('#tbView').DataTable().on( 'select', function ( e, dt, type, indexes ) {
							
						let rowData = $('#tbView').DataTable().rows(indexes).data().toArray()

						for(let i=0; i<rowData.length; i++){
							if(datapostjson.length == 0){
								datapostjson.push(rowData[i])
								document.querySelector('#selecttotal').textContent = datapostjson.length;
								continue
							}
							
								let number=rowData[i].test_sentence_id
								let datamatch=datapostjson.filter(function(e){
										return e.test_sentence_id === number
								});
								if(datamatch.length == 0){
									datapostjson.push(rowData[i])
								}
								document.querySelector('#selecttotal').textContent = datapostjson.length;
							
						}
					
							if($('#tbView').DataTable().rows('.selected').data().length > 0){
								document.getElementById('delete').disabled=false
							}
													
        } )
		
							$('#tbView').DataTable().on( 'deselect', function ( e, dt, type, indexes ) {
			let rowData = $('#tbView').DataTable().rows(indexes).data().toArray()
			let num =datapostjson.length
			let number1=0
			if(rowData.length >1){
			for(let i=0; i<datapostjson.length; i++){
					
								let number=datapostjson[i].test_sentence_id
								let datamatch=rowData.filter(function(e){
										return e.test_sentence_id === number
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
						
							if($('#tbView').DataTable().rows('.selected').data().length == 0){
								document.getElementById('delete').disabled=true
							}	
										
        } )
											$('#tbView').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
							let table = $('#tbView').DataTable();
							let rowID = table.row(this).index()
						let rowData = table.rows( rowID ).data().toArray();
						if(rowData.length >0){
						$('#sentence').tagsinput('removeAll');
					$('#exampleModal').modal('show');
					document.getElementById('deletetest').disabled=false
							
							me.intent_id=rowData[0].intent_id
							
							$('#grammarNameadd').val(rowData[0].grammar_id).change();
							
												
											let data =rowData[0].concept_name.split(',')
											$('#concept').val(data).trigger('change');
											$('#sentence').tagsinput('add', rowData[0].sentence_name);
											document.getElementById('test_sentence_id').value=rowData[0].test_sentence_id
					document.getElementById("filediv").style.display = "none";											
						}		
        } )

  
					me.table.columns.adjust().draw('true');

					me.table.buttons(0, null).container().addClass('col');

					$('.buttons-select-none').addClass('disabled');
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
	

	let dataselect = document.getElementById('grammarNameadd');
		let textselect = dataselect.options[dataselect.selectedIndex].text;
	


	let datajson={
			'grammar_id':document.getElementById('grammarNameadd').value,
			'intent_id':document.getElementById('intentNameadd').value,
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

me.changedataadd= async function (){
		let myData= {
		"grammar_id":document.getElementById('grammarNameadd').value
	}
	          await  $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentNameadd',data.dropdownintent)							
						
                    }
                
            });
	$('#intentNameadd').val(me.intent_id).change()	
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


me.onsummitdata= function(){
		let start = $('#start_date').data().date;
		let stop = $('#end_date').data().date;
		let page_size=document.getElementById('page_size1').value
		me.LoadDataconfigadd(1, page_size,start,stop,readd='',1)
		me.table1.page.len(page_size).draw();
	
}

me.LoadDataconfigadd =  function(page_id, page_size,start_date,end_date,readd='',changedata=''){
	
	$.ajax({
		url: me.url + '-Viewadd',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{ page_id : page_id , page_size : page_size,start_date:start_date,end_date:end_date },
		success:function(data){
			
			switch(data.success){
					case 'COMPLETE' :
					if(me.table1){
					if(Object.entries(me.table1).length > 0){
						$('#exampleModal2').DataTable().destroy();
						$("#exampleModal2").empty();
					}	
					}					
						me.table1 = $('#exampleModal2')
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
								columns: data.columns
							});
		
					me.table1.columns.adjust().draw('true');

					me.table1.buttons(0, null).container().addClass('col');


					if(data.data == null){
							me.table1.clear().draw();
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


            axios.get(me.download + '/geniespeech/downloadtestsentencefile?grammar_test_id='+data,{responseType: 'blob'}).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data],{'type':"application/octet-stream",'Content-Disposition':'attachment; filename='+name,'Content-Length':response.data.size}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            });	
	}

function deletedata(){

	
	let datajson={
		'test_sentence_id':document.getElementById('test_sentence_id').value
	}
		            $.ajax({
                url: me.url + '-Delete',
                type: 'POST',
                dataType: 'json',
                cache: false,
				beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
				complete: function() { $('.loading-container').addClass('loading-inactive'); },
                data: datajson,
                success: function (data) {  				
                        alertify.success('delete success');
						$('.modal').modal('hide');
	let grammarName=document.getElementById('grammarName').value					
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
	me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
		me.table.page.len(page_size).draw();
		datapostjson=[]		
document.querySelector('#selecttotal').textContent = 0
                    }
                
            });
}

function deletedatafile(data){

	
	let datajson={
		'test_sentence_file_id':data
	}
		            $.ajax({
                url: me.url + '-Deletefile',
                type: 'POST',
                dataType: 'json',
                cache: false,
				beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
				complete: function() { $('.loading-container').addClass('loading-inactive'); },
                data: datajson,
                success: function (data) {  				
                        alertify.success('delete success');
						
	let start = $('#start_date').data().date;
		let stop = $('#end_date').data().date;
		let page_size=document.getElementById('page_size1').value
		me.LoadDataconfigadd(1, page_size,start,stop,readd='',1)
		me.table1.page.len(page_size).draw();
		datapostjson=[]		
document.querySelector('#selecttotal').textContent = 0
                    }
                
            });
}

function deletemutidata(){
    alertify.confirm("Do you want Delete.",
       async function () {
			
						 let myData = {
		data:{
			"delete_data":datapostjson,
		}
    }
          await $.ajax({
                url: me.url + '-Delete',
                type: 'POST',
                dataType: 'json',
				beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
				complete: function() { $('.loading-container').addClass('loading-inactive'); },
                cache: false,
                data: myData.data,
                success: function (data) {                               
					alertify.success('delete success');
					let grammarName=document.getElementById('grammarName').value
	let intentName=document.getElementById('intentName').value
	let page_size=document.getElementById('page_size').value
		me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
		me.table.page.len(page_size).draw();
datapostjson=[]		
document.querySelector('#selecttotal').textContent = 0
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
	
}

function totalresult(){
	
	$('#myModal').modal({show:true});
	document.getElementById('deletedata').disabled=true
	$('#grammarversion').val(null).trigger('change');
		document.getElementById('testdata').disabled=true
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
								columns: datapostcolumns,
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
							
							document.getElementById('deletedata').disabled=true
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
	if(datapostjson.length == 0){
		    alertify.alert('Alert Error', 'No data to Send to test', function(){ alertify.success('Ok'); });
		return false
	}
	let datajson={
			'datajson':datapostjson
		}
		datajson.grammar_version=document.getElementById('grammarversion').value
			            $.ajax({
                url: me.url + '-Addfile',
                type: 'POST',
                dataType: 'json',
				beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
						complete: function() { $('.loading-container').addClass('loading-inactive'); },
                cache: false,
                data: datajson,
                success: function (data) {                 											
						 $('.modal').modal('hide');
						 if(data.code){
							alertify.error(data.mess);
						return false							
						 }
                          alertify.success('Add success');	
						datapostjson=[]		
						document.querySelector('#selecttotal').textContent = 0						  
                    }
                
            });
	
}
	
me.LoadCboconcept = function (val, data) {
    $("#" + val + ' option').remove();
    //$("<option>").attr("value", '').text('== ' + val.toUpperCase() + ' ==').appendTo("#" + val);
    $.each(data, function (i, result) {
		if(result.concept_result == null ||result.concept_result == '' ){
        $("<option>").attr("value", `${result.concept_name}:`).text(`${result.concept_name}:`).appendTo("#" + val);
		}else{
		$("<option>").attr("value", `${result.concept_name}:${result.concept_result}`).text(`${result.concept_name}:${result.concept_result}`).appendTo("#" + val);	
		}
    });

};
/*================================================   $('#tbView').DataTable().rows('.selected').data()  *\
  :: DEFAULT ::
\*================================================*/

(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    itemTitle: function(item) {
      return null;
    },
    freeInput: true,
    addOnBlur: true,
    maxTags: undefined,
    maxChars: undefined,
    confirmKeys: [13, 44],
    delimiter: ',',
    delimiterRegex: null,
    cancelConfirmKeysOnEmpty: true,
    onTagExists: function(item, $tag) {
      $tag.hide().fadeIn();
    },
    trimValue: false,
    allowDuplicates: false
  };

  /**
   * Constructor function
   */
  function TagsInput(element, options) {
    this.itemsArray = [];

    this.$element = $(element);
    this.$element.hide();

    this.isSelect = (element.tagName === 'SELECT');
    this.multiple = (this.isSelect && element.hasAttribute('multiple'));
    this.objectItems = options && options.itemValue;
    this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
    this.inputSize = Math.max(1, this.placeholderText.length);

    this.$container = $('<div class="bootstrap-tagsinput"></div>');
    this.$input = $('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);

    this.$element.before(this.$container);

    this.build(options);
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    /**
     * Adds the given item as a new tag. Pass true to dontPushVal to prevent
     * updating the elements val()
     */
    add: function(item, dontPushVal, options) {
      var self = this;

      if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
        return;

      // Ignore falsey values, except false
      if (item !== false && !item)
        return;

      // Trim value
      if (typeof item === "string" && self.options.trimValue) {
        item = $.trim(item);
      }

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && !self.objectItems)
        throw("Can't add objects when itemValue option is not set");

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/))
        return;

      // If SELECT but not multiple, remove current tag
      if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
        self.remove(self.itemsArray[0]);

      if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
        var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
        var items = item.split(delimiter);
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal)
            self.pushVal();
          return;
        }
      }

      var itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item),
          itemTitle = self.options.itemTitle(item);

      // Ignore items allready added
      var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];
      if (existing && !self.options.allowDuplicates) {
        // Invoke onTagExists
        if (self.options.onTagExists) {
          var $existingTag = $(".tag", self.$container).filter(function() { return $(this).data("item") === existing; });
          self.options.onTagExists(item, $existingTag);
        }
        return;
      }

      // if length greater than limit
      if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
        return;

      // raise beforeItemAdd arg
      var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options});
      self.$element.trigger(beforeItemAddEvent);
      if (beforeItemAddEvent.cancel)
        return;

      // register item in internal array and map
      self.itemsArray.push(item);

      // add a tag element

      var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
      $tag.data('item', item);
      self.findInputWrapper().before($tag);
      $tag.after(' ');

      // add <option /> if item represents a value not present in one of the <select />'s options
      if (self.isSelect && !$('option[value="' + encodeURIComponent(itemValue) + '"]',self.$element)[0]) {
        var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
        $option.data('item', item);
        $option.attr('value', itemValue);
        self.$element.append($option);
      }

      if (!dontPushVal)
        self.pushVal();

      // Add class when reached maxTags
      if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
        self.$container.addClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
    },

    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    remove: function(item, dontPushVal, options) {
      var self = this;

      if (self.objectItems) {
        if (typeof item === "object")
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  self.options.itemValue(item); } );
        else
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  item; } );

        item = item[item.length-1];
      }

      if (item) {
        var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false, options: options });
        self.$element.trigger(beforeItemRemoveEvent);
        if (beforeItemRemoveEvent.cancel)
          return;

        $('.tag', self.$container).filter(function() { return $(this).data('item') === item; }).remove();
        $('option', self.$element).filter(function() { return $(this).data('item') === item; }).remove();
        if($.inArray(item, self.itemsArray) !== -1)
          self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
      }

      if (!dontPushVal)
        self.pushVal();

      // Remove class when reached maxTags
      if (self.options.maxTags > self.itemsArray.length)
        self.$container.removeClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemRemoved',  { item: item, options: options }));
    },

    /**
     * Removes all items
     */
    removeAll: function() {
      var self = this;

      $('.tag', self.$container).remove();
      $('option', self.$element).remove();

      while(self.itemsArray.length > 0)
        self.itemsArray.pop();

      self.pushVal();
    },

    /**
     * Refreshes the tags so they match the text/value of their corresponding
     * item.
     */
    refresh: function() {
      var self = this;
      $('.tag', self.$container).each(function() {
        var $tag = $(this),
            item = $tag.data('item'),
            itemValue = self.options.itemValue(item),
            itemText = self.options.itemText(item),
            tagClass = self.options.tagClass(item);

          // Update tag's class and inner text
          $tag.attr('class', null);
          $tag.addClass('tag ' + htmlEncode(tagClass));
          $tag.contents().filter(function() {
            return this.nodeType == 3;
          })[0].nodeValue = htmlEncode(itemText);

          if (self.isSelect) {
            var option = $('option', self.$element).filter(function() { return $(this).data('item') === item; });
            option.attr('value', itemValue);
          }
      });
    },

    /**
     * Returns the items added as tags
     */
    items: function() {
      return this.itemsArray;
    },

    /**
     * Assembly value by retrieving the value of each item, and set it on the
     * element.
     */
    pushVal: function() {
      var self = this,
          val = $.map(self.items(), function(item) {
            return self.options.itemValue(item).toString();
          });

      self.$element.val(val, true).trigger('change');
    },

    /**
     * Initializes the tags input behaviour on the element
     */
    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);
      // When itemValue is set, freeInput should always be false
      if (self.objectItems)
        self.options.freeInput = false;

      makeOptionItemFunction(self.options, 'itemValue');
      makeOptionItemFunction(self.options, 'itemText');
      makeOptionFunction(self.options, 'tagClass');

      // Typeahead Bootstrap version 2.3.2
      if (self.options.typeahead) {
        var typeahead = self.options.typeahead || {};

        makeOptionFunction(typeahead, 'source');

        self.$input.typeahead($.extend({}, typeahead, {
          source: function (query, process) {
            function processItems(items) {
              var texts = [];

              for (var i = 0; i < items.length; i++) {
                var text = self.options.itemText(items[i]);
                map[text] = items[i];
                texts.push(text);
              }
              process(texts);
            }

            this.map = {};
            var map = this.map,
                data = typeahead.source(query);

            if ($.isFunction(data.success)) {
              // support for Angular callbacks
              data.success(processItems);
            } else if ($.isFunction(data.then)) {
              // support for Angular promises
              data.then(processItems);
            } else {
              // support for functions and jquery promises
              $.when(data)
               .then(processItems);
            }
          },
          updater: function (text) {
            self.add(this.map[text]);
            return this.map[text];
          },
          matcher: function (text) {
            return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
          },
          sorter: function (texts) {
            return texts.sort();
          },
          highlighter: function (text) {
            var regex = new RegExp( '(' + this.query + ')', 'gi' );
            return text.replace( regex, "<strong>$1</strong>" );
          }
        }));
      }

      // typeahead.js
      if (self.options.typeaheadjs) {
          var typeaheadConfig = null;
          var typeaheadDatasets = {};

          // Determine if main configurations were passed or simply a dataset
          var typeaheadjs = self.options.typeaheadjs;
          if ($.isArray(typeaheadjs)) {
            typeaheadConfig = typeaheadjs[0];
            typeaheadDatasets = typeaheadjs[1];
          } else {
            typeaheadDatasets = typeaheadjs;
          }

          self.$input.typeahead(typeaheadConfig, typeaheadDatasets).on('typeahead:selected', $.proxy(function (obj, datum) {
            if (typeaheadDatasets.valueKey)
              self.add(datum[typeaheadDatasets.valueKey]);
            else
              self.add(datum);
            self.$input.typeahead('val', '');
          }, self));
      }

      self.$container.on('click', $.proxy(function(event) {
        if (! self.$element.attr('disabled')) {
          self.$input.removeAttr('disabled');
        }
        self.$input.focus();
      }, self));

        if (self.options.addOnBlur && self.options.freeInput) {
          self.$input.on('focusout', $.proxy(function(event) {
              // HACK: only process on focusout when no typeahead opened, to
              //       avoid adding the typeahead text as tag
              if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
                self.add(self.$input.val());
                self.$input.val('');
              }
          }, self));
        }


      self.$container.on('keydown', 'input', $.proxy(function(event) {
        var $input = $(event.target),
            $inputWrapper = self.findInputWrapper();

        if (self.$element.attr('disabled')) {
          self.$input.attr('disabled', 'disabled');
          return;
        }

        switch (event.which) {
          // BACKSPACE
          case 8:
            if (doGetCaretPosition($input[0]) === 0) {
              var prev = $inputWrapper.prev();
              if (prev.length) {
                self.remove(prev.data('item'));
              }
            }
            break;

          // DELETE
          case 46:
            if (doGetCaretPosition($input[0]) === 0) {
              var next = $inputWrapper.next();
              if (next.length) {
                self.remove(next.data('item'));
              }
            }
            break;

          // LEFT ARROW
          case 37:
            // Try to move the input before the previous tag
            var $prevTag = $inputWrapper.prev();
            if ($input.val().length === 0 && $prevTag[0]) {
              $prevTag.before($inputWrapper);
              $input.focus();
            }
            break;
          // RIGHT ARROW
          case 39:
            // Try to move the input after the next tag
            var $nextTag = $inputWrapper.next();
            if ($input.val().length === 0 && $nextTag[0]) {
              $nextTag.after($inputWrapper);
              $input.focus();
            }
            break;
         default:
             // ignore
         }

        // Reset internal input's size
        var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
        $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      self.$container.on('keypress', 'input', $.proxy(function(event) {
         var $input = $(event.target);

         if (self.$element.attr('disabled')) {
            self.$input.attr('disabled', 'disabled');
            return;
         }

         var text = $input.val(),
         maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
         if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
            // Only attempt to add a tag if there is data in the field
            if (text.length !== 0) {
               self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
               $input.val('');
            }

            // If the field is empty, let the event triggered fire as usual
            if (self.options.cancelConfirmKeysOnEmpty === false) {
               event.preventDefault();
            }
         }

         // Reset internal input's size
         var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
         $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      // Remove icon clicked
      self.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
        if (self.$element.attr('disabled')) {
          return;
        }
        self.remove($(event.target).closest('.tag').data('item'));
      }, self));

      // Only add existing value as tags when using strings as tags
      if (self.options.itemValue === defaultOptions.itemValue) {
        if (self.$element[0].tagName === 'INPUT') {
            self.add(self.$element.val());
        } else {
          $('option', self.$element).each(function() {
            self.add($(this).attr('value'), true);
          });
        }
      }
    },

   
    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off('keypress', 'input');
      self.$container.off('click', '[role=remove]');

      self.$container.remove();
      self.$element.removeData('tagsinput');
      self.$element.show();
    },

 
    focus: function() {
      this.$input.focus();
    },

  
    input: function() {
      return this.$input;
    },

  
    findInputWrapper: function() {
      var elt = this.$input[0],
          container = this.$container[0];
      while(elt && elt.parentNode !== container)
        elt = elt.parentNode;

      return $(elt);
    }
  };

  
  $.fn.tagsinput = function(arg1, arg2, arg3) {
    var results = [];

    this.each(function() {
      var tagsinput = $(this).data('tagsinput');
      // Initialize a new tags input
      if (!tagsinput) {
          tagsinput = new TagsInput(this, arg1);
          $(this).data('tagsinput', tagsinput);
          results.push(tagsinput);

          if (this.tagName === 'SELECT') {
              $('option', $(this)).attr('selected', 'selected');
          }

          // Init tags from $(this).val()
          $(this).val($(this).val());
      } else if (!arg1 && !arg2) {
          // tagsinput already exists
          // no function, trying to init
          results.push(tagsinput);
      } else if(tagsinput[arg1] !== undefined) {
          // Invoke function on existing tags input
            if(tagsinput[arg1].length === 3 && arg3 !== undefined){
               var retVal = tagsinput[arg1](arg2, null, arg3);
            }else{
               var retVal = tagsinput[arg1](arg2);
            }
          if (retVal !== undefined)
              results.push(retVal);
      }
    });

    if ( typeof arg1 == 'string') {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;


  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var propertyName = options[key];
      options[key] = function(item) { return item[propertyName]; };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function() { return value; };
    }
  }
 
  var htmlEncodeContainer = $('<div />');
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return '';
    }
  }

 
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus ();
      var oSel = document.selection.createRange();
      oSel.moveStart ('character', -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
      iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
  }

  
  function keyCombinationInList(keyPressEvent, lookupList) {
      var found = false;
      $.each(lookupList, function (index, keyCombination) {
          if (typeof (keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
              found = true;
              return false;
          }

          if (keyPressEvent.which === keyCombination.which) {
              var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
                  shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
                  ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
              if (alt && shift && ctrl) {
                  found = true;
                  return false;
              }
          }
      });

      return found;
  }

  /**
   * Initialize tagsinput behaviour on inputs and selects which have
   * data-role=tagsinput
   */
  $(function() {
    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  });
})(window.jQuery);








$(document).ready(function(){
	me.SetUrl();
	me.Search();

	document.getElementById('delete').disabled=true
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
						me.LoadCbogrammar('grammaredit',data.dropdowngrammar)
						me.LoadCbointent('intentName',data.dropdownintent)
						me.LoadCbointent('intentedit',data.dropdownintent)		
						me.LoadCboconcept('concept',data.dropdownconcept)
						me.LoadCboconcept('concept1',data.dropdownconcept)
						me.LoadCboversion('grammarversion',data.dropdownnameversion)
                    }
                
            });
	me.LoadDataconfig(1, 25,'','')
});
$( "#grammarversion" ).change(function() {
  document.getElementById('testdata').disabled=false
});
$(".select2").select2({ width: '100%' });