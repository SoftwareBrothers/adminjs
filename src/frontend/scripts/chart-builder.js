/* eslint-disable no-undef */
$(document).ready(() => {
  const $charts = $('[data-chart]')
  if ($charts) {
    $charts.each((index, chart) => {
      const chartName = $(chart).data('chart')
      const currentChart = chartsModel[chartName]
      const ctx = chart.getContext('2d')
      // eslint-disable-next-line no-unused-vars
      const buildChart = new Chart(ctx, {
        type: currentChart.type,
        data: currentChart.data,
        options: currentChart.options,
      })
    })
  }
})
