import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'

const JSVisual = ({ presentation }) => {
  const drawTimer = useRef(0)
  const clusters = useRef([])
  let currentCluster = 0
  let nextClusterTimeout = 3000

  const readClusters = () => {
    return Array.from(
      document.querySelectorAll('g[class^=cluster-] path')
    ).reduce((arr, triangle) => {
      const indexMatch = triangle.parentElement.className.baseVal.match(
        /^cluster-(\d)/
      )

      if (indexMatch) {
        if (!arr[indexMatch[1] - 1]) {
          arr.push([])
        }
        arr[indexMatch[1] - 1].push(triangle)
      }
      return arr
    }, [])
  }

  const showPolygon = async (polygon, timeout) => {
    if (!polygon) return Promise.resolve()

    return new Promise(resolve => {
      polygon.className.baseVal += ' show'
      setTimeout(resolve, timeout)
    })
  }

  const hidePolygon = async (polygon, timeout) => {
    if (!polygon) return Promise.resolve()

    return new Promise(resolve => {
      polygon.className.baseVal = polygon.className.baseVal.replace(' show', '')
      setTimeout(resolve, timeout)
    })
  }

  const show = async () => {
    const prevCluster =
      currentCluster !== 0
        ? clusters.current[currentCluster - 1]
        : clusters.current[clusters.current.length - 1]

        
    const nextCluster = clusters.current[currentCluster]
    const prevLength = prevCluster.length
    const nextLength = nextCluster.length

    const clusterLength = Math.max(prevLength, nextLength)

    for (let i = 0; i < clusterLength; i++) {
      const prevPolygon = prevCluster[i]
      const nextPolygon = nextCluster[i]

      await Promise.all([
        hidePolygon(prevPolygon, 200),
        showPolygon(nextPolygon, 200),
      ])
    }

    currentCluster += 1

    if (!clusters.current[currentCluster]) {
      currentCluster = 0
    }
    drawTimer.current = setTimeout(show, nextClusterTimeout)
  }

  useEffect(() => {
    console.log('useEffect init')
    clusters.current = readClusters()
    console.log({ clusters })

    show()

    return () => {
      console.log('useEffect cleanup')

      clusters.current = []
      currentCluster = 0
      clearTimeout(drawTimer.current)

      Array.from(document.querySelectorAll('path.fill')).forEach(triangle => {
        triangle.className.baseVal = triangle.className.baseVal.replace(
          'show',
          ''
        )
      })
    }
  }, [presentation])

  return (
    <svg width="3280" height="1080" viewBox="0 0 3280 1080">
      <g className="cluster-1">
        <path d="M1240.99,617.07v88.94l-44.47-44.47L1240.99,617.07z M1239.99,703.6v-84.12l-42.06,42.06L1239.99,703.6z" />
        <path d="M1196.52,749.09v-88.94l44.47,44.47L1196.52,749.09z M1197.52,662.56v84.12l42.06-42.06L1197.52,662.56z" />
        <path d="M1284.76,748.38h-88.94l44.47-44.47L1284.76,748.38z M1198.23,747.38h84.12l-42.06-42.06L1198.23,747.38z" />
        <path d="M1134.63,809.57l62.89-62.89l0,62.89L1134.63,809.57z M1196.52,749.09l-59.48,59.48l59.48,0L1196.52,749.09z" />
        <path d="M1134.63,809.57h-88.94l44.47-44.47L1134.63,809.57z M1048.09,808.57h84.12l-42.06-42.06L1048.09,808.57z" />
        <path d="M1286.46,872.46h-88.94l44.47-44.47L1286.46,872.46z M1199.93,871.46h84.12l-42.06-42.06L1199.93,871.46z" />
        <path d="M1071.73,872.46l62.89-62.89l0,62.89L1071.73,872.46z M1133.63,811.98l-59.48,59.48l59.48,0L1133.63,811.98z" />
        <path d="M1071.73,872.46v88.94l-44.47-44.47L1071.73,872.46z M1070.73,958.99v-84.12l-42.06,42.06L1070.73,958.99z" />
        <path d="M938.32,916.93h88.94l-44.47,44.47L938.32,916.93z M1024.85,917.93h-84.12l42.06,42.06L1024.85,917.93z" />
      </g>
      <g className="cluster-2">
        <path d="M920.43,89.44h-88.94l44.47-44.47L920.43,89.44z M833.9,88.44h84.12l-42.06-42.06L833.9,88.44z" />
        <path d="M920.43,178.39V89.44l44.47,44.47L920.43,178.39z M921.43,91.86v84.12l42.06-42.06L921.43,91.86z" />
        <path d="M920.43,178.6h88.94l-44.47,44.47L920.43,178.6z M1006.96,179.6h-84.12l42.06,42.06L1006.96,179.6z" />
        <path d="M1053.85,133.92v88.94l-44.47-44.47L1053.85,133.92z M1052.85,220.45v-84.12l-42.06,42.06L1052.85,220.45z" />
        <path d="M1053.85,222.92h88.94l-44.47,44.47L1053.85,222.92z M1140.38,223.92h-84.12l42.06,42.06L1140.38,223.92z" />
        <path d="M1231.74,222.86h-88.94l44.47-44.47L1231.74,222.86z M1145.21,221.86h84.12l-42.06-42.06L1145.21,221.86z" />
        <path d="M1231.74,133.91h-88.94l44.47-44.47L1231.74,133.91z M1145.21,132.91h84.12l-42.06-42.06L1145.21,132.91z" />
        <path d="M1231.74,311.8v-88.94l44.47,44.47L1231.74,311.8z M1232.74,225.27v84.12l42.06-42.06L1232.74,225.27z" />
        <path d="M1276.21,311.8v-88.94l44.47,44.47L1276.21,311.8z M1277.21,225.27v84.12l42.06-42.06L1277.21,225.27z" />
        <path d="M1276.21,311.8v88.94l-44.47-44.47L1276.21,311.8z M1275.21,398.33v-84.12l-42.06,42.06L1275.21,398.33z" />
      </g>
      <g className="cluster-3">
        <path d="M118.93,212.72v-88.94l44.47,44.47L118.93,212.72z M119.93,126.19v84.12l42.06-42.06L119.93,126.19z" />
        <path d="M118.93,212.72h88.94l-44.47,44.47L118.93,212.72z M205.46,213.72h-84.12l42.06,42.06L205.46,213.72z" />
        <path d="M207.16,211.99v88.94l-44.47-44.47L207.16,211.99z M206.16,298.52v-84.12l-42.06,42.06L206.16,298.52z" />
        <path d="M29.99,212.72h88.94l-44.47,44.47L29.99,212.72z M116.52,213.72H32.4l42.06,42.06L116.52,213.72z" />
        <path d="M74.46,257.19h88.94l-44.47,44.47L74.46,257.19z M160.99,258.19H76.87l42.06,42.06L160.99,258.19z" />
        <path d="M118.93,390.6v-88.94l44.47,44.47L118.93,390.6z M119.93,304.07v84.12l42.06-42.06L119.93,304.07z" />
      </g>
      <g className="cluster-4">
        <path d="M617.43,29.94l62.89,0l-62.89,62.89L617.43,29.94z M618.43,30.94l0,59.48l59.48-59.48L618.43,30.94z" />
        <path d="M554.54,92.83l62.89,0l-62.89,62.89L554.54,92.83z M555.54,93.83l0,59.48l59.48-59.48L555.54,93.83z" />
        <path d="M491.64,155.7l0-62.89l62.89,62.89L491.64,155.7z M492.64,154.7l59.48,0l-59.48-59.48L492.64,154.7z" />
        <path d="M430.71,154.72l62.89,0l-62.89,62.89L430.71,154.72z M431.71,155.72l0,59.48l59.48-59.48L431.71,155.72z" />
        <path d="M430.71,91.83l0,62.89l-62.89-62.89L430.71,91.83z M429.71,92.83l-59.48,0l59.48,59.48L429.71,92.83z" />
        <path d="M323.08,136.3V47.36l44.47,44.47L323.08,136.3z M324.08,49.77v84.12l42.06-42.06L324.08,49.77z" />
      </g>
      <g className="cluster-5">
        <path d="M310.88,915.84V826.9l44.47,44.47L310.88,915.84z M311.88,829.31v84.12l42.06-42.06L311.88,829.31z" />
        <path d="M312.25,827.9H223.3l44.47-44.47L312.25,827.9z M225.72,826.9h84.12l-42.06-42.06L225.72,826.9z" />
        <path d="M223.25,738.96v88.94l-44.47-44.47L223.25,738.96z M222.25,825.49v-84.12l-42.06,42.06L222.25,825.49z" />
        <path d="M134.31,827.9v-88.94l44.47,44.47L134.31,827.9z M135.31,741.37v84.12l42.06-42.06L135.31,741.37z" />
        <path d="M223.3,738.96v-88.94l44.47,44.47L223.3,738.96z M224.3,652.43v84.12l42.06-42.06L224.3,652.43z" />
        <path d="M178.78,605.54h88.94l-44.47,44.47L178.78,605.54z M265.31,606.54h-84.12l42.06,42.06L265.31,606.54z" />
        <path d="M93.27,605.54h88.94l-44.47,44.47L93.27,605.54z M179.8,606.54H95.68l42.06,42.06L179.8,606.54z" />
        <path d="M181.25,519.01v88.94l-44.47-44.47L181.25,519.01z M180.25,605.54v-84.12l-42.06,42.06L180.25,605.54z" />
      </g>
    </svg>
  )
}

export default JSVisual
