<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectOperationalPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_operational_payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 500);
            $table->date('date')->nullable();
            $table->uuid('project_operational_id')->nullable();
            $table->uuid('bank_id')->nullable();
            $table->decimal('total', 19, 2)->default(0);
            $table->uuid('created_by_id')->nullable();
            $table->uuid('updated_by_id')->nullable();
            $table->timestamps();

            $table->foreign('project_operational_id')->references('id')->on('project_operationals');
            $table->foreign('bank_id')->references('id')->on('banks');
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
        Schema::dropIfExists('project_operational_payments');
    }
}
