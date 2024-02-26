<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Commande n° {{ $order->ref }}</title>

    <style>
        * {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
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
    </style>

</head>

<body class="antialiased">
    @php
        $logoPath = public_path('assets/logo/indigo.png');
        $logoBs64 = base64_encode(file_get_contents($logoPath));
    @endphp
    <header class="header">
        <div>
            <img src="data:image/png;base64,{{ $logoBs64 }}" width="150">
        </div>
        <h2 class="header-title">Proforma invoce</h2>
    </header>

    <section class="section-1">
        <div style="padding: 5px 0;">
            <span class="info">Commande n°: {{ $order->ref }}</span>
            <span>Commande date: {{ $order->created_at }}</span>
        </div>
    </section>

    <section>
        <h1>Information de client</h1>
        <p>{{ $order->client['name'] }}</p>
        <p>{{ $order->client['address'] . ', ' . $order->client['city'] . ', ' . $order->client['wilaya'] }}</p>
        <p>{{ $order->client['email'] }}</p>
        <p>{{ $order->client['phone'] }}</p>
    </section>

    <section style="margin-bottom: 40px;">
        <table>
            <tr>
                <th>Ref</th>
                <th>Mode de payement</th>
                <th>Mode le livraison</th>
            </tr>
            <tr>
                <td>{{ $order->ref }}</td>
                <td>{{ $order->payment_method }}</td>
                <td>{{ $order->shipping_type }}</td>
            </tr>
        </table>
    </section>

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
