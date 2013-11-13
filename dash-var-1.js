var data = {
	labels : ["11/1","11/2","11/3","11/4","11/5","11/6","11/7"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			data : [28,48,40,19,96,27,100]
		}
	]
}

$(document).ready(function(){

	// make nav drop-down appear active if the current page is a child link
	$('.current').addClass('active');

	//Get the context of the canvas element we want to select
	var ctx = $("#salesByDayChart").get(0).getContext("2d");
	var myNewChart = new Chart(ctx).Bar(data);
});