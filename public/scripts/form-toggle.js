$(document).ready(() => {
  $(".form-toggle").on("click", () => {
    $("form").slideToggle("400", "linear", () => {
      $("#tweet-text").focus();
    });
  });
});