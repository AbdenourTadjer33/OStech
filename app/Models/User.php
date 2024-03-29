<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\PasswordGenerator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Ramsey\Uuid\Uuid;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasUuids, PasswordGenerator;

    protected $table = 'users';

    const USERTYPE = ['admin', 'client'];
    const ADMINTYPE = User::USERTYPE[0];
    const CLIENTTYPE = User::USERTYPE[1];


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uuid',
        'name',
        'email',
        'phone',
        'password',
        'status',
        'recive_email',
        'data',
        'type',
        'role_id',
        'social_id',
        'social_type',
    ];

    /**
     * Generate a new UUID for the model.
     */
    public function newUniqueId(): string
    {
        return (string) Uuid::uuid4();
    }

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array<int, string>
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => 'boolean',
        'recive_email' => 'boolean',
        'data' => 'array',
        'created_at' => 'datetime:d-m-Y H:i',
        'updated_at' => 'datetime:d-m-Y H:i',
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucwords($value)
        );
    }

    public function isAdmin(): bool
    {
        return $this->type = User::ADMINTYPE;
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function scopeAdmin(Builder $query)
    {
        $query->where('type', 'admin');
    }

    public function scopeActive(Builder $query)
    {
        $query->where('status', true);
    }

    public function scopeSample(Builder $query)
    {
        $query->select('id', 'uuid', 'name', 'email', 'phone', 'status', 'role_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
