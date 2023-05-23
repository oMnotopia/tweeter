/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let tweetValue = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#old-tweets').append(tweetValue);
  }
};

const createTweetElement = (tweetData) => {
  const $tweet = $("#old-tweets").append(`
    <article>
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

loadTweets();

$(document).ready(() => {


  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize().slice(5);

    if (data.length === 0) {
      alert("Your tweet must contain text!");
      return;
    }
    if (data.length > 140) {
      alert("Your tweet is too long please make it 140 characters or less!");
      return;
    }
    console.log("Shouldn't see this");
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: {text: data},
    });
  });
});



