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
		'grammar_id' =>$data['grammar_id'],
		'intent_id' => $data['intent_id']
    );

    $url = URL_API . '/geniespeech/listtestsentence';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
        $datalist =$response['data'];
		
		for ($x = 0; $x < count($datalist); $x++) {
		$datalist[$x]['no'] = ($x + 1);

		
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
		'start_date' =>$data['start_date'],
		'end_date' => $data['end_date']
    );

    $url = URL_API . '/geniespeech/listtestsentencefile';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
        $datalist =$response['data'];
		
		for ($x = 0; $x < count($datalist); $x++) {
		$datalist[$x]['no'] = ($x + 1);

		if($datalist[$x]['result_path'] == ''){
		$datalist[$x]['download']='<button  type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;<button  type="button" class="btn btn-xs btn-danger" onclick="deletedatafile('.$datalist[$x]['test_sentence_file_id'].')"><i class="fas fa-trash-alt"></i> Delete</button>&nbsp;&nbsp;';
		}else{
		$datalist[$x]['download']='<button  type="button" class="btn btn-xs btn-success" onclick="downloaddata('.$datalist[$x]['test_sentence_file_id'].','."'".$datalist[$x]['excel_file']."'".')"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;<button  type="button" class="btn btn-xs btn-danger" onclick="deletedatafile('.$datalist[$x]['test_sentence_file_id'].')"><i class="fa fa-trash"></i> Delete</button>&nbsp;&nbsp;';		
		}
}
        $columnslist = $response['result'];
         
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
	$url = URL_API . '/geniespeech/inserttestsentence';

	$response = curlposttoken($url, $data, $token);
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add file Sentence"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
	$response1 = curlpost($url1, $params1);
	
	
	echo json_encode($response);	

}

function Edit(Request $request){
	parse_str($request->getPost()->toString(), $data);
	$data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
	$data['user_login'] = $user;
	$url = URL_API . '/geniespeech/edittestsentence';
	$response = curlposttoken($url, $data, $token);
	echo json_encode($response);
}

function dropdown(Request $request){
	
	parse_str($request->getPost()->toString(), $data);
	$data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $url = URL_API . '/geniespeech/listdropdowntestsentence';
    $response = curlposttoken($url, $data, $token);
	echo json_encode($response);
}


function Deletedata(Request $request){
	parse_str($request->getPost()->toString(), $data);

    $url = URL_API . '/geniespeech/deletetestsentence';
    $response = curlposttoken($url, $data, $token);
	echo json_encode($response);
	
}

function Viewfile(Request $request){
	

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
		$datalist[$x]['download']='<button  type="button" class="btn btn-xs btn-success" onclick="downloaddata('.$datalist[$x]['grammar_test_id'].')"><i class="fa fa-save"></i> Download</button>&nbsp;&nbsp;<button  type="button" class="btn btn-xs btn-danger" onclick="deletedata('.$datalist[$x]['grammar_test_id'].')"><i class="fa fa-trash"></i> Delete</button>&nbsp;&nbsp;';		
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

function Addfile(Request $request){
	
	 global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];

    parse_str($request->getPost()->toString(), $data);

    $data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $data['user_login'] = $user;
	
    $url = URL_API . '/geniespeech/inserttestsentencefile';
	$response = curlposttoken($url, $data, $token);

		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add  file sentence"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
	$response1 = curlpost($url1, $params1);
	echo json_encode($response);
}

function Deletedatafile(Request $request){
		parse_str($request->getPost()->toString(), $data);

    $url = URL_API . '/geniespeech/deletetestsentencefile';
    $response = curlposttoken($url, $data, $token);
	echo json_encode($response);
	
}

function Editfile(Request $request){
	parse_str($request->getPost()->toString(), $data);
	$url = URL_API . '/geniespeech/edittestsentencefile';
	$response = curlposttoken($url, $data, $token);
	echo json_encode($response);
	
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
		case "Viewfile" :
        Viewfile($x);
        break;
		case "Addfile" :
        Addfile($x);
		break;
		case "Deletefile" :
        Deletedatafile($x);
        break;
		case "Editfile" :
        Editfile($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}