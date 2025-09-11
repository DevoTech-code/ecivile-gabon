import ConfirmDeleteButton from '@/components/ConfirmDeleteButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, Edit2, Eye, Folder, Hospital, Landmark, LayoutGrid, Plus, TableIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

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

export default function Index({ mairies, flash }) {
    const { delete: destroy } = useForm();
    const [view, setView] = useState<'table' | 'card'>('table');

    // Détecte automatiquement la largeur de l'écran pour switcher la vue
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setView('card');
            else setView('table');
        };
        handleResize(); // initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const mairiesData = mairies.data || [];

    const handleDelete = (mairieId) => {
            destroy(route('admin.mairies.destroy', mairieId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            <Head title="Gestion des Mairies" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="h-[200px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                     <h3 className="mb-4 text-lg font-semibold text-gray-800">Gestionnaires des mairies</h3>
                    <Link href={route('admin.mairies.create')}>
                        <Button>
                            <Plus/>
                            Créer une nouvelle mairies
                        </Button>
                    </Link>
                </div>
                <div className='space-y-2'>
                    <div className="flex flex-wrap items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Liste des mairies</h3>
                        <div className="flex flex-wrap gap-2">
                            <Button variant={view === 'table' ? 'default' : 'outline'} size="icon" onClick={() => setView('table')}>
                                <TableIcon className="h-4 w-4" />
                            </Button>
                            <Button variant={view === 'card' ? 'default' : 'outline'} size="icon" onClick={() => setView('card')}>
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Conteneur principal */}
                    <div className="min-h-[100vh] overflow-x-auto rounded bg-white shadow dark:bg-gray-800">
                        {/* Table */}
                        {view === 'table' && (
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Adresse</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mairiesData.length > 0 ? (
                                        mairiesData.map((mairie) => (
                                            <TableRow key={mairie.id}>
                                                <TableCell className="font-medium">{mairie.nom}</TableCell>
                                                <TableCell>{mairie.email}</TableCell>
                                                <TableCell>{mairie.adresse_complete}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('admin.mairies.show', mairie.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('admin.mairies.edit', mairie.id)}>
                                                                <Edit2 className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <ConfirmDeleteButton onConfirm={() => handleDelete(mairie.id)} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-400">
                                                Aucune mairie n'a été trouvée.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}

                        {/* Cards */}
                        {view === 'card' && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {mairiesData.length > 0 ? (
                                    mairiesData.map((mairie) => (
                                        <Card key={mairie.id} className="shadow-sm">
                                            <CardContent className="flex h-full flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mairie.nom}</h3>
                                                    <p className="text-gray-500">{mairie.email}</p>
                                                    <p className="text-gray-500">{mairie.adresse_complete}</p>
                                                </div>
                                                <div className="mt-2 flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('admin.mairies.show', mairie.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('admin.mairies.edit', mairie.id)}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <ConfirmDeleteButton onConfirm={() => handleDelete(mairie.id)} />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Aucune mairie n'a été trouvée.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Toaster richColors position="bottom-left" />
        </AppLayout>
    );
}
