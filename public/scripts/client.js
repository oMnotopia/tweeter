/* eslint-disable no-undef */
//Loops through "tweets" array adding each tweet to the HTML section old-tweets.
//Parameter (tweets) -> Array of objects containing data on tweets.
const renderTweets = function(tweets) {
  const oldTweetContainer = $("#old-tweets");
  oldTweetContainer.empty();

  for (const tweet of tweets) {
    const tweetValue = createTweetElement(tweet);
    $('#old-tweets').prepend(tweetValue);
  }
};

//Generates HTML for individual tweets that will be displayed on webpage.
//Parameter (tweetData) -> An object containing user data.
//Return ($tweet) -> Generated HTML for displaying tweet.
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

//Makes a GET request to the database. On a successful request calls render tweets with the database information.
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    success: function(data) {
      renderTweets(data);
    },
    error: function(err) {
      console.log(`${err.status} ${err.statusText}`);
    },
    dataType: "json",
  });
};

$(document).ready(() => {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $(".error").slideUp(400, function() {
      const tweetLength = $("#tweet-text")[0].value.length;
      $(this).empty();
      if (tweetLength === 0) {
        $(this).append("<i class='fa-solid fa-triangle-exclamation'></i>Your tweet must contain text!<i class='fa-solid fa-triangle-exclamation'></i>").slideDown();
        return;
      }
      if (tweetLength > 140) {
        $(this).append("<i class='fa-solid fa-triangle-exclamation'></i>Your tweet is too long please make it 140 characters or less!<i class='fa-solid fa-triangle-exclamation'></i>").slideDown();
        return;
      }
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: function() {
          $("#tweet-text").val("");
          loadTweets();
        },
        error: function(err) {
          console.log(`${err.status} ${err.statusText}`);
        },
      });
    });
  });
  loadTweets();
});