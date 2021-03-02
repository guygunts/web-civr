
me.action.main = 'user_id';
me.action.menu = 'SR';
me.action.add = 'adduser';
me.action.edit = 'updateuser';
me.action.del = 'deleteuser';
me.action.page='';
me.action.ramdom='';
var buttonCommon = {
    exportOptions: {
        format: {
            body: function (data, row, column, node) {

                if (column === 4) {
                    data = $(data).attr('href');
                } else if (column === 6) {
                    data = $(data).find('source').attr('src');
                } else if (column === 12) {
                    if ($('option:selected', data).val() != '') {
                        data = $('option:selected', data).text();
                    } else {
                        data = '';
                    }
                } else if (column === 13) {
                    if ($('option:selected', data).val() != '') {
                        data = $('option:selected', data).text();
                    } else {
                        data = '';
                    }
                } else if (column === 14 || column === 15) {
                    data = data.toString().replace(/<.*?>/ig, "");
                } else if (column === 16) {
                    if ($('option:selected', data).val() != '') {
                        data = $('option:selected', data).text();
                    } else {
                        data = '';
                    }
                } else if (column === 17) {
                    data = '';
                }

                return data;

            }
        }
    }
};

/*================================================*\
  :: FUNCTION ::
\*================================================*/
me.SetDateTime = function () {
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

me.Search = function () {
    $('form#frmsearch').submit(function () {
        me.loading = true;
        $('#frmresult').css('display', 'none');
        var page_size = $('#page_size').val();
        var confiden = $('#confiden').val();
		var input_confiden = $('#input_confiden').val();
        //var grammar = $('#grammar').val();
        var qc_status = $('#qc_status').val();
        var random_num = 0;
        var text_search = $('#text_search').val();
        //var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
        var cnt = 0;

        if (start !== undefined) {
            ++cnt;
        }
        if (stop !== undefined) {
            ++cnt;
        }

        if (cnt != 2) return false;
        // me.table.clear().destroy();
        // $('#tbView').empty();
        me.table.page.len(page_size).draw();
		
        // me.LoadDataReport(me.action.menu, 1, page_size, start + ' 00:00:00', stop + ' 23:59:59', random_num, qc_status, grammar, intent, confiden, text_search, 1);
    });

};

me.SearchRandom = function () {
    $('form#frmsearchrandom').submit(function () {
        me.loading = true;
        $('#frmresult').css('display', 'none');
        var page_size = $('#page_size').val();
        var confiden = $('#confiden').val();
		var input_confiden = $('#input_confiden').val();
        var grammar = $('#grammar').val();
        var status = $('#status').val();
        var qc = $('#qc').val();
        var random_num = $('#random_num').val();
        var text_search = $('#text_search').val();
        var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
        var cnt = 0;
			me.action.ramdom=$('#random_num').val();
        if (start !== undefined) {
            ++cnt;
        }
        if (stop !== undefined) {
            ++cnt;
        }

        if (cnt != 2) return false;
        // me.table.clear().destroy();
        // $('#tbView').empty();
        me.table.page.len(page_size).draw();
        // me.LoadDataReport(me.action.menu, 1, page_size, start + ' 00:00:00', stop + ' 23:59:59', random_num, qc_status, grammar, intent, confiden, text_search, 1);
        // if (!readd) {
        //     me.LoadCbo('grammar', data.grammar);
        //     me.LoadCbo('confiden', data.confiden);
        //     me.LoadCbo('intent', data.intent);
        // }
    });

};

me.LoadDataReport = function (menu,eyesview, page_id, page_size, start, stop, random_num = 0, qc_status = 0, flag_edit = '', grammar = '', intent = '', confiden = '',input_confiden='', txt_search = '', readd = '',current=1) {


    $.ajax({
        url: me.url + '-View',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            page_id: page_id,
            page_size: page_size,
            start_date: start,
            end_date: stop,
            random_num: random_num,
            qc_status: qc_status,
            flag_edit: flag_edit,
			eyesview:eyesview,
            grammar: grammar,
            intent: intent,
			input_confiden:input_confiden,
            confiden: confiden,
            txt_search: txt_search
        },
        success: function (data) {
            switch (data.success) {
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
                                    extend: 'colvis',
                                    columnText: function (dt, idx, title) {
                                        // return (idx + 1) + ': ' + (title ? title : 'Action');
                                        if (idx == 0) {
                                            return (idx + 1) + ': Variation';
                                        } else {
                                            return (idx + 1) + ': ' + (title ? title : 'Action');
                                        }
                                    }
                                }),
                                $.extend(true, {}, buttonCommon, {
                                    text: 'ย้อนกลับ',
                                    className: 'float-left hidden',
                                    attr: {
                                        title: 'Copy',
                                        id: 'btnback',
                                        disabled: 'disabled'
                                    }
                                }),$.extend(true, {}, {
                                    extend: 'excelHtml5',
                                    text: 'Voice',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
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
											//me.zip();
											
											me.wav()
											// $('#btnsearchsubmit').click();
										}
                                }),
                                $.extend(true, {}, {
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
                                    bom: true,
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
											me.Export();
											// $('#btnsearchsubmit').click();
										}
                                }),
                                $.extend(true, {}, buttonCommon, {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    className: 'float-right',
                                    charset: 'utf-8',
                                    bom: true,
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
											me.csv();
											// $('#btnsearchsubmit').click();
										}
                                })
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
							select: true,
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
									me.action.page=(d.start / d.length) + 1;
                                    d.page_id = (d.start / d.length) + 1;
                                    d.page_size = $('#page_size').val();
                                    d.start_date = $('#start_date').data().date;
                                    d.end_date = $('#end_date').data().date;
                                    d.text_search = $('#text_search').val();
                                    d.random_num = $('#random_num').val();
                                    d.qc_status = $('#qc_status').val();
                                    d.flag_edit = $('#flag_edit').val();
                                    d.grammar = $('#grammar').val();
                                    d.intent = $('#intent').val();
                                    d.confiden = $('#confiden').val();	
									d.input_confiden=$('#input_confiden').val();
									d.random_num = me.action.ramdom
									d.eyesview=document.getElementById('eyeview').value
                                }
                            }
                        });
						  $('#tbView').DataTable().on( 'dblclick', 'tr', async function ( e, dt, type, indexes ) {
							  let rowID = table.row(this).index()
						let rowData = table.rows( rowID ).data().toArray();
						let qc_statu
						let action
						if(rowData[0].qc_status == 'Pass'){
							qc_stat='P'
						}else if (rowData[0].qc_status == 'Fail'){
							qc_stat='F'
						}else if (rowData[0].qc_status == 'Garbage'){
						qc_stat='G'
						}else if (rowData[0].qc_status == 'Other'){
						qc_stat='O'
						}else{
							qc_stat=null
						}
						
						if(rowData[0].action == 'None'){
							action=0
						}else if (rowData[0].action == 'Train'){
							action=1
						}else if (rowData[0].action == 'Test'){
						action=2
						}else if (rowData[0].action == 'Test&Train'){
						action=3
						}else{
							action=null
						}
														let myData= {
		"grammar_name":rowData[0].grammar
	}
	         await   $.ajax({
                url: me.url + '-dropdownintent',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						//me.LoadCbointent('intent',data.recs)
						me.LoadCbointent('expec_intent', data.recs);						
                    }
                
            });
						document.getElementById("qc_statu").value=qc_stat
						$('#expec_intent').val(rowData[0].expec_intent).trigger('change')
						//$("#expec_intent").val(rowData[0].expec_intent).change();
						//document.getElementById("expec_intent").value=rowData[0].expec_intent
						document.getElementById("new_sentence").value=rowData[0].new_sentence
						document.getElementById("remark").value=rowData[0].remark
						document.getElementById("action").value=action
						document.getElementById("date_time").value=rowData[0].date_time
						document.getElementById("code").value=rowData[0].rec_id

						$('#exampleModal').modal('show');
					
        } )
					/*	var page_size = $('#page_size').val();
                var confiden = $('#confiden').val();
                var grammar = $('#grammar').val();
                var qc_status = $('#qc_status').val();
                var random_num = $('#random_num').val();
                var text_search = $('#text_search').val();
                var intent = $('#intent').val();
                var start = $('#start_date').data().date;
                var stop = $('#end_date').data().date;*/
				

                    me.table.column(1).visible(false);
                    me.table.buttons(0, null).container().addClass('col');

                    if (data.data.length == 0) {
						$('#tbView').DataTable().clear().draw();
                    }

                    if (data.name) {
                        $('title').text(data.name);
                    }

                    me.LoadCbo('grammar', data.grammar);
                    me.LoadCboconfident('confiden', data.confiden);
					me.LoadCbointentinput('input_confiden', data.confiden);
                   // me.LoadCbo('intent', data.intent);
					// me.LoadCbo('expec_intent', data.intent);
                 $('#confiden').val(confiden);
               $('#grammar').val(grammar);
                 $('#qc_status').val(qc_status);
                $('#random_num').val(random_num);
                $('#text_search').val(txt_search);
                $('#intent').val(intent);
                $('#start_date').data(start);
                $('#end_date').data(stop);
			    $('#random_num').val(me.action.ramdom);
				//me.table.ajax.reload();
				let table = $('#tbView').DataTable();
					table.page(current-1).draw('page');
                    $('a.toggle-vis').on('click', function (e) {
                        e.preventDefault();

                        // Get the column API object
                        var column = me.table.column($(this).attr('data-column'));

                        // Toggle the visibility
                        column.visible(!column.visible());
                    });
                    $('.select2').select2();
					//$('#intent').select2({ width: 'resolve' });
                    break;
                default :
                    alertify.alert(data.msg);
                    break;
            }

        }
    });
};


