$(document).ready(() => {
  const $sidebar = $('.sidebar')
  $('.hamburger').click(() => $sidebar.toggleClass('sidebar-show'))
  $('.content-wrapper section').click(() => $sidebar.removeClass('sidebar-show'))

  const $pickadate = $('.pickadate')
  if ($pickadate) {
    $pickadate.pickadate({
      format: 'yyyy-mm-dd',
      firstDay: 1,
    })
  }

  const $dropdownToggle = $('.dropdown-toggle')
  const toggleMenu = ($element, hide) => {
    if (hide) {
      $element.parent().siblings('.dropdown-list').hide()
    } else {
      $element.parent().siblings('.dropdown-list').slideToggle()
    }
    $element.toggleClass('icomoon-dropdown-open').toggleClass('icomoon-dropdown-close')
  }
  if ($dropdownToggle) {
    $dropdownToggle.on('click', (event) => {
      const $target = $(event.target)
      toggleMenu($target)
      const status = $target.hasClass('icomoon-dropdown-open') ? 'open' : 'close'
      localStorage.setItem($target.data('menu'), status)
    });

    $dropdownToggle.each((index, element) => {
      const $element = $(element)
      if (localStorage.getItem($element.data('menu')) === 'close') {
        toggleMenu($element, true)
      }
    })
    $('.sidebar-navigation').show()
  }
})
