import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Eye, Hospital, LayoutGrid, List, Plus, Stethoscope, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'Tableau de bord Hopital',
        href: route('hopital.dashboard'),
    },
];

const mainNavItems = [
    {
        title: 'Tableau de bord',
        href: route('hopital.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Faire une déclaration',
        href: route('hopital.declarations.create'),
        icon: Plus,
    },
    {
        title: 'Liste des déclarations',
        href: route('hopital.declarations.index'),
        icon: List,
    },
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


export default function HopitalDashboard({ declarationsCount, newDeclarationsCount, recentDeclarations, user }) {
    const getBadgeColor = (statut) => {
        switch (statut) {
            case 'validee':
                return 'bg-green-500 text-white';
            case 'rejetee':
                return 'bg-red-500 text-white';
            case 'envoyee':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };
    
    
    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems}>
            <Head title="Tableau de bord de l'hôpital" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-baseline justify-between">
                    {user.hopital && (
                        <div className="flex w-full flex-col gap-2 rounded bg-green-500 px-6 py-3 text-white">
                            <p className="mt-1 dark:text-gray-300">Hôpital affilié : </p>
                            <div className="flex items-center gap-4">
                                <Hospital size={30} />
                                <h1 className="text-2xl font-semibold">{user.hopital.nom}</h1>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard icon={Stethoscope} title="Déclarations au total" value={declarationsCount} bgColor="bg-gradient-to-br from-indigo-500 to-blue-500" />
                    <StatCard icon={Users} title="Nouvelles déclarations (7j)" value={newDeclarationsCount} bgColor="bg-gradient-to-br from-purple-500 to-indigo-500" />
                </div>

                <div className="w-full">
                    <h2 className="mb-4 text-xl font-bold">Déclarations récentes</h2>
                    <div className="relative overflow-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Enfant</TableHead>
                                    <TableHead>code NUIN</TableHead>
                                    <TableHead>Date de naissance</TableHead>
                                    <TableHead>Créé par l'agent</TableHead>
                                    <TableHead>Déclaré le</TableHead>
                                    <TableHead>statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentDeclarations.length > 0 ? (
                                    recentDeclarations.map((declaration) => (
                                        <TableRow key={declaration.id}>
                                            <TableCell>
                                                {declaration.nom_enfant} {declaration.prenom_enfant}{' '}
                                            </TableCell>
                                            <TableCell>{declaration.code_nuin}</TableCell>
                                            <TableCell>{declaration.date_naissance}</TableCell>
                                            <TableCell>{declaration.agent}</TableCell>
                                            <TableCell>{declaration.created_at}</TableCell>
                                            <TableCell>
                                                <Badge className={getBadgeColor(declaration.statut)}>
                                                    {declaration.statut}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild className="transition-colors hover:bg-gray-100">
                                                    <Link href={route('hopital.declarations.show', declaration.id)}>
                                                        <Eye /> Voir
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
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
