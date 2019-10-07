<?php

require_once "config.php";
$user = getCallback();
print_r($user);
// $_SESSION['user'] = $user;
// header("location: landing.php");