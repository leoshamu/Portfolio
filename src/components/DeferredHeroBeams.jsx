import {
  Suspense,
  lazy,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from 'react'

const LazyBeams = lazy(() => import('../Beams'))

function DeferredHeroBeams() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [isLiteDevice, setIsLiteDevice] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')
    const updateCompact = () => setIsCompact(mediaQuery.matches)
    updateCompact()

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const saveData = Boolean(connection?.saveData)
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4
    const lowBandwidth = typeof connection?.downlink === 'number' && connection.downlink < 2
    setIsLiteDevice(saveData || lowMemory || lowBandwidth)

    const activate = () => {
      startTransition(() => {
        setShouldLoad(true)
      })
    }

    let timeoutId
    let idleId

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(activate, { timeout: 1200 })
    } else {
      timeoutId = window.setTimeout(activate, 350)
    }

    mediaQuery.addEventListener('change', updateCompact)

    return () => {
      mediaQuery.removeEventListener('change', updateCompact)
      if (timeoutId) window.clearTimeout(timeoutId)
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [])

  const beamProps = useMemo(
    () =>
      isCompact || isLiteDevice
        ? {
            beamWidth: 3.3,
            beamHeight: 27,
            beamNumber: 11,
            lightColor: '#ffffff',
            speed: 1.55,
            noiseIntensity: 1.2,
            scale: 0.19,
            rotation: 28,
          }
        : {
            beamWidth: 4.1,
            beamHeight: 30,
            beamNumber: 20,
            lightColor: '#ffffff',
            speed: 2,
            noiseIntensity: 1.75,
            scale: 0.2,
            rotation: 30,
          },
    [isCompact, isLiteDevice],
  )

  return shouldLoad ? (
    <Suspense fallback={null}>
      <LazyBeams {...beamProps} />
    </Suspense>
  ) : null
}

export default DeferredHeroBeams
