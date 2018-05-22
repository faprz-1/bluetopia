<?php

namespace App\Http\Middleware;

use Closure;

class cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)        
          ->header('Access-Control-Allow-Origin', '*')
          ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}

//esto iría en el .htacces del proyecto
/* <ifModule mod_headers.c>
    Header set Access-Control-Allow-Origin: *
    Header ser Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
    </ifModule>*/