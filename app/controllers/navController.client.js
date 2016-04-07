(function() {
	var userUrl = appUrl + '/api/user';
	
	var $nav = document.getElementById('navigation');
	var links = {
		common: [
			{ title: 'Home', href: '/', },
		],
		public: [
			{ title: 'Login With Github', href: '/auth/github' },
		],
		private: [
			{ title: 'My Polls', href: '/mypolls' },
			{ title: 'New Poll', href: '/newpoll' },
			{ title: 'Logout', href: '/logout' },
		],
	};
	
	function addLinks(node, linksList) {
		linksList.forEach(function (item) {
			var link = document.createElement('a');
			link.className = 'menu';
			link.href = item.href;
			link.innerText = item.title;
			node.appendChild(link);
		});
	}
	
	function addNavLinks(linksList) {
		if ($nav) {
			addLinks($nav, linksList)
		}
	}
	addNavLinks(links.common);
	
	ajaxFunctions.ready(
		ajaxFunctions.ajaxRequest('GET', userUrl, function(data) {
		try {
			var user = JSON.parse(data);
			if (user) {
				addNavLinks(links.private);
			}
		} catch (e) {
			console.log('not logged in');
			addNavLinks(links.public);
		}
	}));
})();
