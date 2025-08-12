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
        Schema::create('mairies', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description_courte')->nullable();
            $table->string('adresse_complete');
            $table->string('telephone_principal');
            $table->string('email')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('region')->nullable();
            $table->string('code_postal')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mairies');
    }
};
