<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Déclaration de Naissance - Hôpital</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif; 
            font-size: 12px;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 24px;
            color: #0056b3;
            margin-bottom: 10px;
        }
        .info-block {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 15px;
            color: #0056b3;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 10px;
            color: #777;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Déclaration de Naissance</h1>
        </div>

        <div class="info-block">
            <p><strong>Hôpital :</strong> {{ $declaration->hopital->nom }}</p>
            <p><strong>Mairie destinataire :</strong> {{ $declaration->mairie->nom }}</p>
        </div>

        <div class="section-title">Informations de l'enfant</div>
        <table>
            <tr>
                <th>Nom de l'enfant</th>
                <td>{{ $declaration->nom_enfant }}</td>
            </tr>
            <tr>
                <th>Prénom de l'enfant</th>
                <td>{{ $declaration->prenom_enfant }}</td>
            </tr>
            <tr>
                <th>Code NUIN</th>
                <td>{{ $declaration->code_nuin }}</td>
            </tr>
            <tr>
                <th>Date de naissance</th>
                <td>{{ $declaration->date_naissance }}</td>
            </tr>
            <tr>
                <th>Sexe</th>
                <td>{{ $declaration->sexe }}</td>
            </tr>
            <tr>
                <th>Lieu de naissance</th>
                <td>{{ $declaration->lieu_naissance }}</td>
            </tr>
        </table>

        <div class="section-title">Informations du père</div>
        <table>
            <tr>
                <th>Nom du père</th>
                <td>{{ $declaration->nom_pere }}</td>
            </tr>
            <tr>
                <th>Prénom du père</th>
                <td>{{ $declaration->prenom_pere }}</td>
            </tr>
            <tr>
                <th>Profession du père</th>
                <td>{{ $declaration->profession_pere ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Nationalité du père</th>
                <td>{{ $declaration->nationalite_pere ?? 'N/A' }}</td>
            </tr>
        </table>

        <div class="section-title">Informations de la mère</div>
        <table>
            <tr>
                <th>Nom de la mère</th>
                <td>{{ $declaration->nom_mere }}</td>
            </tr>
            <tr>
                <th>Prénom de la mère</th>
                <td>{{ $declaration->prenom_mere }}</td>
            </tr>
            <tr>
                <th>Profession de la mère</th>
                <td>{{ $declaration->profession_mere ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Nationalité de la mère</th>
                <td>{{ $declaration->nationalite_mere ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Email parent</th>
                <td>{{ $declaration->email_parent ?? 'N/A' }}</td>
            </tr>
        </table>

        <div class="footer">
            <p>Déclaration enregistrée par {{ $declaration->agentHopital->name ?? 'N/A' }} le {{ $declaration->created_at->format('d/m/Y H:i') }}</p>
            @if($declaration->statut === 'rejetee' && $declaration->motif_rejet)
                <p style="color: red;">Statut : Rejetée - Motif : {{ $declaration->motif_rejet }}</p>
            @else
                <p>Statut actuel : {{ $declaration->statut }}</p>
            @endif
        </div>
    </div>
</body>
</html>
