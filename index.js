const {now} = require('perf_hooks').performance


module.exports = function(backend)
{
  let requestID = 0
  let requests = {}
  let waitingVSync

  function onVSync()
  {
    const callbacks = Object.values(requests)
    requests = {}

    const timestamp = now()
    for(const callback of callbacks)
      callback(timestamp)

    if(Object.keys(requests).length)
      backend.waitVSync(onVSync)
    else
      waitingVSync = false
  }

  return {
    cancelAnimationFrame(requestID)
    {
      delete requests[requestID]
    },

    requestAnimationFrame(callback)
    {
      requestID++

      requests[requestID] = callback

      if(waitingVSync) return

      waitingVSync = true

      backend.waitVSync(onVSync)
    }
  }
}
