
<?php
require_once "service/service.php";
require_once "service/vendor.php";


function Login(Request $request)
{



    parse_str($request->getPost()->toString(), $data);


    $data['lang'] = 'th';
    unset($_SESSION[OFFICE]);

    $_SESSION[OFFICE]['LOGIN'] = 'OFF';
    $_SESSION[OFFICE]['TOKEN'] = '';
    $_SESSION[OFFICE]['DATA'] = array();
    $_SESSION[OFFICE]['ROLE'] = array();
    $_SESSION[OFFICE]['LANG'] = 'th';
    $_SESSION[OFFICE]['PROJECT_ID'] = NULL;
    $params = array(
        'user_name' => $data['username'],
        'password' => $data['user_passwd'],
        'lang' => $data['lang'],
        'authen_type' => 1
    );


    $url = URL_API . '/geniespeech/login';
    $response = curlpost($url, $params);
	

    if ($response['code'] == 200) {

        $_SESSION[OFFICE]['LOGIN'] = 'ON';
        $_SESSION[OFFICE]['TOKEN'] = $response['token'];
        $_SESSION[OFFICE]['DATA'] = $response['result']['profile'];
        $_SESSION[OFFICE]['DATA']['user_name'] = $data['username'];
        $_SESSION[OFFICE]['DATA']['password'] = $data['password'];
        $_SESSION[OFFICE]['ROLE'] = $response['result']['roles'];
        $_SESSION[OFFICE]['LANG'] = $data['lang'];

        if ($response['result']['roles'][0]['menus'][0]['sub_menu'][0]['sub_menu_path']) {
            $result['menu'] = $response['result']['roles'][0]['menus'][0]['sub_menu'][0]['sub_menu_path'];
        } else {
            $result['menu'] = $response['result']['roles'][0]['menus'][0]['menu_path'];
        }

        $result['success'] = 'COMPLETE';


    } else {
        $result['success'] = 'FAIL';
    }

    $result['msg'] = $response['msg'];
	 $params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Log In"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);

    echo json_encode($result);

}

