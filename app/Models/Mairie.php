<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mairie extends Model
{
    protected $fillable = [
        'nom',
        'description_courte',
        'adresse_complete',
        'telephone_principal',
        'email',
        'user_id',
        'region',
        'code_postal',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agents()
    {
        return $this->hasMany(User::class, 'mairie_id');
    }

    public function hopitaux()
    {
        return $this->hasMany(Hopital::class);
    }


}
