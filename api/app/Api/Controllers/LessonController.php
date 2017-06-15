<?php
namespace App\Api\Controllers;

use App\Api\Transformers\LessonDetailTransformer;
use App\Api\Transformers\LessonTransformer;
use App\Http\Controllers\Controller;
use App\Lesson;
use Dingo\Api\Routing\Helpers;
use Tymon\JWTAuth\Facades\JWTAuth;

class LessonController extends Controller
{
    use Helpers;

    public function index()
    {
        $lessons = Lesson::paginate(15);
        // collection 用于响应一个集合，同时绑定一个 Transformer 来格式化数据
        return $this->response->paginator($lessons, new LessonTransformer());
    }

    public function show($id)
    {
        $lesson = Lesson::findOrFail($id);
        if (! $lesson->free) {  // 收费课程
            $user = JWTAuth::parseToken()->authenticate();
        }
    
        return $this->response->item($lesson, new LessonDetailTransformer());
    }
}
