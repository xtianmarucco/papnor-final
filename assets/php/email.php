<?php

  if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["number"]) && isset($_POST["message"])) {
    // Variables
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["number"];
    $msg = $_POST["message"];

    // Varios destinatarios
    $adminTo  = 'papeleranorteventas@gmail.com';
    $userTo = $email;

    // título
    $adminSubjet = 'Nuevo correo desde la web';
    $userSubjet = 'Gracias por contactarte';

    // mensaje
    $adminMsj = '
    <body>
      <h3>'.$name.', se ha comunicado desde la web y ha dejado el siguiente mensaje: </h3>
      <br>
      <p>'.$msg.'</p>
      <br>
      <h3>Info: </h3>
      <p><b>N&uacute;mero de tel&eacute;fono: </b>'.$phone.'</p>
      <p><b>Correo electr&oacute;nico: </b>'.$email.'</p>
    </body>
    ';
    $userMsj = '
    <body>
      <h3>Hola '.$name.'!</h3>
      <br>
      <p>Pronto nos estaremos comunicando con vos. </p>
      <br>
      <h3>Tus datos de contacto son: </h3>
      <p><b>N&uacute;mero de tel&eacute;fono: </b>'.$phone.'</p>
      <p><b>Correo electr&oacute;nico: </b>'.$email.'</p>
    </body>
    ';

    // Para enviar un correo HTML, debe establecerse la cabecera Content-type
    $header  = 'MIME-Version: 1.0' . "\r\n";
    $header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    // Cabeceras adicionales
    // $cabeceras .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
    $header .= 'From: Papelera Norte <no-reply@papeleranorte.com.ar>' . "\r\n";
    // $cabeceras .= 'Cc: birthdayarchive@example.com' . "\r\n";
    // $cabeceras .= 'Bcc: birthdaycheck@example.com' . "\r\n";

    // Enviarlo
    if (mail($adminTo, $adminSubjet, $adminMsj, $header) && mail($userTo, $userSubjet, $userMsj, $header)) {
      echo "success";
    }else{
      echo "error";
    }    
  }else{
     exit();
  }
?>