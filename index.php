<?php
// Personalization variables
$studentName = "Your Name"; // Replace with your name
$activityTitle = "Cyber Security Module - Activity 2";
$serverAdmin = "admin@example.com"; // Replace with your admin email

// Get server details
$serverSoftware = $_SERVER['SERVER_SOFTWARE'];
$phpVersion = phpversion();
$serverName = $_SERVER['SERVER_NAME'];
$serverPort = $_SERVER['SERVER_PORT'];
$sslEnabled = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'Enabled' : 'Disabled';
$documentRoot = $_SERVER['DOCUMENT_ROOT'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($activityTitle); ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .server-info {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .server-info p {
            margin: 10px 0;
        }
        .personal {
            text-align: center;
            margin-bottom: 20px;
            font-style: italic;
            color: #555;
        }
    </style>
</head>
<body>
    <h1><?php echo htmlspecialchars($activityTitle); ?></h1>
    <p class="personal">Created by <?php echo htmlspecialchars($studentName); ?> | Contact: <?php echo htmlspecialchars($serverAdmin); ?></p>
    <div class="server-info">
        <h2>Web Server Details</h2>
        <p><strong>Server Software:</strong> <?php echo htmlspecialchars($serverSoftware); ?></p>
        <p><strong>PHP Version:</strong> <?php echo htmlspecialchars($phpVersion); ?></p>
        <p><strong>Server Name:</strong> <?php echo htmlspecialchars($serverName); ?></p>
        <p><strong>Server Port:</strong> <?php echo htmlspecialchars($serverPort); ?></p>
        <p><strong>SSL Status:</strong> <?php echo htmlspecialchars($sslEnabled); ?></p>
        <p><strong>Document Root:</strong> <?php echo htmlspecialchars($documentRoot); ?></p>
    </div>
</body>
</html>