<?php

namespace Modules\UserManagement\App\Models;


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
        "updated_on"
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


    // Define the relationship to the ParUserGroups model
    public function userGroups()
    {
        return $this->belongsTo(ParUserGroups::class, 'user_group_id');
    }

    // Define the relationship to the ParUserTitle model
    public function userTitle()
    {
        return $this->belongsTo(ParUserTitle::class, 'user_title_id');
    }


    // Define the relationship to the ParPartnerStates model
    public function userPartnerStates()
    {
        //return $this->belongsTo(ParPartnerStates::class, 'member_state_id');
    }


    // Define the relationship to sidebar groups
public function sidebarGroups()
{
    return DB::table('wf_navigation_items')
        ->join('usr_user_groupnav', 'wf_navigation_items.id', '=', 'usr_user_groupnav.navigation_item_id')
        ->where('usr_user_groupnav.user_id', $this->id)
        ->where('usr_user_groupnav.user_group_id', $this->user_group_id)
        ->select('wf_navigation_items.*');
}

}