me.LoadDataCHNN = function (menu, page_id, page_size, start, stop, readd = '') {

    $.ajax({
        url: me.url + '-ViewCHNN',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {menu_action: menu, page_id: page_id, page_size: 10000, start_date: start, end_date: stop},
        success: function (data) {
            switch (data.success) {
                case 'COMPLETE' :
                    if (readd) {
                        me.table.clear().draw();
                        me.table.rows.add(data.data).draw();

                    } else {

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
                                        action: function (e, dt, node, config) {
                                            $('#btnsearchsubmit').click();
                                        }
                                    },

                                    {
                                        extend: 'print',
                                        orientation: 'landscape',
                                        pageSize: 'LEGAL',
                                        className: 'float-right',
                                        charset: 'utf-8',
                                        bom: true
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
                                    {
                                        extend: 'pdfHtml5',
                                        orientation: 'landscape',
                                        pageSize: 'LEGAL',
                                        className: 'float-right',
                                        customize: function (doc) {
                                            doc.defaultStyle = {
                                                font: 'THSarabunNew',
                                                fontSize: 16
                                            };
                                        }
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
                                iDisplayLength: page_size,
                                responsive: false,
                                scrollX: true,
                                pageLength: page_size,
                                paging: true,
                                lengthChange: false,
                                data: data.data,
                                columns: data.columns
                            });

                    }


                    me.table.columns.adjust().draw('true');

                    me.table.buttons(0, null).container().addClass('col');


                    if (data.name) {
                        $('title').text(data.name);
                    }
					if(readd){
						// var dataold = me.table.rows().data();
						me.applyData(me.table,data.data,true);
					}
                    me.LoadCbo('grammar', data.grammar);
                    me.LoadCboconfident('confiden', data.confiden);
                    //me.LoadCbo('intent', data.intent);

                    $('a.toggle-vis').on('click', function (e) {
                        e.preventDefault();

                        // Get the column API object
                        var column = me.table.column($(this).attr('data-column'));

                        // Toggle the visibility
                        column.visible(!column.visible());
                    });

                    break;
                default :
                    alertify.alert(data.msg);
                    break;
            }
        }
    });
};

