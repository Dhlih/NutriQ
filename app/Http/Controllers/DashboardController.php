<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $kebutuhan = KebutuhanHarian::where('user_id', auth()->user()->id)->first();

        dd($kebutuhan);

        return Inertia::render('Dashboard',[
            'user' => auth()->user(),
        ]);
    }
}
