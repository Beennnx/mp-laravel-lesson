<?php

namespace App\Api\Controllers;

use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{    
    use Helpers;

    public function authenticate(Request $request)
    {
        // 获取认证信息
        $credentials = $request->only('email', 'password');

        try {
            // 验证并生成 token
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // 返回 token
        return response()->json(compact('token'));
    }
}