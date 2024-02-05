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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('ref', 22)->unique();
            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->foreignId('shipping_company_id')->nullable()->constrained('shipping_companies', 'id')->nullOnDelete();
            $table->string('address')->nullable();
            $table->json('client')->nullable();
            $table->string('coupon_code')->nullable();
            $table->float('discount')->nullable();
            $table->string('shipping_company_name')->nullable();
            $table->float('shipping_cost')->default('0.00');
            $table->float('total');
            $table->enum('status', ['New order', 'Paid', 'Under process','Finished', 'Canceled', 'Refund requested', 'Returned order', 'Refunded order'])->default('New order');
            $table->boolean('is_online')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
