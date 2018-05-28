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
	Route::resource('users', 'UsersController')->middleware('userToken:1');
	/*Route::get('users','UsersController@index');
	Route::get('users/{id}','UsersController@show');
	Route::post('users','UsersController@store');*/
	Route::post('login', 'UsersController@login');
	Route::post('logsocialuser','UsersController@logSocialUser');
	Route::post('upload','UsersController@uploadImage')->middleware('userToken:1,2');
	Route::post('getMyInfo','UsersController@getMyInfo')->middleware('userToken:1,2');
	Route::post('pass','UsersController@updatePswrd')->middleware('userToken:1,2');
	Route::post('imgchng','UsersController@updateImg')->middleware('userToken:1,2');
	Route::post('forgotpass','UsersController@recoverPass')->middleware('userToken:1,2');
	Route::get('recoveryGet/{key}','UsersController@getUserecovery')->middleware('userToken:1,2');
	Route::post('changepass','UsersController@changePswrd')->middleware('userToken:1,2');
});
