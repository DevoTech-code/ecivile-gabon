import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function Show({ hopital, agents, flash }) {
    const { delete: destroy } = useForm();

    const handleDeleteAgent = (agentId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
            destroy(route('admin.hopitaux.agents.destroy', { hopital: hopital.id, agent: agentId }));
        }
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);


    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
            <Head title={`Détails de ${hopital.nom}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Détails de l'hôpital : {hopital.nom}</h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.hopitaux.index')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Retour à la liste
                        </Link>
                    </Button>
                </div>

                <div className="mb-8 rounded-md bg-white p-6 shadow-sm dark:bg-gray-800">
                    <div className="mb-4 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informations Générales</h2>
                        <Separator className="my-2" />
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Nom :</strong> {hopital.nom}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Description :</strong> {hopital.description_courte || 'N/A'}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Adresse :</strong> {hopital.adresse_complete}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Téléphone :</strong> {hopital.telephone_principal}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email :</strong> {hopital.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Type d'établissement :</strong> {hopital.type_etablissement}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Mairie de rattachement :</strong> {hopital.mairie ? hopital.mairie.nom : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="rounded-md bg-white p-6 shadow-sm dark:bg-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agents de l'hôpital</h2>
                        <Button asChild>
                            <Link href={route('admin.hopitaux.agents.create', hopital.id)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un agent
                            </Link>
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.length > 0 ? (
                                agents.map((agent) => (
                                    <TableRow key={agent.id}>
                                        <TableCell>{agent.name}</TableCell>
                                        <TableCell>{agent.email}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteAgent(agent.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-gray-500 dark:text-gray-400">
                                        Aucun agent n'a été trouvé.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
                <Toaster richColors position="bottom-left" />

        </div>
    );
}
