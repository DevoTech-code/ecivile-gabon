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
        Schema::create('hopitals', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description_courte')->nullable();
            $table->enum('type_etablissement', [
                'hopital_general',
                'clinique',
                'centre_medical',
                'hopital_specialise'
            ]);
            $table->string('adresse_complete');
            $table->string('telephone_principal');
            $table->string('email')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('mairie_id')->constrained('mairies')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hopitals');
    }
};
