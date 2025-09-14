export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Mairie {
    id: number;
    nom: string;
    email: string;
    adresse_complete: string;
    description_courte: string;
    telephone_principal: string;
    code_postal: string;
    user_id: number;
    province_id: number;
    commune_id: number;
    arrondissement_id: number;
}

export interface Hopital {
    id: number;
    nom: string;
    email: string;
    adresse_complete: string;
    description_courte: string;
    telephone_principal: string;
    code_postal: string;
    user_id: number;
    mairie_id: number

}

export interface Province {
    id: number;
    nom: string;
}

export interface Commune {
    id: number;
    province_id: number;
    nom: string;
}

export interface Arrondissement {
    id: number;
    commune_id: number;
    nom: string;
}

export interface Declaration {
    id: number;
    nom_enfant: string;
    prenom_enfant: string;
    code_nuin: string;
    date_naissance: string;
    sexe: string;
    lieu_naissance: string;
    nom_pere: string;
    prenom_pere: string;
    profession_pere: string;
    nationalite_pere: string;
    nom_mere: string;
    prenom_mere: string;
    profession_mere: string;
    nationalite_mere: string;
    email_parent: string;
    acte_naissance_pere: File | null;
    acte_naissance_mere: File | null;
    statut: string;
    motif_rejet: string;
    agent_hopital_id: number;
    agent_mairie_id: number;
    hopital_id: number;
    mairie_id: number;
}
