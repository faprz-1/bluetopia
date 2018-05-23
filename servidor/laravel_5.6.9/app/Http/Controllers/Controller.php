<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    private $responseData = [];
    private $responseStatus = 0;
    private $responseMessage = "";
    private $httpStatus = 200;
    
    public function estado($status = 0)
    {
        $this->responseStatus = $status;
    }

    public function datos($name, $value)
    {
        
        $this->responseData[$name] = $value;
    }

    public function toast($message = "")
    {
        $this->responseMessage = $message;
    }

    public function httpStatus($status)
    {
        $this->httpStatus = $status;
    }

    public function genResponse()
    {
        return Response::json([
            'estado' => $this->responseStatus,
            'toast' => $this->responseMessage,
            'datos' => $this->responseData,
        ], $this->httpStatus);
    }
}
