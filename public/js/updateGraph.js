
// Define graph -----------------------------------------------------------------

var ctx = document.getElementById("myLiveChart");

var values = [];
var values2 = [];
var lbls = [];



var data = {
    labels: lbls,
    datasets: [{
        label: 'Wind power estimation',
        data: values,
        backgroundColor:
            'rgba(255, 99, 132, 0.2)'
        ,
        borderColor:
            'rgba(255,99,132,1)'
        ,
        borderWidth: 1
    },
        {
            label: 'Power usage',
            data: values2,
            backgroundColor:
                'rgba(0, 200, 255, 0.2)'
            ,
            borderColor:
                'rgba(0,200,255,1)'
            ,
            borderWidth: 1
        }]
};

var options =  {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                max: 21,
                min: 10
            }

        }]
    },
    responsive: true,
    maintainAspectRatio: false
};

Chart.defaults.global.animation = {
    easing: 'easeInOutQuad',
    duration: 1000
};

var myLiveChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

//-------------------------------------------------

//------------------------SLIDER---------------
$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 0,
        values: [ 0, 0],
        slide: function( event, ui ) {
            myLiveChart.data.labels = timeArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            myLiveChart.data.datasets[0].data = windArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            myLiveChart.data.datasets[1].data = usageArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            //alert(timeArr.length);
            myLiveChart.update();
            $( "#from" ).html('From: '+timeArr[ui.values[ 0 ]]);
            $( "#to" ).html('To: '+timeArr[ui.values[ 1 ]-1]);
        }
    });
} );
//---------------------------------------------

var call = 'http://opendata-download-metfcst.smhi.se/';


var long = '16';
var lat= '58';

var api = call+'api/category/pmp2g/version/2/geotype/point/lon/'+long+'/lat/'+lat+'/data.json';


var completeArray = [];
//        var inc = 0;
//        // Call api and get data:
//        function updateArray(array, data, inc){
//            //id = data.timeSeries.length-1;
//            inc++;
//            array.push(data);
//            alert(JSON.stringify(array[0].timeSeries[0].validTime));
//        }
//
//        $.getJSON(api, function(data){
//            { updateArray(completeArray,data, inc); }
//        });

