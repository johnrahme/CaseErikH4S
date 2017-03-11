<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class WelcomeController extends Controller
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
        $welcome = Page::where('name', '=', 'welcome')->where('lang','=','se')->first();


        return view('welcome', ['page' => $welcome, 'lang' => 'se']);
    }
    public function indexEn()
    {
        $welcome = Page::where('name', '=', 'welcome')->where('lang','=','en')->first();


        return view('welcome', ['page' => $welcome,'lang' => 'en']);
    }
    public function edit($lang)
    {
        $welcome = Page::where('name', '=', 'welcome')->where('lang','=',$lang)->first();
        return view('welcome.edit', ['page' => $welcome,'lang'=>$lang]);
    }
    public function update(Request $request, $lang)
    {
        $welcome = Page::where('name', '=', 'welcome')->where('lang','=',$lang)->first();
        $welcome->content = $request->input('content');
        $welcome->save();
        return redirect('/'.$lang);
    }
    public function imgStore(Request $request){
        $imgName = $request->file('image')->getClientOriginalName();
        //$imgExtension = Input::file('image')->getClientOriginalExtension();
        $saveName = microtime() . '_' . $imgName;
        $folder = $request->input('folder');
        $request->file('image')->move($folder, $saveName);
        $URL = url('/')."/".$folder ."/" . $saveName;
        echo $URL;
    }
}
