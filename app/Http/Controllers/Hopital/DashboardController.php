<?php

namespace App\Http\Controllers\Hopital;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Vérifier que l'utilisateur est un agent d'hôpital
        if (!$user->isHopital() || !$user->hopital_id) {
            abort(403, 'Accès non autorisé. Vous devez être un agent d\'hôpital.');
        }



        // Statistiques des déclarations pour l'hôpital de l'utilisateur connecté
        $declarationsCount = Declaration::where('hopital_id', $user->hopital_id)->count();

        // Nouvelles déclarations (créées dans les 7 derniers jours)
        $newDeclarationsCount = Declaration::where('hopital_id', $user->hopital_id)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();

        // Récentes déclarations pour l'hôpital de l'utilisateur
        $recentDeclarations = Declaration::where('hopital_id', $user->hopital_id)
            ->with(['agentHopital'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($declaration) {
                return [
                    'id' => $declaration->id,
                    'nom_enfant' => $declaration->nom_enfant,
                    'code_nuin' => $declaration->code_nuin,
                    'prenom_enfant' => $declaration->prenom_enfant,
                    'date_naissance' => Carbon::parse($declaration->date_naissance)->translatedFormat('d F Y'),
                    'agent' => $declaration->agentHopital->name ?? 'N/A',
                    'statut' => $declaration->statut,
                    'created_at' => Carbon::parse($declaration->created_at)->translatedFormat('d F Y H:i'),
                ];
            });

        // Charger les informations de l'hôpital affilié
        $user->load('hopital');

        return Inertia::render('Hopital/Dashboard', [

            'declarationsCount' => $declarationsCount,
            'newDeclarationsCount' => $newDeclarationsCount,
            'recentDeclarations' => $recentDeclarations,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'hopital' => $user->hopital ? [
                    'id' => $user->hopital->id,
                    'nom' => $user->hopital->nom,
                    'type_etablissement' => $user->hopital->type_etablissement ?? 'Hôpital',
                    'adresse_complete' => $user->hopital->adresse_complete ?? '',
                ] : null,
            ],
        ]);
    }
}
