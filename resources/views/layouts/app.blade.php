<!doctype html>
<html lang="en">


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Sistema</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
    />
    <meta name="description" content="This is an example dashboard created using build-in elements and components.">

    <meta name="msapplication-tap-highlight" content="no">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{asset('/css/style.css')}}" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="{{asset('/fonts/font-awesome-4.7.0/css/font-awesome.min.css')}}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{asset('/fonts/iconic/css/material-design-iconic-font.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('/css/componente.css')}}">
    
</head>

<body>

    <div id="raiz-index"></div>
    <input type="hidden" id="token1" value="{{ csrf_token() }}">
    <div class="app-drawer-overlay d-none animated fadeIn"></div>

    <script type="text/javascript" src="{{ asset('/js/app9.js') }}"></script>
    <script type="text/javascript" src="{{asset('/assets/scripts/main.cba69814a806ecc7945a.js')}}"></script>

</body>

</html>
