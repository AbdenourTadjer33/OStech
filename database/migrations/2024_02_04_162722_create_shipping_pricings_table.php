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
        Schema::create('shipping_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shipping_company_id')->constrained();
            $table->foreignId('wilaya_id')->constrained('wilayas');
            $table->float('delay')->nullable();
            $table->float('cost_home')->nullable();
            $table->float('cost_stop_desk')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_pricings');
    }
};
