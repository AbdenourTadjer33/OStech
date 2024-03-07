<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Récapitulatif de votre commande {{ $order->ref }}</title>
    <style>
        /* Base */

        body,
        body *:not(html):not(style):not(br):not(tr):not(code) {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            position: relative;
        }

        body {
            -webkit-text-size-adjust: none;
            background-color: #ffffff;
            color: #718096;
            height: 100%;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            width: 100% !important;
        }

        p,
        ul,
        ol,
        blockquote {
            line-height: 1.4;
            text-align: left;
        }

        a {
            color: #3869d4;
        }

        a img {
            border: none;
        }

        /* Typography */

        h1 {
            color: #3d4852;
            font-size: 18px;
            font-weight: bold;
            margin-top: 0;
            text-align: left;
        }

        h2 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 0;
            text-align: left;
        }

        h3 {
            font-size: 14px;
            font-weight: bold;
            margin-top: 0;
            text-align: left;
        }

        p {
            font-size: 16px;
            line-height: 1.5em;
            margin-top: 0;
            text-align: left;
        }

        p.sub {
            font-size: 12px;
        }

        img {
            max-width: 100%;
        }

        /* Layout */

        .wrapper {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 100%;
            background-color: #edf2f7;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .content {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 100%;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        /* Header */

        header {
            padding: 25px 0;
            text-align: center;
        }

        header a {
            color: #3d4852;
            font-size: 19px;
            font-weight: bold;
            text-decoration: none;
        }

        /* Logo */

        .logo {
            height: 75px;
            max-height: 75px;
            width: 75px;
        }

        /* Body */

        .body {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 100%;
            background-color: #edf2f7;
            border-bottom: 1px solid #edf2f7;
            border-top: 1px solid #edf2f7;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        section {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 700px;
            background-color: #ffffff;
            border-color: #e8e5ef;
            border-radius: 2px;
            border-width: 1px;
            box-shadow: 0 2px 0 rgba(0, 0, 150, 0.025), 2px 4px 0 rgba(0, 0, 150, 0.015);
            margin: 0 auto;
            padding: 10px 16px;
            width: 700px;
        }

        footer {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 570px;
            margin: 0 auto;
            padding: 25px;
            text-align: center;
            width: 570px;
        }

        footer p {
            color: #b0adc5;
            font-size: 12px;
            text-align: center;
        }

        footer a {
            color: #b0adc5;
            text-decoration: underline;
        }

        .no-whitespace-wrap {
            white-space: nowrap;
        }

        table {
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 100%;
            margin: 30px auto;
            width: 100%;
        }

        table th {
            border-bottom: 1px solid #edeff2;
            margin: 0;
            padding-bottom: 8px;
        }

        table td {
            color: #74787e;
            font-size: 15px;
            line-height: 18px;
            margin: 0;
            padding: 10px 0;
        }

        .content-cell {
            max-width: 100vw;
            padding: 32px;
        }
    </style>
</head>

<body
    style="
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    -premailer-width: 100%;
    background-color: #edf2f7;
    border-bottom: 1px solid #edf2f7;
    border-top: 1px solid #edf2f7;
    margin: 0;
    padding: 0;
    width: 100%;
">
    @php
        $logoPath = public_path('assets/logo/indigo.png');
        $logoBs64 = base64_encode(file_get_contents($logoPath));
        $user = $order->client;
        $wilaya = \Illuminate\Support\Facades\Storage::json('data/wilaya.json');
    @endphp
    <header>
        <a href="{{ config('app.url') }}">
            <img src="{{ $message->embed($logoPath) }}" width="150">
        </a>
    </header>

    <section
        style="
        -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            -premailer-width: 700px;
            background-color: #ffffff;
            border-color: #e8e5ef;
            border-radius: 2px;
            border-width: 1px;
            box-shadow: 0 2px 0 rgba(0, 0, 150, 0.025), 2px 4px 0 rgba(0, 0, 150, 0.015);
            margin: 0 auto;
            padding: 10px 16px;
            width: 700px;
    ">

        <h1>
            Bonjour {{ $user['name'] }},<br />
            Merci d'avoir fait du shopping avec nous! Nous sommes ravis de confirmer votre récente commande chez nous.
            Voici un récapitulatif de votre achat :
        </h1>

        <p>
            Numéro de référence de votre commande est <span style="font-weight: 600">{{ $order->ref }}</span>
        </p>
        <p>
            Date de vottre commande est <span style="font-weight: 600;">{{ $order->created_at }}</span>
        </p>

        <h2>
            Informations sur la livraison
        </h2>
        <p>
            Adresse de livraison:
            <span>{{ $order->client['address'] . ' ' . $order->client['city'] . ' ' . collect($wilaya)->firstWhere('code', $order->client['wilaya'])['name'] }}</span>
        </p>



        <table>
            <thead>
                <tr>
                    <th style="text-align: start; padding: 4px 8px">Produit</th>
                    <th style="text-align: start; padding: 4px 8px">Qte</th>
                    <th style="text-align: start; padding: 4px 8px">PU</th>
                    <th style="text-align: start; padding: 4px 8px">Total</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $totalQte = 0;
                @endphp
                @foreach ($orderProducts as $orderedProduct)
                    @php
                        $product = json_decode($orderedProduct['product'], true);
                        $qte = $orderedProduct['qte'];
                        $total = $orderedProduct['total'];
                    @endphp
                    <tr>
                        <td style="padding: 2px 8px;">{{ $product['name'] }}</td>
                        <td style="padding: 2px 8px; white-space: nowrap;">{{ $qte }}</td>
                        <td style="padding: 2px 8px; white-space: nowrap;">
                            @if ($product['promo'])
                                {{ $product['price'] - ($product['price'] * $product['promo']) / 100 }} DZD
                            @else
                                {{ $product['price'] }} DZD
                            @endif
                        </td>
                        <td style="padding: 2px 8px; white-space: nowrap;">{{ $total }} DZD</td>
                    </tr>
                    @php
                        $totalQte += $qte;
                    @endphp
                @endforeach
            </tbody>
        </table>

        <div style="margin-bottom: 8px; font-size: 15px;">
            <span style="font-weight: 600;">Total Quantité:</span> {{ $totalQte }} <br />
            <span style="font-weight: 600;">Sous total:</span> {{ $order->sub_total }} DZD<br />
            <span style="font-weight: 600;">Livraison:</span> {{ $order->shipping_cost }} DZD<br />
            <span style="font-weight: 600;">Total à payé:</span> {{ $order->total }} DZD
        </div>

        <p>
            Notre service commercial vous contactera pour toute
            information supplémentaire, soyez disponible s'il vous
            plaît.
        </p>
        <p>
            Vous pouvez vérifier l'état de votre commande à tout
            moment en suivant le lien ci-dessous :
            <a href="{{ $orderLink }}">
                Ma commande
            </a>
        </p>
        <p>
            Si vous avez des questions ou avez besoin d'aide supplémentaire concernant votre commande, n'hésitez pas à
            contacter notre équipe de support client au [e-mail ou numéro de téléphone du support client].
            <br />
            Merci encore de nous avoir choisis. Nous espérons avoir le plaisir de vous servir prochainement!
        </p>
        <p style="font-weight: 700">Cordialement,</p>
        <p style="font-weight: 700">{{ config('app.name') }}</p>

    </section>

    <footer>
        © {{ now()->year }} {{ config('app.name') }}. @lang('All rights reserved.')
    </footer>
</body>

</html>