me.LoadCbo = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.code)
            .text(result.name)
            .appendTo("#" + val);
    });

};

me.LoadCboconfident = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== INTENT CONFIDENT ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.code)
            .text(result.name)
            .appendTo("#" + val);
    });

};


me.OpenVOICE = function (code) {
    alertify.alert('<audio preload="auto" autobuffer controls><source src="' + code + '" type="audio/wav"></audio>');

};

me.OpenCHNN = function (code, page_id, page_size, start, stop) {
    me.table.clear().destroy();
    $('#tbView').empty();
    me.LoadDataCHNN(code, page_id, page_size, start, stop);

};

me.OpenPopup = function (code, method, myvalue = '') {

    alertify.prompt('Add ' + method, '', myvalue, function (evt, value) {
            if (!value) {
                $('.' + code).val('');
                $('#' + code).html('<i class="glyphicon glyphicon-edit"></i>');
            } else {
                $('.' + code).val(value);
                $('#' + code).text(value);
            }

            alertify.success('You entered: ' + value)

        }
        , function () {
            alertify.error('Cancel Add ' + method)
        });
};

me.QcStatus = function () {
    $('#frmsearch select').on('change', function () {
        $('#btnsearchsubmit').click();
    })
};

me.ChangeTop = function () {
	
    $('#top_project_id').on('change', function () {
        $.ajax({
            url: 'api.inc.php?mode=3065C7AFA89118D8B3CCF100573553DE',
            type: "POST",
            dataType: "json",
            cache: false,
            data: {code: $(this).val()},
            success: function (data) {
                var page_size = $('#page_size').val();
                var confiden = $('#confiden').val();
				var input_confiden = $('#input_confiden').val();
                var grammar = $('#grammar').val();
                var qc_status = $('#qc_status').val();
                var random_num = $('#random_num').val();
                var text_search = $('#text_search').val();
                var intent = $('#intent').val();
                var start = $('#start_date').data().date;
                var stop = $('#end_date').data().date;
				var eyesview=document.getElementById('eyeview').value
                me.table.clear().destroy();
                $('#tbView').empty();
                me.LoadDataReport(me.action.menu,eyesview, 1, page_size, start + ' 00:00:00', stop + ' 23:59:59', random_num, qc_status, grammar, intent, confiden,input_confiden, text_search);
            }
        });
    })
};

