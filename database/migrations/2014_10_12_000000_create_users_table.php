<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('name')->index();
            $table->string('email')->unique()->index();
            $table->string('phone')->unique()->index()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->boolean('status')->default(true);
            $table->boolean('recive_email')->default(true);
            $table->json('data')->nullable();
            $table->enum('type', ['admin', 'client'])->default('client');
            $table->foreignId('role_id')->nullable()->constrained('roles')->nullOnDelete();
            $table->string('picture')->nullable();
            $table->string('social_id')->nullable();
            $table->string('social-type')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
