import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description_courte: '',
        adresse_complete: '',
        telephone_principal: '',
        email: '',
        region: '',
        code_postal: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.mairies.store'));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
            <Head title="Créer une mairie" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Créer une mairie</h1>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.mairies.index')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto rounded-md bg-white p-6 shadow-sm dark:bg-gray-800">
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
                                <Label htmlFor="region">Région</Label>
                                <Input
                                    id="region"
                                    type="text"
                                    value={data.region}
                                    onChange={(e) => setData('region', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.region && <div className="mt-1 text-red-500">{errors.region}</div>}
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

                        <Button type="submit" disabled={processing} className="mt-4 w-48">
                            <Save className="mr-2 h-4 w-4" />
                            Créer la Mairie
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
