<?php
require_once "../../service/service.php";
require_once "../../service/vendor.php";

function View(Request $request)
{

    global $token;
    $datalist = array();
    $column = array();
    $drowdownpack = array();
    $drowdowngroup = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';


    parse_str($request->getPost()->toString(), $data);

    $params = array(
		'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'page_id' => $data['page_id']?$data['page_id']:1,
        'page_size' => $data['page_size'],
		'grammar_id' =>$data['grammar_id']?$data['grammar_id']:0,
		'intent_id' => $data['intent_id']
    );

    $url = URL_API . '/geniespeech/listtesttool';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
        $datalist =$response['data'];
		
		for ($x = 0; $x < count($datalist); $x++) {
		$datalist[$x]['no'] = ($x + 1);

		if($datalist[$x]['result_path'] == ''){
		$datalist[$x]['download']='<button  type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;<button  type="button" class="btn btn-xs btn-danger" disabled><i class="fas fa-trash-alt"></i> Delete</button>&nbsp;&nbsp;';
		}else{
		$datalist[$x]['download']='<button  type="button" class="btn btn-xs btn-success" onclick="downloaddata('.$datalist[$x]['grammar_test_id'].','."'".$datalist[$x]['excel_file']."'".')"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;<button  type="button" class="btn btn-xs btn-danger" onclick="deletedata('.$datalist[$x]['grammar_test_id'].')"><i class="fa fa-trash"></i> Delete</button>&nbsp;&nbsp;';		
		}
}
        $columnslist = $response['result'];
//'<audio preload="auto" autobuffer controls><source src="' . $item[$value['data']] . '" type="audio/wav"></audio>'
         
	  $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
	    $column[$m]['className'] = $item['className'];
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_field'];

            $columns[$m]['data'] = $item['column_field'];
            $columns[$m]['title'] = $item['column_name'];
            $columns[$m]['type'] = $item['column_type'];

            ++$m;
        }

       // $column[$m]['className'] = 'text-center';
       // $column[$m]['title'] = 'Action';
       // $column[$m]['data'] = 'btn';
	//PrintR($datalist);  
	 $name = 'Upload Voice';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
         $recnums['pages'] = $response['totalpage'];
        $recnums['recordsFiltered'] = $response['recnums'];
        $recnums['recordsTotal'] = $response['recnums'];
       	$result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function Viewadd(Request $request)
{

    global $token;
    $datalist = array();
    $column = array();
    $drowdownpack = array();
    $drowdowngroup = array();
    $name = '';
    $result['data'] = array();
    $result['columns'] = array();
    $result['name'] = '';


    parse_str($request->getPost()->toString(), $data);

    $params = array(
		'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'page_id' => $data['page_id']?$data['page_id']:1,
        'page_size' => $data['page_size'],
		'grammar_id' =>$data['grammar_id'],
		'intent_id' => $data['intent_id']
    );

    $url = URL_API . '/geniespeech/listvoice';
    $response = curlposttoken($url, $params, $token);
    if ($response['code'] == 200) {
        $datalist =$response['data'];
		
		for ($x = 0; $x < count($datalist); $x++) {
		$audio =URL_VOICE.$datalist[$x]['path'];
		$datalist[$x]['no'] = ($x + 1);
		$datalist[$x]['path']='<audio preload="auto" autobuffer controls><source src="' . $audio . '" type="audio/wav"></audio>';
		if($datalist[$x]['action'] == 0 ){
			$datalist[$x]['action']='None';
		}else if($datalist[$x]['action'] == 1){
			$datalist[$x]['action']='Train';
		}else if($datalist[$x]['action'] == 2){
			$datalist[$x]['action']='Test';
		}else if($datalist[$x]['action'] == 3){
			$datalist[$x]['action']='Test&Train';
		}
}
        $columnslist = $response['result'];
//'<audio preload="auto" autobuffer controls><source src="' . $item[$value['data']] . '" type="audio/wav"></audio>'
         
	  $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
	    $column[$m]['className'] = $item['className'];
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_field'];

            $columns[$m]['data'] = $item['column_field'];
            $columns[$m]['title'] = $item['column_name'];
            $columns[$m]['type'] = $item['column_type'];

            ++$m;
        }

       // $column[$m]['className'] = 'text-center';
       // $column[$m]['title'] = 'Action';
       // $column[$m]['data'] = 'btn';
	//PrintR($datalist);  
	 $name = 'Upload Voice';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
         $recnums['pages'] = $response['totalpage'];
        $recnums['recordsFiltered'] = $response['recnums'];
        $recnums['recordsTotal'] = $response['recnums'];
       	$result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


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


function Add(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];

    parse_str($request->getPost()->toString(), $data);

    $data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $data['user_login'] = $user;
	

    $url = URL_API . '/geniespeech/inserttesttool';
	$response = curlposttoken($url, $data, $token);

		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add All file voice"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
	$response1 = curlpost($url1, $params1);
	echo json_encode($response);
}

function Edit(Request $request){
	parse_str($request->getPost()->toString(), $data);
	$url = URL_API . '/geniespeech/editvoice';
	$response = curlposttoken($url, $data, $token);
	echo json_encode($response);
}

function dropdown(Request $request){
	
	parse_str($request->getPost()->toString(), $data);
	$data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $url = URL_API . '/geniespeech/listdropdowntesttool';
    $response = curlposttoken($url, $data, $token);
	echo json_encode($response);
}


function Deletedata(Request $request){
	parse_str($request->getPost()->toString(), $data);

    $url = URL_API . '/geniespeech/deletetesttool';
    $response = curlposttoken($url, $data, $token);
	echo json_encode($response);
	
}

function Download(Request $request){
	parse_str($request->toString(), $data);
	$url = URL_API . '/geniespeech/downloadtesttool';
	$ch = curl_init();
	
curl_setopt($ch, CURLOPT_URL,URL_API . '/geniespeech/downloadtesttool?grammar_test_id='.$data['grammar_test_id']);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
    //$response = curlposttoken($url, $data, $token);
}
switch ($switchmode) {
    case "View" :
        View($x);
        break;
		case "Add" :
        Add($x);
		break;
		case "Delete" :
        Deletedata($x);
        break;
		case "Edit" :
        Edit($x);
        break;
		case "dropdown" :
        dropdown($x);
        break;
		case "Viewadd" :
        Viewadd($x);
        break;
		case "Download" :
        Download($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}