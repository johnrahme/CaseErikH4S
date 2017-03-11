<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap/bootstrap.css') }}">
    @yield('styles')
    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body background="{{ asset('img/background.jpg') }}">

@include('layouts.navbar')
<div class="container clear-top" style="box-shadow: 0px 0px 5px 2px #888888; background-color: #fff; padding: 18px">
    @yield('content')
</div>


<!-- Scripts -->
    <script type="text/javascript" src="{{ asset('js/jquery-2.2.2.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/bootstrap/tether.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/bootstrap/bootstrap.min.js') }}"></script>
    @yield("scripts")
</body>
</html>
