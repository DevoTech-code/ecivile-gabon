import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Building2, Clock, Hospital, Landmark, LayoutGrid, UserCheck, Users } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Tableau de bord',
        href: route('admin.dashboard'),
    },
];

// Définition des liens pour la barre latérale de l'administrateur
const mainNavItems = [
    {
        title: 'Tableau de bord',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des Mairies',
        href: route('admin.mairies.index'),
        icon: Landmark,
    },
    {
        title: 'Gestion des Hôpitaux',
        href: route('admin.hopitaux.index'),
        icon: Hospital,
    },
    // {
    //     title: 'Agents des Mairies',
    //     // href: route('admin.mairies.agents.index'),
    //     href: '/admin/mairies.agents.index',
    //     icon: UserCheck,
    // },
    // {
    //     title: 'Agents des Hôpitaux',
    //     // href: route('admin.hopitaux.agents.index'),
    //     href: '/admin/hopitaux.agents.index',
    //     icon: UserCheck,
    // },
];

const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div className={`relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border ${bgColor}`}>
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

const RecentEntityCard = ({ type, nom, adresse_complete, createdAt }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start">
            <div className="mt-1 flex-shrink-0">
                {type === 'Mairie' ? (
                    <Landmark className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                ) : (
                    <Hospital className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
            </div>
            <div className="ml-4 flex-grow">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{nom}</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{adresse_complete}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Créé le {createdAt}</span>
                </div>
            </div>
        </div>
    </div>
);


export default function AdminDashboard({ mairiesCount, hopitauxCount, usersCount, recentEntities }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard icon={Landmark} title="Mairies" value={mairiesCount} bgColor="bg-gradient-to-br from-indigo-500 to-blue-500" />
                    <StatCard icon={Hospital} title="Hôpitaux" value={hopitauxCount} bgColor="bg-gradient-to-br from-red-500 to-pink-500" />
                    <StatCard icon={Users} title="Utilisateurs" value={usersCount} bgColor="bg-gradient-to-br from-purple-500 to-indigo-500" />
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 md:min-h-min dark:border-sidebar-border dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Entités récentes</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Les 6 dernières mairies et hôpitaux ajoutés au système.</p>

                    <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
                        {recentEntities.map((entity, index) => (
                            <RecentEntityCard
                                key={index}
                                type={entity.type}
                                nom={entity.nom}
                                localisation={entity.localisation}
                                createdAt={entity.created_at}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
