/* eslint-disable no-undef */
$(document).ready(() => {
  //Counts number of characters entered in textarea.
  //If number is greater than 140 turn counter red, otherwise default colour.
  $("#tweet-text").on("input", function(e) {
    let textLength = e.target.value.length;
    const counter = $(this).next().children("output")[0];
    $(counter).text(140 - textLength);

    if (textLength > 140) {
      $(counter).css("color", "#FF0000");
    } else {
      $(counter).css("color", "");
    }
  });

  //When user scrolls away from top, a scroll button appears and new tweet toggle dissapears.
  //When user scrolls to top, scroll button dissapears and new tweet toggle reappears.
  $(document).on("scroll", function() {
    if ($(document).scrollTop() !== 0) {
      $(".toggle-scroll").toggleClass("hidden", false);
      $(".toggles").toggleClass("hidden", true);
    }

    if ($(document).scrollTop() === 0) {
      $(".toggle-scroll").toggleClass("hidden", true);
      $(".toggles").toggleClass("hidden", false);
    }

  });

  //If user clicks scroll button returns user to top of screen and focuses text area.
  $(".toggle-scroll").on("click", function() {
    $(document).scrollTop(0);
    $("#tweet-text").focus();
  });
});