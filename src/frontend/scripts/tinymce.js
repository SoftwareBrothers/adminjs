/* eslint-disable no-undef */
$(document).ready(() => {
  tinymce.init({
    selector: '#textEditor',
    plugins: 'lists',
    setup(editor) {
      editor.on('change', () => editor.save())
    },
  })
})
