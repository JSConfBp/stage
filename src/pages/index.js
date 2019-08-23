import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import io from 'socket.io-client'

import SpeakerInfo from '../components/SpeakerInfo'

import './index.scss'

const emptyStage = {
  speaker: {
    name: '',
    topic: '',
  },
}

//const SOCKET_URL = 'http://0.0.0.0:8000'
const SOCKET_URL = 'https://stage-control.herokuapp.com/'

const IndexPage = props => {
  const clusterLength = 4
  let currentCluster = 0
  let clusters = []
  let nextClusterTimeout = 3000
  let drawTimer = 0

  const readClusters = () => {
    return Array.from(
      document.querySelectorAll('polygon[class^=cluster-]')
    ).reduce((arr, triangle) => {
      const indexMatch = triangle.className.baseVal.match(/^cluster-(\d)/)
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
    return new Promise(resolve => {
      polygon.className.baseVal += ' show'
      setTimeout(resolve, timeout)
    })
  }

  const hidePolygon = async (polygon, timeout) => {
    return new Promise(resolve => {
      polygon.className.baseVal = polygon.className.baseVal.replace(' show', '')
      setTimeout(resolve, timeout)
    })
  }

  const show = async () => {
    const prevCluster =
      currentCluster !== 0
        ? clusters[currentCluster - 1]
        : clusters[clusters.length - 1]
    const nextCluster = clusters[currentCluster]

    const prevLength = prevCluster.length
    const nextLength = nextCluster.length

    console.log(currentCluster)

    for (let i = 0; i < clusterLength; i++) {
      const prevPolygon = prevCluster[i]
      const nextPolygon = nextCluster[i]
      await Promise.all([
        hidePolygon(prevPolygon, 200),
        showPolygon(nextPolygon, 200),
      ])
    }

    currentCluster += 1

    if (!clusters[currentCluster]) {
      currentCluster = 0
    }
    drawTimer = setTimeout(show, nextClusterTimeout)
  }

  const [stage, setStage] = useState(Object.assign({}, emptyStage))

  useEffect(() => {
    console.log('useEffect init')

    const socket = io(SOCKET_URL, {})

    socket.on('update', data => {
      console.log('stage update', data)
      setStage(data)
    })

    clusters = readClusters()
    show()

    return () => {
      console.log('useEffect cleanup')

      socket.close()

      clusters = []
      currentCluster = 0
      clearTimeout(drawTimer)

      Array.from(document.querySelectorAll('polygon.fill')).forEach(polygon => {
        polygon.className.baseVal = polygon.className.baseVal.replace(
          'show',
          ''
        )
      })
    }
  }, [props])

  return (
    <div
      className={classnames(
        'visual',
        stage.presentation && 'presentation-active',
        stage.color || 'black'
      )}
      id="Visual"
    >
      <svg
        data-name="Layer 3"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        width="3280"
        height="1080"
        viewBox="0 0 3280 1080"
      >
        <defs>
          <clipPath id="mask" className="mask">
            <path d="M1596.53,386l-43.77,43.77h89L1597.94,386l42.56-42.56,43.27,43.26,44.47-44.47H1554.18l-44-44V387.2L1554,343.44Zm129.29-42.76-42,42.06-42.06-42.06Zm-170.64,85.53,42-42.06,42.06,42.06Zm84.11-85.53-42,42.06-42.06-42.06Zm-128.08,41.56V300.67l41.55,41.56h0l.5.5ZM1857.32,472v-.71l-.5.5-42.06-42.05h0l-44.48-44.47-44.47,44.47h86.53L1769.09,473h86.52l-42.76,42.76,44.47,44.47V473.72l42.77,42.77L1944.56,472Zm-87-85.32,42.06,42.06h-84.11ZM1813.56,430,1855.62,472H1771.5Zm42.76,127.88-42-42.06,42-42.06ZM1858,473h84.12l-42.06,42.06Zm-44,215.61V601.1l-44.48,44.48,43.27,43.26-42.77,42.76h-85.82V644.37l-44,44h-85.82V602.81h.71l-.71-.71v-1l-.5.5-43.27-43.26-42.76,42.76V516l44-44h-87.52l-42.77-42.76h0l-44.47-44.48v87.53l-.71.71h.71v.71l.71-.71H1424l42.76,42.76-43.26,43.27,43.26,43.26-.5.5h0l-42.76,42.77,44.47,44.47V602.81h84.82L1510,645.58l44.47,44.47h0l42.77,42.76,43.26-43.26,43.76,43.76h0L1727,776.07l43.47-43.47H1858ZM1338.15,387.2l42,42.06-21,21-21,21Zm21.23,64.29L1380.91,430,1423,472h-84.11Zm66,21.53h84.12l-41.56,41.56h0l-.5.5Zm41.56,44v84.12l-42.06-42.06Zm0,170.65-42.06-42.06,42.06-42.06Zm43.76-127.89,42.06,42.06h-84.11Zm42.77,43.77v84.12l-42.06-42.06Zm43.77,127.88-42.06-42.06h84.11Zm86-84.62V730.9l-42-42.06Zm129.8-43.26v84.11l-42.06-42Zm-86,171.14L1685,732.6h84.11Zm44.47-43.06,42-42.05,42.06,42.05Z" />
          </clipPath>
        </defs>
        <g className="fill-group">
          <polygon
            className="cluster-1 fill"
            points="1510.91 342.52 1510.91 299.26 1554.17 342.52 1510.91 385.79 1510.91 342.52"
          />
          <polygon
            className="cluster-1 fill"
            points="1597.44 342.52 1640.7 342.52 1597.44 385.79 1554.17 342.52 1597.44 342.52"
          />
          <polygon
            className="cluster-1 fill"
            points="1597.44 429.05 1554.17 429.05 1597.44 385.79 1640.7 429.05 1597.44 429.05"
          />
          <polygon
            className="cluster-1 fill"
            points="1683.97 342.52 1727.23 342.52 1683.97 385.79 1640.7 342.52 1683.97 342.52"
          />

          <polygon
            className="cluster-2 fill"
            points="1770.5 429.05 1727.23 429.05 1770.5 385.79 1813.76 429.05 1770.5 429.05"
          />
          <polygon
            className="cluster-2 fill"
            points="1813.76 472.31 1770.5 472.31 1813.76 429.05 1857.03 472.31 1813.76 472.31"
          />
          <polygon
            className="cluster-2 fill"
            points="1857.03 515.58 1857.03 558.84 1813.76 515.58 1857.03 472.31 1857.03 515.58"
          />
          <polygon
            className="cluster-2 fill"
            points="1900.29 472.31 1943.56 472.31 1900.3 515.58 1857.03 472.31 1900.29 472.31"
          />

          <polygon
            className="cluster-3 fill"
            points="1813.76 645.37 1813.76 688.63 1770.5 645.37 1813.76 602.1 1813.76 645.37"
          />
          <polygon
            className="cluster-3 fill"
            points="1813.76 731.9 1770.5 731.9 1813.76 688.63 1857.03 731.9 1813.76 731.9"
          />
          <polygon
            className="cluster-3 fill"
            points="1727.23 731.9 1770.5 731.9 1727.23 775.16 1683.97 731.9 1727.23 731.9"
          />
          <polygon
            className="cluster-3 fill"
            points="1683.97 688.63 1683.97 731.9 1640.7 688.63 1683.97 645.37 1683.97 688.63"
          />

          <polygon
            className="cluster-4 fill"
            points="1597.44 688.63 1640.7 688.63 1597.44 731.9 1554.17 688.63 1597.44 688.63"
          />
          <polygon
            className="cluster-4 fill"
            points="1554.17 645.37 1554.17 688.63 1510.91 645.37 1554.17 602.11 1554.17 645.37"
          />
          <polygon
            className="cluster-4 fill"
            points="1510.91 602.1 1467.64 602.1 1510.91 558.84 1554.17 602.1 1510.91 602.1"
          />
          <polygon
            className="cluster-4 fill"
            points="1467.65 645.37 1467.65 688.63 1424.38 645.37 1467.65 602.11 1467.65 645.37"
          />

          <polygon
            className="cluster-5 fill"
            points="1467.65 558.84 1467.65 602.11 1424.38 558.84 1467.65 515.58 1467.65 558.84"
          />
          <polygon
            className="cluster-5 fill"
            points="1467.65 472.31 1510.91 472.31 1467.65 515.58 1424.38 472.31 1467.65 472.31"
          />
          <polygon
            className="cluster-5 fill"
            points="1381.12 472.31 1337.85 472.31 1381.12 429.05 1424.38 472.31 1381.12 472.31"
          />
          <polygon
            className="cluster-5 fill"
            points="1337.85 429.05 1337.85 385.79 1381.12 429.05 1337.85 472.31 1337.85 429.05"
          />
        </g>
      </svg>

      <SpeakerInfo stage={stage} />

      <div className={classnames('presentation')}></div>
      <div className="silhouette"></div>
      <div className="stage-bottom"></div>
    </div>
  )
}

export default IndexPage
