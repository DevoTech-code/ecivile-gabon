<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mairie;
use App\Models\Hopital;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'mairiesCount' => Mairie::count(),
            'hopitauxCount' => Hopital::count(),
            'usersCount' => User::count(),
            'recentEntities' => collect()
                ->merge(Mairie::latest()->take(3)->get()->map(fn ($mairie) => [
                    'type' => 'Mairie',
                    'nom' => $mairie->nom,
                    'localisation' => $mairie->localisation,
                    'created_at' => $mairie->created_at->translatedFormat('d M Y'),
                ]))
                ->merge(Hopital::latest()->take(3)->get()->map(fn ($hopital) => [
                    'type' => 'Hôpital',
                    'nom' => $hopital->nom,
                    'localisation' => $hopital->localisation,
                    'created_at' => $hopital->created_at->translatedFormat('d M Y'),
                ])),
        ]);
    }
}
