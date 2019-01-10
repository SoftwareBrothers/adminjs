/* eslint-disable no-undef */

$(document).ready(() => {
  const $form = $('#filters-form')
  const $filtersBar = $('.filters-bar')

  const disableEmptyFormInputs = () => {
    const inputsArray = $form.find(':input').toArray()
    $(inputsArray.filter(input => !input.value)).attr('disabled', true)
  }
  const checkIfElementOrHisChild = (target, className) => target.parents(`.${className}`).length
    || target.hasClass(className)

  const filtersBarVisibilityManager = (event) => {
    const target = $(event.target)
    const filtersOpenElement = target.hasClass('filters-open')
    const filtersCloseElementOrHisChild = checkIfElementOrHisChild(target, 'filters-close')
    const filtersBarElementOrHisChild = checkIfElementOrHisChild(target, 'filters-bar')

    if (filtersOpenElement) {
      $filtersBar.addClass('filters-show')
    } else if (filtersCloseElementOrHisChild || !filtersBarElementOrHisChild) {
      $filtersBar.removeClass('filters-show')
    }
  }

  $('.content-wrapper').click(filtersBarVisibilityManager)

  $form.submit(disableEmptyFormInputs)
})
