
var selected_chart;
var data;
var timer;

// chart thumbs click:
$(".banner-thumbs img").click(function()
{
    stopTimer();
    selectChart($(this).attr("alt"));
});

// stop auto play on chart rollover
$("#chart_div").hover(stopTimer)
    .mouseleave(startTimer);

$(window).resize(drawChart);

// load chart libraries
//google.load("visualization", "1", {packages:["corechart"]});
//google.load("visualization", "1", {packages:["treemap"]});
google.setOnLoadCallback(initCharts);

function initCharts()
{
    selectChart("pie");
    startTimer();
}

function selectChart (type)
{
    selected_chart = type;

    // deselect all thumbs
    $(".banner-thumbs img").each(function(){
        $(this).attr("src",
            "interactive/images/chart_"+$(this).attr("alt")+".png")
    });

    // select current thumb
    $("#chart_"+selected_chart).attr("src",
        "interactive/images/chart_"+selected_chart+"_sel.png");

    updateChartTitle();
    drawChart();
}

function updateChartTitle()
{
    var title;
    var href;

    switch (selected_chart){
        case "pie":
            title = "Pie Chart";
            href = "interactive/docs/gallery/piechart.html";
            break;

        case "line":
            title = "Line Chart";
            href = "interactive/docs/gallery/linechart.html";
            break;

        case "column":
            title = "Column Chart";
            href = "interactive/docs/gallery/columnchart.html";
            break;

        case "area":
            title = "Area Chart";
            href = "interactive/docs/gallery/areachart.html";
            break;

        case "tree":
            title = "Tree Map";
            href = "interactive/docs/gallery/treemap.html";
            break;

        case "dashboard":
            title = "Controls and Dashboards";
            href = "interactive/docs/gallery/controls.html";
            break;
    }

    $("#chart_title").html(
        `<b>${title}</b> - <a href="/chart/${href}" target="_top">view source</a>`);
}

function startTimer (){
    timer = setInterval(next, 5000);
}

function stopTimer (){
    clearInterval( timer );
}

function next (){
    var type = $("#chart_"+selected_chart).parent().next().children()[0].alt;
    if (type == undefined) {
        type = $(".banner-thumbs img")[0].alt;
    }
    selectChart(type);
}

