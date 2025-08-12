<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Acte de Naissance - {{ $declaration->nom_enfant }} {{ $declaration->prenom_enfant }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif; /* Compatible avec les caractères spéciaux */
            font-size: 14px;
            line-height: 1.8;
            color: #222;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            border: 2px solid #0056b3;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 32px;
            color: #0056b3;
            margin-bottom: 10px;
            border-bottom: 3px double #0056b3;
            display: inline-block;
            padding-bottom: 5px;
        }
        .header p {
            font-size: 16px;
            color: #555;
            margin-top: 5px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #0056b3;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .field {
            margin-bottom: 10px;
        }
        .field strong {
            display: inline-block;
            width: 150px; /* Alignement des labels */
            color: #444;
        }
        .signature-block {
            margin-top: 50px;
            text-align: right;
        }
        .signature-block p {
            margin: 5px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .note {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
            border-left: 3px solid #ddd;
            padding-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ACTE DE NAISSANCE</h1>
            <p>RÉPUBLIQUE GABONAISE</p>
            <p>MAIRIE DE {{ strtoupper($declaration->mairie->nom) }}</p>
            <p>N° {{ $declaration->id }} / {{ date('Y') }}</p>
        </div>

        <div class="section">
            <div class="section-title">Informations sur l'enfant</div>
            <div class="field"><strong>Nom :</strong> {{ $declaration->nom_enfant }}</div>
            <div class="field"><strong>Prénom(s) :</strong> {{ $declaration->prenom_enfant }}</div>
            <div class="field"><strong>Code NUIN :</strong> {{ $declaration->code_nuin }}</div>
            <div class="field"><strong>Né(e) le :</strong> {{ \Carbon\Carbon::parse($declaration->date_naissance)->translatedFormat('d F Y') }}</div>
            <div class="field"><strong>À :</strong> {{ $declaration->lieu_naissance }}</div>
            <div class="field"><strong>Sexe :</strong> {{ ucfirst($declaration->sexe) }}</div>
        </div>

        <div class="section">
            <div class="section-title">Informations sur le père</div>
            <div class="field"><strong>Nom :</strong> {{ $declaration->nom_pere }}</div>
            <div class="field"><strong>Prénom(s) :</strong> {{ $declaration->prenom_pere }}</div>
            <div class="field"><strong>Profession :</strong> {{ $declaration->profession_pere ?? 'Non renseignée' }}</div>
            <div class="field"><strong>Nationalité :</strong> {{ $declaration->nationalite_pere ?? 'Non renseignée' }}</div>
        </div>

        <div class="section">
            <div class="section-title">Informations sur la mère</div>
            <div class="field"><strong>Nom :</strong> {{ $declaration->nom_mere }}</div>
            <div class="field"><strong>Prénom(s) :</strong> {{ $declaration->prenom_mere }}</div>
            <div class="field"><strong>Profession :</strong> {{ $declaration->profession_mere ?? 'Non renseignée' }}</div>
            <div class="field"><strong>Nationalité :</strong> {{ $declaration->nationalite_mere ?? 'Non renseignée' }}</div>
        </div>

        @if($declaration->statut === 'rejetee' && $declaration->motif_rejet)
            <div class="note" style="color: red;">
                <p><strong>Note :</strong> Cette déclaration a été initialement rejetée pour le motif suivant :</p>
                <p>{{ $declaration->motif_rejet }}</p>
            </div>
        @endif

        <div class="signature-block">
            <p>Fait à {{ $declaration->mairie->nom }}, le {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>
            <p>L'Officier d'État Civil</p>
            <br><br>
            <p>_________________________</p>
            <p>(Cachet et Signature)</p>
        </div>

        <div class="footer">
            <p>Document généré par l'application e-Civile.</p>
            <p>Code NUIN : {{ $declaration->code_nuin }}</p>
        </div>
    </div>
</body>
</html>
