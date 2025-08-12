import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { toast, Toaster } from 'sonner';

export default function Show({ mairie, flash }) {
    const { delete: destroy } = useForm();

    const handleDeleteAgent = (agentId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
            destroy(route('admin.mairies.agents.destroy', { mairie: mairie.id, agent: agentId }));
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Head title={`Détails de ${mairie.nom}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Détails de la mairie : {mairie.nom}</h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.mairies.index')}>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm">
                    <div className="mb-4 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informations Générales</h2>
                        <Separator className="my-2" />
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Nom :</strong> {mairie.nom}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Description :</strong> {mairie.description_courte}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Adresse :</strong> {mairie.adresse_complete}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Téléphone :</strong> {mairie.telephone_principal}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email :</strong> {mairie.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Région :</strong> {mairie.region}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Code Postal :</strong> {mairie.code_postal}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Agents ({mairie.agents ? mairie.agents.length : 0})
                        </h2>
                        <Button asChild>
                            <Link href={route('admin.mairies.agents.create', mairie.id)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un agent
                            </Link>
                        </Button>
                    </div>
                    <Separator className="my-2" />
                    
                    <div className="rounded-md shadow-sm overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mairie.agents && mairie.agents.length > 0 ? (
                                    mairie.agents.map((agent) => (
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
            </div>
                <Toaster richColors position="bottom-left" />

        </div>
    );
}
