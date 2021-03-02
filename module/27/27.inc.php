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
        'text_search' => $data['text_search'],
        'page_id' => $data['page_id']?$data['page_id']:1,
        'Package_group' => $data['packagegroup'],
        'page_size' => $data['page_size'],
		'enable' => $data['enable']
    );
    //PrintR($params);

    $url = URL_API . '/geniespeech/Listupsellhistory';
    $response = curlposttoken($url, $params, $token);
    if ($response['code'] == 200) {
        $datalist =$response['data'];
         $drowdownpack = $response['drowdownpack'];
        $drowdowngroup = $response['drowdowngroup'];
	$drowdowntypegrop=$response['drowdowntypegrop'];
	$drowdownprice=$response['drowdownprice'];
	$drowdownspeed=$response['drowdownspeed'];
	 foreach ((array)$datalist as $i => $item) {
            $action = '';
            //$permiss = LoadPermission();
            $dataattr = array();
            $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
           // if ($permiss[2]) {
		    $action .= '<button  class="btn btn-xs btn-primary " data-target="#Modal"  data-toggle="modal" onclick=getdata(this)>Edit</button><button  class="btn btn-xs btn-danger " onclick=deletedata("'.$item['PACK_ID'].'")>Delete</button>';
           // } 
            $datalist[$i]['btn'] = $action;
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

        //$column[$m]['className'] = 'text-center';
       // $column[$m]['title'] = 'Action';
       // $column[$m]['data'] = 'btn';
	//PrintR($datalist);
	 $name = 'List Packget';
       
        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
        $result['success'] = 'COMPLETE';
        $result['drowdownpack']=$drowdownpack;
        $result['drowdowngroup']=$drowdowngroup;
	$result['drowdowntypegrop']=$drowdowntypegrop;
	$result['drowdownprice']=$drowdownprice;
	$result['drowdownspeed']=$drowdownspeed;
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
    $data['user_login'] = $user;
    $url = URL_API . '/geniespeech/insertupsellhistory';
    $response = curlposttoken($url, $data, $token);
    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Upsell"
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
    $url = URL_API . '/geniespeech/updateupsellhistory';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Edit Upsell"
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
    $url = URL_API . '/geniespeech/deleteupsellhistory';
    $response = curlposttoken($url, $data, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete Upsell"
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
    parse_str($request->getPost()->toString(), $data);
    
    $url = URL_API . '/geniespeech/adminmenu';
    $response = curlposttoken($url, $data, $token);
}
function genxml(Request $request){
	global $token;
	parse_str($request->getPost()->toString(),$data);
	$url = URL_API . '/geniespeech/generatexmlupsellhistory';
    $response = curlposttoken($url, $data, $token);
	 if ($response['code'] == 200) {
        $result['success'] = 'COMPLETE';
    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['mess'];


    echo json_encode($result);
}
switch ($switchmode) {
    case "View" :
        View($x);
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
    case "genxml":
		genxml($x);
		break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}