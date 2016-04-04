(function () {
  var pollId = window.location.pathname.split('/').pop();
  var apiUrl = appUrl + `/api/polls/${pollId}`;
  
  var $pollTitle = document.querySelector('#poll-title');
  var $pollOptionsSelect = document.querySelector('select#poll-options-select');
  function getPoll (data) {
    var poll = JSON.parse(data);
    if ($pollTitle) {
      $pollTitle.innerText = poll.title;
    }
    if ($pollOptionsSelect) {
      for (var option of poll.options) {
        var $option = document.createElement('option');
        $option.setAttribute('value', option);
        $option.innerText = option;
        $pollOptionsSelect.appendChild($option);
      }
    }
  }
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPoll));
})();