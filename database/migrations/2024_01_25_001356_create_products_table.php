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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable()->unique();
            $table->string('ref')->unique();
            $table->string('name')->index();
            $table->string('slug')->nullable()->unique();
            $table->text('description')->nullable();
            $table->json('details')->nullable();
            $table->json('choice')->nullable();
            $table->integer('qte')->nullable();
            $table->float('promo')->nullable();
            $table->float('price')->nullable();
            $table->boolean('status')->default(false);
            $table->boolean('catalogue')->default(false);
            $table->foreignId('category_id')->nullable()->constrained('categories', 'id');
            $table->foreignId('brand_id')->nullable()->constrained('brands', 'id')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
