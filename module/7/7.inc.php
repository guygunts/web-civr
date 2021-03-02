<?php
require_once "../../service/service.php";
require_once "../../service/vendor.php";

function View(Request $request)
{
    global $token;

    $datalist = array();
    $columns = array();
    $column = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';
	$columnameorder ='';
	$orderby='';
	$dir='';
    parse_str($request->getPost()->toString(), $data);

	if (!empty($data[order][0][column])){
	$columnameorder=$data[order][0][column];
	$orderby=$data[columns][$columnameorder][data];
	$dir=$data[order][0][dir];
	}
	//PrintR($data[order][0][column]);
	//PrintR($data[text_search]);
    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'page_id' => ($data['page_id']?$data['page_id']:1),
        'page_size' => $data['page_size'],
		'eyesview'=>$data['eyesview'],
        'text_search' => $data['text_search'],
		'order' => $orderby,
		'dir' => $dir
    );

    //PrintR($params);
    $url = URL_API . '/geniespeech/conver';
    $response = curlposttoken($url, $params, $token);
	//	PrintR($response);
		//exit;
    if ($response['result'][0]['code'] == 200) {
        $start = $data['start'];
        $columnslist = $response['columns_name'];

        $recnums['pages'] = $response['result'][0]['pagenum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnum'];
        $recnums['recordsTotal'] = $response['result'][0]['recnum'];


        $datas = (array)$response['recs'];
        $name = $response['report_name'];

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
		$column[0]['data'] = 'RowNum';


        $m = 1;


       foreach ((array)$columnslist as $i => $item) {
            if ($item['column_data'] == 'SPOK') {
                $column[$m]['className'] = 'text-left';
            } else {
                $column[$m]['className'] = 'text-center';
            }
            if ($item['column_data'] == 'VOICE_NAME') {
                $item['column_data'] = 'CHNN';
            } 

            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];


            $columns[$i]['data'] = $item['column_data'];

            ++$m;
        }


             foreach ((array)$datas as $i => $item) {
            if ($item['DATE_TIME'] == 0) break;
            $datalist[$i]['DT_RowId'] = 'row_' . MD5($item[$columns[1]['data']]);
            $datalist[$i]['RowNum'] = $item['RowNum'];
            foreach ((array)$columns as $v => $value) {
				
                if ($value['data'] == 'LOG_FILE') {
                    $datalist[$i][$value['data']] = '<a href="' . $item[$value['data']] . '" target="_blank"><i class="glyphicon glyphicon-new-window"></i></a>';
                } elseif ($value['data'] == 'CHNN') {

					$datalist[$i][$value['data']] = '<a href="javascript:void(0)" chnn="'. $item['CHNN'] .'" onclick="me.OpenVOICE(' . "'" . $item['CHNN'] . "'," . $data['page_id'] . ',' . $data['page_size'] . ",'" . $item['DATE_TIME'] . "','" . $data['end_date'] . "'" . ')"><i class="glyphicon glyphicon-volume-up"></i></a>';	

                }elseif($value['data'] == 'CHNNLOG'){

                       if($item['CHNNLOG'] == ''){
                        $datalist[$i][$value['data']] = '<i chnn="'. $item['CHNN'] .'" class="glyphicon glyphicon-remove"></i></a>';
                       }else{
                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" chnn="'. $item['CHNN'] .'" onclick="me.OpenCHNNLOG(' . "'" . $item['CHNN'] . "'," . $data['page_id'] . ',' . $data['page_size'] . ",'" . $data['start_date'] . "','" . $data['end_date'] . "'" . ')"><i class="glyphicon glyphicon-list-alt"></i></a>';
                }
				}
				 //elseif($value['data'] == 'mobile_number'){
				//	  $datalist[$i]['mobile_number'] = $item['mobile_bar'];
					// $datalist[$i][$value['data']]='<label id="'.$item['session_id'].'">'.$item['mobile_bar'].'</label> <a href="javascript:void(0)" chnn="'. $item['mobile_number'] .'" onclick="me.shownumberbar('.$_SESSION['OFFICE_DEV77']['DATA']['user_type'].',this,'. "'" .$item['session_id']. "'" .')"><i class="glyphicon glyphicon-eye-open"></i></a>';
				//	 $datalist[$i][$value['data']]='<label id="'.$item['session_id'].'" chnn="'. $item['mobile_bar'] .'">'.$item['mobile_bar'].'</label> <a></a>';
				// }
				else {
                    $datalist[$i][$value['data']] = $item[$value['data']];
					//$datalist[$i]['mobile_bar'] = $item['mobile_number'];
					
                }

            }
        }


        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;

        $result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function ViewCHNN(Request $request)
{

    global $token;

    $datalist = array();
    $columns = array();
    $column = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';


    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'chnn' => $data['menu_action'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size']
    );

//    PrintR($params);
    $url = URL_API . '/geniespeech/logdetail';
    $response = curlposttoken($url, $params, $token);

    if ($response['result'][0]['code'] == 200) {
        $columnslist = $response['columns_name'];
        $datas = $response['recs'];
        $name = $response['report_name'];

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {

            $column[$m]['className'] = 'text-center';
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = ($item['column_data']);


            $columns[$i]['data'] = ($item['column_data']);

            ++$m;
        }


        foreach ((array)$datas as $i => $item) {
            $datalist[$i]['DT_RowId'] = 'rows_' . MD5($item[$columns[1]['data']]);
            $datalist[$i]['no'] = ($i + 1);
            foreach ((array)$columns as $v => $value) {
                if ($value['data'] == 'CHNN') {
                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenCHNN(' . "'" . str_replace('CHAN=', '', $item[$value['data']]) . "'" . ')">' . $item[$value['data']] . '</a>';
                } elseif ($value['data'] == 'VOICE_NAME') {
                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenVOICE(' . '"' . $item[$value['data']] . '"' . ')">' . $item[$value['data']] . '</a>';
                } else {
                    $datalist[$i][$value['data']] = $item[$value['data']];
                }

            }
        }


        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function ViewLOG(Request $request)
{

    global $token;

    $datalist = array();
    $columns = array();
    $column = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';
    $result['chnn'] = '';


    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'chnn' => $data['menu_action'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size']
    );
    $url = URL_API . '/geniespeech/logcept';
    $response = curlposttoken($url, $params, $token);

    if ($response['result'][0]['code'] == 200) {
        $columnslist = $response['columns_name'];
        $datas = $response['recs'];
        $name = $response['report_name'];

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';

        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
            if ($item['column_data'] == 'spok') {
                $column[$m]['className'] = 'text-left';
            } else {
                $column[$m]['className'] = 'text-center';
            }

            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = ($item['column_data']);


            $columns[$i]['data'] = ($item['column_data']);

            ++$m;
        }


        foreach ((array)$datas as $i => $item) {

            $datalist[$i]['pass'] = '<input type="checkbox" name="pass" ref="' . $item['vname'] . '">';
            $datalist[$i]['no'] = ($i + 1);
            foreach ((array)$columns as $v => $value) {    
                    $datalist[$i][$value['data']] = $item[$value['data']];
            }
        }


        $result['name'] = SITE . ' : ' . $name;
        $result['chnn'] = $data['menu_action'];
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function ViewVOICE(Request $request)
{

    global $token;

    $datalist = array();
    $columns = array();
    $column = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';
    $result['chnn'] = '';


    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'chnn' => $data['menu_action'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size']
    );

    //PrintR($params);
    $url = URL_API . '/geniespeech/logvoice';
    $response = curlposttoken($url, $params, $token);
    //PrintR($response);
    if ($response['result'][0]['code'] == 200) {
        $start = $data['start'];
        $recnums['pages'] = $response['result'][0]['pagenum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnum'];
        $recnums['recordsTotal'] = $response['result'][0]['recnum'];

        $columnslist = $response['columns_name'];
        $datas = $response['recs'];
        $name = $response['report_name'];

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';

//        $column[1]['className'] = 'text-center';
//        $column[1]['title'] = '';
//        $column[1]['data'] = 'pass';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
            if ($item['column_data'] == 'spok') {
                $column[$m]['className'] = 'text-left';
            } else {
                $column[$m]['className'] = 'text-center';
            }

            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = ($item['column_data']);


            $columns[$i]['data'] = ($item['column_data']);

            ++$m;
        }


        foreach ((array)$datas as $i => $item) {

            $datalist[$i]['pass'] = '<input type="checkbox" name="pass" ref="' . $item['vname'] . '">';
            ++$start;
            $datalist[$i]['no'] = $start;
            foreach ((array)$columns as $v => $value) {
                if ($value['data'] == 'CHNN') {
                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenCHNN(' . "'" . str_replace('CHAN=', '', $item[$value['data']]) . "'" . ')">' . $item[$value['data']] . '</a>';
                } elseif ($value['data'] == 'voice_name') {
                    $datalist[$i][$value['data']] = '<audio controls><source src="' . $item[$value['data']] . '" type="audio/wav"></audio>';
//                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenVOICE('.'"'.$item[$value['data']].'"'.')">'.$item[$value['data']].'</a>';
                } else {
                    $datalist[$i][$value['data']] = $item[$value['data']];
                }

            }
        }


        $result['name'] = SITE . ' : ' . $name;
        $result['chnn'] = $data['menu_action'];
        $result['columns'] = $column;
        $result['data'] = $datalist;

        $result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function Add(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);


    $url = URL_API . '/geniespeech/updatevoice';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Edit(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['expr_status'] = $data['expire_date_status'];
    $data['user_status'] = $data['active'];
    $data['expr_date'] = DateTimeFormatNew($data['expire_date']);
    $data['user_login'] = $user;

    unset($data['expire_date_status']);
    unset($data['active']);
    unset($data['code']);


    $url = URL_API . '/geniespeech/adminmenu';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Del(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data[$data['main']] = $data['code'];
    unset($data['code']);
    unset($data['main']);

    $url = URL_API . '/geniespeech/adminmenu';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function LoadPermission()
{
    $permiss = array();
    $permission = $_SESSION[OFFICE]['ROLE'][0]['function'];
    foreach ((array)$permission as $i => $item) {
        $permiss[$item['function_id']]['id'] = $item['function_id'];
        $permiss[$item['function_id']]['name'] = $item['function_name'];
    }
    return $permiss;
}


switch ($switchmode) {
    case "View" :
        View($x);
        break;
    case "ViewCHNN" :
        ViewCHNN($x);
        break;
    case "ViewVOICE" :
        ViewVOICE($x);
        break;
    case "Add" :
        Add($x);
        break;
    case "Edit" :
        Edit($x);
        break;
    case "Del" :
        Del($x);
        break;
	case "ViewLOG":
        ViewLOG($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}
