$(document).ready(function(){
  var $body = $('body');
  //$body.html('');

  // Generates a list of 10 random tweets based on the streams.home object length.
  // var index = streams.home.length - 1;
  // while(index >= 0){
  //   var tweet = streams.home[index];
  //   var $tweet = $('<div></div>');
  //   // Put the info from the object into the div
  //   $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //   // Append that div to the body
  //   $tweet.appendTo($body);
  //   index -= 1;
  // }

  // Show the user new tweets somehow. (You can show them automatically as they're created, or create a button that displays new tweets.)
  const refreshStream = function(user) {
    // clear the tweets so we can rebuild it
    $('.stream').empty();
    var allTweets = streams.home.slice();
    // If no user passed in then show all tweets
    if (user) {
      allTweets = allTweets.filter(function(tweet) {
        return tweet.user === user;
      });
    }

    // shows the tweets from newest to oldest
    var index = allTweets.length - 1;
    while(index >= 0) {
      var tweet = allTweets[index];
      // split out the hashtag if there is one in the tweet
      var tweetMessage = tweet.message.split("#")[0];
      var tweetHashtag = tweet.message.split("#")[1] ? `<span class="hashtag">#${tweet.message.split("#")[1]}</span>` : '';
      $('.stream').append(`<li><span class="${tweet.user}">@${tweet.user}</span> : <span class="message">${tweetMessage}</span> ${tweetHashtag} || <span class="timestamp">${tweet.created_at.getHours()}:${tweet.created_at.getMinutes()}:${tweet.created_at.getSeconds()} - ${tweet.created_at.toDateString()}</span></li>`);
      index -= 1;
    }
  }

  // Handlers
  // Refresh stream every time the button is clicked
  $('#refreshButton').on('click', function() { refreshStream(); });

  $('.stream').on('click', 'span', function() {
    // When the username span is clicked refresh the stream to only show their tweets
    let elementClicked = $(this).attr('class')
    if (users.includes(elementClicked)) {
      refreshStream(elementClicked);
    }
  });

  // Initial tweets
  refreshStream();
});