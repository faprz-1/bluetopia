<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class userTypes extends Model
{
    protected $table = 'UserTypes';
    public $timestamps = false;
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type'
    ];
}
