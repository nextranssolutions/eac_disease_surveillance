<?php

namespace Modules\Authentication\App\Models;


use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class ParUsers extends Authenticatable implements JWTSubject {
    use HasApiTokens, Notifiable;

    protected $table = 'usr_users_information';

    public $timestamps = false;

    protected $fillable = [
        'user_group_id',
        'user_title_id',
        'member_state_id',
        'country_of_origin_id',
        'identification_type_id',
        'institution_id',
        'institution_department_id',
        'account_type_id',
        'eacsecretariat_department_id',
        'user_status',
        'email_address',
        'first_name',
        'other_names',
        'phone_number',
        'password',
        'password_expiry',
        'identification_number',
        'uuid',
        'status_id',
        'account_roles_id',
        'is_verified',
        'last_login_time',
        'dola',
        'is_enabled',
        "created_by",
        "created_on",
        "updated_by",
        "updated_on",
        'experts_profile_no'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        // ...other hidden fields
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        // ...other casts
    ];

    // Implement the JWTSubject methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


}