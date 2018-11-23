function getNative () {
  return window.JSInterface || window._native
  // try {
  //   const _native = window.JSInterface || window._native
  //   if (!_native) throw new Error('No Native')
  //   return _native
  // } catch (error) {
  //   console.log(error)
  // }
}

export default getNative()
