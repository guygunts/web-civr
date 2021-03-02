<?php


if($_SESSION[OFFICE]["LOGIN"] != "ON"){
    echo PleaseLogin(URL.'/app.logout.php');
    exit;
}

//$_SESSION[OFFICE]['LANG'] = 'th';
if(empty($_SESSION[OFFICE]['LANG'])){
    $lang='th';
    $_SESSION[OFFICE]['LANG']='th';
}else{
    $lang=$_SESSION[OFFICE]['LANG'];
}


// if (isset($_GET["email"])) { 
    // if (!filter_input(INPUT_GET, "email",  
            // FILTER_VALIDATE_EMAIL) === false) { 
        // echo("Valid Email"); 
    // } else { 
        // echo("Invalid Email"); 
    // } 
// } 
  
 // $mod= filter_input(INPUT_GET, 'mode');
 $templates = array('accreport' => 1, 'buildgrammar' => 2, 'callflow' => 3,'conceptman' => 4, 'config' => 5, 'configmap' => 6,'conversation' => 7, 'dashbaord' => 8, 'evtreport' => 9,'GrammarManagement' => 10, 'IntentManagement' => 11, 'listpackget' => 12,'menuman'=>13,'ontoppostpaid'=>14,'ontopprepaid'=>15,'perfreport'=>16,'projectman'=>17,'roleman'=>18,'ServiceManagement'=>19,'srvreport'=>20,'testsentence'=>21,'testtool'=>22,'toptenreport'=>23,'translog'=>24,'uploadgrammarfile'=>25,'uploadvoice'=>26,'upsell'=>27,'usagereport'=>28,'userman'=>29,'VoiceLogAnalytic'=>30,'VoiceLogAnalyticReport'=>31);
 if (isset($_GET["mode"])) { 
	$mod=$templates[filter_input(INPUT_GET, 'mode',FILTER_SANITIZE_SPECIAL_CHARS)];
//$mod=filter_input(INPUT_GET, 'mode',FILTER_SANITIZE_SPECIAL_CHARS);

//$mod = filter_var($mod, FILTER_SANITIZE_STRING);
	if ($mod === false) {
		exit;
	}
	
}
//$mod = filter_var($mod, FILTER_SANITIZE_STRING);



$member = $_SESSION[OFFICE]['DATA'];

$params = array(
    'user_name' => $member['user_name'],
    'password' => $member['password'],
    'lang' => $lang,
    'authen_type' => 1
);

//PrintR($params);
//exit;

$url = URL_API.'/geniespeech/login';
$response = curlpost($url, $params);
//PrintR($response);
//exit;
if ($response['code'] == 200) {

    $_SESSION[OFFICE]['TOKEN'] = $response['token'];
    $_SESSION[OFFICE]['DATA'] = $response['result']['profile'];
    $_SESSION[OFFICE]['ROLE'] = $response['result']['roles'];
    $_SESSION[OFFICE]['DATA']['user_name'] = $member['user_name'];
    $_SESSION[OFFICE]['DATA']['password'] = $member['password'];
    $_SESSION[OFFICE]['LANG'] = $lang;

}



//PrintR($_SESSION);

//$url = 'https://wso2ei.snapz.mobi/geniespeech/adminmenu';
//$response = curlposttoken($url, $params, $token);
//
//if ($response['code'] == 200) {
//    $_SESSION[OFFICE]['ROLE'][0]['menus'] = $response['result']['data'];
//}
//PrintR($_SESSION[OFFICE]['ROLE'][0]['menus']);
$menu =  $_SESSION[OFFICE]['ROLE'][0]['menus'];
$permission = $_SESSION[OFFICE]['ROLE'][0]['function'];
foreach((array)$permission as $i => $item){
    $permiss[$item['function_id']]['id'] = $item['function_id'];
    $permiss[$item['function_id']]['name'] = $item['function_name'];
}

// if(is_file("module/$mod/$mod.setup.php")){
    // include_once "module/$mod/$mod.setup.php";
// }