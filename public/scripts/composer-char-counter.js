/* eslint-disable no-undef */

//Counts number of characters entered in textarea.
//If number is greater than 140 turn counter red, otherwise default colour.
const textAreaCharCounter = function(e) {
  let textLength = e.target.value.length;
  const counter = $(this).next().children("output")[0];
  $(counter).text(140 - textLength);

  if (textLength > 140) {
    $(counter).css("color", "#FF0000");
  } else {
    $(counter).css("color", "");
  }
};

$(document).ready(() => {
  $("#tweet-text").on("input", textAreaCharCounter);
});

