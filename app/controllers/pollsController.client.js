'use strict';

(function () {
  const apiUrl = appUrl + '/api/polls';

  const $publicPollsList = document.querySelector('ul#public-polls') || null;
  function getPublicPolls (data) {
    const polls = JSON.parse(data);
    if ($publicPollsList) {
      for (const poll of polls) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/polls/${poll._id}">
                          ${poll.title}
                        </a>`;
        $publicPollsList.appendChild(li);
      }
    }
  }
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPublicPolls));

  var newPollForm = document.getElementById('new-poll-form') || null;
  newPollForm && newPollForm.addEventListener('submit', function newPollHandler(e) {
    e.preventDefault();
    const poll = {
      title: this.title.value,
      options: this.options.value.split('\n'),
    };
    ajaxFunctions.ajaxRequest('POST', apiUrl, poll, function(response) {
      console.log(response);
    });
  });
})();
