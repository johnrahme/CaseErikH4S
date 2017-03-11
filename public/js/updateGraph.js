
// Define graph -----------------------------------------------------------------

var ctx = document.getElementById("myLiveChart");

var values = [20];
var values2 = [20];
var lbls = [20];

for (var i = 0; i < 20; i++) {
    values[i] = Math.sin(i)*10;
    values2[i] =  -values[i]
    lbls[i] = i;
}

var data = {
    labels: lbls,
    datasets: [{
        label: '# of Votes',
        data: values,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)'
        ],
        borderWidth: 1
    },
        {
            label: 'Some other stuff',
            data: values2,
            backgroundColor: [
                'rgba(0, 200, 255, 0.2)'
            ],
            borderColor: [
                'rgba(0,200,255,1)'
            ],
            borderWidth: 1
        }]
};

var options =  {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                max: 10,
                min: 7
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
     longLatArr = [[58.376551, 13.247059, 807],
        [65.267064, 17.223498, 756],
        [63.468186, 16.082271, 622],
        [63.480455, 15.063953, 616],
        [55.833860, 13.212303, 608],
        [61.030268, 16.553707, 484],
        [56.928219, 12.715548, 472],
        [57.002863, 16.411366, 392],
        [67.169831, 22.044278, 388],
        [61.384392, 15.256475, 273],
        [57.616252, 14.533745, 266],
        [58.392742, 14.976637, 171],
        [59.385506, 13.749890, 171],
        [57.078839, 18.236746, 171],
        [56.126422, 14.642675, 69],
        [59.001584, 15.368785, 68],
        [59.566337, 19.877352, 61],
        [60.077216, 18.562342, 12],
        [57.086999, 15.272239, 8]];
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
fetchData(function (array) {

    //alert(JSON.stringify(array[1].timeSeries[0].validTime))



    var min = array[0].timeSeries.length;
    for(var check = 1; check<array.length; check++){
        if(array[0].timeSeries.length<min){
            min = array[0].timeSeries.length;
        }
    }
    for(var k = 0; k<min; k++){
        timeArr.push(array[0].timeSeries[k].validTime);
        var tot = 0;
        for (var j = 0; j<array.length; j++){
            tot += array[j].timeSeries[k].parameters[4].values[0]*longLatArr[j][2]/50000;
        }
        windArr.push(tot+8);

    }
    //alert(JSON.stringify(array[1].timeSeries[30].parameters[4].values[0]));
    //alert(JSON.stringify(windArr));
    //alert(JSON.stringify(timeArr));
    myLiveChart.data.labels = timeArr;
    myLiveChart.data.datasets[0].data = windArr;
   // myLiveChart.data.datasets[1].data = windArr;

    $.getJSON( "js/varden.json", function( values ) {
        //alert(JSON.stringify(values));


        var startFrom = 14;
        var currTime = 1;
        for(var l = 0; l < timeArr.length; l++){
            if(currTime == 25){
                currTime = 1;
            }
            var rounded = parseFloat(values[startFrom+currTime].Avr)/1000000;
            //var rounded = Math.round();
            usageArr.push(rounded);
            //alert(data[startFrom+currTime].Avr);
            currTime++;
        }
        //alert(JSON.stringify(usageArr));
        myLiveChart.data.datasets[1].data = usageArr;
        //alert(JSON.stringify(rounded));
        myLiveChart.update();
    });

    myLiveChart.update();

});


//------------------------SLIDER---------------
$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 71,
        values: [ 0, 71],
        slide: function( event, ui ) {
            myLiveChart.data.labels = timeArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            myLiveChart.data.datasets[0].data = windArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            myLiveChart.data.datasets[1].data = usageArr.slice(ui.values[ 0 ],ui.values[ 1 ]);
            myLiveChart.update();
            $( "#amount" ).val(timeArr[ui.values[ 0 ]] + " - " + timeArr[ui.values[ 1 ]]);
        }
    });
} );
//---------------------------------------------

myLiveChart.data.labels = timeArr.slice(10,50);

myLiveChart.update();


