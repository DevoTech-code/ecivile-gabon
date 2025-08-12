import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save } from 'lucide-react';

export default function Edit({ hopital, mairies }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: hopital.nom,
        description_courte: hopital.description_courte || '',
        type_etablissement: hopital.type_etablissement,
        adresse_complete: hopital.adresse_complete,
        telephone_principal: hopital.telephone_principal,
        email: hopital.email,
        mairie_id: hopital.mairie_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.hopitaux.update', hopital.id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
            <Head title={`Modifier ${hopital.nom}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Modifier l'hôpital : {hopital.nom}</h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.hopitaux.index')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md bg-white p-6 shadow-sm dark:bg-gray-800">
                    <form onSubmit={submit} className="space-y-4">
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
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
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
                                <Label htmlFor="type_etablissement">Type d'établissement</Label>
                                <Select onValueChange={(value) => setData('type_etablissement', value)} value={data.type_etablissement}>
                                    <SelectTrigger className="mt-1 block w-full">
                                        <SelectValue placeholder="Sélectionnez un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hopital_general">Hôpital général</SelectItem>
                                        <SelectItem value="clinique">Clinique</SelectItem>
                                        <SelectItem value="centre_medical">Centre médical</SelectItem>
                                        <SelectItem value="hopital_specialise">Hôpital spécialisé</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type_etablissement && <div className="mt-1 text-red-500">{errors.type_etablissement}</div>}
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="adresse_complete">Adresse complète</Label>
                                <Input
                                    id="adresse_complete"
                                    type="text"
                                    value={data.adresse_complete}
                                    onChange={(e) => setData('adresse_complete', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.adresse_complete && <div className="mt-1 text-red-500">{errors.adresse_complete}</div>}
                            </div>

                            <div>
                                <Label htmlFor="mairie_id">Mairie de rattachement</Label>
                                <Select onValueChange={(value) => setData('mairie_id', value)} value={data.mairie_id}>
                                    <SelectTrigger className="mt-1 block w-full">
                                        <SelectValue placeholder="Sélectionnez une mairie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mairies.map((mairie) => (
                                            <SelectItem key={mairie.id} value={mairie.id}>
                                                {mairie.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.mairie_id && <div className="mt-1 text-red-500">{errors.mairie_id}</div>}
                            </div>
                        </div>

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

                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            Mettre à jour
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
