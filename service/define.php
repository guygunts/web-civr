<?php
/*================================================*\
*  Author : OCS
*  Created Date : 29/07/14 13:27
*  Module : Office
*  Description : Office
*  Involve People : Boy
*  Last Updated : 29/07/14 13:27
\*================================================*/

define("CREATION","Creation Group");					

define("OFFICE", "OFFICE_DEV77");

define("TITLE", "");
define("DESCRIPTION", "");
define("KEYWORDS", "");
define("ROBOTS", "noindex, nofollow");
define("COPYRIGHT", "Online creation soft");
define("AUTHOR", "Creation");

/* :: Log Admin :: */
define('LOGADD', '1');
define('LOGEDIT', '2');
define('LOGDEL', '3');
define('LOGLOAD', '4');
define('LOGLOGIN', '5');
define('LOGLOGOUT', '6');

define('ADD', '1');
define('EDIT', '2');
define('DEL', '3');
define('PRINT', '4');

/* :: http://creation.ctdserver.com :: */
//$c_site = "SITE.txt";
//$c_site_open = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/config/'.$c_site);
//if ($c_site_open) {
//    $c_site_file = $c_site_open;
//}else{
//    $c_site_file = 'TESTER';
//}
//
//$c_url = "URL.txt";
//$c_url_open = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/config/'.$c_url);
//if ($c_url_open) {
//    $c_file = $c_url_open;
//}else{
//    $c_file = 'https://gsb.devtool77.com';
//}
//
//$c_api = "URL_API.txt";
//$c_urlapi_open = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/config/'.$c_api);
//if ($c_urlapi_open) {
//    $c_api_file = $c_urlapi_open;
//}else{
//    $c_api_file = 'https://wso2ei.snapz.mobi';
//}
//
//$c_color = "COLOR.txt";
//$c_color_open = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/config/'.$c_color);
//if ($c_color_open) {
//    $c_color_file = $c_color_open;
//}else{
//    $c_color_file = '#ec068d';
//}



define("COLOR", '#01b6ef');
define("SITE", 'AIS');
define("URL", 'https://192.168.38.205:9082');
define("BASEURL", 'https://192.168.38.205:9082');
define("URL_API", 'http://192.168.38.201:1234');
define("PATH", '');
define("URL_VOICE",'http://192.168.38.205:9082/node_works/');
define("URL_DOWNLOAD_FOR_JAVASCRIPT",'https://192.168.38.205:9082/');
//define("URL", "http://localhost");
//define("BASEURL", "http://localhost");
//define("URL_API", "http://localhost/api");
define('FILEPATH', $_SERVER['DOCUMENT_ROOT']);
define("DEBUG", false);
define("FRIENDLY_URL", true);
define("FRIENDLY_ADMIN", true);
define("FRIENDLY_API", true);
define("TYPEURL", "php");
define("SENDMAIL", true);
?>
