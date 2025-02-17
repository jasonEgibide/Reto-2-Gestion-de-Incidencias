<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TecnicoMiddleware {
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            if (Auth::user()->id_rol == 2) {
                return $next($request);
            } else {
                return response()->json(['message' => 'Forbidden: You do not have the required tecnic role.'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized: You are not authenticated.'], 401);
        }
    }
}
