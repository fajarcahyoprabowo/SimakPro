<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubKasKecilSubmissionImageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_kas_kecil_submission_image', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sub_kas_kecil_submission_id')->nullable();
            $table->text('image')->nullable();
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('sub_kas_kecil_submission_id', 'fk_sub_kas_kecil_submission_image_id')->references('id')->on('sub_kas_kecil_submissions');
            $table->foreign('created_by_id')->references('id')->on('contacts');
            $table->foreign('updated_by_id')->references('id')->on('contacts');
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_kas_kecil_submission_image');
    }
}