me.UpdateVoice = function () {
    var myData = {
		data:{
			"new_sentence":document.getElementById("new_sentence").value,
			"expec_intent":document.getElementById("expec_intent").value,
			"remark":document.getElementById("remark").value,
			"action":document.getElementById("action").value,
			"qc_status":document.getElementById("qc_statu").value,
			"start_time":document.getElementById("date_time").value,
			"rec_id":document.getElementById("code").value,
			"flag_edit":1
		}
    }

		var page_size = $('#page_size').val();
        var confiden = $('#confiden').val();
        var grammar = $('#grammar').val();
        var qc_status = $('#qc_status').val();
        var random_num = 0;
        var text_search = $('#text_search').val();
        var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
		var flagedit=$('#flag_edit').val()
		var input_confiden = $('#input_confiden').val();
		let eyesview=document.getElementById('eyeview').value
    $('.modal').modal('hide');
    alertify.confirm("Do you want Update.",
        function () {
            $.ajax({
                url: me.url + '-Add',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData.data,
                success: function (data) {
                    switch (data.success) {
                        case 'COMPLETE':
                            $('.modal').modal('hide');
                            alertify.success(data.msg);
                            $('input[name="pass"]').prop('checked', false);
                            $('#result').val('');
							
							me.LoadDataReport(me.action.menu,eyesview,1,page_size,start,stop,random_num,qc_status,flagedit,grammar,intent,confiden,input_confiden,text_search,1,me.action.page);
						   
                            //me.table.ajax.reload();
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

me.Export = function () {

    function submitFORM(path, params, method) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        //Move the submit function to another variable
        //so that it doesn't get overwritten.
        form._submit_function_ = form.submit;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form._submit_function_();
    }

        var confiden = $('#confiden').val();
		var input_confiden = $('#input_confiden').val();
        var grammar = $('#grammar').val();
        var qc_status = $('#qc_status').val();
        var random_num = 0;
        var text_search = $('#text_search').val();
        var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
		var flagedit=$('#flag_edit').val()
		let eyesview=document.getElementById('eyeview').value
		
	        submitFORM('module/' + me.mod + '/excel.php', {
            start_date: start ,
            end_date: stop ,
			qc_status:qc_status,
			grammar:grammar,
			intent:intent,
			confiden:confiden,
			input_confiden:input_confiden,
			text_search:text_search,
			flag_edit:flagedit,
			eyesview:eyesview
        }, 'POST');



};

me.zip = function () {

    function submitFORM(path, params, method) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        //Move the submit function to another variable
        //so that it doesn't get overwritten.
        form._submit_function_ = form.submit;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form._submit_function_();
    }

        var confiden = $('#confiden').val();
		var input_confiden = $('#input_confiden').val();
        var grammar = $('#grammar').val();
        var qc_status = $('#qc_status').val();
        var random_num = 0;
        var text_search = $('#text_search').val();
        var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
		var flagedit=$('#flag_edit').val()
		let eyesview=document.getElementById('eyeview').value
		
	        submitFORM('module/' + me.mod + '/zip.php', {
            start_date: start ,
            end_date: stop ,
			qc_status:qc_status,
			grammar:grammar,
			intent:intent,
			confiden:confiden,
			input_confiden:input_confiden,
			text_search:text_search,
			flag_edit:flagedit,
			eyesview:eyesview
        }, 'POST');



};

me.csv = function () {

    function submitFORM(path, params, method) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        //Move the submit function to another variable
        //so that it doesn't get overwritten.
        form._submit_function_ = form.submit;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form._submit_function_();
    }

        var confiden = $('#confiden').val();
		var input_confiden = $('#input_confiden').val();
        var grammar = $('#grammar').val();
        var qc_status = $('#qc_status').val();
        var random_num = 0;
        var text_search = $('#text_search').val();
        var intent = $('#intent').val();
        var start = $('#start_date').data().date;
        var stop = $('#end_date').data().date;
		var flagedit=$('#flag_edit').val()
		let eyesview=document.getElementById('eyeview').value
		
	        submitFORM('module/' + me.mod + '/csv.php', {
            start_date: start ,
            end_date: stop ,
			qc_status:qc_status,
			grammar:grammar,
			intent:intent,
			confiden:confiden,
			input_confiden:input_confiden,
			text_search:text_search,
			flag_edit:flagedit,
			eyesview:eyesview
        }, 'POST');



};


me.wav=async function (){
	
let zip = new JSZip();
                
 // if(typeof(Worker) !== "undefined") {
  //  if(typeof(m) == "undefined") {
   //   m = new Worker(`module/VoiceLogAnalytic/workerzip.js`);
   // }
  //}
	  $.ajax({
        url: me.url + '-voiceonly',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            page_id: 1,
            page_size: 10000000,
            start_date: $('#start_date').data().date,
            end_date: $('#end_date').data().date,
            random_num: 0,
            qc_status: $('#qc_status').val(),
            flag_edit: $('#flag_edit').val(),
            grammar: $('#grammar').val(),
            intent: $('#intent').val(),
            confiden: $('#confiden').val(),
			input_confiden:$('#input_confiden').val(),
            txt_search: $('#text_search').val(),
			voice:1
        },
        success: async function (data) {
            switch (data.success) {
                case 'COMPLETE' :
				//m.postMessage(data.data)
				$('.loading-container').removeClass('loading-inactive');
				for(let i= 0; i<data.data.length; i++){
		let name = data.data[i].voice_name.substring(data.data[i].voice_name.lastIndexOf('/') + 1).split("?")[0]	
			const datawait = await axios.get(data.data[i].voice_name,{responseType: 'blob'})
		let blob = new Blob([datawait.data],{ type: 'audio/x-wav'});
		zip.file(name,blob);
		//postMessage(data);
	}
		zip.generateAsync({type:"blob"}).then(function(content) {
			  const date =Date();
        saveAs(content,`Voice Log Analytics Report-${date}.zip`);
	$('.loading-container').addClass('loading-inactive'); 
   });
                    break;
                default :
                    alertify.alert(data.msg);
                    break;
			}
		}    
    });
	/*m.onmessage = async function(event) {
		if(event.data.mess){
				      zip.generateAsync({type:"blob"}).then(function(content) {
			  const date =Date();
        saveAs(content,`Voice Log Analytics Report-${date}.zip`);
  
   });
		}else{
		const datawait = await axios.get(event.data.data,{responseType: 'blob'})
		let blob = new Blob([datawait],{ type: 'audio/x-wav'});
		console.log(blob)
		zip.file(event.data.name,blob);
		}
  

            }*/

	}
	

async function file_get_contents(uri) {
    const response =await axios.get(uri,{responseType: 'blob'});
	
	return response
}

function s2ab(s) { 
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf);  //create uint8array as viewer
  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
  return buf;    
}

me.LoadCbointent = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== ' + val.toUpperCase() + ' ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
        $("<option>")
            .attr("value", result.intent_tag)
            .text(result.intent_tag)
            .appendTo("#" + val);
    });

};

