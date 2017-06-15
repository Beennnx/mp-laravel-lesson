<?php
namespace App\Api\Transformers;

use App\Lesson;
use League\Fractal\TransformerAbstract;

class LessonDetailTransformer extends TransformerAbstract
{
    public function transform(Lesson $lesson)
    {
        return [
			'id'      => $lesson['id'],
			'title'   => $lesson['title'],
			'author'  => $lesson->author->name,
			'content' => $lesson['body']
        ];
    }
}