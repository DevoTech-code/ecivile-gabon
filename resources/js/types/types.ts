import { LucideIcon } from 'lucide-react';

export interface Mairie {
    id: number;
    nom: string;
    description_courte: string | null;
    adresse_complete: string;
    telephone_principal: string;
    email: string;
    region: string | null;
    code_postal: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Hopital {
    id: number;
    nom: string;
    description_courte: string | null;
    type_etablissement: 'hopital_general' | 'clinique' | 'centre_medical' | 'hopital_specialise';
    adresse_complete: string;
    telephone_principal: string;
    email: string;
    user_id: number;
    mairie_id: number;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: 'admin' | 'mairie' | 'hopital';
    hopital_id: number | null;
    mairie_id: number | null;
    created_at: string;
    updated_at: string;
    hopital?: Hopital;
    mairie?: Mairie;
}

export interface Declaration {
    id: number;
    nom_enfant: string;
    prenom_enfant: string;
    code_nuin: string;
    date_naissance: string;
    sexe: 'masculin' | 'feminin';
    lieu_naissance: string;
    nom_pere: string;
    prenom_pere: string;
    profession_pere: string | null;
    nationalite_pere: string | null;
    nom_mere: string;
    prenom_mere: string;
    profession_mere: string | null;
    nationalite_mere: string | null;
    acte_naissance_pere: string | null;
    acte_naissance_mere: string | null;
    agent_hopital_id: number;
    hopital_id: number;
    mairie_id: number;
    created_at: string;
    updated_at: string;
    agentHopital?: User;
}

