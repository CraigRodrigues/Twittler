$(document).ready(function(){
  const refreshStream = function(element) {
    // Clear the tweets so we can rebuild it
    $('.stream').empty();
    $('.hashtags').empty();

    // Reset the new tweet counter only if we refreshed all the tweets and not just filtered some out
    if (!element) {
      streams.newTweetCount = 0;
      // Title and text reset on tweet stream refresh
      document.title = 'Twittler';
      $('#refreshArea').children('p').text('Refresh Tweets');
      $('h2').text('Tweet Stream');
    }

    var allTweets = streams.home.slice();
    // If no user/hashtag/search passed in then show all tweets
    if (users.includes(element)) {
      $('h2').text(`${element}'s Stream!`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.user === element;
      });
    } else if (typeof element === 'string' && element.startsWith('#')) {
      $('h2').text(`Hashtag: ${element}`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.message.includes(element);
      });
    } else if (typeof element === 'string') {
      $('h2').text(`Searching for: ${element}`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.message.includes(element) || tweet.user.includes(element);
      });
    }

    // Render tweets
    var index = allTweets.length - 1;
    while(index >= 0) {
      var tweet = allTweets[index];
      // Split out the hashtag if there is one in the tweet
      var tweetMessage = tweet.message.split("#")[0];
      var tweetHashtag = tweet.message.split("#")[1] ? `<span class="hashtag">#${tweet.message.split("#")[1]}</span>` : '';

      $('.stream').append(`<li><span class="${tweet.user}">@${tweet.user}</span> : <span class="message">${tweetMessage}</span> ${tweetHashtag} || <span class="timestamp">${tweet.created_at.getHours()}:${tweet.created_at.getMinutes()}:${tweet.created_at.getSeconds()} - ${tweet.created_at.toDateString()}</span></li>`);
      index -= 1;
    }

    // Render hashtags list
    renderWorldwideTrends();
  }

  const renderWorldwideTrends = function() {
    for (hashtag in streams.hashtags) {
      $('.hashtags').append(`<li>${hashtag} - ${streams.hashtags[hashtag]}</li>`);
    }
  }

  // Handlers
  $('#refreshArea').on('click', function() { refreshStream(); });

  $('.stream').on('click', 'span', function() {
    // When the username span is clicked refresh the stream to only show their tweets
    let elementClicked = $(this).attr('class')
    if (users.includes(elementClicked)) {
      refreshStream(elementClicked);
    }
    if (elementClicked === 'hashtag') {
      refreshStream($(this).text());
    }
  });

  $('.searchButton').click(function() {
    let searchTerm = $(this).parent().find('.searchInput');
    refreshStream(searchTerm.val());
    searchTerm.val('');
    console.log("Handler for submit button called.");
  });

  // Initial tweets
  refreshStream();
});