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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code', 8);
            $table->enum('type', ['fix', 'pourcentage'])->default('pourcentage');
            $table->float('value');
            $table->datetime('start_at')->nullable();
            $table->datetime('expire_at')->nullable();
            $table->integer('max_use')->default(1);
            $table->integer('used_times')->default(0);
            $table->float('max_amount')->nullable();
            $table->boolean('status')->default(true);
            $table->enum('scope', ['simple', 'customized'])->default('simple');
            $table->json('scope_users')->nullable();
            $table->json('scope_products')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
