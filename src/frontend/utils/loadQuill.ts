/* eslint-disable @typescript-eslint/explicit-function-return-type */
const loadQuill = (): Promise<void> => new Promise((resolve) => {
  if (typeof Quill !== 'undefined') {
    resolve()
    return
  }
  const id = 'quill-script-tag'
  if (window.document.getElementById(id)) {
    // it could be a situation where id exists but quill hasn't been loaded. In this case
    // we check if Quill global variable exists
    const checkIfLoaded = () => {
      if (typeof Quill === 'function') {
        resolve()
      }
    }
    checkIfLoaded()
    setInterval(checkIfLoaded, 500)
    return
  }
  const script = window.document.createElement('script')
  script.src = 'https://cdn.quilljs.com/1.3.6/quill.js'
  script.async = true
  script.defer = true
  script.id = id
  script.addEventListener('load', () => {
    resolve()
  })

  const style = window.document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'

  window.document.body.appendChild(script)
  window.document.body.appendChild(style)
})

export default loadQuill
