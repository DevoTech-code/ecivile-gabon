import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Building2, CircleCheckBig, CircleSlash2, Eye, FileClock, Landmark, LayoutGrid, List } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Tableau de bord Mairie',
        href: route('mairie.dashboard'),
    },
];

const mainNavItems = [
    {
        title: 'Tableau de bord',
        href: route('mairie.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Liste des déclarations',
        href: route('mairie.declarations.index', { statut: 'envoyee' }),
        icon: List,
    },
    // {
    //     title: 'Déclarations validées',
    //     href: route('mairie.declarations.index', { statut: 'validee' }),
    //     icon: CircleCheckBig,
    // },
    // {
    //     title: 'Déclarations rejetées',
    //     href: route('mairie.declarations.index', { statut: 'rejetee' }),
    //     icon: CircleSlash2,
    // },
];

// Un composant pour afficher une carte de statistiques
const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div className={`relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border ${bgColor}`}>
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h3 className="mt-2 text-center text-xl font-bold text-white">{title}</h3>
                <p className="text-3xl font-extrabold text-white">{value}</p>
            </div>
        </div>
    </div>
);

export default function MairieDashboard({ statusCounts, recentDeclarations, user }) {
    // Fonction pour déterminer la couleur du badge en fonction du statut
    const getBadgeColor = (statut) => {
        switch (statut) {
            case 'validee':
                return 'bg-green-500 text-white';
            case 'rejetee':
                return 'bg-red-500 text-white';
            case 'envoyee':
            default:
                return 'bg-yellow-500 text-white';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems}>
            <Head title="Tableau de bord de la mairie" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    {user.mairie && (
                        <div className="flex w-full flex-col gap-2 rounded bg-blue-500 px-6 py-3 text-white shadow-lg">
                            <p className="dark:text-gray-300">Mairie affiliée</p>
                            <div className="flex items-center gap-4">
                                <Landmark size={30} />
                                <h1 className="text-2xl font-semibold">{user.mairie.nom}</h1>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Carte pour les déclarations en attente de traitement */}
                    <StatCard
                        icon={FileClock}
                        title="En attente"
                        value={statusCounts.recues_en_attente}
                        bgColor="bg-gradient-to-br from-indigo-500 to-blue-500"
                    />
                    {/* Carte pour les déclarations validées */}
                    <StatCard
                        icon={CircleCheckBig}
                        title="Validées"
                        value={statusCounts.validees}
                        bgColor="bg-gradient-to-br from-green-500 to-emerald-500"
                    />
                    {/* Carte pour les déclarations rejetées */}
                    <StatCard
                        icon={CircleSlash2}
                        title="Rejetées"
                        value={statusCounts.rejetees}
                        bgColor="bg-gradient-to-br from-rose-500 to-red-500"
                    />
                </div>

                <div className="w-full">
                    <h2 className="mb-4 text-xl font-bold">Dernières déclarations reçues</h2>
                    <div className="relative overflow-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Enfant</TableHead>
                                    <TableHead>Hôpital</TableHead>
                                    <TableHead>Date de naissance</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date de réception</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentDeclarations.length > 0 ? (
                                    recentDeclarations.map((declaration) => (
                                        <TableRow key={declaration.id}>
                                            <TableCell>
                                                {declaration.nom_enfant} {declaration.prenom_enfant}
                                            </TableCell>
                                            <TableCell>{declaration.hopital}</TableCell>
                                            <TableCell>{declaration.date_naissance}</TableCell>
                                            <TableCell>
                                                <Badge className={getBadgeColor(declaration.statut)}>
                                                    {declaration.statut !== 'envoyee' ? declaration.statut : 'en attente'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{declaration.created_at}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" asChild className="transition-colors hover:bg-gray-200">
                                                    <Link href={route('mairie.declarations.show', declaration.id)}>
                                                        <Eye /> Voir
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-gray-500">
                                            Aucune déclaration récente.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
