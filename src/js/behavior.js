
(function($,wnd,undefined) {
    $(wnd.document.body).ready(function() {

		chrome.tabs.captureVisibleTab(null,function(dataUrl) {
			$("#content").append("<div id='image'><img src='" + dataUrl + "'/></div>");
		});
		
		var oauth = ChromeExOAuth.initBackgroundPage({
			'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
			'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
			'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
			'consumer_key': 'anonymous',
			'consumer_secret': 'anonymous',
			'scope': 'http://www.blogger.com/feeds',
			'app_name': 'Chrome-ExampleExt-1'
		});

		oauth.authorize(function(){
			
			// $("#footer").append("<p>").text("Retrieving Blog data....");
			// $("#footer").append("<p>").text("Creating Blogger service....");
			
			var request = {
				"method": "GET",
				"parameters": {"alt": "json"}
			};
			
			oauth.sendSignedRequest('http://www.blogger.com/feeds/default/blogs',
				function(respText, xhr) {
					var content = $("#content");
					var rootFeeds = JSON.parse(respText);
					var entries = rootFeeds.feed.entry;
					if (!entries) {
						 content.append("<h2>Sorry, No Blogs found</h2>");
					} else {
						content.append("<H1>Blogs available: </h1>");
						var article = [];
						var i=0;
						for(var j=0;j<entries.length;j++) {
							article[i++] = "<article><header><h1><a href='";
							article[i++] = entries[j].link[1].href;
							article[i++] = "'>" + entries[j].title['$t'];
							article[i++] = "</a></h1><p>Last updated on <time datetime=";
							article[i++] = entries[j].updated['$t'];
							article[i++] = ">" + entries[j].updated['$t'];
							article[i++] = "</time></p></header></article>";
						}
						content.append(article.join(''));
						//.attr("href", item.link[0]getHref());
					}
				},
				request
			);
			
		});
	});

})(jQuery,this);
