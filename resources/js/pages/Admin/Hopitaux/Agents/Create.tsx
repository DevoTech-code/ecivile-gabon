import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { BookOpen, Folder, Hospital, Landmark, LayoutGrid, Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

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
        post(route('admin.hopitaux.agents.store', hopital.id), {
            onSuccess: () => toast.success('Agent créé avec succès !'),
            onError: (formErrors) => {
                toast.error('Erreurs de validation:', formErrors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            <Head title="Ajouter un agent" />

            <div className="container mx-auto mt-4 max-w-xl px-4 py-8">
                {/* Affichage d'un message d'erreur général s'il y a des erreurs */}
                {Object.keys(errors).length > 0 && (
                    <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
                        <strong className="font-bold">Erreur !</strong>
                        <span className="ml-2 block sm:inline">Veuillez corriger les erreurs ci-dessous.</span>
                    </div>
                )}
                <h3 className="mb-4 text-center text-lg font-semibold text-gray-800 dark:text-white">Créer un agent </h3>

                <form
                    onSubmit={submit}
                    className="space-y-3 rounded-xl border border-sidebar-border/70 p-4 shadow md:min-h-min dark:border-sidebar-border"
                >
                    <div>
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.name && <div className="mt-1 text-red-500">{errors.name}</div>}
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
                        {errors.email && <div className="mt-1 text-red-500">{errors.email}</div>}
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
                        {errors.password && <div className="mt-1 text-red-500">{errors.password}</div>}
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
                        {errors.password_confirmation && <div className="mt-1 text-red-500">{errors.password_confirmation}</div>}
                    </div>
                    <Button type="submit" disabled={processing} className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Créer l'agent
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
