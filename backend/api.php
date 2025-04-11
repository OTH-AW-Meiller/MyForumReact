<?php
namespace backend;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once('Model.php');

$msg =  Model::overview();

if (isset($_GET['q'])){
	switch ($_GET['q']) {
		case 'overview':	 echo Model::overview();	break;
		case 'threadname':	 echo Model::threadName($_GET['threadId']);	break;
		case 'posts':	 echo Model::posts($_GET['threadId']);	break;
		case 'newpost':	 echo Model::newPost($_GET['threadId'],$_GET['text']);	break;
		case 'verify':	 echo Model::verifyPassword($_GET['name'],$_GET['password']);	break;
	}	
}