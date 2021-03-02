<?php

require_once "../../service/service.php";
require_once '../../vendor/autoload.php';
$start = $_POST['start_date'];
$end = $_POST['end_date'];
$user = $_SESSION[OFFICE]['DATA']['user_name'];
$qc_status=$_POST['qc_status'];
$grammar=$_POST['grammar'];
$intent=$_POST['intent'];
$confiden=$_POST['confiden'];
$text_search=$_POST['text_search'];
$flag_edit=$_POST['flag_edit'];
header('Cache-Control: max-age=0');
ini_set('memory_limit', '-1');
$columnslist = array();
$datass = array();
ini_set('max_execution_time', 0); 
$token = isset($_SESSION[OFFICE]['TOKEN']) ? $_SESSION[OFFICE]['TOKEN'] : '';
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
    "text_search" => $text_search,
    "random_num" => 0,
    "export_qc" => 1,
    "flag_edit" => $flag_edit

);

$dataarray = array();
$url = URL_API . '/geniespeech/voicelog';
$response = curlposttoken($url, $params, $token);
	PrintR($response);
exit;
if ($response['result'][0]['code'] == 200) {
    $columnslist = $response['columns_name'];
    $datass = $response['recs']['box4'];
    foreach((array)$datass as $i => $item) {
		$dataarray[$i] = $item['voice_name'];

    }
}

$zipname = 'Voice Log Analytics Report-' . date('mdYHms') . '.zip';
/*
$zip = new ZipArchive;
$zip->open($dataarray, ZipArchive::CREATE);
foreach ($dataarray as $file) {
	$download_file = file_get_contents($file);

    #add it to the zip
    $zip->addFromString(basename($file), $download_file);
}
	//print_r($zipname);
	//exit;
$zip->close();
header('Content-Type: application/zip');
header('Content-disposition: attachment; filename='.$zipname);
 
readfile($dataarray);
unlink($dataarray);*/

# create new zip object
$zip = new ZipArchive();

# create a temp file & open it
$tmp_file = tempnam('.', '');
$zip->open($tmp_file, ZipArchive::CREATE);

# loop through each file
foreach ($dataarray as $file) {
    # download file
    $download_file = file_get_contents($file);

    #add it to the zip
    $zip->addFromString(basename($file), $download_file);
}

# close zip
$zip->close();

# send the file to the browser as a download
header('Content-disposition: attachment; filename='.$zipname);
header('Content-type: application/zip');
#header('Content-type: application/octet-stream');
readfile($tmp_file);
unlink($tmp_file);
?>