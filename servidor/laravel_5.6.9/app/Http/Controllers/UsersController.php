<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
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
        'password' => trim (Hash::make($request->password)),
        'telefono' => trim ($request->telefono),
        'sexo' => trim ($request->sexo),
        'api_token'=>null,
        'imgperfil'=>trim($request->img)

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

    public function uploadImage(Request $request){

        $this->validate($request, [
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',]);

        $image = $request->file('image');
        $input['imagename'] = $image->getClientOriginalName();
        $destinationPath = public_path('images');
        $image->move($destinationPath, $input['imagename']);

        $response = Response::json([
         'message' => 'Imagen guardada con éxito!'
        ], 202);

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
                    'message' => "El usuario no existe!"]
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
       $user = User::find($request->id);

        if(!$user){
            return Response::json([
                'error' => [
                    'message' => "El usuario no existe!"]
                ], 404);
        }

        $user->nombres = trim ($request->nombres);
        $user->apellidos = trim ($request->apellidos);
        $user->email = trim ($request->email);
        $user->telefono = trim ($request->telefono);
        $user->save();

        $message = 'El usuario ha modificada con éxito!';

        $response = Response::json([
            'message' => $message,
            'data' => $user,
        ], 201);

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         $user = User::findOrFail($id);
         
        if($user -> delete()) {
        $message = 'El usuario ha sido eliminado con éxito!';

        return Response::json([
            'message' => $message,
            'data' => $user,
        ], 204);  
                        
        }
            return Response::json([
                'error' => [
                    'message' => "Este usuario no existe!"]
                ], 404);

            
    }

    public function login (Request $request){
        if($request -> isJson()){
            try{

                $data = $request->json()->all();
                $user = User::where('email',$data['email'])->first();

                if($user && Hash::check($data['password'], $user->password)){
                    /*return Response::json($user, 200);*/
                    $user->api_token=str_random(20);
                    $user->save();
                    return response ()->json($user,200);

                }else{
                    return Response::json([
                        'error' => ['message' => "Los datos ingresados son incorrectos"]], 404);
                }
            }catch (ModelNotFoundException $e){
                return Response::json([
                        'error' => ['message' => "Los datos ingresados son incorrectos"]], 404);
            }
        }
        return Response::json([
                        'error' => ['message' => "Sin autorizacion"]], 404);
    }

    public function logSocialUser(Request $request){
        $data= $request->json()->all();
        $email= $data['email'];
        $correo = User::where('email',$email)->first();
        if(!$correo){

         $user = new User (array(
         'nombres' => trim($data['name']),
         'apellidos' => null,
         'email' => trim($data['email']),
         'password' => trim (Hash::make($data['id'])),
         'telefono' => trim (null),
         'sexo' => trim (null),
         'api_token'=>str_random(15)
       ));
       $user->save();
       return response ()->json($user,200);
       }
       return response ()->json($correo,200);
    }

    public function updatePswrd(Request $request){

        $data = $request->json()->all();
        $user = User::find($data['id']);        

        if(!$user){
            return Response::json([
                'error' => [
                    'message' => "El usuario no existe!"]
                ], 404); 
        }
       if($user && Hash::check($data['password'], $user->password)){
            $user->password = trim (Hash::make($data['password1']));
            $user->save();
                }else{
                    return Response::json([
                        'error' => ['message' => "Los datos ingresados son incorrectos"]], 404);
                }
        $response = Response::json([
            'message' => 'El password ha sido cambiado exitosamente!',
        ], 201);

        return $response;

    }

}
