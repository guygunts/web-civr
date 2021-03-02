<?php
include_once 'service/service.php';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title><?php echo SITE?></title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="plugins/iCheck/square/blue.css">
    <link rel="stylesheet" href="plugins/alertifyjs/css/themes/bootstrap.min.css">
    <link rel="stylesheet" href="plugins/alertifyjs/css/alertify.min.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"> -->
    <link rel="stylesheet" href="">
</head>
<body class="hold-transition login-page" onbeforeunload="<?session_unset();
session_destroy();?>">
<div class="login-box">
    <div class="login-logo">
        <a href="index.php"><b><img src="images/logo.png?v=<?php echo microtime()?>" style="width: 45%;"></b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
       

        <form onsubmit="return false;" id="frmlogin" method="post" autocomplete="off">
            <div class="form-group has-feedback">
                <input type="text" class="form-control"  name="username" pattern="^[a-zA-Z0-9]{0,20}$">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control"  name="user_passwd" >
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
<!--            <div class="form-group has-feedback">  pattern="^[a-zA-Z0-9]{0,20}$"   -->
<!--                <select class="form-control" placeholder="Password" name="lang">-->
<!--                    <option value="th" selected>Thai</option>-->
<!--                    <option value="en">Eng</option>-->
<!--                </select>-->
<!---->
<!--            </div>-->
            <div class="row">
                <div class="col-xs-4">
<!--                    <a href="setting.php" class="btn btn-danger btn-block btn-flat">Setting</a>-->
                </div>
                <div class="col-xs-4">

                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>

<!--                <div class="col-xs-12 text-center" style="margin-top: 10px">-->
<!--                    <small>© 2020 Sun Systems Corporation Limited. All rights reserved.</small>-->
<!--                </div>-->
                <!-- /.col --->
            </div>
        </form>

    </div>
    <div class="login-footer text-center">
        <p>© 2020 Sun Systems Corporation Limited. All rights reserved.</p>
    </div>

    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<script src="plugins/lib/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="plugins/alertifyjs/alertify.min.js"></script>
<script src="plugins/iCheck/icheck.min.js"></script>
<script>
    $(function () {
        alertify.defaults.glossary.title = '<?php echo SITE; ?>';
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' /* optional */
        });

        $('#frmlogin').submit(function( event ) {
            event.preventDefault();
            var form = $(this);

            $.ajax({
                url:'api.inc.php?mode=F07F1CBA4819C3888747D4F2CB81E38A',
                type:'POST',
                dataType:'json',
                cache:false,
                data:form.serialize(),
                success:function(data){
                    switch(data.success){
                        case 'COMPLETE' :

          
                                window.location.replace('<?php echo URL;?>/page-'+data.menu);
                    

                            break;
                        default :
                            alertify.alert(data.msg);
                            break;
                    }
                }
            });

        });
    });
</script>
</body>
</html>
