/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
$(document).ready(() => {
  const $confirmDialog = $('.confirm-dialog')
  $('[data-confirm-dialog]').click(event => showDialog(event))
  $('.confirm-cancel').click(() => $confirmDialog.removeClass('active'))

  const showDialog = (event) => {
    const path = $(event.currentTarget).data('confirm-dialog')
    $confirmDialog.addClass('active')
    $('.confirm-accept').attr('href', path)
  }
})
