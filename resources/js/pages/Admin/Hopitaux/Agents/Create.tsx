import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Create({ hopital }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        hopital_id: hopital.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.hopitaux.agents.store', hopital.id),  {
            onSuccess: () => toast.success('Agent créé avec succès !'),
            onError: (formErrors) => {
                toast.error('Erreurs de validation:', formErrors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Head title="Ajouter un agent" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ajouter un agent pour {hopital.nom}</h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.hopitaux.show', hopital.id)}>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm max-w-[500px] mx-auto">
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
                            {errors.password_confirmation && <div className="text-red-500 mt-1">{errors.password_confirmation}</div>}
                        </div>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            Enregistrer
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
