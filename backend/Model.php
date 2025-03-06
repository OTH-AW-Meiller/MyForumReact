<?php
namespace backend;
require_once('lib/DataBase.php');

final class Model  {
	use lib\DataBase;
    
    public static function overview() {
        return json_encode(self::select(from: 'threads'));
    }
}