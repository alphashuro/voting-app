'use strict';

(function () {

   var $profileId = document.querySelector('#profile-id') || null;
   var $profileUsername = document.querySelector('#profile-username') || null;
   var $profileRepos = document.querySelector('#profile-repos') || null;
   var $displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/user';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
		 try {
      var user = JSON.parse(data);

			if ($displayName !== null) {
				 $displayName.innerHTML = user.github.displayName || user.github.username;
			}

      if ($profileId !== null) {
         updateHtmlElement(user, profileId, 'id');   
      }

      if ($profileUsername !== null) {
         updateHtmlElement(user, profileUsername, 'username');   
      }

      if ($profileRepos !== null) {
         updateHtmlElement(user, profileRepos, 'publicRepos');   
      }
		 } catch(e) {
			 console.log(data, e)
			 $displayName.innerHTML = 'Anonymous';
		 }
   }));
})();
