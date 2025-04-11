<?php
namespace backend;

use function backend\lib\admins;
use function backend\lib\salt;

require_once('lib/DataBase.php');

final class Model  {
    use lib\DataBase;
    
    public static function overview() {
        return json_encode(self::select(from: 'threads'));
    }

    public static function posts(int $threadId) {
        $threadId = is_numeric($threadId) ? $threadId : 0;
        $threadId = $threadId > 0 ? $threadId : 0;
        return json_encode(self::select(from: 'posts', what: '*', where: 'thread_ID', value: $threadId));
    }

    public static function threadName(int $threadId) {
        $threadId = is_numeric($threadId) ? $threadId : 0;
        $threadId = $threadId > 0 ? $threadId : 0;
        return json_encode(self::select(from: 'threads', what: 'name', where: 'thread_ID', value: $threadId));
    }
    public static function newPost(int $threadId, string $text) {
        $threadId = is_numeric($threadId) ? $threadId : 0;
        $threadId = $threadId > 0 ? $threadId : 0;
        $text = trim($text);
        if (!empty($text)) {
            self::insert(into: 'posts', values: [$threadId, $text]);
        }
    }

    public static function addThread(string $name) {
        $name = trim($name);
        if (!empty($name)) {
            self::insert(into: 'threads', values: [$name]);
            $pre = self::prefix();
            return json_encode(self::query("select id from {$pre}threads where max(id)"));
        }
    }
    public static function removeThread(int $id) {
        if (is_numeric($id) && $id > 0) {
            self::delete(from: 'threads', where: 'id', value: $id);
            //self::delete(from: 'posts', where: 'thread_ID', value: $id);
        }
    }

    public static function verifyPassword(string $name, string $password) {
        $name = trim($name);
        $password = trim($password);
        if(!isset(admins()[$name])) {
            return json_encode(['success' => false]);
        }
        $val = admins()[$name] === hash('sha256', $password . salt());
        return json_encode(['success' => $val]);
    }
    
}