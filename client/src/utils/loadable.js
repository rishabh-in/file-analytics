import { Suspense, lazy } from "react"

export const loadable = (importFunc, options) => {
  const LazyComponent = lazy(importFunc);
  const  {fallback = null} = options || {};

  // Return a component and not JXS
  return () => (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  ) 
}