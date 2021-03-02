let recordvoices=[]
function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
 $("#submitBtn").click(function(){  
	
	var filedata = document.getElementsByName("file"),formdata = false;
	let size=0

		for(let i=0; i<filedata[0].files.length; i++){
			recordvoices.push(filedata[0].files[i])
		} 

	let formdatafile = new FormData();
		  Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear();
  var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  return "".concat(yyyy).concat(mm).concat(dd);
};

Date.prototype.yyyymmddhhmm = function() {
  var yyyymmdd = this.yyyymmdd();
  var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
  return "".concat(yyyymmdd).concat(hh).concat(min);
};

	  Date.prototype.yyyymmddhhmmss = function() {
  var yyyymmddhhmm = this.yyyymmddhhmm();
  var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
  return "".concat(yyyymmddhhmm).concat(ss);
};
let d = new Date();

	for(let i=0; i<recordvoices.length; i++){
		size += recordvoices[i].size
			let name=recordvoices[i].name.split('.')
			let  namefile=`${name[0]}_${d.yyyymmddhhmmss()}.${name[1]}`
			let renewname=renameFile(recordvoices[i],namefile)
			
			formdatafile.append(`file[${i}]`, renewname);	
	}

	if(size > 512000000 || recordvoices.length > 1000){
		alertify.alert('Alert Error', 'Size File or Length File More then 10000 !', function(){ alertify.success('Ok'); });
		return false
	}
	formdatafile.append("grammar_id", document.getElementById('grammarNameadd').value);	
	formdatafile.append("intent_id", document.getElementById('intentNameadd').value);
	formdatafile.append("grammar_name", $("#grammarNameadd").find('option:selected').text());	
	formdatafile.append("intent_name", $("#intentNameadd").find('option:selected').text());			

	    $.ajax({
        url: me.url + '-Add',
        type: 'POST',
        dataType: 'json',
        data: formdatafile,
       // async: false,
        cache: false,
		beforeSend: function() { $('.loading-container').removeClass('loading-inactive'); },
		complete: function() { $('.loading-container').addClass('loading-inactive'); },
		contentType: false,
        processData: false,
        success: function (data) {
				columnsname =[{
			"className":"text-center",
            "title": "No",
            "data": "no"
        },
        {
			"className":"text-center",
            "title": "status",
            "data": "mess"
        },
        {
			"className":"text-center",
            "title": "voice name",
            "data": "voice_name"
        }]
				$('#myModal').modal({show:true});
				$('#exampleModal').modal('hide');
				if(me.tablesucess){
				if(Object.entries(me.tablesucess).length > 0){
						me.tablesucess={}
						$('#example').DataTable().destroy();
						$("#example").empty();
					}
				}
				
							me.tablesucess=$('#example')
							.addClass('nowrap')
							.removeAttr('width')
							.DataTable({														
								searching: false,
								retrieve: true,
								deferRender: true,
								stateSave: true,
								select: true,
								iDisplayLength : 10,
								responsive: false,
								scrollX: true,
								pageLength: 10,
								paging: true,
								lengthChange:false,
								data: data.data,
								columns: columnsname,
							});
                    alertify.success('Upload Success'); 
					var table = $('#example').DataTable();
					table.page.len(10).draw();					
							let grammarName=document.getElementById('grammarName').value
							let intentName=document.getElementById('intentName').value
							let page_size=document.getElementById('page_size').value
							me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
							recordvoices=[]
							let frm = document.getElementsByName('contact-form')[0];
							frm.reset();  // Reset all form data	
							document.getElementById('lbltipAddedComment').innerHTML = 0;							
        }
    });
});
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
                                    text: 'upload Voice',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
									action: async function ( e, dt, node, config ) {
										$('#exampleModal').modal({show:true});
										
										document.getElementById('frm_addedit').reset();
										$('#grammarNameadd').val(null).change()
										if(document.getElementById('grammarName').value !== ''){
											$('#grammarNameadd').val(document.getElementById('grammarName').value).change()

										}
										}
                                })],								
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
							});
						
											$('#tbView').DataTable().on( 'select', function ( e, dt, type, indexes ) {

						let rowData = $('#tbView').DataTable().rows('.selected').data()
							if($('#tbView').DataTable().rows('.selected').data().length > 0){
								document.getElementById('delete').disabled=false
								document.getElementById('move').disabled=false
							}
													
        } )
		$('#tbView').DataTable().on( 'deselect', function ( e, dt, type, indexes ) {
							if($('#tbView').DataTable().rows('.selected').data().length == 0){
								document.getElementById('delete').disabled=true
								document.getElementById('move').disabled=true
							}		
        } )
		
						
						$('#tbView').DataTable().on( 'dblclick', 'tr', function ( e, dt, type, indexes ) {
							let table = $('#tbView').DataTable();
							let rowID = table.row(this).index()
						let rowData = table.rows( rowID ).data().toArray();
						if( rowData.length !== 0){
							$('#exampleModal1').modal({show:true});
							if(rowData[0].concept){
							let data =rowData[0].concept.split(',')
							$('#concept').val(data).trigger('change'); 
							}else{
								$('#concept').val(null).trigger('change');
							}
						document.getElementById("sentence").value=rowData[0].sentence
						
						if(rowData[0].action == 'None' ){
							document.getElementById("action").value=0;
						}else if(rowData[0].action == 'Train'){
							document.getElementById("action").value=1;
						}else if(rowData[0].action == 'Test'){
							document.getElementById("action").value=2;
						}else if(rowData[0].action == 'Test&Train'){
							document.getElementById("action").value=2;
						}
						document.getElementById("voice_id").value=rowData[0].voice_id
		}												
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

me.deletemutidata=async function(){
	let data=$('#tbView').DataTable().rows('.selected').data()
    alertify.confirm("Do you want Delete.",
       async function () {
			let page_size = $('#page_size').val();
	for(let i=0; i<$('#tbView').DataTable().rows('.selected').data().length; i++){
						 let myData = {
		data:{
			"voice_id":$('#tbView').DataTable().rows('.selected').data()[i].voice_id,
		}
    }
          await $.ajax({
                url: me.url + '-Delete',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {                               
          
                }
            });
			}
							alertify.success('delete success');
							let grammarName=document.getElementById('grammarName').value
							let intentName=document.getElementById('intentName').value
							me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')  
        },
        function () {
            alertify.error('Cancel Delete');
        });
}

me.deleteuploadvoice= function (){
	if(document.getElementById("voice_id").value == ''){
		return false
	}
	 var myData = {
		data:{
			"voice_id":document.getElementById("voice_id").value,
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
                            $('.modal').modal('hide');
                            alertify.success(data.msg);
							let grammarName=document.getElementById('grammarName').value
							let intentName=document.getElementById('intentName').value
							let page_size=document.getElementById('page_size').value
							me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')  
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
}

me.edituploadvoice = function (){
	let textconcept=''
		for(let i=0; i<$("#concept").select2("val").length; i++){
		if(i+1 == $("#concept").select2("val").length){
		textconcept+=`${$("#concept").select2("val")[i]}`
		break
	}
		textconcept+=`${$("#concept").select2("val")[i]},`
	}
	
		 var myData = {
		data:{
			"sentence":document.getElementById("sentence").value,
			"voice_id":document.getElementById("voice_id").value,
			"action":document.getElementById("action").value,
			"concept":textconcept
		}
    }
	

	var page_size = $('#page_size').val();
    $('.modal').modal('hide');
    alertify.confirm("Do you want Edit.",
        function () {
            $.ajax({
                url: me.url + '-Edit',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                            $('.modal').modal('hide');
                            alertify.success(data.msg);
							let grammarName=document.getElementById('grammarName').value
							let intentName=document.getElementById('intentName').value
							let page_size=document.getElementById('page_size').value
							me.LoadDataconfig(1, page_size,grammarName,intentName,readd='')
                }
            });
        },
        function () {
            alertify.error('Cancel Delete');
        });
	
}

$('form#frm_move').submit(function () {
	let data=$('#tbView').DataTable().rows('.selected').data().toArray()
    alertify.confirm("Do you want Move.",
       async function () {
			
		
		let myData={
				"grammmarname":$("#grammarNamemove").find('option:selected').text(),
				"intentname":$("#intentNamemove").find('option:selected').text(),
				"grammar_id":document.getElementById('grammarNamemove').value,
				"intent_id":document.getElementById('intentNamemove').value,
				"datajson":data
		}
          await $.ajax({
                url: me.url + '-MoveFile',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {  
					if(data.code == 200){
						$('.modal').modal('hide');
					let page_size = $('#page_size').val();
							alertify.success('move success');
							let grammarName=document.getElementById('grammarName').value
							let intentName=document.getElementById('intentName').value
							me.LoadDataconfig(1, page_size,grammarName,intentName,readd='') 
					}
                }
            });	
        },
        function () {
            alertify.error('Cancel Move');
        });
});

me.movefile=function(){


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
    //$("<option>").attr("value", '').text('== ' + val.toUpperCase() + ' ==').appendTo("#" + val);
    $.each(data, function (i, result) {
		if(result.concept_result == null ||result.concept_result == '' ){
        $("<option>").attr("value", `${result.concept_name}:`).text(`${result.concept_name}:`).appendTo("#" + val);
		}else{
		$("<option>").attr("value", `${result.concept_name}:${result.concept_result}`).text(`${result.concept_name}:${result.concept_result}`).appendTo("#" + val);	
		}
    });

};

me.LoadCbovariation = function (val, data) {
    $("#" + val + ' option').remove();
    //$("<option>").attr("value", '').text('== ' + val.toUpperCase() + ' ==').appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.concept_id2)
            .text(result.concept_result)
            .appendTo("#" + val);
    });

};

me.changedataadd= async function (){
		let myData= {
		"grammar_id":document.getElementById('grammarNameadd').value
	}
	         await   $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentNameadd',data.dropdownintent)	
						$('#intentNameadd').val(document.getElementById('intentName').value).change()
                    }
                
            });
	
}

