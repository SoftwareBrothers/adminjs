/* eslint-disable no-undef */

$(document).ready(() => {
  const $form = $('#filters-form')
  const $filtersBar = $('.filters-bar')

  const disableEmptyFormInputs = () => {
    const inputsArray = $form.find(':input').toArray()
    $(inputsArray.filter(input => !input.value)).attr('disabled', true)
  }

  const filtersBarVisibilityManager = (event) => {
    const target = $(event.target)
    const filtersOpenElement = target.hasClass('filters-open')
    const filtersCloseElementOrHisChild = target.hasClass('filters-close')
      || target.parents('.filters-close').length
    const filtersBarElementOrHisChild = target.parents('.filters-bar').length
      || target.hasClass('filters-bar')

    if (filtersOpenElement) {
      $filtersBar.addClass('filters-show')
      return
    }
    if (filtersCloseElementOrHisChild) {
      $filtersBar.removeClass('filters-show')
      return
    }
    if (!filtersBarElementOrHisChild) {
      $filtersBar.removeClass('filters-show')
    }
  }

  $('.content-wrapper').click(filtersBarVisibilityManager)

  $form.submit(disableEmptyFormInputs)
})
