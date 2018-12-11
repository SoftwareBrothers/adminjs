$(document).ready(() => {
  $('.hamburger').click(() => $('.sidebar-desktop').removeClass('sidebar-mobile'));
  $('.content-wrapper').click(() => $('.sidebar-desktop').addClass('sidebar-mobile'));

  if ($('.pickadate')) {
    $('.pickadate').pickadate({
      format: 'd mmm yyyyy',
      firstDay: 1,
    })
  }
});