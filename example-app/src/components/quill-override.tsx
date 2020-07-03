const loadQuill = () => {
  const id = 'quill-script-tag'
  const script = window.document.createElement('script')
  script.src = 'https://cdn.quilljs.com/1.3.6/quill.js'
  script.async = true
  script.defer = true
  script.id = id
  script.addEventListener('load', () => {
    console.log('quill loaded')
  })

  const style = window.document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'

  window.document.body.appendChild(script)
  window.document.body.appendChild(style)
}

window.document.addEventListener('DOMContentLoaded', loadQuill, false)

export default () => null
