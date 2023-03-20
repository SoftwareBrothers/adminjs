import React, { ComponentType, useEffect, useState } from 'react'

/**
 * A higher-order component that prevents a component from rendering server-side
 *
 * @template P - The props object of the wrapped component
 * @param {React.ComponentType<P>} Component - The component to be wrapped
 * @returns {React.FC<P>} A new component that renders the given component client-side only
 */
// eslint-disable-next-line max-len
const withNoSSR = <P extends Record<string, unknown>>(Component: ComponentType<P>) => (props: P) => {
  const [isClient, setIsClient] = useState(false)

  /**
   * Sets isClient to true when the component is mounted on the client side
   */
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Renders nothing if the component is not mounted on the client side
  if (!isClient) return null

  // Renders the wrapped component with the given props if it's mounted on the client side
  return <Component {...props} />
}

export {
  withNoSSR as default,
  withNoSSR,
}
