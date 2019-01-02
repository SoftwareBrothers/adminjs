/* eslint-disable no-undef */
$(document).ready(() => {
  const $textEditor = $('.textEditor')
  if ($textEditor.length) {
    tinymce.remove()
    tinymce.init({
      selector: '.textEditor',
      plugins: 'lists',
      setup(editor) {
        editor.on('change', () => editor.save())
      },
    })
  }
})
