$(document).ready(() => {
  $('a.dialog-trigger').click(event => showDialog(event))

  const showDialog = event => {
    const path = $(event.currentTarget).data('path')
    $('.confirm-dialog').addClass('active')
    $('.confirm-accept').attr('href', path);
  }
})