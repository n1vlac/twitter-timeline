# Twitter Timeline with React #

##How to Run##

The OAuth.io integration requires the request to come from `localhost`. With Node.js, run `node server.js` from the base directory.

Go to `localhost:8080` in the browser.

##What is this?##

This is a basic timeline for your Twitter feed. I wrote this as an exercise to learn the React library by Facebook.

##Features##

1. Timeline of tweets
	- User's profile photo, name, Twitter handle, tweet content
	- Photo content displayed
	- Action buttons (reply, retweet, favorite) do not function
2. Infinite scroll
3. Click to Expand
	- Photos are enlarged to full size
	- Tweet details displayed
4. Composer
	- Posts new tweet and adds it to the top of the timeline

##Configuration##

Set your OAuth.io key in the `Common` module (`Common.js`),

Also In the `Common` module, `OFFLINE_MODE` can be toggled. In `OFFLINE_MODE`, no requests are made to the Twitter API - some cached tweets (also found in `Common`) are displayed instead. Composing a tweet does not function in this mode, and infinite scroll displays 1 additional set of tweets.

##Limitations##

The Twitter API rate limits the number of calls to pull down a user's timeline - 15 requests per 15 minutes. 

The app does not check and pull down newer tweets that are in a user's timeline since the page was loaded.