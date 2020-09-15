export default function isMobileDevice(): boolean {
  try {
    // eslint-disable-next-line no-undef
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  } catch (e) {
    return false
  }
}
