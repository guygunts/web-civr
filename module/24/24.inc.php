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
	$orderby='';
	$dir='';

    parse_str($request->getPost()->toString(), $data);
	if (!empty($data['columns'])){
	$columnameorder=$data['columns'][$data['order']['0']['column']]['data'];
	$dir=$data['order']['0']['dir'];
	}
    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'text_search' => $data['text_search'],
        'page_id' => $data['page_id']?$data['page_id']:1,
        'page_size' => $data['page_size'],
		'column' => $columnameorder,
		'dir' =>$dir
    );
 // PrintR($params);
	//exit;
    $url = URL_API . '/geniespeech/logview';
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
    
            $dataattr = array();
            $datalist[$i]['no'] = ($i + 1); 
            $dataattr[$i] = $item;
      
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

      //  $column[$m]['className'] = 'text-center';
      //  $column[$m]['title'] = 'Action';
      //  $column[$m]['data'] = 'btn';
	//PrintR($datalist);
	 $name = 'Log';
       
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
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}