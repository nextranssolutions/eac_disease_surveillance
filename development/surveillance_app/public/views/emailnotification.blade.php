<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h4 {
            color: #444;
        }
    </style>
</head>
<body>
    <div class="container">
        <h4>{{$subject}}</h4>
        {!! html_entity_decode($email_content) !!}
        <br/><br/>
        Regards,
        <br/>
        <strong>CONTINENTAL REGULATORY EXPERTS SOLUTION (E-CRES)</strong>
    </div>
</body>
</html>
