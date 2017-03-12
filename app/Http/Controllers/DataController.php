<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {



        return view('Data.index',['active'=>'data']);
    }
}