var longLatArr  = [];
function fetchData(callback) {
    var requests = [];
     longLatArr = [[58.376551, 13.247059, 807,554],
        [65.267064, 17.223498, 756,333],
        [63.468186, 16.082271, 622,226],
        [63.480455, 15.063953, 616,254],
        [55.833860, 13.212303, 608,430],
        [61.030268, 16.553707, 484,174],
        [56.928219, 12.715548, 472,260],
        [57.002863, 16.411366, 392,202],
        [67.169831, 22.044278, 388,162],
        [61.384392, 15.256475, 273,131],
        [57.616252, 14.533745, 266,126],
        [58.392742, 14.976637, 171,142],
        [59.385506, 13.749890, 171,61],
        [57.078839, 18.236746, 171,126],
        [56.126422, 14.642675, 69,51],
        [59.001584, 15.368785, 68,45],
        [59.566337, 19.877352, 61,26],
        [60.077216, 18.562342, 12,13],
        [57.086999, 15.272239, 8,8]];
    for (var i = 0; i <longLatArr.length; i++) {
        var lat = longLatArr[i][0];
        var long = longLatArr[i][1];

        var api = call+'api/category/pmp2g/version/2/geotype/point/lon/'+long+'/lat/'+lat+'/data.json';
        requests.push($.getJSON(api))
    }

    $.when.apply($, requests).then(function () {
        var array = $.map(arguments, function (arg) {
            return arg[0];
        });
        callback(array);
    })
}
var test = "asd";
var timeArr = [];
var windArr = [];
var usageArr = [];
var dateArr = [];
fetchData(function (array) {

    //alert(JSON.stringify(array[1].timeSeries[0].validTime))



    var min = array[0].timeSeries.length;
    for(var check = 1; check<array.length; check++){
        if(array[0].timeSeries.length<min){
            min = array[0].timeSeries.length;
        }
    }
    var prevDate2 = "";

    var prevTot = 0;
    for(var k = 0; k<min; k++){
       var str =  array[0].timeSeries[k].validTime;
        str = str.substring(0, str.length - 1);




        var date = new Date(parseInt(str.substring(0, 4)), parseInt(str.substring(5, 7))-1, parseInt(str.substring(8, 10)), parseInt(str.substring(11, 13)), 0, 0, 0);
        //alert(str);

        var timeDiff = "";
        var diffHours = "";
       // alert(k);
        if(k != 0) {

            // add extra hours on timeLabel
            timeDiff = Math.abs(prevDate2.getTime() - date.getTime());
            diffHours = Math.ceil(timeDiff / (1000 * 3600));
            //alert(diffHours);
            for (var n = 1; n < diffHours; n++) {
                var newDate = new Date(prevDate2.getTime() + (1000 * 3600) * n);
                dateArr.push(newDate.getTime());
                timeArr.push(newDate.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':00:00');
            }

        }
        dateArr.push(date.getTime());
        timeArr.push(date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':00:00');

            // alert(date.getFullYear());
            // alert(date.getMonth());
            // alert(date.getDate());
            // alert(date.getHours());
            //timeArr.push()

        var tot = 0;
        for (var j = 0; j<array.length; j++){
            //Using formula to calculate power from turbines


            var wind = array[j].timeSeries[k].parameters[4].values[0];
            //Biggest turbine
            var area = Math.pow(70, 2)*Math.PI;
            //Area realtive to maximum production
            var accArea = area*longLatArr[j][3]/longLatArr[j][2];

            var nrOfTurbines = longLatArr[j][3];

            var eff = 0.4;

            // total value power

            var watt = 0.5*eff*accArea*Math.pow(wind,3) * nrOfTurbines;

            // if(j == 0 && k == 0){
            //     alert(wind);
            //     alert(area);
            //     alert(accArea);
            //     alert(nrOfTurbines);
            //     alert(watt);
            // }
            tot += watt/1000000000; //Convert to mega watt
        }
        if(k != 1){
            for (var n = 1; n < diffHours; n++) {
                var add = (prevTot)+(tot-prevTot)*(n/(diffHours));
                windArr.push(add+11);
            }
        }

        // add base power
        windArr.push(tot+11);


        prevTot = tot;
        prevDate2 = date;

    }
    //alert(JSON.stringify(array[1].timeSeries[30].parameters[4].values[0]));
    //alert(JSON.stringify(windArr));
    //alert(JSON.stringify(timeArr));
    myLiveChart.data.labels = timeArr;
    myLiveChart.data.datasets[0].data = windArr;
   // myLiveChart.data.datasets[1].data = windArr;

    $.getJSON( "js/varden.json", function( values ) {
        //alert(JSON.stringify(values));


        var startFrom = 5; // what time does prognose start?
        var currTime = startFrom;
        var prevDate = "";
        for(var l = 0; l < timeArr.length; l++){
            //Convert to date




            //var date = new Date(parseInt(timeArr[l].substring(0, 4)), parseInt(timeArr[l].substring(5, 7)), parseInt(timeArr[l].substring(8, 10)), parseInt(timeArr[l].substring(11, 13)), 0, 0, 0);
            var date = new Date (dateArr[l]);
            if(l == 13){

                // alert(date.getFullYear());
                // alert(date.getMonth());
                // alert(date.getDate());
                // alert(date.getHours());
            }

            var rounded = parseFloat(values[date.getHours()].Used)/1000;
            //var rounded = Math.round();
            usageArr.push(rounded);
            //alert(data[startFrom+currTime].Avr);
            currTime++;
            prevDate = date;
        }
        //alert(JSON.stringify(usageArr));
        myLiveChart.data.datasets[1].data = usageArr;
        //alert(JSON.stringify(rounded));
        myLiveChart.update();
    });

    myLiveChart.update();
    // init min max on slider

    $('#slider-range').slider( "option", "min", 0);
    $('#slider-range').slider( "option", "max", timeArr.length-1);
    $('#slider-range').slider( "option", "values", [0, timeArr.length-1]);
    $( "#from" ).html('From: '+timeArr[0]);
    $( "#to" ).html('To: '+timeArr[timeArr.length-1]);

});






