import React, { ComponentType, useEffect, useState } from 'react'

// eslint-disable-next-line max-len
const withNoSSR = <P extends Record<string, unknown>>(Component: ComponentType<P>) => (props: P) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return <Component {...props} />
}

export default withNoSSR
