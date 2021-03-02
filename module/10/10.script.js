/*================================================*\
*  Author : BoyBangkhla
*  Created Date : 24/01/2015 09:09
*  Module : Script
*  Description : Backoffice javascript
*  Involve People : MangEak
*  Last Updated : 24/01/2015 09:09
\*================================================*/
//me.action.main = 'user_id';
me.action.menu = 'Grammar';
me.action.add = 'addgrammar';
me.action.edit = 'updategrammar';
me.action.del = 'deletegrammar';

var buttonCommon = {
//     exportOptions: {
//         format: {
//             body: function (data, row, column, node) {

//                 if (column === 4) {
//                     data = $(data).attr('href');
//                 } else if (column === 6) {
//                     data = $(data).find('source').attr('src');
//                 } else if (column === 12) {
//                     if ($('option:selected', data).val() != '') {
//                         data = $('option:selected', data).text();
//                     } else {
//                         data = '';
//                     }
//                 } else if (column === 13) {
//                     if ($('option:selected', data).val() != '') {
//                         data = $('option:selected', data).text();
//                     } else {
//                         data = '';
//                     }
//                 } else if (column === 14 || column === 15) {
//                     data = data.toString().replace(/<.*?>/ig, "");
//                 } else if (column === 16) {
//                     if ($('option:selected', data).val() != '') {
//                         data = $('option:selected', data).text();
//                     } else {
//                         data = '';
//                     }
//                 } else if (column === 17) {
//                     data = '';
//                 }

//                 return data;

//             }
//         }
//     }
};

/*================================================*\
  :: FUNCTION ::
\*================================================*/
me.SetDateTime = function () {
    $('#start_date').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: moment()
    });
    $('#end_date').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: moment()
    });
};


    $('form#frmsearch').submit(function () {
        me.loading = true;
        $('#frmresult').css('display', 'none');
        var page_size = $('#page_size').val();
        var text_search = $('#text_search').val();
        // me.table.clear().destroy();
        // $('#tbView').empty();
        me.table.page.len(page_size).draw();
    });




