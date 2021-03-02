<?php
require_once "../../service/service.php";
require_once "../../service/vendor.php";

function View(Request $request)
{

    global $token;
    $datalist = array();
    $columns = array();
    $column = array();

    $result['data'] = array();
    $result['columns'] = array();
    $types = ['1' => 'Normal', '2' => 'Build in'];

    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'menu_action' => $data['menu_action'],
        'page_id' => $data['page_id'],
        'page_size' => 100000,
    );
    $url = URL_API . '/geniespeech/adminmenu';
    $response = curlposttoken($url, $params, $token);


    if ($response['code'] == 200) {
        $columnslist = $response['result'];
        $datas = $response['data'];

       // $column[0]['className'] = 'details-control';
        //$column[0]['title'] = '';
        //$column[0]['data'] = null;
       // $column[0]['defaultContent'] = '';


        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;
        foreach ((array)$columnslist as $i => $item) {
            $column[$m]['className'] = 'text-' . ($item['column_align'] ? $item['column_align'] : 'center');
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];

            $columns[$m]['data'] = $item['column_data'];
            $columns[$m]['type'] = $item['column_type'];
            ++$m;
        }
        $column[$m]['className'] = 'text-center';
        $column[$m]['title'] = '';
        $column[$m]['data'] = 'btn';

        $permiss = LoadPermission();

        foreach ((array)$datas as $i => $item) {
            $btn = '';
            $item['DT_RowId'] = 'row_' . MD5($item[$columns[2]['data']]);
            $datalist[$i]['DT_RowId'] = $item['DT_RowId'];
            $datalist[$i]['no'] = ($i + 1);

//            $datasub = array();
//            $datasub[$i] = $item['variation'];

            foreach ((array)$columns as $v => $value) {
                if ($value['data'] == 'type') {
                    $datalist[$i][$value['data']] = $types[$item[$value['data']]];
                } else {
                    $datalist[$i][$value['data']] = $item[$value['data']];
                }
            }

            $vartiation = array();
            if (count($item['variation']) > 0) {
                foreach ($item['variation'] as $z => $itemsub) {

                    $vartiation[$z] = $itemsub;
                    $vartiation[$z]['name'] = 'subrow_' . $z . '_' . $i;
                }
            }
            $datalist[$i]['variation'] = json_encode($vartiation, JSON_HEX_APOS);
			$datalist[$i]['concept_id'] = json_encode($item['concept_id'], JSON_HEX_APOS);

            $dataattr = array();
            $dataattr[$i] = $item;


            if ($permiss[2]) {
                $btn .= '<button data-code="' . $item['concept_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Load(this)" type="button" class="btn btn-xs btn-success"><i class="fa fa-save"></i> ' . $permiss[2]['name'] . '</button>&nbsp;&nbsp;';
            }
            if ($permiss[3]) {
                $btn .= '<button  data-code="' . $item['concept_id'] . '" data-item=' . "'" . json_encode($dataattr[$i], JSON_HEX_APOS) . "'" . ' onclick="me.Del(this)"  type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
            }

            $datalist[$i]['btn'] = $btn;

        }


        $result['columns'] = $column;
        $result['data'] = $datalist;
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
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $a = 0;
    $ch = array();
    foreach ((array)$data['variation'] as $i => $item) {
        unset($item['concept_variation_id']);
        $data['variation'][$a] = $item;
        ++$a;

    }

    $data['user_login'] = $user;


    unset($data['code']);
//    unset($data['concept_id']);
    unset($data['sub']);

//    PrintR($data);
//    exit;


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
    unset($data['code']);
//    PrintR($data);
//    exit;

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

//    $data[$data['main']] = $data['code'];
//[$data['main']]
    $data['concept_del'] = $data['code'];
    unset($data['code']);
    unset($data[$data['main']]);
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

function ViewVariation(Request $request){
	
    global $token;
    $datalist = array();
    $columns = array();
    $column = array();

    $result['data'] = array();
    $result['columns'] = array();
    
    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
		'concept_id' => $data['concept_id'],
        'menu_action' => 'getvariation',
        'page_id' => $data['page_id'],
        'page_size' => 25,
    );

    $url = URL_API . '/geniespeech/adminmenu';
    $response = curlposttoken($url, $params, $token);

      if ($response['code'] == 200) {
        $columnslist = $response['result'];
        $datas = $response['data'];

		for ($x = 0; $x < count($datas); $x++) {
		$datas[$x]['no'] = ($x + 1);
		}


        $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';

       $column[0]['className'] = 'text-center';
        $column[0]['title'] = 'No';
        $column[0]['data'] = 'no';


        $m = 1;


        foreach ((array)$columnslist as $i => $item) {
	    $column[$m]['className'] = $item['className'];
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_data'];

            $columns[$m]['data'] = $item['column_data'];
            $columns[$m]['title'] = $item['column_name'];
            $columns[$m]['type'] = $item['column_type'];

            ++$m;
        }


  
		$recnums['pages'] = $response['page_num'];
		if($datas == null){
        $recnums['recordsFiltered'] = 0;
        $recnums['recordsTotal'] = 0;
		$result['data'] = [];
		}else{
			$recnums['recordsFiltered'] = $response['rec_num'];
        $recnums['recordsTotal'] = $response['rec_num'];
		$result['data'] = $datas;
		}
       	$result['draw'] = ($data['draw']*1);
        $result['recordsTotal'] = $recnums['recordsTotal'];
        $result['recordsFiltered'] = $recnums['recordsTotal'];
        $result['columns'] = $column;
        
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }
    $result['msg'] = $response['msg'];


    echo json_encode($result);
}

function Addvariation(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $a = 0;
    $ch = array();
    $data['user_login'] = $user;
	$data['menu_action'] = 'addvariation';
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

function Editvariation(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $a = 0;
    $ch = array();
    $data['user_login'] = $user;
	$data['menu_action'] = 'updatevariation';
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


function Delvariation(Request $request)
{

    global $token;
    $user = $_SESSION[OFFICE]['DATA']['user_name'];
    $datalist = array();
    $columns = array();
    $column = array();
    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $a = 0;
    $ch = array();
    $data['user_login'] = $user;
	$data['menu_action'] = 'deletevariation';
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
    case "EditSub" :
        EditSub($x);
        break;
    case "Del" :
        Del($x);
        break;
	case "ViewVariation" :
        ViewVariation($x);
        break;
		case "Addvariation" :
        Addvariation($x);
        break;
		case "Editvariation" :
        Editvariation($x);
        break;
		case "Delvariation" :
        Delvariation($x);
        break;
    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}