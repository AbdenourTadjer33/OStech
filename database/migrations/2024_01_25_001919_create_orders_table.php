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
            $table->foreignId('user_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->json('client')->nullable();

            $table->string('shipping_type');
            $table->decimal('shipping_cost', 10, 2)->nullable();
            
            $table->string('payment_method')->nullable();

            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete();
            $table->string('coupon_code')->nullable();
            $table->decimal('discount', 10, 2)->nullable();

            $table->decimal('sub_total', 10, 2);
            $table->decimal('total', 10, 2);

            $table->enum('status', ['Nouvel commande', 'Payé', 'En cours de traitement', 'Fini', 'Annulé', 'Remboursement demandé', 'Commande retournée', 'Commande remboursée'])->default('Nouvel commande');

            $table->boolean('is_online')->default(true);
            $table->timestamps();
            $table->softDeletes();
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
