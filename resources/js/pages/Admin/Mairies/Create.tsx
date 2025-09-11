import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Hospital, Landmark, LayoutGrid, Plus, Save } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/dashboard',
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
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

export default function Create() {
    const { provinces, communes, arrondissements } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description_courte: '',
        adresse_complete: '',
        telephone_principal: '',
        email: '',
        province_id: '',
        commune_id: '',
        arrondissement_id: '',
        code_postal: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.mairies.store'));
    };

    // Filtrage en cascade
    const communesFiltered = communes.filter((c) => c.province_id == data.province_id);
    const arrondissementsFiltered = arrondissements.filter((a) => a.commune_id == data.commune_id);

    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            <Head title="Créer une mairie" />

                <div className="container mx-auto px-4 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Créer une mairie</h3>

                    <form onSubmit={submit} className="space-y-4 px-4">
                        {/* Nom et Téléphone */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.nom && <div className="mt-1 text-red-500">{errors.nom}</div>}
                            </div>
                            <div>
                                <Label htmlFor="telephone_principal">Téléphone principal</Label>
                                <Input
                                    id="telephone_principal"
                                    type="text"
                                    value={data.telephone_principal}
                                    onChange={(e) => setData('telephone_principal', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.telephone_principal && <div className="mt-1 text-red-500">{errors.telephone_principal}</div>}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.email && <div className="mt-1 text-red-500">{errors.email}</div>}
                            </div>
                            <div>
                                <Label htmlFor="code_postal">Code postal</Label>
                                <Input
                                    id="code_postal"
                                    type="text"
                                    value={data.code_postal}
                                    onChange={(e) => setData('code_postal', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.code_postal && <div className="mt-1 text-red-500">{errors.code_postal}</div>}
                            </div>

                            {/* Province */}
                            <div>
                                <Label>Province</Label>
                                <Select value={data.province_id} onValueChange={(value) => setData('province_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir une province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provinces.map((p) => (
                                            <SelectItem key={p.id} value={p.id.toString()}>
                                                {p.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.province && <div className="mt-1 text-red-500">{errors.province}</div>}
                            </div>

                            {/* Commune */}
                            <div>
                                <Label>Commune</Label>
                                <Select value={data.commune_id} onValueChange={(value) => setData('commune_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir une commune" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {communesFiltered.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.commune && <div className="mt-1 text-red-500">{errors.commune}</div>}
                            </div>

                            {/* Arrondissement */}
                            <div>
                                <Label>Arrondissement</Label>
                                <Select value={data.arrondissement_id} onValueChange={(value) => setData('arrondissement_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un arrondissement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {arrondissementsFiltered.map((a) => (
                                            <SelectItem key={a.id} value={a.id.toString()}>
                                                {a.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.arrondissement && <div className="mt-1 text-red-500">{errors.arrondissement}</div>}
                            </div>
                        </div>
                        {/* Adresse complète (lecture seule) */}
                        <div>
                            <Label htmlFor="adresse_complete">Adresse complète</Label>
                            <Input
                                id="adresse_complete"
                                type="text"
                                value={`${provinces.find((p) => p.id == data.province_id)?.nom || 'N/A'},  ${
                                    communes.find((c) => c.id == data.commune_id)?.nom || 'N/A'
                                },  ${arrondissements.find((a) => a.id == data.arrondissement_id)?.nom || 'N/A'}`}
                                readOnly
                                className="mt-1 block w-full bg-gray-100"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description_courte">Description courte</Label>
                            <Textarea
                                id="description_courte"
                                value={data.description_courte}
                                onChange={(e) => setData('description_courte', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.description_courte && <div className="mt-1 text-red-500">{errors.description_courte}</div>}
                        </div>

                        <div className="flex justify-end  mb-8">
                            <Button type="submit" disabled={processing} className='w-full sm:w-[200px]'>
                                <Save className="mr-2 h-4 w-4" />
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </div>
        </AppLayout>
    );
}
