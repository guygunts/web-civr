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


    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'menu_action' => $data['menu_action'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size'],
        'text_search' => $data['text_search']
    );

   // PrintR($params);

    $url = URL_API . '/geniespeech/grammar';
    $response = curlposttoken($url, $params, $token);
    //PrintR($response);
	
    if ($response['result'][0]['code'] == 200) {
        $start = $data['start'];
        $recnums['pages'] = $response['result'][0]['pagenum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnum'];
        $recnums['recordsTotal'] = $response['result'][0]['recnum'];

        $columnslist = $response['columnsname'];
//        $recnums = $response['result'][0]['recnum'];
        $datas = $response['recs'];
        $name = 'Upload Grammar';

        $status[0] = 'Upload Success';
        $status[1] = 'Upload Fail';
        $status[2] = 'Process File Success';
        $status[3] = 'Process File Fail';
        $status[4] = 'Build Process';
        $status[5] = 'Build Fail';
        $status[6] = 'Build Success';

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;
        foreach ((array)$columnslist as $i => $item) {
            $column[$m]['className'] = 'text-center';
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_field'];
//            $column[$m]["DT_RowId"] = $item['column_field'];

            $columns[$m]['data'] = $item['column_field'];
            $columns[$m]['type'] = $item['column_type'];
            ++$m;
        }
        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = '';
        $column[$m]['data'] = 'btn';
//        $column[$m]["DT_RowId"] = 'row_'.$m;


        $permiss = LoadPermission();

        foreach ((array)$datas as $i => $item) {
            $btn = '';


            $datalist[$i]['DT_RowId'] = 'row_' . $item['project_id'] . '_' . strtotime($item['date_time']);
            ++$start;
            $datalist[$i]['no'] = $start;

            foreach ((array)$columns as $v => $value) {
                if ($value['data'] == 'status') {
                    $datalist[$i][$value['data']] = $item['message_error'];
                } elseif ($value['data'] == 'project_id') {
                    $datalist[$i][$value['data']] = $item['project_name'];
                } else {
                    $datalist[$i][$value['data']] = $item[$value['data']];
                }


            }
            $dataattr = array();
            $dataattr[$i] = $item;


            if ($permiss[2]) {
                if ($item['status'] == 2) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Process</button>&nbsp;&nbsp;';

                } elseif ($item['status'] == 0) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Process(this)" type="button" class="btn btn-xs btn-success"><i class="fa fa-save"></i> Process</button>&nbsp;&nbsp;';
				} elseif ($item['status'] == 3) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Process</button>&nbsp;&nbsp;';
                } elseif ($item['status'] == 4) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Process</button>&nbsp;&nbsp;';

                } elseif ($item['status'] == 6) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Process</button>&nbsp;&nbsp;';
                }
            }
    /*        if ($permiss[1]) {
                if ($item['status'] == 2) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Build(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i> Build</button>&nbsp;&nbsp;';
                } elseif ($item['status'] == 0) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-primary" disabled><i class="fa fa-save"></i> Build</button>&nbsp;&nbsp;';
                } elseif ($item['status'] == 4) {
//                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Build(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i> Build</button>&nbsp;&nbsp;';
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-primary" disabled><i class="fa fa-save"></i> Build</button>&nbsp;&nbsp;';

                } elseif ($item['status'] == 6) {
                    $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-primary" disabled><i class="fa fa-save"></i> Build</button>&nbsp;&nbsp;';

                }
            }*/

            if ($item['status'] == 2) {
             //   $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default" ><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
				 $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
			} elseif ($item['status'] == 0) {
//                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;';
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 3) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default" ><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 4) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 6) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" ><i class="fa fa-save"></i> Grammar</button>&nbsp;&nbsp;';
            } 
			
	/*		            if ($item['status'] == 2) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Result</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 0) {
//                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;';
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Result</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 3) {
//                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Download(this)" type="button" class="btn btn-xs btn-default"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;';
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Result</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 4) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' type="button" class="btn btn-xs btn-default" disabled><i class="fa fa-save"></i> Result</button>&nbsp;&nbsp;';
            } elseif ($item['status'] == 6) {
                $filename = str_replace('/app/pyunimrcp/result/', '', $item['url_patch']);
                $btn .= '<a href="' . URL_API . '/geniespeech/downloadgrammar/' . $item['result_name'] . '" class="btn btn-xs btn-default" download><i class="fa fa-save"></i> Result</a>&nbsp;&nbsp;';
//                $btn .= '<button data-code="' . $item['result_name'] . '" onclick="me.Download(this)" type="button" class="btn btn-xs btn-default"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;';

            }
		*/	

            if ($permiss[3]) {
                if ($item['status'] == 2) {
                    $btn .= '<button  type="button" class="btn btn-xs btn-danger" disabled><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
				   //$btn .= '<button onclick="me.Del('.$item['project_id'].')"  type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> '.$permiss[3]['name'].'</button>';
                } elseif ($item['status'] == 0) {
                  //  $btn .= '<button onclick="me.Del('.$item['project_id'].')"  type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> '.$permiss[3]['name'].'</button>';
                    $btn .= '<button  type="button" class="btn btn-xs btn-danger" disabled><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
                } elseif ($item['status'] == 3) {
//                    $btn .= '<button onclick="me.Del('.$item['project_id'].')"  type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> '.$permiss[3]['name'].'</button>';
                    $btn .= '<button  type="button" class="btn btn-xs btn-danger" onclick="me.Del('. "'".$item['file_name']. "'".')"><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
                } elseif ($item['status'] == 4) {
                    $btn .= '<button  type="button" class="btn btn-xs btn-danger" disabled><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
                } elseif ($item['status'] == 6) {
                    $btn .= '<button  type="button" class="btn btn-xs btn-danger" disabled><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
                }

            }

            $datalist[$i]['btn'] = $btn;

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

