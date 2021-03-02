<?php

require_once "service/service.php";
 $params1 = array(
      'username' => $_SESSION[OFFICE]['DATA']['user_name'],
      'browser' => $_SERVER['HTTP_USER_AGENT'],
      'ip_address' => $_SERVER['REMOTE_ADDR'],
      'activity' => "Log Out"
      );
	  $url1 = URL_API.'/geniespeech/loginsert';
$response1 = curlpost($url1, $params1);
unset($_SESSION[OFFICE]);
$_SESSION[OFFICE]['LOGIN'] = 'OFF';
$_SESSION[OFFICE]['DATA'] = array();
$_SESSION[OFFICE]['ROLE'] = array();
session_unset();
session_destroy();
?>
<html>
<head>
  <title>Logout!!</title>
</head>
<body>
  <script language="JavaScript">
    window.location.href= '<?php echo URL?>';
  </script>
</body>
</html>