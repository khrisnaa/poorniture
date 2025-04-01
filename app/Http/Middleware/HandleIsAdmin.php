<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HandleIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next)
    {
        // Check if user is authenticated and has admin role
        if (!$request->user() || $request->user()->role !== 'admin') {
            // For Inertia responses, return a proper error response
            if ($request->header('X-Inertia')) {
                return Inertia::render('Error', [
                    'status' => 403,
                    'message' => 'Unauthorized Access'
                ])->toResponse($request)->setStatusCode(403);
            }

            // For non-Inertia requests
            abort(403, 'Unauthorized Access');
        }

        return $next($request);
    }
}
