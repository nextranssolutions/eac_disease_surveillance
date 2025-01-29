<?php
return [
    'adminusr' => env('DMS_ADMINUSR', 'default_admin'),
    'adminpassword' => env('DMS_ADMINPASSWORD', 'default_password'),
    'url' => env('DMS_URL', 'http://default-url.com'),
    'root_upload' => env('DOC_ROOTUPLOAD', '/default/upload/path'),
    'approotsite' => env('DMS_APPROOTSITE', 1),
];
?>