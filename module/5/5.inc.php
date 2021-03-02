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

    $url = URL_API . '/geniespeech/listconfig';
    $response = curlposttoken($url, $params, $token);
    if ($response['code'] == 200) {
        $datalist =$response['data'];
	 foreach ((array)$datalist as $i => $item) {
		 $btn = '';
            $action = '';
            //$permiss = LoadPermission();
            $dataattr = array();
            $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
				//if ($permiss[2]) {
             //   $btn .= '<button data-flag="1"  onclick="me.deleteconfig('. $item['config_no'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';
				//}
			//$datalist[$i]['btn'] = $btn;
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
	 $name = 'Config';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
		$result['dropdown'] = $response['dropdown'];
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

    $data['user_login'] = $user;

    $url = URL_API . '/geniespeech/updateconfig';
	//Printr($data);
	//exit;
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
function generate(Request $request){
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    //$data['user_login'] = $user;

    $url = URL_API . '/geniespeech/config';
		
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Generate Config"
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
	
   // $response = curlposttoken($url, $data, $token);
   //   $curl = curl_init($url);
	// $response =curl_exec($curl);
	// curl_close($curl);

	//print_r($response['code']);
	//exit;
}
function Add(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
    $url = URL_API . '/geniespeech/addconfig';
    $response = curlposttoken($url, $data, $token);
    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Config"
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

function deleteconfig(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	//Printr($data);
	//exit;
    $url = URL_API . '/geniespeech/deleteconfig';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete Config"
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

function insertfilename(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	//PrintR($data);
	//exit;
    $url = URL_API . '/geniespeech/insertnamefile';
    $response = curlposttoken($url, $data, $token);
    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Filename Config"
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

function Deletefilename(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	//Printr($data);
	//exit;
    $url = URL_API . '/geniespeech/deletenamefile';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete Filename Config"
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
      'activity' => "Edit Filename Config"
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
function Viewfilename(Request $request)
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
		'text_search' => $data['text_search']
    );

    $url = URL_API . '/geniespeech/listfilename';
    $response = curlposttoken($url, $params, $token);
    if ($response['code'] == 200) {
        $datalist =$response['data'];
	 foreach ((array)$datalist as $i => $item) {
		 $btn = '';
            $action = '';
            //$permiss = LoadPermission();
            $dataattr = array();
            $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
				//if ($permiss[2]) {
             //   $btn .= '<button data-flag="1"  onclick="me.deleteconfig('. $item['config_no'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';
				//}
			//$datalist[$i]['btn'] = $btn;
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
	 $name = 'Config';
       
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

switch ($switchmode) {
    case "View" :
        View($x);
        break;
    case "Edit" :
        Edit($x);
        break;
    case "generate" :
        generate($x);
        break;
		case "Add" :
        Add($x);
		break;
		case "Delete" :
        deleteconfig($x);
        break;
		case "Viewfilename" :
        Viewfilename($x);
        break;
		case "Deletefilename" :
        Deletefilename($x);
        break;
		case "insertfilename" :
        insertfilename($x);
        break;
		case "updatenamefile" :
        updatenamefile($x);
        break;
		
		
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}