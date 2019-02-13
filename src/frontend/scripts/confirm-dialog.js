/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
$(document).ready(() => {
  const $confirmDialog = $('.confirm-dialog')
  $confirmDialog.find('.confirm-cancel').click(() => $confirmDialog.removeClass('active'))

  const $guardedActions = $('[data-guard]')
  $guardedActions.click(function guardClicked(event) {
    event.preventDefault()
    const $action = $(this)
    const { guard } = $action.data()
    $confirmDialog.addClass('active')
    $confirmDialog.find('.confirm-title').text(guard.title)
    $confirmDialog.find('.content').text(guard.content)
    $confirmDialog.find('.confirm-accept').attr('href', $action.attr('href')).text(guard.button)
    return false
  })
})
