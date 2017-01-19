$(document).ready(function(){
  var $body = $('body');
  //$body.html('');

  // Need to create random tweets and show it to the user.
  // scheduleNextTweet();

  // Generates a list of 10 random tweets based on the streams.home object length.
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    // Put the info from the object into the div
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    // Append that div to the body
    $tweet.appendTo($body);
    index -= 1;
  }
});