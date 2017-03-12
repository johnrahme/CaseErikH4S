

<!-- Static navbar -->
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Optigrid</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class = @if($active == 'welcome')"active"@endif><a href="{{url('/')}}">Hem</a></li>
                <li class = @if($active == 'data')"active"@endif><a href="{{url('/data')}}">Data used</a></li>
                <li class = @if($active == 'contact')"active"@endif><a href="{{url('/contact')}}" >Contact</a>
                    <!-- Button trigger modal --></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div><!--/.container-fluid -->
</nav>