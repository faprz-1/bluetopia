<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Response;
/*use App\Http\Resources\User as UserResource;*/

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users= User::all();
        $response= Response::json($users);
        return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User (array(
        'nombres' => trim($request->nombres),
        'apellidos' => trim($request->apellidos),
        'email' => trim($request->email),
        'password' => trim ($request->password),
        'telefono' => trim ($request->telefono),
        'sexo' => trim ($request->sexo)
      ));
    
    $user->save();
    
    $message = 'Usuario creado exitosamente. Eston son los datos guardados...';
    $logo = '(>.<)!';
    $response = Response::json([
      'message' => $message,
      'data' => $user,
      'logo' => $logo,
    ], 201);
    
    return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $user = User::find($id);

        if(!$user){
            return Response::json([
                'error' => [
                    'message' => "No existe la imagen!"]
                ], 404);
        }
     return Response::json($user, 200);
    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
