<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Commande n° {{ $order->ref }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    {{-- <style>
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
            color: rgb(31, 41, 55);
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

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
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

        .header {
            margin-bottom: 40px;
        }

        .header-title {
            text-transform: uppercase;
        }

        .section-1 {
            border-top: 2px rgb(121, 0, 226) solid;
            border-bottom: 2px rgb(121, 0, 226) solid;
        }

        .section-1 .info {
            margin: 0 20px 0 0;
        }
    </style> --}}

    @vite(['resources/css/app.css'])

</head>

<body class="antialiased">
    @php
        $logoPath = public_path('assets/logo/indigo.png');
        $logoBs64 = base64_encode(file_get_contents($logoPath));
        $wilaya = Storage::json('data/wilaya.json');
    @endphp

    <header style="padding-bottom: 25px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <img src="data:image/png;base64,{{ $logoBs64 }}" width="150">
        </div>

        <div class="text-blue-500">
            N° tél: 0780115527</span>
        </div>
    </header>

    <div style="font-size: 18px; padding-bottom: 10px">
        <span style="font-weight: 600;">Commande n°:</span> {{ $order->ref }}<br />
        <span style="font-weight: 600;">Commande date:</span> {{ $order->created_at }}
    </div>

    <h2>Information de client</h2>

    <p>{{ $order->client['name'] }}</p>
    <p>{{ $order->client['address'] . ' ' . $order->client['city'] . ', ' . collect($wilaya)->firstWhere('code', $order->client['wilaya'])['name'] }}
    </p>
    <p>{{ $order->client['email'] }}</p>
    <p>{{ $order->client['phone'] }}</p>

    <table>
        <thead>
            <tr>
                <th style="text-align: start; padding: 4px 8px;">Ref</th>
                <th style="text-align: start; padding: 4px 8px;">Ref</th>
                <th style="text-align: start; padding: 4px 8px;">Ref</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $order->ref }}</td>
                <td>{{ $order->payment_method }}</td>
                <td>{{ $order->shipping_type }}</td>
            </tr>
        </tbody>
    </table>

    <section>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Produit</th>
                    <th>Qte</th>
                    <th>Prix/unité</th>
                    <th>Promotion</th>
                    <th>Total</th>
                </tr>
            </thead>
            @php
                $totalQte = 0;
                $cpt = 1;
            @endphp
            @foreach ($order->orderProducts as $item)
                <tr>
                    <td>{{ $cpt }}</td>
                    <td>{{ $item->product['name'] }}</td>
                    <td>{{ $item->qte }}</td>
                    <td style="white-space: nowrap">{{ $item->product['price'] }} DZD</td>
                    <td style="white-space: nowrap">{{ $item->product['promo'] }} %</td>
                    <td style="white-space: nowrap">{{ $item->total }} DZD</td>
                </tr>
                @php
                    $cpt++;
                    $totalQte += $item->qte;
                @endphp
            @endforeach
        </table>
    </section>

    <section>
        <p>
            Total Quantité: {{ $totalQte }}
        </p>
        <p>Sous total: {{ $order->sub_total }} DZD</p>
        <p>Livraison: {{ $order->shipping_cost }} DZD</p>
        <p>Total à payé : {{ $order->total }} DZD</p>
    </section>
</body>

</html>
