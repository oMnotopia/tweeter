/* eslint-disable no-undef */
//If user clicks scroll button returns user to top of screen and focuses text area.
const scrollToTop = () => {
  $(document).scrollTop(0);
  $("#tweet-text").focus();
};

//When user scrolls away from top, a scroll button appears and new tweet toggle dissapears.
//When user scrolls to top, scroll button dissapears and new tweet toggle reappears.
const generateScrollToTop = () => {
  if ($(document).scrollTop() !== 0) {
    $(".toggle-scroll").toggleClass("hidden", false);
    $(".toggles").toggleClass("hidden", true);
  }
  if ($(document).scrollTop() === 0) {
    $(".toggle-scroll").toggleClass("hidden", true);
    $(".toggles").toggleClass("hidden", false);
  }
};

$(document).ready(() => {
  $(document).on("scroll", generateScrollToTop);

  $(".toggle-scroll").on("click", scrollToTop);
});