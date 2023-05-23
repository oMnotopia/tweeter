/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").on("input", function(e) {
    let textLength = e.target.value.length;
    const counter = $(this).next().children("output")[0];
    $(counter).text(140 - textLength);

    if (textLength >= 140) {
      $(counter).css("color", "#FF0000");
    }
  });
});