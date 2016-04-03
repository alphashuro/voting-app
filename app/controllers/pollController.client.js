(function () {
  const pollId = window.location.pathname.split('/').pop();
  const apiUrl = appUrl + `/api/polls/${pollId}`;
  
  const $pollTitle = document.querySelector('#poll-title');
  const $pollOptionsSelect = document.querySelector('select#poll-options-select');
  function getPoll (data) {
    const poll = JSON.parse(data);
    if ($pollTitle) {
      $pollTitle.innerText = poll.title;
    }
    if ($pollOptionsSelect) {
      for (const option of poll.options) {
        const $option = document.createElement('option');
        $option.setAttribute('value', option);
        $option.innerText = option;
        $pollOptionsSelect.appendChild($option);
      }
    }
  }
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPoll));
})();