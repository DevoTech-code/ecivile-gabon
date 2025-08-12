import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, Pen, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function Index({ hopitaux, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (hopitalId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette hopital ?')) {
            destroy(route('admin.hopitaux.destroy', hopitalId));
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

    const hopitauxData = hopitaux.data || [];
    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
            <Head title="Liste des hôpitaux" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Liste des hôpitaux</h1>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href={route('admin.dashboard')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour au Dashboard
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.hopitaux.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un hôpital
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border bg-white dark:bg-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hopitauxData.length > 0 ? (
                                hopitauxData.map((hopital) => (
                                    <TableRow key={hopital.id}>
                                        <TableCell className="font-medium">{hopital.nom}</TableCell>
                                        <TableCell>{hopital.email}</TableCell>
                                        <TableCell>{hopital.telephone_principal}</TableCell>
                                        <TableCell>{hopital.type_etablissement}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('admin.hopitaux.show', hopital.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('admin.hopitaux.edit', hopital.id)}>
                                                        <Pen className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(hopital.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 dark:text-gray-400">
                                        Aucun hôpital trouvé.
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
