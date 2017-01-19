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
      var $tweet = $('<li></li>');
      // Put the info from the object into the div
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      // Append that div to the body
      $tweet.appendTo($('.stream'));
      index -= 1;
    }
  }
  // Initial tweets
  refreshStream();

  // Refresh stream every time the button is clicked
  $body.on('click', 'button', refreshStream);

});