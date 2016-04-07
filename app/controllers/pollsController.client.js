'use strict';

(function () {
  var apiUrl = appUrl + '/api/polls';

  var $publicPollsList = document.querySelector('ul#public-polls') || null;
  function getPublicPolls (data) {
    var polls = JSON.parse(data);
    if ($publicPollsList) {
      for (var poll of polls) {
        var li = document.createElement('li');
        li.innerHTML = `<a href="/polls/${poll._id}">
                          ${poll.title}
                        </a>`;
        $publicPollsList.appendChild(li);
      }
    }
  }
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPublicPolls));
  
  var $privatePollsList = document.querySelector('ul#private-polls') || null;
  function getPrivatePolls (data) {
      var polls = JSON.parse(data);
      if ($privatePollsList) {
          for (var poll of polls) {
              var li = document.createElement('li');
							var link = document.createElement('a');
							link.href = '/polls/'+poll._id;
							link.innerText = poll.title;
							var deleteButton = document.createElement('button');
							deleteButton.innerText = 'Delete';
							deleteButton.addEventListener('click', function () {
								ajaxFunctions.ajaxRequest('DELETE', apiUrl + '/' +poll._id, function() {
									window.location.reload();
								});
							})
							li.appendChild(link);
							li.appendChild(deleteButton);
							$privatePollsList.appendChild(li);
          }
      }
  }
	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl+'/private', getPrivatePolls));

  var newPollForm = document.getElementById('new-poll-form') || null;
  newPollForm && newPollForm.addEventListener('submit', function newPollHandler(e) {
    e.preventDefault();
    var poll = {
      title: this.title.value,
      options: this.options.value.split('\n'),
    };
    ajaxFunctions.ajaxRequest('POST', apiUrl, poll, function(response) {
      window.location.assign('/');
    });
  });
})();
