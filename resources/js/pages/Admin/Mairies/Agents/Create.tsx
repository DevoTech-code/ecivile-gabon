import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Create({ mairieId, mairieNom }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        post(route('admin.mairies.agents.store', { mairie: mairieId }), {
            onSuccess: () => toast.success('Agent créé avec succès !'),
            onError: (formErrors) => {
                toast.error('Erreurs de validation:', formErrors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Head title={`Ajouter un agent à ${mairieNom}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Ajouter un agent à la mairie : {mairieNom}
                    </h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.mairies.show', mairieId)}>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm max-w-2xl mx-auto">
                    {/* Affichage d'un message d'erreur général s'il y a des erreurs */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Erreur !</strong>
                            <span className="block sm:inline ml-2">Veuillez corriger les erreurs ci-dessous.</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
                        </div>
                        <div>
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
                        </div>
                        <div>
                            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.password_confirmation && (
                                <div className="text-red-500 mt-1">{errors.password_confirmation}</div>
                            )}
                        </div>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            Créer l'agent
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
