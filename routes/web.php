<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'WelcomeController@index');
Route::get('/se', 'WelcomeController@index');
Route::get('/en', 'WelcomeController@indexEn');
Route::get('/{lang}/edit', 'WelcomeController@edit')->middleware('auth');
Route::post('/{lang}/update', 'WelcomeController@update')->middleware('auth');
Route::post('/imgStore', 'WelcomeController@imgStore')->middleware('auth');

Auth::routes();

Route::get('/home', 'HomeController@index');

