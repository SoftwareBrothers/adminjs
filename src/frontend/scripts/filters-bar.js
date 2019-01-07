/* eslint-disable no-undef */

$(document).ready(() => {
  const $form = $('#filters-form')
  const $filtersBar = $('.filters-bar')
  const $filtersOpen = $('.filters-open')
  const $filtersClose = $('.filters-close')

  const disableEmptyFormInputs = () => {
    const inputsArray = $form.find(':input').toArray()
    $(inputsArray.filter(input => !input.value)).attr('disabled', true)
  }

  $filtersOpen.click(() => {
    $filtersBar.removeClass('hidden')
  })
  $filtersClose.click(() => {
    $filtersBar.addClass('hidden')
  })

  $form.submit(disableEmptyFormInputs)
})
