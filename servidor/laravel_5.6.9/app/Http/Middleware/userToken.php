<?php

namespace App\Http\Middleware;

use Closure;
use App\UserTokens;
use App\User;
use Illuminate\Support\Facades\Response;

class userToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $token = UserTokens::where('token',$request->token)->first();
        if($token){
            $user = User::where('id',$token->user_id)->first();
            $role = array_search("0", $roles, false);
            $request->user = $user;
            if(is_numeric($role) && $roles[$role] == "0"){
                return $next($request);
                // return Response::json(['error' => [
                //     'message' => "Permiso 0",
                //     "roles" => $roles,
                //     'role' => $role,
                //     '$roles[$role]' => $roles[$role]
                //     ]], 401); 
            }
            else{
                $type = "".$user->user_type."";
                $hasPermission = array_search($type, $roles, false);
                if(is_numeric($hasPermission) && $roles[$hasPermission] == $type){
                    return $next($request);
                    // return Response::json(['error' => [
                    //     'message' => "Permisos Apropiados",
                    //     'type' => $type,
                    //     "roles" => $roles,
                    //     'role' => $role,
                    //     'hasPermission' => $hasPermission,
                    //     '$roles[$hasPermission]' => $roles[$hasPermission]
                    //     ]], 401);
                }
                else {
                    return Response::json(['error' => [
                        'message' => "Permisos Faltantes"
                        ]], 401); 
                    // return Response::json(['error' => [
                    //     'message' => "Permisos Faltantes",
                    //     'type' => $type,
                    //     "roles" => $roles,
                    //     'role' => $role,
                    //     'hasPermission' => $hasPermission,
                    //     '$roles[$hasPermission]' => $roles[$hasPermission]
                    //     ]], 401); 
                }
            }
        }else {
            return Response::json(['error' => [
                'message' => "Token Invalido"
                ]], 401);
        }
    }
}
