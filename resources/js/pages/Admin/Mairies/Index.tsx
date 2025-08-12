import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Eye, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast, Toaster } from 'sonner';


export default function Index({ mairies, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (mairieId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette mairie ?')) {
            destroy(route('admin.mairies.destroy', mairieId));
            
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

    // Assurez-vous que mairies.data existe avant de l'itérer
    const mairiesData = mairies.data || [];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Head title="Gestion des Mairies" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Liste des Mairies</h1>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href={route('admin.dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour au Dashboard
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.mairies.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Créer une Mairie
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Adresse</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mairiesData.length > 0 ? (
                                mairiesData.map((mairie) => (
                                    <TableRow key={mairie.id}>
                                        <TableCell className="font-medium">{mairie.nom}</TableCell>
                                        <TableCell>{mairie.email}</TableCell>
                                        <TableCell>{mairie.adresse_complete}</TableCell>
                                        <TableCell>
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
                                            
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(mairie.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
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
                </div>
            </div>
                <Toaster richColors position="bottom-left" />
        </div>
    );
}
