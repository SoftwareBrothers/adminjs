/* eslint-disable no-undef */
$(document).ready(() => {
  const ctx = document.getElementById('myChart').getContext('2d')
  const data = {
    labels: ['One', 'Two', 'Tree', 'Four', 'Five', 'Six', 'Seven'],
    datasets: [
      {
        label: custom.title,
        fill: true,
        backgroundColor: 'orange',
        borderColor: 'tomato',
        data: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  }
  const myFirstChart = new Chart(ctx, {
    type: 'line',
    data,
    options: {
      title: {
        fontSize: 20,
        display: true,
        text: 'My First Chart !',
      },
    },
  })
})
