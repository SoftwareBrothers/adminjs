$(document).ready(() => {
  const $charts = $('[data-chart]')
  $charts.each((index, chart) => {
    const chartName = $(chart).data('chart')
    const currentChart = chartsModel[chartName]
    const ctx = chart.getContext('2d')
    const chart = new Chart(ctx, {
      type: currentChart.type,
      data: currentChart.data,
      options: currentChart.options
    })
  })
})
