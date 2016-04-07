(function () {
  var pollId = window.location.pathname.split('/').pop();
  var apiUrl = appUrl + '/api/polls/'+pollId;
  
  var $pollTitle = document.getElementById('poll-title');
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
		
		var userUrl = appUrl + '/api/user';
		var $addOptionForm = document.createElement('form');
		$addOptionForm.innerHTML = `	<label for="option">Add a new option</label>
																<input type="text" name="option">
																<input type="submit" value="Add">`;
		$addOptionForm.addEventListener('submit', function addOptionHandler(e) {
			e.preventDefault();
			ajaxFunctions.ajaxRequest('PUT', apiUrl, {option: this.option.value}, function(response) {
				window.location.reload();
			});
		});
		var $addOptionContainer = document.getElementById('add-option-container');
		function injectAddOptionForm (data) {
			try {
				var user = JSON.parse(data);
				if (user._id === poll.userId) {
					if ($addOptionContainer) {
						$addOptionContainer.appendChild($addOptionForm);
					}
				}
			} catch (e) {
				// console.log(e);
			}
		}
		ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', userUrl, injectAddOptionForm));
  }
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPoll));
	
	
})();
