<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('content');
            $table->string('name');
            $table->string('lang');
            $table->timestamps();
        });
        DB::table('pages')->insert(array(
            'content' => '<h1>Content is not set yet!</h1>',
            'name' => 'Welcome',
            'lang' => 'en',
            'created_at' => date('Y-m-d H:m:s'),
            'updated_at' => date('Y-m-d H:m:s')
        ));
        DB::table('pages')->insert(array(
            'content' => '<h1>Inget innehåll</h1>',
            'name' => 'Welcome',
            'lang' => 'se',
            'created_at' => date('Y-m-d H:m:s'),
            'updated_at' => date('Y-m-d H:m:s')
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