me.LoadDataReport = function (page_id, page_size,txt_search = '', readd = '') {


    $.ajax({
        url: me.url + '-View',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            page_id: page_id,
            page_size: page_size,
            txt_search: txt_search
        },
        success: function (data) {
            switch (data.success) {
                case 'COMPLETE' :

                    me.table = $('#tbView')
                        .addClass('nowrap')
                        .removeAttr('width')
                        .DataTable({
							select: {
							style: 'multi'
									},
                            destroy: true,
                            bFilter: false,
                            dom: 'Bfrtip',
                            buttons: [
                         /*       $.extend(true, {}, buttonCommon, {
                                    extend: 'colvis',
                                    columnText: function (dt, idx, title) {
                                        // return (idx + 1) + ': ' + (title ? title : 'Action');
                                        if (idx == 0) {
                                            return (idx + 1) + ': Variation';
                                        } else {
                                            return (idx + 1) + ': ' + (title ? title : 'Action');
                                        }
                                    }
                                }),*/
                                $.extend(true, {}, buttonCommon, {
                                    text: 'ย้อนกลับ',
                                    className: 'float-left hidden',
                                    attr: {
                                        title: 'Copy',
                                        id: 'btnback',
                                        disabled: 'disabled'
                                    }
                                }),
            /*                     $.extend(true, {}, buttonCommon, {
                                    extend: 'print',
                                    orientation: 'landscape',
                                    pageSize: 'LEGAL',
                                    className: 'float-right'
                                }),*/
                                $.extend(true, {}, buttonCommon, {
                                    // text: 'Excel',
                                    // className: 'float-right',
                                    // action: function ( e, dt, node, config ) {
                                    //     var start = $('#start_date').data().date;
                                    //     var stop = $('#end_date').data().date;
                                    //     // window.open('module/' + me.mod + '/excel.php?mod='+ me.mod +'&start_date='+ start +'&end_date=' + stop, '_blank');
                                    //     window.location.href = 'module/' + me.mod + '/excel.php?mod='+ me.mod +'&start_date='+ start +'&end_date=' + stop;
                                    //     //window.location.href = 'module/' + me.mod + '/' + me.mod + '.report.php?mod='+ me.mod +'&start_date='+ start +'&end_date=' + stop;
                                    //     // window.location.href = 'module/' + me.mod + '/' + me.mod + '-print/' + start + '/' + stop;
                                    // }
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
                                }),
 /*                               $.extend(true, {}, buttonCommon, {
                                    extend: 'pdfHtml5',
                                    orientation: 'landscape',
                                    pageSize: 'A1',
                                    className: 'float-right',
                                    customize: function (doc) {
                                        doc.defaultStyle = {
                                            font: 'THSarabunNew',
                                            fontSize: 12
                                        };
                                    }
                                })*/
                            ],
                            columnDefs: [
                                {
                                    "width": "5%",
                                    "targets": 0,
                                    "searchable": false
                                },
                                {
                                    "width": "5%",
                                    "targets": 1,
                                    "searchable": false
                                },
                                {
                                    "targets": '_all',
                                    'createdCell': function (td, cellData, rowData, row, col) {
                                        $(td).attr('id', row + col);
                                    }
                                }
                            ],
                            createdRow: function (row, data, dataIndex) {
                                // Set the data-status attribute, and add a class
                                $(row).find('td:eq(0)')
                                    .attr('data-name', data.variation);
                            },
                            searching: false,
                            retrieve: true,
                            deferRender: true,
                            stateSave: false,
                            responsive: false,
                            scrollX: true,
                            pageLength: page_size,
                            paging: true,
                            lengthChange: false,
                            columns: data.columns,
                            serverSide: true,
                            ajax: {
                                "url": me.url + "-View",
                                "type": "POST",
                                "data": function (d) {
                                    d.page_id = (d.start / d.length) + 1;
                                    d.page_size = $('#page_size').val();                                    
                                    d.text_search = $('#text_search').val();
                                }
                            }
                        });

                    me.table.column(1).visible(false);
                    me.table.buttons(0, null).container().addClass('col');

                    if (data.data.length == 0) {
                        // alertify.alert('No data, Please select other date');
                    }

                    if (data.name) {
                        $('title').text(data.name);
                    }

                    $('a.toggle-vis').on('click', function (e) {
                        e.preventDefault();

                        // Get the column API object
                        var column = me.table.column($(this).attr('data-column'));

                        // Toggle the visibility
                        column.visible(!column.visible());
                    });
                    $('.select2').select2();
                    break;
                default :
                    alertify.alert(data.msg);
                    break;
            }

        }
    });
};

me.Dele = function (e) {
		let grammar_del=[]
		let attr =[]
			for(let i=0; i<e.length; i++){
				let data={
					"grammar_id":e[i].grammar_id
				}
				attr.push(e[i].DT_RowId)
				grammar_del.push(data)
			}
	alertify.confirm("Do you want Delete.",
		function () {
			$.ajax({
				url: me.url + '-Del',
				type: 'POST',
				dataType: 'json',
				cache: false,
				data: {'menu_action' : me.action.del , 'grammar_del' : grammar_del },
				success: function (data) {
					switch (data.success) {
						case 'COMPLETE':
							$('.modal').modal('hide');
							alertify.success(data.msg);
							// $('#btnsearchsubmit').click();
							for(let i=0; i<attr.length; i++){
							me.table.row('#'+attr[i].DT_RowId).remove().draw();
								}
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
			alertify.error('Cancel Delete');
		});
};
/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function () {
    me.SetUrl();
    me.LoadDataReport(1, 25,'', '');
	$('#tbView tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
	$('#deletedata').click( function () {
		me.Dele($('#tbView').DataTable().rows('.selected').data())
    } );
});