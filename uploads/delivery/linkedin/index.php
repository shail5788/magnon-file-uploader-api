
<?php include("config.php"); ?>
<a href="<?php 
      echo "https://linkedin.com/oauth/v2/authorization?response_type=code&client_id={$client_id}&redirect_uri={$redirect_uri}&state={$csrf_token}&scope={$scopes}" ?>">Authorize App</a>