<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name', 'OS tech') }}</title>
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
            Les informations d'identification de votre compte sont
        </h1>

        <p>
            Adresse e-mail: <span style="font-weight: 600">{{ $user['email'] }}</span>
        </p>
        <p>
            Mot de passe: <span style="font-weight: 600;">{{ $user['password'] }}</span>
        </p>

        <p>{{ route('login') }}<p>

        <p style="font-weight: 700">Cordialement,</p>
        <p style="font-weight: 700">{{ config('app.name') }}</p>

    </section>

    <footer>
        © {{ now()->year }} {{ config('app.name') }}. @lang('All rights reserved.')
    </footer>
</body>

</html>
