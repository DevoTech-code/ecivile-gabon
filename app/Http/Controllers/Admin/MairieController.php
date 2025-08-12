<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mairie;
use Illuminate\Http\RedirectResponse;

class MairieController extends Controller
{
    /**
     * Affiche la liste des mairies
     */
    public function index()
    {
        $mairies = Mairie::with('user')->paginate(10);

        return Inertia::render('Admin/Mairies/Index', [
            'mairies' => $mairies,
        ]);
    }

    /**
     * Affiche le formulaire de création
     */
    public function create()
    {
        return Inertia::render('Admin/Mairies/Create');
    }

    /**
     * Enregistre une nouvelle mairie
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string|max:500',
            'adresse_complete' => 'required|string|max:255',
            'telephone_principal' => 'required|string|max:20',
            'email' => 'required|email|unique:mairies,email',
            'region' => 'nullable|string|max:255',
            'code_postal' => 'nullable|string|max:20',
        ]);

        try {
            Mairie::create([
                ...$validated,
                'user_id' => auth()->id(),
            ]);

            return redirect()->route('admin.mairies.index')
                ->with('success', 'Mairie enregistrée avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de l’enregistrement : ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Affiche le formulaire d’édition
     */
    public function edit(string $id)
    {
        $mairie = Mairie::with('user')->findOrFail($id);

        return Inertia::render('Admin/Mairies/Edit', [
            'mairie' => $mairie,
        ]);
    }

    /**
     * Met à jour une mairie
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $mairie = Mairie::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string|max:500',
            'adresse_complete' => 'required|string|max:255',
            'telephone_principal' => 'required|string|max:20',
            'email' => 'required|email|unique:mairies,email,' . $mairie->id,
            'region' => 'nullable|string|max:255',
            'code_postal' => 'nullable|string|max:20',
        ]);

        try {
            $mairie->update($validated);

            return redirect()->route('admin.mairies.index')
                ->with('success', 'Mairie mise à jour avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de la mise à jour : ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Supprime une mairie
     */
    public function destroy(string $id): RedirectResponse
    {
        $mairie = Mairie::findOrFail($id);

        try {
            $mairie->delete();

            return redirect()->route('admin.mairies.index')
                ->with('success', 'Mairie supprimée avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de la suppression : ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Affiche les détails d’une mairie
     */
    public function show(Mairie $mairie): \Inertia\Response
    {
        $mairie->load(['agents', 'user']); 

        return Inertia::render('Admin/Mairies/Show', [
            'mairie' => $mairie,
        ]);
    }
}
