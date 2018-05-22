<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>'cors'],function(){
	Route::resource('users', 'UsersController');
	/*Route::get('users','UsersController@index');
	Route::get('users/{id}','UsersController@show');
	Route::post('users','UsersController@store');*/
	Route::post('login', 'UsersController@login');
	Route::post('upload','UsersController@uploadImage');
	Route::post('logsocialuser','UsersController@logSocialUser');
	Route::post('pass','UsersController@updatePswrd');
	Route::post('imgchng','UsersController@updateImg');
	Route::post('forgotpass','UsersController@recoverPass');
	Route::get('recoveryGet/{key}','UsersController@getUserecovery');
	Route::post('changepass','UsersController@changePswrd');
});
