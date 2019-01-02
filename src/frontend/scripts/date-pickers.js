/* eslint-disable no-undef */

$(document).ready(() => {
  console.log('test')
  const $pickadate = $('.pickadate')
  const $datesPicker = $('input[name="dates"]')
  let endDate
  let startDate
  if ($pickadate) {
    $pickadate.pickadate({
      format: 'yyyy-mm-dd',
      firstDay: 1,
    })
  }

  if ($datesPicker) {
    $datesPicker.daterangepicker({
    },
    (start, end) => {
      startDate = start
      endDate = end
    })
  }

  $($datesPicker).change(() => {
    console.log(startDate.format('YYYY-MM-DD HH:MM'), endDate.format('YYYY-MM-DD'))
  })
})