function Add(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();

    parse_str($request->getPost()->toString(), $data);

//    $file = $request->getFiles()->get('file')['name'];

//    $file = $_FILES['file'];

//    $data = $_POST;
    $data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $data['user_login'] = $user;
//    $data = json_encode($data);
//    $data['file_name'] =  new CURLFile(realpath($_FILES['file']['tmp_name']));
//    $data['file_name'] = '@' . realpath($_FILES['file']['tmp_name']) . ';filename='.$_FILES['file']['name']. ';type='.$_FILES['file']['type'];
    $data2[$request->getFiles()->get('file')['name']] = $request->getFiles()->get('file')['tmp_name'];

    $url = URL_API . '/geniespeech/grammarupload';
    $ch = curl_init($url);
    $result = curl_custom_postfields($ch, $data, $data2);
	$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Bulid Grammar"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
    exit;
//    if ($result['code'] == 200) {
//        $result['msg'] = 'Upload Success';
//        $result['success'] = 'COMPLETE';
//    } else {
//        $result['success'] = 'FAIL';
//        $result['msg'] = 'Upload Fail';
//    }
//    $result['msg'] = $response['msg'];

//    echo json_encode($result);
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


    parse_str($request->getPost()->toString(), $data);
	 $data['menu_action'] = "deletegrammarbuild";
	$data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $url = URL_API . '/geniespeech/addgrammar';
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

function AddGrammar(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
//    $result['data'] = array();
//    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;

    $url = URL_API . '/geniespeech/grammarbuildgrammar';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Process(Request $request)
{
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;

    $url = URL_API . '/geniespeech/grammarprocessfile';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Process Grammar:".$data['file_name']
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Download(Request $request)
{

$user = $_SESSION[OFFICE]['DATA']['user_name'];
 parse_str($request->getPost()->toString(), $data);
	
    $data['user_login'] = $user;
	PrintR($data);
	exit;
    $url = URL_API . '/geniespeech/downloadgrammar';
	$ch = curl_init($url);
    $payload = json_encode($data);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    $headers = [
        'Content-Type:application/json',
        'Authorization:' . $token
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_TIMEOUT,140);
    $response = curl_exec($ch);
    curl_close($ch);
      print_r($response);
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
    case "AddGrammar" :
        AddGrammar($x);
        break;
    case "Process" :
        Process($x);
        break;
    case "Download" :
        Download($x);
        break;
    case "Edit" :
        Edit($x);
        break;
    case "Del" :
        Del($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}