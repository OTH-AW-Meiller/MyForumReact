<?php
namespace backend\lib;

require_once('conf.php');
/** 
 *  Capabilities for 
 *	database communication
 */
trait DataBase{
	private static $connection = null;
	
	private static function prefix() {
		return conf()['prefix'];
	}

	private static function connect(){
		$conf = conf();
		$conn = $conf['driver'].':host='.$conf['dbhost'].';dbname='.$conf['database'];
		self::$connection = self::$connection ?: new \PDO($conn, $conf['user'], $conf['pass']);
	}
	
	protected static function query(string $sql, ?array $vars = null){
		$arr = null;
		try {
			self::connect();
			$stmt = self::$connection->prepare($sql);
			$stmt->execute($vars);
			$arr = $stmt->fetchAll();
		} catch (\PDOException $e) {
			error_log( 'Database Error: ' . $e->getMessage());
		}
		return $arr;
	}
	public static function select(string $from, ?string $what = null, ?string $where = null, $value = null) {
		$pre = self::prefix();
		$arr = null;
		$wht = $what != null ? $what : '*';
		if ($where != null && $value != null) {
			$val = is_numeric($value) || is_bool($value) ? $value : "'$value'";
			$arr = self::query("select $wht from $pre$from where $where=:value", array(':value'=>$val));
		} else {
			$arr = self::query("select $wht from $pre$from");
		}
		return $arr;
	}
	
	protected static function insert(string $into, array $values) {
		if (count($values) == 0) return;
		$pre = self::prefix();
		$str = '';
		for($i = 0; $i < count($values) ; $i++) {
			$str .= ', ?';
		}
		$qstr = "insert into $pre$into values (NULL $str )";
		self::query($qstr, $values);
	}
	
	protected function delete(string $from, string $where, $value) {
		$pre = self::prefix();
		$val = is_numeric($value) || is_bool($value) ? $value : "'$value'";
		$arr = self::query("delete from $pre$from where $where=:value", array(':value'=>$val));
	}
}
?>