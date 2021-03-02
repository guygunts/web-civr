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
        'page_id' => $data['page_id']?$data['page_id']:1,
        'page_size' => $data['page_size'],
		'text_search' => $data['text_search'],
		'config_filename_no' => $data['config_filename_no']?$data['config_filename_no']:0
    );

    $url = URL_API . '/geniespeech/Listcallflow';
    $response = curlposttoken($url, $params, $token);
    if ($response['result'][0]['code'] == 200) {
        $datalist =$response['recs'];
	 foreach ((array)$datalist as $i => $item) {
		 $btn = '';
            $action = '';
            //$permiss = LoadPermission();
            $dataattr = array();
            //$datalist[$i]['no'] = $item['RowNum']; 
            $dataattr[$i] = $item;
				//if ($permiss[2]) {
             //   $btn .= '<button data-flag="1"  onclick="me.deleteconfig('. $item['config_no'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';
			 if($item['file_id'] == null){				 
			 $btn .= '<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.editcallflow(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i>edit</button>&nbsp;&nbsp;<button data-flag="1"  onclick="me.deletecallflow('. $item['callflow_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';	  
			 }else{
			  $btn .= '<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.editcallflow(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i>edit</button>&nbsp;&nbsp;<button data-flag="1"  onclick="me.deletecallflow('. $item['callflow_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-danger" disabled><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';
			 
			 }
				//}
			$datalist[$i]['btn'] = $btn;
        } 
        $columnslist = $response['columnsname'];

          $column[0]['className'] = 'details-control';
        $column[0]['orderable'] = false;
        $column[0]['data'] = null;
		$column[0]['defaultContent'] = '';
		
	  $column[1]['className'] = 'text-center';
        $column[1]['title'] = 'No';
        $column[1]['data'] = 'RowNum';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
	    $column[$m]['className'] = 'text-center';
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];
            ++$m;
        }

        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = 'Action';
        $column[$m]['data'] = 'btn';
	//PrintR($datalist);  
	 $name = 'Config';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
		$result['columnName2'] = $response['result'][0]['columnName2'];
		$result['columndataName2'] =$response['result'][0]['columndataName2'];
		//$result['dropdown'] = $response['dropdown'];
         $recnums['pages'] = $response['result'][0]['recnum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnums'];
        $recnums['recordsTotal'] = $response['result'][0]['recnums'];
       	$result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}


function Editcallflow(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();

    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='updatecallflow';
    $url = URL_API . '/geniespeech/addcallflow';

    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$result['code']=$response['code'];
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


function insert(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='addcallflow';
	//PrintR($data);
	//exit;
    $url = URL_API . '/geniespeech/addcallflow';
    $response = curlposttoken($url, $data, $token);
    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Callflow"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
}

function Deletecall(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='deletecallflow';
    $url = URL_API . '/geniespeech/addcallflow';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete Callflow"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function updatenamefile(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;

    $url = URL_API . '/geniespeech/updatenamefile';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Edit Callflow"
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
function listdatacallflow(Request $request)
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
        'page_id' => $data['page_id']?$data['page_id']:1,
        'page_size' => $data['page_size'],
		'start_date' =>$data['start_date'],
		'end_date' =>$data['end_date'],
		'project_id'=>$data['project_id'],
		'callflow_id'=>$data['callflow_id']
    );
	
    $url = URL_API . '/geniespeech/listdatacallflow';
    $response = curlposttoken($url, $params, $token);
    if ($response['result'][0]['code'] == 200) {
        $datalist =$response['recs'];
	 foreach ((array)$datalist as $i => $item) {
		 $btn = '';
            $action = '';
            //$permiss = LoadPermission();
            $dataattr = array();
           // $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
				//if ($permiss[2]) {
					if($item['status'] == 0){
                // $btn .= '<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .' onclick="me.active()" type="button" class="btn btn-xs btn-success">active</button>&nbsp;&nbsp;';
				  $btn .='<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.active(this)" type="button" class="btn btn-xs btn-success">active</button>&nbsp;&nbsp;<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.delete(this)" type="button" class="btn btn-xs btn-danger">delete</button>&nbsp;&nbsp;';
					}else{
						//$btn .= '<button  onclick="me.active()" type="button" class="btn btn-xs btn-success" disabled>active</button>&nbsp;&nbsp;';
						 $btn .='<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.active(this)" type="button" class="btn btn-xs btn-success" disabled>active</button>&nbsp;&nbsp;<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.delete(this)" type="button" class="btn btn-xs btn-danger" disabled>delete</button>&nbsp;&nbsp;';
				
					}
					
				//}
			$datalist[$i]['btn'] = $btn;
        } 
        $columnslist = $response['columnsname'];

         
	  $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'RowNum';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
	    $column[$m]['className'] = $item['className'];
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];
            ++$m;
        }

        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = 'Action';
        $column[$m]['data'] = 'btn';
	//PrintR($datalist);  
	 $name = 'Config';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
         $recnums['pages'] = $response['result'][0]['pagenum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnums'];
        $recnums['recordsTotal'] = $response['result'][0]['recnums'];
       	$result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}

function editxmffile(Request $request){
	
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='update_file_callflow';
    $url = URL_API . '/geniespeech/addcallflow';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Edit Xml Callflow"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
}
function deletexmlfile(Request $request){
	
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='delete_file_callflow';
    $url = URL_API . '/geniespeech/addcallflow';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete Xml Callflow"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
	
}


function activexmffile(Request $request){
	  global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='active_callflow';
    $url = URL_API . '/geniespeech/addcallflow';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Active Xml Callflow"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);

}

function uploadcallflow(Request $request){

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();

    parse_str($request->getPost()->toString(), $data);
    $data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $data['user_login'] = $user;
    $data2[$request->getFiles()->get('file')['name']] = $request->getFiles()->get('file')['tmp_name'];
    $url = URL_API . '/geniespeech/uploadcallflow';
    $ch = curl_init($url);
    $result = curl_custom_postfields($ch, $data, $data2);
    exit;
}

switch ($switchmode) {
    case "View" :
        View($x);
        break;
    case "Editcallflow" :
        Editcallflow($x);
        break;
		case "listdatacallflow" :
        listdatacallflow($x);
        break;
		case "deletecall" :
        Deletecall($x);
        break;
		case "deletexmlfile" :
        deletexmlfile($x);
        break;
		case "insert" :
        insert($x);
        break;
		case "updatenamefile" :
        updatenamefile($x);
        break;
		case "editxmffile" :
        editxmffile($x);
        break;
		case "activexmffile" :
        activexmffile($x);
        break;
		case "uploadcallflow" :
        uploadcallflow($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}