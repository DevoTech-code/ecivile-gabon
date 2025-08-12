import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Eye, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
/**
 * Fonction utilitaire pour éviter les requêtes excessives lors de la saisie.
 * @param {string} value La valeur à débouncer.
 * @param {number} delay Le délai en millisecondes.
 * @returns {string} La valeur déboucée.
 */
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

/**
 * Fonction pour déterminer la couleur du badge en fonction du statut.
 * @param {string} statut Le statut de la déclaration.
 * @returns {string} Les classes Tailwind CSS pour la couleur.
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
/**
 * Composant de la vue d'index pour les déclarations de la Mairie.
 * @param {object} props Les propriétés passées au composant.
 * @param {array} props.declarations La liste des déclarations à afficher.
 * @param {object} props.filters Les filtres de recherche et de statut actuels.
 */
export default function Index({ declarations, filters, flash }) {
    // État local pour gérer les entrées de l'utilisateur
    const [searchField, setSearchField] = useState(filters.field || 'nom_enfant');
    const [searchQuery, setSearchQuery] = useState(filters.query || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'tous');

    // Utilisation d'un debounce pour la recherche automatique
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Effet de bord pour déclencher la recherche et les filtres
    useEffect(() => {
        router.get(
            route('mairie.declarations.index'),
            {
                field: searchField,
                query: debouncedSearchQuery,
                status: statusFilter,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, [debouncedSearchQuery, searchField, statusFilter]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <>
            <Head title="Déclarations Reçues" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Liste des Déclarations</h1>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="outline" asChild>
                            <Link href={route('mairie.dashboard')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour au Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
                    {/* Formulaire de recherche */}
                    <div className="flex w-full items-center space-x-2 sm:w-auto">
                        <Select value={searchField} onValueChange={setSearchField}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Rechercher par..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nom_enfant">Nom</SelectItem>
                                <SelectItem value="code_nuin">Code NUIN</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Entrez votre recherche..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    {/* Bouton de filtre par statut */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Filter className="mr-2 h-4 w-4" /> Filtrer par statut
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Statut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                                <DropdownMenuRadioItem value="tous">Tous</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="en_attente">En attente</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="validee">Validée</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="rejetee">Rejetée</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code NUIN</TableHead>
                                <TableHead>Nom de l'enfant</TableHead>
                                <TableHead>Prénom de l'enfant</TableHead>
                                <TableHead>Date de naissance</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {declarations.length > 0 ? (
                                declarations.map((declaration) => (
                                    <TableRow key={declaration.id}>
                                        <TableCell className="font-medium">{declaration.code_nuin}</TableCell>
                                        <TableCell>{declaration.nom_enfant}</TableCell>
                                        <TableCell>{declaration.prenom_enfant}</TableCell>
                                        <TableCell>{declaration.date_naissance}</TableCell>
                                        <TableCell>
                                            <Badge className={getBadgeColor(declaration.statut)}>
                                                {declaration.statut === 'envoyee' ? 'en attente' : declaration.statut.replace(/_/g, ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('mairie.declarations.show', declaration.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={route('mairie.declarations.download', declaration.id)} target="_blank">
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                        Aucune déclaration trouvée.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Toaster richColors position="bottom-left" />
            </div>
        </>
    );
}
