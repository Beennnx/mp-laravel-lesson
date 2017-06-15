<?php
namespace App\Api\Transformers;

use App\Lesson;
use League\Fractal\TransformerAbstract;

class LessonTransformer extends TransformerAbstract
{
    public function transform(Lesson $lesson)
    {
        return [
			'id'      => $lesson['id'],
			'title'   => $lesson['title'],
			'author'  => $lesson->author->name,
			'content' => str_limit($lesson['body'], $limit = 50, $end = '...'),
			'is_free' => (bool) $lesson['free']
        ];
    }
}