<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
     protected $fillable = [
        'title', 'body', 'is_free'
    ];

    /**
     * 课程与拥有者
     * @return [type] [description]
     */
    public function author()
    {
    	return $this->belongsTo('App\User', 'user_id');
    }
}
