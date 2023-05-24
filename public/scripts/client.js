/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const renderTweets = function(tweets) {
    const oldTweetContainer = $("#old-tweets");
    oldTweetContainer.empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const tweetValue = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#old-tweets').prepend(tweetValue);
    }
  };

  const createTweetElement = (tweetData) => {
    const $tweet = $(`
      <article id="tweet-test">
        <header>
          <div class="icon-name">
            <img src="${tweetData.user.avatars}" alt="avatar">
            <p>${tweetData.user.name}</p>
          </div>
          <div class="username">${tweetData.user.handle}</div>
        </header>
        <p class="old-tweet-text">${tweetData.content.text}</p>
        <footer>
          <p>${timeago.format(tweetData.created_at)}</p>
          <div class="social-tags">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
      `);
    return $tweet;
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      success: function(data) {
        renderTweets(data);
      },
      dataType: "json"
    });
  };
  
  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $(".error").slideUp(400, function() {
      const tweetLength = $("#tweet-text")[0].value.length;
      if (tweetLength === 0) {
        $(".error").text("Your tweet must contain text!");
        $(".error").slideDown();
        return;
      }
      if (tweetLength > 140) {
        $(".error").text("Your tweet is too long please make it 140 characters or less!");
        $(".error").slideDown();
        return;
      }
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: function() {
          loadTweets();
        }
      });
    });
  });
  loadTweets();
});




