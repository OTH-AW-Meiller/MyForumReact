<?php
namespace backend;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once('Model.php');

$msg =  Model::overview();

if (isset($_GET['q'])){
	switch ($_GET['q']) {
		case 'overview':	 echo Model::overview();	break;
	}	
}