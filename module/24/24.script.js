
me.action.main = 'user_id';
me.action.add = 'adduser';
me.action.edit = 'updateuser';
me.action.del = 'deleteuser';
/*================================================*\
  :: FUNCTION ::
\*================================================*/
me.LoadDatalistpackget = function(page_id, page_size,group,enable,search = '',readd){
	
	$.ajax({
		url: me.url + '-View',
		type:'POST',
		dataType:'json',
		cache:false,
		data:{page_id : page_id , page_size : page_size ,packagegroup:group,enable:enable, text_search : search},
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


function changedata(){
	let page_size=document.getElementById("page_size").value
me.table.page.len(page_size).draw();
}
/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function(){
	me.SetUrl();
	me.LoadDatalistpackget( 1, 25,'',1,'','')
	
});