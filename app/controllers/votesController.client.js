(function() {
    var pollId = window.location.pathname.split('/').pop();
    var apiUrl = appUrl + `/api/polls/${pollId}/votes`;

    var $votesStats = document.getElementById('vote-stats');
    function getVotes(data) {
        var votes = JSON.parse(data);
        var totals = votes.reduce(function(previous, current) {
            previous[current.option] = previous[current.option] ? previous[current.option] + 1 : 1;
            return previous;
        }, {});
        if ($votesStats) {
            for (var total in totals) {
                if (totals.hasOwnProperty(total)) {
                    var $vote = document.createElement('p');
                    $vote.innerText = `${total}: ${totals[total]}`;
                    $votesStats.appendChild($vote);
                }
            }
        }
    }
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getVotes));

    var voteForm = document.querySelector('form#vote');
    if (voteForm) {
        voteForm.addEventListener('submit', function voteHandler(e) {
            e.preventDefault();
            ajaxFunctions.ajaxRequest('POST', apiUrl, { option: this.options.value }, function(res) {
                console.log(res);
            });
        });
    }
})();