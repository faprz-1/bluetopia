<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;
use App\UserTokens;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

/*use App\Http\Resources\User as UserResource;*/

class UsersController extends Controller
{

    /*
        $this->estado($status);
        $this->datos($name, $value);
        $this->toast($message);
        $this->httpStatus($httpStatus);
        return $this->genResponse();
        
    */
    public function getMyInfo(Request $request)
    {
        $this->estado(1);
        $this->datos("user", $request->user);
        $this->toast('Informacion cargada');
        $this->httpStatus(200);
        return $this->genResponse();
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
        'user_type' => trim ($request->user_type),
        'imgperfil'=>trim($request->img)
        ));
    
        $user->save();
        $message = 'Usuario creado exitosamente. Eston son los datos guardados...';
        $this->estado(1);
        $this->toast($message);    
        $this->httpStatus(201);
        $logo = '(>.<)!';
        $this->datos('logo', $logo);
        $this->datos('message', $message);
        $this->datos('data', $data);
        return $this->genResponse();
        
    }

    public function uploadImage(Request $request){

        $this->validate($request, [
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',]);

        $image = $request->file('image');
        $input['imagename'] = $image->getClientOriginalName();
        $destinationPath = public_path('images');
        $image->move($destinationPath, $input['imagename']);

        $this->httpStatus(202);
        $this->toast('Imagen guardada con éxito!');
        return $this->genResponse();            
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
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
        $user->sexo = trim($request->sexo);
        $user->save();

        $message = 'El usuario ha modificada con éxito!';

        $this->datos('data', $user);
        $this->httpStatus(201);
        $this->toast($message);    
        return $this->genResponse();
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
         $info=$user;
         
        if($user -> delete()) {
        $message = 'El usuario ha sido eliminado con éxito!';

        $this->httpStatus(204);
        $this->toast($message);    
        return $this->genResponse();  
                        
        }else{
            $this->httpStatus(404);
            $this->toast('Este usuario no existe!');    
            return $this->genResponse();
       }           

            
    }

    public function login (Request $request){
        if($request -> isJson()){
            try{

                
                $data = $request->json()->all();
                $user = User::where('email',$data['email'])->first();
                
                if($user && Hash::check($data['password'], $user->password)){
                    /*return Response::json($user, 200);*/
                    $user->save();
                    $userToken = new UserTokens;
                    $userToken->token = trim((base64_encode(openssl_random_pseudo_bytes(100))));
                    $userToken->user_id = $user->id;
                    $userToken->save();
                    $this->estado(1);
                    $this->datos("user",$user);
                    $this->datos("token",$userToken);        
                    $this->toast("Login correcto");
                    $this->httpStatus(200);
                    return $this->genResponse();
                }else{
                    $this->toast("Los datos ingresados son incorrectos");
                    $this->httpStatus(404);
                    return $this->genResponse();
                }
            }catch (ModelNotFoundException $e){
                $this->toast("Los datos ingresados son incorrectos");
                $this->httpStatus(404);
                return $this->genResponse();
            }
        }
        $this->toast("Sin autorizacion");
        $this->httpStatus(404);
        return $this->genResponse();
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
                'sexo' => trim (null)
            ));
            $user->save();
            $userToken = new UserTokens;
            $userToken->token = trim((base64_encode(openssl_random_pseudo_bytes(100))));
            $userToken->user_id = $user->id;
            $userToken->save();
            $this->estado(1);
            $this->datos("user",$user);
            $this->datos("token",$userToken);        
            $this->toast("Login correcto");
            $this->httpStatus(200);
            return $this->genResponse();
        }
        $this->estado(1);
        $this->datos("correo",$correo);        
        $this->toast("nueva cuenta");
        $this->httpStatus(200);
        return $this->genResponse();
    }

    public function updatePswrd(Request $request){

        $data = $request->json()->all();
        $user = User::find($data['id']);        

        if(!$user){
            $this->toast("El usuario no existe!");
            $this->httpStatus(404);
            return $this->genResponse(); 
        }
       if($user && Hash::check($data['password'], $user->password)){
            $user->password = trim (Hash::make($data['password1']));
            $user->save();
        }else{
            $this->toast("Los datos ingresados son incorrectos");
            $this->httpStatus(404);
            return $this->genResponse();
        }
        $this->toast("El password ha sido cambiado exitosamente!");
        $this->httpStatus(201);
        return $this->genResponse();

    }

    public function updateImg(Request $request){
         $data = $request->json()->all();
         $user = User::find($data['id']); 

        if(!$user){
            $this->toast("Usuario no existente o logueado correctamente!");
            $this->httpStatus(404);
            return $this->genResponse();
        }
        $user->imgperfil = trim ($data['nombre']);
        $user->save();

        $this->toast("Usuario no existente o logueado correctamente!");
        $this->datos("content",$data);        
        $this->httpStatus(201);
        
        return $this->genResponse();
    }

    public function recoverPass(Request $request){
        $data = $request->json()->all();
        $user = User::where('email',$data['email'])->first();
        if($user){
            //Función PHP puro
            //Variables para el correo remitente, destinatario y el asunto
            $email_from = "smum15973@hotmail.com";
            $email_subject = "Prueba correo";  
            $token = str_random(20);

            $email_to = $user->email;
            $user->save();
            
            $link= "http://localhost:4200/recovery/";
            //A partir de aqui se contruye el cuerpo del mensaje tal y como llegará al correo
            $email_message = "Hola usuario!\n\n";
            function clean_string($string) {
                $bad = array("content-type","bcc:","to:","cc:","href");
                 return str_replace($bad,"",$string);
                }         
            $email_message .= "Hace unos momentos se hizo una petición para recuperar la contraseña de tu correo: \n\n"
            .clean_string($email_to)."\n\n";
            $email_message .= "Para realizar el cambio de tu contraseña por favor ingresa a este enclace: \n"
            .clean_string($link).clean_string($token)."\n\n";
            $email_message .= "Si realizaste esta petición o este correo no es tuyo por favor ignora este mensaje.\n";
            $email_message .= "\n Gracias. (>.<)!";
            //Se crean los encabezados del correo
            $headers = 'From: '.$email_from."\r\n".
            'Reply-To: '.$email_from."\r\n" .
            'X-Mailer: PHP/' . phpversion();
            @mail($email_to, $email_subject, $email_message, $headers);

            //Función usando Laravel: No permite realizar el envío sin usar el stmp del archivo .env
            /* Mail::send(['text'=>'mail'], ['name','Manuel'], function($message){
                $message -> to('wiz_Alberto@hotmail.com') -> subject ('Pueba de correo');
                $message -> from ('smum15973@hotmail.com');
            }); */

            $this->toast("Se ha enviado un mensaje a su correo para recuperar su contraseña");  
            $this->httpStatus(200);
            return $this->genResponse();
        }else{
            $this->toast("Este correo no existe en la BD!");  
            $this->httpStatus(404);
            return $this->genResponse();
        }

    }

}
