<?php
namespace App\Api\Controllers;
use App\Http\Controllers\Controller;
use App\Notice;
use Dingo\Api\Routing\Helpers;

class NoticeController extends Controller
{    
    use Helpers;

    public function index()
    {    
        $notices = \App\Notice::orderBy('id','desc')->take(3)->pluck('title');
        return $notices;
    }
}