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
    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'service_id' => $data['service_id_drop'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size'],
        'text_search' => $data['text_search'],
		'order' => $orderby,
		'dir' => $dir
    );

   //PrintR($params);
   //exit;

    $url = URL_API . '/geniespeech/intentlist';
    $response = curlposttoken($url, $params, $token);

    if ($response['result'][0]['code'] == 200) {

        $recnums['pages'] = $response['result'][0]['pagenum'];
        $recnums['recordsFiltered'] = ($response['result'][0]['pagenum'] * $data['page_size']);
        $recnums['recordsTotal'] = ($response['result'][0]['pagenum'] * $data['page_size']);



        $columnslist = $response['columnsname'];

        $datas = $response['recs'];
        $name =  $response['reportname'];
        //PrintR($datas);
       //exit;

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'RowNum';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];

            $columns[$m]['data'] = $item['column_data'];
            $columns[$m]['title'] = $item['column_name'];
            $columns[$m]['type'] = $item['column_type'];

            ++$m;
        }

        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = '';
        $column[$m]['data'] = 'btn';

        $permiss = LoadPermission();
	//sizeof($empty_array) == 0
	

		if($datas[0]['intent_id'] >= 1){
        foreach ((array)$datas as $i => $item) {
            $btn = '';

            $item['DT_RowId'] = 'row_' . MD5($item[$columns[2]['data']]);
            $datalist[$i]['DT_RowId'] = $item['DT_RowId'];
            $datalist[$i]['RowNum'] = $item['RowNum'];


            foreach ((array)$columns as $v => $value) {
                    $datalist[$i][$value['data']] = $item[$value['data']];

            }

            $dataattr = array();
            $dataattr[$i] = $item;


              if ($permiss[2]) {
                $btn .= '<button data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Load(this)" type="button" class="btn btn-xs btn-success"><i class="fa fa-save"></i> ' . $permiss[2]['name'] . '</button>&nbsp;&nbsp;';
            }
           /* if ($permiss[3]) {
                $btn .= '<button  data-code="' . $item['project_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Del(this)"  type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
            }*/


            $datalist[$i]['btn'] = $btn;

        }
		
		}
		

        $result['name'] = SITE . ' : ' . $name;
        $result['columns'] = $column;
        $result['data'] = $datalist;
		$result['dropdown'] = $response['dropdown'];
        $result['draw'] = ($data['draw']*1);
		if(sizeof($datas) > 1){
			$result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
		}else{
			$result['recordsTotal'] = 0;
        $result['recordsFiltered'] = 0;
		}
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Add(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];

    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);


    $params = array(
        'menu_action' => $data['menu_action'],
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
		'grammar_id' => $data['grammar_id'],
        'service_id' => $data['service_id'],
        'user_question' => $data['user_question'],
        'intent_tag' => $data['intent_tag'],
		'active' => $data['active'],
        'user_login' => $user
    );

   // PrintR($params);
   // exit;

    $url = URL_API . '/geniespeech/adddeleteupdateintent';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Add Intent Management"
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
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $user = $_SESSION[OFFICE]['DATA']['user_name'];

    $params = array(
        'menu_action' => $data['menu_action'],
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'service_id' => $data['service_id'],
        'intent_id' => $data['intent_id'],
        'user_question' => $data['user_question'],
		'grammar_id'=>$data['grammar_id'],
        'intent_tag' => $data['intent_tag'],
		'active' => $data['active'],
        'user_login' => $user
    );
	   // PrintR($params);
    //exit;
    $url = URL_API . '/geniespeech/adddeleteupdateintent';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Edit Intent Management"
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
    $data=array();

    parse_str($request->getPost()->toString(), $data);


    $params = array(
        'menu_action' => $data['menu_action'],
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'service_id' => $data['service_id'],
        'intent_del' =>$data['intent_del']
    );
    $url = URL_API . '/geniespeech/adddeleteupdateintent';
    $response = curlposttoken($url, $params, $token);

    if ($response['code'] == 200) {
		$params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Delete  Intent Management"
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

function Loadcbo(Request $request){

    global $token;

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);


    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size']

    );

    $url = URL_API . '/geniespeech/servicelist';

    $response = curlposttoken($url, $params, $token);


    if ($response['result'][0]['code'] == 200) {
	//	PrintR($response);
	//	exit;
        /** @noinspection PhpUnusedLocalVariableInspection */
        $datas = $response['recs'];

        $datalist = [];
        foreach ((array)$datas as $i => $item) {

            $datalist[$i]['service_id'] = $item['service_id'];
            $datalist[$i]['service_name'] = $item['service_name'];

        }


        /** @noinspection PhpUndefinedVariableInspection */
        $result['item'] = $datalist;
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }

    $result['msg'] = $response['msg'];
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
    case "Loadcbo":
        Loadcbo($x);
    break;

    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}