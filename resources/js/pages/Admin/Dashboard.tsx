import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, CircleUserIcon, Folder, Hospital, Landmark, LayoutGrid, MapPin, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord Admin',
        href: '/dashboard',
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
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

const StateCard = ({ icon: Icon, value, title, bgColors }) => (
    <div className={`relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border ${bgColors}`}>
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center gap-4">
                <h3 className="mt-2 text-center text-xl font-bold text-white">{title}</h3>
                <p className="mt-1 text-3xl font-extrabold text-white">{value}</p>
            </div>
        </div>
    </div>
);

export default function Dashboard({ mairiesCount, hopitauxCount, usersCount, recentEntities }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            <Head title="Dashboard Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <StateCard icon={Landmark} title="Mairies" value={mairiesCount} bgColors="bg-blue-500" />
                    <StateCard icon={Hospital} title="Hopitaux" value={hopitauxCount} bgColors="bg-yellow-500" />
                    <StateCard icon={CircleUserIcon} title="Utilisateurs" value={usersCount} bgColors="bg-green-500" />
                </div>

                <div className="h-auto overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Faire une action</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Link href={route('admin.mairies.create')}>
                            <Button className='w-full'>
                                <Plus />
                                Créer une nouvelle mairies
                            </Button>
                        </Link>
                        <Link href={route('admin.mairies.index')}>
                            <Button className='w-full border dark:border-white ' variant='ghost'>
                                <Plus />
                                Gestionnaire des mairies
                            </Button>
                        </Link>
                        <Link href={route('admin.hopitaux.create')}>
                            <Button className='w-full'>
                                <Plus />
                                Créer un nouvel hopital
                            </Button>
                        </Link>
                        <Link href={route('admin.hopitaux.index')}>
                            <Button className='w-full border dark:border-white' variant='ghost'>
                                <Plus />
                                Gestionnaire des hopitaux
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border ">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Entités récentes</h3>
                    <ul>
                        {recentEntities.length > 0 ? (
                            recentEntities.map((entity, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{entity.nom}</p>
                                            <p className="flex items-baseline gap-1 truncate text-sm text-gray-500">
                                                <MapPin size={14} />
                                                {entity.adresse_complete || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <p className="text-right text-sm text-gray-500">{entity.type}</p>
                                            <p className="text-right text-xs text-gray-400">{entity.created_at}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="py-4 text-center text-sm text-gray-500">Aucun élément créé pour le moment</li>
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
