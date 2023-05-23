/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
  const tweet = $(document).ready(() => {
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
        <p>${tweetData.created_at}</p>
        <div class="social-tags">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  });
  return tweet;
};

renderTweets(data);