function drawChart()
{
    switch (selected_chart)
    {
        case "pie":
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Task');
            data.addColumn('number', 'Hours per Day');
            data.addRows([['Work',11],['Eat',2],['Commute',2],['Watch TV',2],['Sleep',7]]);
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, {
                width: '100%',
                height: 200,
                title: '',
                backgroundColor:'#ffffff', chartArea:{left:'10%',top:'6%', width:'100%',height:'88%'}});
            break;

        case "area":
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Year');
            data.addColumn('number', 'Sales');
            data.addColumn('number', 'Expenses');
            data.addRows([
                ['2004', 1000, 400],
                ['2005', 1170, 460],
                ['2006', 660, 1120],
                ['2007', 1030, 540]
            ]);

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

            chart.draw(data, {
                width: '100%',
                height: 200,
                title: '',
                backgroundColor:'#ffffff',
                legend:"none",
                chartArea:{
                    left:50,
                    top:5,
                    width:"100%",
                    height:"85%"
                },
                hAxis: {
                    title: 'Year',
                    titleTextStyle: {
                        color: '#FF0000'
                    }
                },
                lineWidth:4,
                axisTitlesPosition:"none"
            });
            break;

        case "line":
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Year');
            data.addColumn('number', 'Sales');
            data.addColumn('number', 'Expenses');
            data.addRows([
                ['2004', 1000, 400],
                ['2009', 1170, 460],
                ['2010', 660, 1120],
                ['2011', 1030, 540]
            ]);

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

            chart.draw(data, {
                width: '100%',
                height: 200,
                title: '',
                backgroundColor:'#ffffff',
                legend:"none",
                chartArea:{
                    left:50,
                    top:5,
                    width:"100%",
                    height:"85%"
                },
                hAxis: {
                    title: 'Year',
                    titleTextStyle: {
                        color: 'red'
                    }
                },
                lineWidth:4,
                axisTitlesPosition:"none"
            });
            break;

        case "column":
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Year');
            data.addColumn('number', 'Sales');
            data.addColumn('number', 'Expenses');
            data.addRows([
                ['2004', 1000, 400],
                ['2009', 1170, 460],
                ['2010', 660, 1200],
                ['2011', 1030, 540]
            ]);

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

            chart.draw(data, {
                width: '100%',
                height: 200,
                title: '',
                backgroundColor:'#ffffff',
                legend:"none",
                chartArea:{
                    left:50,
                    top:5,
                    width:"100%",
                    height:"85%"
                },
                hAxis: {
                    title: 'Year',
                    titleTextStyle: {
                        color: 'red'
                    }
                },
                axisTitlesPosition: "none"
            });
            break;

        case "tree":
            var tree_data = new google.visualization.DataTable();
            tree_data.addColumn('string', 'Region');
            tree_data.addColumn('string', 'Parent');
            tree_data.addColumn('number', 'Market trade volume (size)');
            tree_data.addColumn('number', 'Market increase/decrease (color)');
            tree_data.addRows([
                ["Global",null,0,0],
                ["America","Global",0,0],
                ["Europe","Global",0,0],
                ["Asia","Global",0,0],
                ["Australia","Global",0,0],
                ["Africa","Global",0,0],
                ["Brazil","America",11,70],
                ["USA","America",52,80],
                ["France","Europe",42,40],
                ["Germany","Europe",31,30],
                ["UK","Europe",21,20],
                ["China","Asia",36,-10],
                ["Japan","Asia",20,-20],
                ["Mongolia","Asia",1,-15],
                ["Israel","Asia",12,-24],
                ["Iran","Asia",18,-13],
                ["Pakistan","Asia",11,-25],
                ["Egypt","Africa",21,-90],
                ["S. Africa","Africa",30,-80]
            ]);

            $("#chart_div").empty();
            var chart = new google.visualization.TreeMap(document.getElementById('chart_div'));
            chart.draw(tree_data, {headerHeight: 15, maxPostDepth: 0});
            break;

        case "dashboard":
            $("#chart_div").empty();
            $("#chart_div").html('<div id="scatterchart_div"></div>' +
                '<div id="filter_div"></div>');

            var dashboard = new google.visualization.Dashboard(
                document.getElementById('chart_div'));

            var rangeSlider = new google.visualization.ControlWrapper({
                'controlType': 'NumberRangeFilter',
                'containerId': 'filter_div',
                'options': {
                    'filterColumnLabel': 'Range',
                    'ui.labelStacking': 'vertical',
                    'ui.showRangeValues': false
                }
            });

            data = new google.visualization.DataTable();
            data.addColumn('number', 'Range');
            data.addColumn('number', 'B');
            data.addColumn('number', 'C');
            data.addColumn('number', 'D');
            data.addColumn('number', 'E');

            for (var i = 10; i < 50; i++)
            {
                var m = 13;
                var x = i;
                var y1 = Math.cos(i/m) * 10 + 10;
                var y2 = Math.cos(i/m + Math.PI) * 10 + 10;
                var y3 = Math.sin(i/m) * 10 + 10;
                var y4 = Math.sin(i/m + Math.PI) * 10 + 10;

                data.addRow([x, y1, y2, y3, y4]);
            }

            var options = {
                width: '100%',
                height: 170,
                title: '',
                legend:"none",
                lineWidth:1,
                chartArea:{left:30,top:5, width:"100%",height:"85%"},
                hAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
                axisTitlesPosition:"none",
                pointSize: 2
            };

            var chart = new google.visualization.ChartWrapper({
                'chartType': 'ScatterChart',
                'containerId': 'scatterchart_div',
                'options': options,
            });

            dashboard.bind(rangeSlider, chart);

            dashboard.draw(data);
            break;
    }
}
