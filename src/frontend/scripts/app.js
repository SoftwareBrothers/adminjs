$(document).ready(() => {
  $('.hamburger').click(() => $('.sidebar-desktop').removeClass('sidebar-mobile'));
  $('.content-wrapper').click(() => $('.sidebar-desktop').addClass('sidebar-mobile'));

  const $pickadate = $('.pickadate');
  if ($pickadate) {
    $pickadate.pickadate({
      format: 'yyyy-mm-dd',
      firstDay: 1,
    })
  };
});