function LoadData(Request $request)
{

    global $token;

    $datalist = array();
    $columns = array();
    $column = array();

    $result['data'] = array();
    $result['columns'] = array();


    parse_str($request->getPost()->toString(), $data);

    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'menu_action' => $data['menu_action'],
        'page_id' => $data['page_id'],
        'page_size' => $data['page_size'],

    );

    $url = URL_API . '/geniespeech/adminmenu';


    $response = curlposttoken($url, $params, $token);


    if ($response['code'] == 200) {

        $columnslist = $response['result']['header'];

        $datas = $response['result']['data'];

        $column[0]['className'] = 'text-center';
        $column[0]['title'] = '#';
        $column[0]['data'] = 'no';


        $m = 1;

        foreach ((array)$columnslist as $i => $item) {

            $column[$m]['className'] = 'text-' . $item['column_align'];
            $column[$m]['title'] = $item['column_name'];
            $column[$m]['data'] = $item['column_field'];


            $columns[$m]['data'] = $item['column_field'];
            $columns[$m]['type'] = $item['column_type'];

            ++$m;

        }

        $column[$m]['className'] = 'text-center';

        $column[$m]['title'] = '';
        $column[$m]['data'] = 'btn';


        $permiss = LoadPermission();


        foreach ((array)$datas as $i => $item) {

            $btn = '';


            $item['user_role'] = $item['role']['role_name'];


            $datalist[$i]['no'] = ($i + 1);
            $dataattr = array();

            foreach ((array)$columns as $v => $value) {

                $datalist[$i][$value['data']] = $item[$value['data']];
                $dataattr[$i][$value['data']] = $item[$value['data']];

            }


            if ($permiss[2]) {
                $btn .= '<button data-item="' . json_encode($dataattr[$i]) . '" onclick="me.Load(this)" type="button" class="btn btn-xs btn-success"><i class="fa fa-save"></i> ' . $permiss[2]['name'] . '</button>&nbsp;&nbsp;';
            }

            if ($permiss[3]) {
                $btn .= '<button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i> ' . $permiss[3]['name'] . '</button>';
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

function LoadCbo(Request $request)

{

    global $token;

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);


    $params = array(
        'project_id' => $_SESSION[OFFICE]['PROJECT_ID'],
        'menu_action' => $data['menu_action'],
        'page_id' => 1,
        'page_size' => 100

    );

    $url = URL_API . '/geniespeech/adminmenu';

    $response = curlposttoken($url, $params, $token);


    if ($response['result'][0]['code'] == 200) {

        /** @noinspection PhpUnusedLocalVariableInspection */
        $datas = $response['recs'];

        $datalist = [];
        foreach ((array)$datas as $i => $item) {

            $datalist[$i]['code'] = $item[$data['code']];
            $datalist[$i]['name'] = $item[$data['name']];

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

function LoadCboMain(Request $request)

{

    global $token;

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);


    $params = array(

        'menu_action' => $data['menu_action'],
        'page_id' => 1,
        'page_size' => 100

    );

    $url = URL_API . '/geniespeech/adminmenu';

    $response = curlposttoken($url, $params, $token);

   // PrintR($response);


     if ($response['result'][0]['code'] == 200) {

        $datas = $response['recs'];
        $datalist = [];

        foreach ((array)$datas as $i => $item) {
            if ($i == 0) {
                if (empty($_SESSION[OFFICE]['PROJECT_ID'])) {
                    $_SESSION[OFFICE]['PROJECT_ID'] = $item[$data['code']];
                }

            }
            $datalist[$i]['code'] = $item[$data['code']];
            $datalist[$i]['name'] = $item[$data['name']];

        }


        $result['project_id'] = $_SESSION[OFFICE]['PROJECT_ID'];
        $result['item'] = $datalist;
        $result['success'] = 'COMPLETE';

    } else {
        $result['success'] = 'FAIL';
    }

    $result['msg'] = $response['msg'];
    echo json_encode($result);

}

function ChangeTop(Request $request)

{

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);


    $_SESSION[OFFICE]['PROJECT_ID'] = $data['code'];
    $result['code'] = $data['code'];
    echo json_encode($result);

}

function SaveSite(Request $request)

{

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);

    $strFileName = "config/SITE.txt";
    $objFopen = fopen($strFileName, 'w');

    fwrite($objFopen, $data['name']);
    if ($objFopen) {
        $result['success'] = 'COMPLETE';
        $result['msg'] = 'COMPLETE';
    }

    fclose($objFopen);

    echo json_encode($result);

}

function SaveUrl(Request $request)

{

    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);

    $strFileName = "config/URL.txt";
    $objFopen = fopen($strFileName, 'w');

    fwrite($objFopen, $data['name']);
    if ($objFopen) {
        $result['success'] = 'COMPLETE';
        $result['msg'] = 'COMPLETE';
    }

    fclose($objFopen);

    echo json_encode($result);

}

function SaveUrlApi(Request $request)

{


    $result['data'] = array();

    parse_str($request->getPost()->toString(), $data);

    $strFileName = "config/URL_API.txt";
    $objFopen = fopen($strFileName, 'w');

    fwrite($objFopen, $data['name']);
    if ($objFopen) {
        $result['success'] = 'COMPLETE';
        $result['msg'] = 'COMPLETE';
    }

    fclose($objFopen);

    echo json_encode($result);

}

function SaveLogo(Request $request)

{

    $result['data'] = array();


    $target = 'logo.png';

    $file_tmp = $request->files->get('name')['tmp_name'];

    if (move_uploaded_file($file_tmp, "images/" . $target)) {
        $result['success'] = 'COMPLETE';
        $result['msg'] = 'COMPLETE';
    }

    echo json_encode($result);

}


switch ($switchmode) {

    case strtoupper(md5('api_login')) :
        Login($x);
        break;

    case strtoupper(md5('api_loaddata')) :
        LoadData($x);
        break;

    case strtoupper(md5('api_loadcbo')) :
        LoadCbo($x);
        break;

    case strtoupper(md5('api_loadcbomain')) :
        LoadCboMain($x);
        break;

    case strtoupper(md5('api_changetop')) :
        ChangeTop($x);
        break;

    case strtoupper(md5('api_savesite')) :
        SaveSite($x);
        break;

    case strtoupper(md5('api_saveurl')) :
        SaveUrl($x);
        break;

    case strtoupper(md5('api_saveurlapi')) :
        SaveUrlApi($x);
        break;

    case strtoupper(md5('api_savelogo')) :
        SaveLogo($x);
        break;

    case strtoupper(md5('api_savecolor')) :
        SaveColor($x);
        break;

    default :
        $result['success'] = 'FAIL';
        $result['msg'] = 'ไม่มีข้อมูล';
        echo json_encode($result);
        break;
}