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
            $table->string('name')->index();
            $table->string('slug')->unique()->index();
            $table->text('description')->nullable();
            $table->string('sku')->nullable()->unique();
            $table->integer('qte')->nullable();
            $table->float('price')->nullable();
            $table->float('promo')->nullable();
            $table->boolean('status')->default(false);
            $table->boolean('catalogue')->default(false);
            $table->json('features')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories', 'id');
            $table->foreignId('brand_id')->nullable()->constrained('brands', 'id')->nullOnDelete();
            $table->json('images')->nullable();
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