me.changedatamove= async function (){
		let myData= {
		"grammar_id":document.getElementById('grammarNamemove').value
	}
	         await   $.ajax({
                url: me.url + '-dropdown',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intentNamemove',data.dropdownintent)	
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
						me.LoadCbointent('intentNameadd',data.dropdownintent)							
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



let log = console.log.bind(console),
  id = val => document.getElementById(val),
  stream,
  recorder,
  counter=1,
  chunks,
  media;




async function makeLink(){
	
  // let blob = new Blob(chunks, {type: 'audio/wav;codecs=0'})

document.getElementById('filename').value=''	
document.getElementById('lbltipAddedComment').innerHTML = recordvoices.length;
}

$('#recButton').addClass("notRec");

async function recordvoice(){
	if(document.getElementById('filename').value== "" ){
    alertify.alert('Error','please insert filename Before.');  
    return false
  }
	if($('#recButton').hasClass('notRec')){
		$('#recButton').removeClass("notRec");
		$('#recButton').addClass("Rec");
  chunks=[];
  await navigator.mediaDevices.getUserMedia({audio: true}).then(_stream => {
    stream = _stream;
	
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
			const audioFile = new File([e.data], `${document.getElementById('filename').value}.webm`, {
      type: 'audio/webm;codecs=opus',
      lastModified: Date.now()
    });
			recordvoices.push(audioFile)
			
      if(recorder.state == 'inactive')  makeLink();
    };
    log('got media successfully');
  }).catch(log);
  recorder.start();
	}
	else{
		$('#recButton').removeClass("Rec");
		$('#recButton').addClass("notRec");
  recorder.stop();
	}
};	

/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();
	me.Search();
document.getElementById('delete').disabled=true
document.getElementById('move').disabled=true
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
						me.LoadCbogrammar('grammarNamemove',data.dropdowngrammar)  							
						me.LoadCbointent('intentName',data.dropdownintent)	
						me.LoadCboconcept('concept',data.dropdownconcept)
                    }
                
            });
	me.LoadDataconfig(1, 25,'','')
	$(".select2").select2({ width: '100%' });
							
});