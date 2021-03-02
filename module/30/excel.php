<?php
require_once "../../service/service.php";
require_once '../../vendor/autoload.php';
header('Content-Type: application/vnd.ms-excel; charset=utf-8');
header('Content-Disposition: attachment;filename="Voice Log Analytics-' . date('mdYHms') . '.xlsx"');
header('Cache-Control: max-age=0');

$datalists = array();
$datalistnew = array();
$columns = array();
$column = array();
$columnnew = array();

$customer = '';
$project = '';
$testdate = '';
$reportdate = '';
$sumtotalcall = 0;
$sumvalidcall = 0;
$sumpasscall = 0;
$sumaccuary = 0;

$start = $_POST['start_date'];
$end = $_POST['end_date'];
$qc_status=$_POST['qc_status'];
$grammar=$_POST['grammar'];
$intent=$_POST['intent'];
$confiden=$_POST['confiden'];
$input_confiden=$_POST['input_confiden'];
$text_search=$_POST['text_search'];
$flag_edit=$_POST['flag_edit'];
$eyesview=$_POST['eyesview']; 
$user = $_SESSION[OFFICE]['DATA']['user_name'];
$token = isset($_SESSION[OFFICE]['TOKEN']) ? $_SESSION[OFFICE]['TOKEN'] : '';
$columnslist = array();
$datass = array();


$params = array(
    'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
    'start_date' => $start,
    'end_date' => $end,
    'page_id' => 1,
    'page_size' => 10000,
    "grammar" => $grammar,
    "qc_status" => $qc_status,
    "intent" => $intent,
    "confiden" => $confiden,
	"eyesview"=>$eyesview,
	"input_confiden"=>$input_confiden,
    "text_search" => $text_search,
    "random_num" => 0,
    "export_qc" => 1,
    "flag_edit" => $flag_edit

);

$status[0] = '';
$status['P'] = 'Pass';
$status['F'] = 'Fail';
$status['G'] = 'Garbage';
$status['O'] = 'Other';



$url = URL_API . '/geniespeech/voicelog';
$response = curlposttoken($url, $params, $token);
if ($response['result'][0]['code'] == 200) {
    $columnslist = $response['columns_name'];
    $datass = $response['recs']['box4'];

    foreach ((array)$columnslist as $i => $item) {
        $columns[$i]['data'] = $item['column_data'];
        $columns[$i]['title'] = $item['column_name'];
        $columns[$i]['type'] = $item['column_type'];

        $columnnew[$i] = $item['column_name'];

    }

    $action = array('0' => 'None' , '1' => 'Train' , '2' => 'Test' , '3' => 'Test&Train');

		$x = 1;
    foreach ((array)$datass as $i => $item) {
	$z = 1;
		
		//$datalistnew[$i][0]=$x;
        foreach ((array)$columns as $v => $value) {
			

            if ($value['data'] == 'voice_name') {
//                    $datalist[$i][$value['data']] = '<i class="glyphicon glyphicon-volume-up"></i>';
                $datalistnew[$i][$z] = $item[$value['data']];
//                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenVOICE('.'"'.$item[$value['data']].'"'.')"><i class="glyphicon glyphicon-volume-up"></i></a>';
            } elseif ($value['data'] == 'chnn') {
                $datalistnew[$i][$z] = $item['log_file'];
//                    $datalist[$i][$value['data']] = '<a href="javascript:void(0)" onclick="me.OpenCHNN(' . "'" . $item['chnn'] . "'," . $data['page_id'] . ',' . $data['page_size'] . ",'" . $data['start_date'] . "','" . $data['end_date'] . "'" . ')"><i class="glyphicon glyphicon-volume-up"></i></a>';
            } elseif ($value['data'] == 'qc_status') {
                $datalistnew[$i][$z] = $status[$item[$value['data']]];
            } elseif ($value['data'] == 'action') {
                $datalistnew[$i][$z] = $action[$item[$value['data']]];
            } elseif ($value['data'] == 'input_qc' || $value['data'] == 'remark' || $value['data'] == 'Expected' || $value['data'] == 'new_sentence' || $value['data'] == 'expec_intent') {
                switch ($value['data']) {
                    case 'input_qc':
                        $v = 'new_sentence';
                        break;
                    case 'Expected':
                        $v = 'expec_intent';
                        break;
                    default:
                        $v = $value['data'];
                        break;
                }


                if ($item[$v]) {
                    $datalistnew[$i][$z] = $item[$v];


                } else {
                    $datalistnew[$i][$z] = '';
                }

            } else {
                $datalistnew[$i][$z] = $item[$value['data']];
            }
            ++$z;
        }
		++$x;
    }
}

$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('template.xlsx');
$sheet = $spreadsheet->setActiveSheetIndex(0);

//$sheet->setTitle("Data QC Report");
//$spreadsheet->setTitle("Data QC Report");

//$sheet->fromArray($columnnew, NULL, 'A1');
$sheet->fromArray($datalistnew, NULL, 'A2');





$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('php://output');
