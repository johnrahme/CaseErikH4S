@extends('layouts.default')
@section('content')
    {{--@include('drafts.welcome')--}}
    {!! $page['content'] !!}

    <canvas id="myLiveChart" width="120" height="240"></canvas>

@endsection

@section('scripts')
    <script src="{{asset('js/Chart.bundle.js')}}"></script>

    <script src = "{{asset('js/updateGraph.js')}}"></script>



    {{--<script>--}}
        {{--var ctx = document.getElementById("myChart");--}}
        {{--var myChart = new Chart(ctx, {--}}
            {{--type: 'bar',--}}
            {{--data: {--}}
                {{--labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],--}}
                {{--datasets: [{--}}
                    {{--label: '# of Votes',--}}
                    {{--data: [12, 19, 3, 5, 2, 3],--}}
                    {{--backgroundColor: [--}}
                        {{--'rgba(255, 99, 132, 0.2)',--}}
                        {{--'rgba(54, 162, 235, 0.2)',--}}
                        {{--'rgba(255, 206, 86, 0.2)',--}}
                        {{--'rgba(75, 192, 192, 0.2)',--}}
                        {{--'rgba(153, 102, 255, 0.2)',--}}
                        {{--'rgba(255, 159, 64, 0.2)'--}}
                    {{--],--}}
                    {{--borderColor: [--}}
                        {{--'rgba(255,99,132,1)',--}}
                        {{--'rgba(54, 162, 235, 1)',--}}
                        {{--'rgba(255, 206, 86, 1)',--}}
                        {{--'rgba(75, 192, 192, 1)',--}}
                        {{--'rgba(153, 102, 255, 1)',--}}
                        {{--'rgba(255, 159, 64, 1)'--}}
                    {{--],--}}
                    {{--borderWidth: 1--}}
                {{--}]--}}
            {{--},--}}
            {{--options: {--}}
                {{--scales: {--}}
                    {{--yAxes: [{--}}
                        {{--ticks: {--}}
                            {{--beginAtZero:true--}}
                        {{--}--}}
                    {{--}]--}}
                {{--}--}}
            {{--}--}}
        {{--});--}}




        {{--function funca(chart){--}}
            {{--chart.data.datasets[0].data[2] = chart.data.datasets[0].data[2]+1;--}}
            {{--//alert(chart.data.datasets[0].data[2]);--}}
            {{--chart.update();--}}
        {{--}--}}
        {{--//setInterval( function() { funca(myChart); }, 1000 );--}}


    {{--</script>--}}



@endsection
