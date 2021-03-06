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
		'project_id' => $data['config_filename_no']?$data['config_filename_no']:0
    );

    $url = URL_API . '/geniespeech/grammardeploylist';
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
			 if($item['status'] == 0){				 
			 $btn .= '<button   onclick="me.active('. $item['grammar_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-success"><i class="fa fa-gavel"></i>active</button>&nbsp;&nbsp;<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.editcallflow(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i>edit</button>&nbsp;&nbsp;<button data-flag="1"  onclick="me.deletecallflow('. $item['grammar_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';	  
			 }else{
			  $btn .= '<button   onclick="me.active('. $item['grammar_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-success" disabled><i class="fa fa-gavel"></i>active</button>&nbsp;&nbsp;<button data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" .'  onclick="me.editcallflow(this)" type="button" class="btn btn-xs btn-primary"><i class="fa fa-save"></i>edit</button>&nbsp;&nbsp;<button data-flag="1"  onclick="me.deletecallflow('. $item['grammar_id'] .','. $item['project_id'] .')" type="button" class="btn btn-xs btn-danger"><i class="fa fa-save"></i>delete</button>&nbsp;&nbsp;';	  
			 
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
	    $column[$m]['className'] = 'text-center';
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];
            ++$m;
        }

        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = 'Action';
        $column[$m]['data'] = 'btn';
	//PrintR($datalist);  
	 $name = $response['reportname'];
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';

		//$result['dropdown'] = $response['dropdown'];
         $recnums['pages'] = $response['result'][0]['recnum'];
        $recnums['recordsFiltered'] = $response['result'][0]['recnums'];
        $recnums['recordsTotal'] = $response['result'][0]['recnums'];
       	$result['draw'] = ($data['draw']*1);
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['result'][0]['msg'];


    echo json_encode($result);
}


function Editgrammar(Request $request)
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
	$data['menu_action']='updategrammar';
    $url = URL_API . '/geniespeech/addgrammar';

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
	$data['menu_action']='addgrammar';
	//PrintR($data);
	//exit;
    $url = URL_API . '/geniespeech/addgrammar';
    $response = curlposttoken($url, $data, $token);
    if ($response['code'] == 200) {
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
}

function Deletegrammar(Request $request){
	   global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='deletegrammar';
    $url = URL_API . '/geniespeech/addgrammar';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
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
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}
function listdatagrammar(Request $request)
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
		'project_id'=>$data['project_id'],
		'grammar_id'=>$data['grammar_id']
    );
	
    $url = URL_API . '/geniespeech/grammarfilelist';
    $response = curlposttoken($url, $params, $token);
    if ($response['result'][0]['code'] == 200) {
        $datalist =$response['recs'];
	 foreach ((array)$datalist as $i => $item) {
            //$permiss = LoadPermission();
            $dataattr = array();
           // $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
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

function updategrammar(Request $request){
	
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='updategrammar';
    $url = URL_API . '/geniespeech/addgrammarfile';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
}
function deletegrammarfile(Request $request){
	
    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='deletegrammar';
    $url = URL_API . '/geniespeech/addgrammarfile';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
	
	
}


function activegrammarfile(Request $request){
	  global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $data['user_login'] = $user;
	$data['menu_action']='activegrammar';
    $url = URL_API . '/geniespeech/addgrammar';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);

}

function uploadgrammarfile(Request $request){

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();

    parse_str($request->getPost()->toString(), $data);
    $data['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
    $data['user_login'] = $user;
    $data2[$request->getFiles()->get('file')['name']] = $request->getFiles()->get('file')['tmp_name'];
    $url = URL_API . '/geniespeech/uploadgrammarfile';
    $ch = curl_init($url);
    $result = curl_custom_postfields($ch, $data, $data2);
    exit;
}

function serverlist(Request $request){
	  global $token;
	  $result['data'] = array();
    parse_str($request->getPost()->toString(), $data);

    $url = URL_API . '/geniespeech/serverlist';
	//Printr($data);
	//exit;
    $response = curlposttoken($url, $data, $token);
	if($response['result'][0]['code'] ==200){
		$result['code'] = '200';
        $result['success'] = 'COMPLETE';
		$result['msg'] = $response['result'][0]['msg'];
		$result['recs']=$response['recs'];
	}else{
		 $result['success'] = 'FAIL';
	}
	echo json_encode($result);
}

switch ($switchmode) {
    case "View" :
        View($x);
        break;
    case "Editgrammar" :
        Editgrammar($x);
        break;
		case "listdatagrammar" :
        listdatagrammar($x);
        break;
		case "Deletegrammar" :
        Deletegrammar($x);
        break;
		case "deletegrammarfile" :
        deletegrammarfile($x);
        break;
		case "insert" :
        insert($x);
        break;
		case "updatenamefile" :
        updatenamefile($x);
        break;
		case "updategrammar" :
        updategrammar($x);
        break;
		case "activegrammarfile" :
        activegrammarfile($x);
        break;
		case "uploadgrammarfile" :
        uploadgrammarfile($x);
        break;
		case "serverlist" :
        serverlist($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}