me.LoadCbointentinput = function (val, data) {
    $("#" + val + ' option').remove();
    $("<option>")
        .attr("value", '')
        .text('== INPUT CONFIDENT ==')
        .appendTo("#" + val);
    $.each(data, function (i, result) {
		
        $("<option>")
            .attr("value", result.code)
            .text(result.name)
            .appendTo("#" + val);
    });

};

function changedata(){
	
			let myData= {
		"grammar_name":document.getElementById('grammar').value
	}
	            $.ajax({
                url: me.url + '-dropdownintent',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: myData,
                success: function (data) {                 											
						me.LoadCbointent('intent',data.recs)					
                    }
                
            });
	
	}
	
	  
  $("#eyeview").click(function() {
		let confiden = $('#confiden').val();
		let input_confiden = $('#input_confiden').val();
        let grammar = $('#grammar').val();
        let qc_status = $('#qc_status').val();
        let random_num = 0;
        let text_search = $('#text_search').val();
        let intent = $('#intent').val();
        let start = $('#start_date').data().date;
        let stop = $('#end_date').data().date;
		let flagedit=$('#flag_edit').val()
		let eyesview=document.getElementById('eyeview').value
		let page_size = $('#page_size').val();
 if($("#eyeview")[0].classList.length ==2){
	 $(this).toggleClass("glyphicon-eye-close");
	 document.getElementById('eyeview').value=0
 }else{
	 $(this).toggleClass("glyphicon-eye-close");
	 document.getElementById('eyeview').value=1
 }
  me.LoadDataReport(me.action.menu,eyesview,1,page_size,start,stop,random_num,qc_status,flagedit,grammar,intent,confiden,input_confiden,text_search,1,me.action.page);
  });
/*================================================*\
  :: DEFAULT ::
\*================================================*/
$(document).ready(function () {
	$(".glyphicon").toggleClass("glyphicon-eye-close");
	 if($("#eyeview")[0].classList.length ==2){
		 document.getElementById('eyeview').value=1
	 }else{
		 document.getElementById('eyeview').value=0
	 }
    me.SetUrl();
    // me.HideMenu();
    me.SetDateTime();
    me.Search();
    me.SearchRandom();
    me.QcStatus();
$('.select2').select2();
    // $('#btnsearchsubmit').click();
    // me.LoadDataReport(me.action.menu,1,25,'','','1','');
    // me.LoadCbo('grammar','grammar','grammar_id','grammar_name');
    // me.LoadCbo('confiden','confiden','conf_id','conf_name');
    // me.LoadCbo('intent','intent','intent_id','intent_tag');
	let eyesview=document.getElementById('eyeview').value
    me.LoadDataReport(me.action.menu,eyesview, 1, 25, moment().format("YYYY-MM-DD") + ' 00:00:00', moment().format("YYYY-MM-DD") + ' 23:59:59', 0, '', '', '', '', '');

});