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
  const refreshStream = function () {
    // clear the tweets so we can rebuild it
    $('.stream').empty();

    // shows the tweets from newest to oldest
    var index = streams.home.length - 1;
    while(index >= 0) {
      var tweet = streams.home[index];
      $('.stream').append(`<li><span class="${tweet.user}">@${tweet.user}</span> : <span class="message">${tweet.message}</span> || <span class="timestamp">${tweet.created_at.getHours()}:${tweet.created_at.getMinutes()}:${tweet.created_at.getSeconds()} - ${tweet.created_at.toDateString()}</span></li>`);
      index -= 1;
    }
  }

  // Handlers
  // Refresh stream every time the button is clicked
  $body.on('click', 'button', refreshStream);

  // Allow the user to click on a username to see that user's timeline.
  // Add a class of <username> to each tweet with the users name so that when it is clicked we can filter out only their tweets?
  // I need to breakup the tweet into spans of "username" "tweet" "timestamp"


  // Initial tweets
  refreshStream();
});