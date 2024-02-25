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
        Schema::create('order_product', function (Blueprint $table) {
            $table->foreignId('product_id')->nullable()->constrained('products', 'id')->nullOnDelete();
            $table->foreignId('order_id')->constrained('orders', 'id')->cascadeOnDelete();
            $table->integer('qte');
            $table->json('prices')->nullable();
            $table->json('product')->nullable();
            $table->decimal('total', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_datails');
    }
};
