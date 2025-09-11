import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Save, LayoutGrid, Plus, Hospital, Landmark, Folder, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/dashboard',
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Nouvelle mairie',
        href: route('admin.mairies.create'),
        icon: Plus,
    },
    {
        title: 'Gestions des mairies',
        href: route('admin.mairies.index'),
        icon: Landmark,
    },
    {
        title: 'Nouvelle hopital',
        href: route('admin.hopitaux.create'),
        icon: Plus,
    },
    {
        title: 'Gestions des hopitaux',
        href: route('admin.hopitaux.index'),
        icon: Hospital,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: '#',
        icon: BookOpen,
    },
];


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
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            <Head title={`Ajouter un agent à ${mairieNom}`} />



                <div className="mt-4 container px-4 py-8 max-w-xl mx-auto " >
                    {/* Affichage d'un message d'erreur général s'il y a des erreurs */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Erreur !</strong>
                            <span className="block sm:inline ml-2">Veuillez corriger les erreurs ci-dessous.</span>
                        </div>
                    )}
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center'>Créer un agent </h3>

                    <form onSubmit={submit} className="space-y-3 rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border shadow ">
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
                        <Button type="submit" disabled={processing} className='w-full'>
                            <Save className="h-4 w-4 mr-2" />
                            Créer l'agent
                        </Button>
                    </form>
                </div>
        </AppLayout>
    );
}
