import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, Download, FileText, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Composant de la vue de détail pour les déclarations de la Mairie.
 * @param {object} props Les propriétés passées au composant.
 * @param {object} props.declaration L'objet de la déclaration à afficher.
 */
export default function Show({ declaration }) {
    // État pour gérer l'affichage de la boîte de dialogue de rejet
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    
    // État pour gérer un message d'erreur local (remplace alert())
    const [rejectionError, setRejectionError] = useState('');

    // Utilisation du hook useForm d'Inertia pour gérer les données et l'état
    const { data, setData, post, processing } = useForm({
        motif_rejet: '',
    });

    /**
     * Gère la soumission du formulaire pour valider la déclaration.
     */
    const handleValidate = () => {
        post(route('mairie.declarations.validate', declaration.id));
    };

    /**
     * Gère la soumission du formulaire pour rejeter la déclaration.
     * Utilise le `data` du hook useForm.
     */
    const handleReject = () => {
        if (data.motif_rejet.trim() === '') {
            setRejectionError('Veuillez entrer un motif de rejet.');
            return;
        }

        // Réinitialise l'erreur avant la soumission
        setRejectionError('');

        // Utilise la méthode post d'Inertia qui envoie automatiquement les données du formulaire
        post(route('mairie.declarations.reject', declaration.id), {
            onSuccess: () => {
                // Ferme la boîte de dialogue après une soumission réussie
                setShowRejectDialog(false);
            },
        });
    };

    // Fonction utilitaire pour vérifier si une valeur est un chemin de fichier valide
    const isDocumentProvided = (path) => {
        return path && typeof path === 'string' && path.trim() !== '';
    };

    /**
     * Détermine les classes de couleur pour le badge de statut.
     * @param {string} statut Le statut de la déclaration.
     * @returns {string} Les classes Tailwind CSS.
     */
    const getBadgeColor = (statut) => {
        switch (statut) {
            case 'envoyee':
                return 'bg-yellow-500 hover:bg-yellow-600 text-white';
            case 'validee':
                return 'bg-green-500 hover:bg-green-600 text-white';
            case 'rejetee':
                return 'bg-red-500 hover:bg-red-600 text-white';
            default:
                return 'bg-gray-400 hover:bg-gray-500 text-white';
        }
    };

    return (
        <>
            <Head title="Détails de la Déclaration" />
            <div className="container mx-auto p-4 md:p-8">
                <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                    <h1 className="mb-4 text-xl font-bold text-gray-900 sm:mb-0 sm:text-2xl dark:text-gray-100">Détails de la Déclaration</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('mairie.declarations.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à la liste
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={route('mairie.declarations.download', declaration.id)} target="_blank">
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger le PDF
                            </a>
                        </Button>
                    </div>
                </div>
                <Separator className="my-6" />

                <Card className="mx-auto max-w-[1000px]">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Acte de naissance</CardTitle>
                            <Badge className={getBadgeColor(declaration.statut)}>{declaration.statut === 'envoyee' ? 'en attente' : declaration.statut.replace(/_/g, ' ')}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Section Informations de l'enfant */}
                        <div className="space-y-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations de l'enfant</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_enfant}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_enfant}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Code NUIN</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.code_nuin}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de naissance</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.date_naissance}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sexe</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 capitalize dark:text-gray-100">{declaration.sexe}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lieu de naissance</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.lieu_naissance}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Informations du père */}
                        <div className="space-y-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations du père</h2>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_pere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_pere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.profession_pere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nationalité</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nationalite_pere}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Informations de la mère */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations de la mère</h2>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_mere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_mere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.profession_mere}</p>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nationalité</Label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nationalite_mere}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Documents justificatifs */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documents justificatifs</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Acte de naissance du père</Label>
                                    {isDocumentProvided(declaration.acte_naissance_pere) ? (
                                        <a
                                            href={`/storage/${declaration.acte_naissance_pere}`}
                                            target="_blank"
                                            className="mt-1 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            <FileText className="h-4 w-4" />
                                            <span>Voir le document</span>
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-gray-500 dark:text-gray-400">Non fourni</p>
                                    )}
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Acte de naissance de la mère</Label>
                                    {isDocumentProvided(declaration.acte_naissance_mere) ? (
                                        <a
                                            href={`/storage/${declaration.acte_naissance_mere}`}
                                            target="_blank"
                                            className="mt-1 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            <FileText className="h-4 w-4" />
                                            <span>Voir le document</span>
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-gray-500 dark:text-gray-400">Non fourni</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Fin de la section Documents justificatifs */}

                        {/* Section Actions */}
                        {declaration.statut === 'envoyee' && (
                            <div className="mt-8 flex justify-center gap-4 border-t pt-4">
                                <Button onClick={handleValidate} disabled={processing} className="bg-green-500 text-white hover:bg-green-600">
                                    <Check className="mr-2 h-4 w-4" />
                                    Valider la déclaration
                                </Button>
                                <Button onClick={() => setShowRejectDialog(true)} disabled={processing} variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Rejeter la déclaration
                                </Button>
                            </div>
                        )}
                        {declaration.statut === 'rejetee' && declaration.motif_rejet && (
                             <div className="mt-8 border-t pt-4">
                                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Motif de rejet</h2>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{declaration.motif_rejet}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Boîte de dialogue de rejet */}
                <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Rejeter la déclaration</AlertDialogTitle>
                            <AlertDialogDescription>
                                Veuillez indiquer le motif de rejet. Cette information sera transmise à l'agent d'hôpital.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4">
                            <Label htmlFor="motif_rejet">Motif de rejet</Label>
                            <Input
                                id="motif_rejet"
                                value={data.motif_rejet} // Utilise l'état du formulaire
                                onChange={(e) => setData('motif_rejet', e.target.value)} // Met à jour l'état du formulaire
                                placeholder="Ex: Informations manquantes ou erronées..."
                                className="mt-2"
                            />
                            {rejectionError && (
                                <p className="mt-2 text-sm text-red-500">{rejectionError}</p>
                            )}
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={processing}>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleReject} disabled={processing} className="bg-red-500 text-white hover:bg-red-600">
                                Confirmer le rejet
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
}
