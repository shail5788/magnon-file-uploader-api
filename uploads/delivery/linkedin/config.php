<?php
 session_start();
 $client_id="8190czhnfap4ty";
 $client_secret="vSunJ1VSfKJzWOJb";
 $redirect_uri="http://localhost/linkedin/callback.php";
 $csrf_token=rand(111111, 999999);
 $scopes="r_basicprofile%20r_emailaddress";

 function curl($url, $parameters)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
    curl_setopt($ch, CURLOPT_POST, 1);
    $headers = [];
    $headers[] = "Content-Type: application/x-www-form-urlencoded";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($ch);
    return $result;
}

function getCallback()
{
    $client_id = "8190czhnfap4ty";
    $client_secret = "vSunJ1VSfKJzWOJb";
    $redirect_uri = "http://localhost/linkedin/callback.php";
    $csrf_token = rand(1111111, 9999999);
    $scopes = "r_basicprofile%20r_emailaddress";

    if (isset($_REQUEST['code'])) {
        $code = $_REQUEST['code'];
        $url = "https://www.linkedin.com/oauth/v2/accessToken";
        $params = [
            'client_id' => $client_id,
            'client_secret' => $client_secret,
            'redirect_uri' => $redirect_uri,
            'code' => $code,
            'grant_type' => 'authorization_code',
        ];
        $accessToken = curl($url,http_build_query($params));
		//$accessToken = json_decode($accessToken)->access_token;
        // echo $accessToken;exit();
        // $url = "https://api.linkedin.com/v1/people/~:(id,firstName,lastName,pictureUrls::(original),headline,publicProfileUrl,location,industry,positions,email-address)?format=json&oauth2_access_token=" . $accessToken;
        // $user = file_get_contents($url, false);

        return (json_decode($accessToken));



    }
}
 ?>