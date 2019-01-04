/* eslint-disable no-undef */

$(document).ready(() => {
  const $pickadate = $('.pickadate')
  const $form = $('#filters-form')
  const $filtersBar = $('.filters-bar')
  const $searchBar = $('.search-bar')
  const $filtersOpen = $('.filters-open')
  const $filtersClose = $('.filters-close')

  const disableEmptyFormInputs = () => {
    const inputsArray = $form.find(':input').toArray()
    $(inputsArray.filter(input => !input.value)).attr('disabled', true)
  }

  if ($pickadate) {
    $pickadate.pickadate({
      format: 'yyyy-mm-dd',
      firstDay: 1,
    })
  }

  $filtersOpen.click(() => {
    $filtersBar.removeClass('hidden')
    $searchBar.addClass('hidden')
  })
  $filtersClose.click(() => {
    $searchBar.removeClass('hidden')
    $filtersBar.addClass('hidden')
  })

  $form.submit(disableEmptyFormInputs)
})
