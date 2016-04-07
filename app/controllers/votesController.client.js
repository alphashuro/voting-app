(function() {
    var pollId = window.location.pathname.split('/').pop();
    var apiUrl = appUrl + '/api/polls/'+pollId+'/votes';

    var $votesStats = document.getElementById('vote-stats');
    function getVotes(data) {
        var votes = JSON.parse(data);
				console.log(votes);
        var totals = votes.reduce(function(previous, current) {
            previous[current.option] = previous[current.option] ? previous[current.option] + 1 : 1;
            return previous;
        }, {});
        if ($votesStats) {
						 // Load the Visualization API and the corechart package.
						google.charts.load('current', {'packages':['corechart']});

						// Set a callback to run when the Google Visualization API is loaded.
						google.charts.setOnLoadCallback(drawChart);

						// Callback that creates and populates a data table,
						// instantiates the pie chart, passes in the data and
						// draws it.
						function drawChart() {

							// Create the data table.
							var data = new google.visualization.DataTable();
							data.addColumn('string', 'Option');
							data.addColumn('number', 'Votes');
							var rows = [];
							for (var prop in totals) {
								if (totals.hasOwnProperty(prop)) {
									rows.push([prop, totals[prop]]);
								}
							}
							data.addRows(rows);

							// Set chart options
							var options = {'title':'Current Vote Stats',
														'width':400,
														'height':300};

							// Instantiate and draw our chart, passing in some options.
							var chart = new google.visualization.PieChart($votesStats);
							chart.draw(data, options);
						}

        }
    }
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getVotes));

    var voteForm = document.querySelector('form#vote');
    if (voteForm) {
        voteForm.addEventListener('submit', function voteHandler(e) {
            e.preventDefault();
            ajaxFunctions.ajaxRequest('POST', apiUrl, { option: this.options.value }, function(res) {
                window.location.reload();
            });
        });
    }
})();
