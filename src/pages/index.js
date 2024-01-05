import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import io from 'socket.io-client'

import SpeakerInfo from '../components/SpeakerInfo'
import JSVisual from '../components/JSVisual'
import MidSessionSlides from '../components/MidSessionSlides'

import './index.scss'

const emptyStage = {
  event: '',
  speaker: {
    name: '',
    topic: '',
  },
}

const SOCKET_URL = 'https://stage-control.herokuapp.com'
//const SOCKET_URL = 'http://localhost:3000'

const IndexPage = (props) => {
  const [stage, setStage] = useState(Object.assign({}, emptyStage))
  const [centered, setCentered] = useState(true)
  const [debug, setDebug] = useState(false)

  let socket
  const init = async () => {
    const datareq = await fetch(`${SOCKET_URL}/api/stage`)
    const data = await datareq.json()
    setStage(data)
    socket = io(SOCKET_URL, {
      path: '/api/socket/',
    })

    socket.on('update', (data) => {
      console.log('stage update', data)
      setStage(data)
    })
  }

  useEffect(() => {
    console.log('useEffect init')
    
    setDebug(document.location.search.includes('debug'))
    init()

    return () => {
      console.log('useEffect cleanup')
      socket.close()
    }
  }, [props])

  return (
    <>
      <div
        className={classnames(
          'stage',
          centered && 'centered',
          stage.presentation && 'presentation-active',
          stage.midSlide && 'midsession-slides-active',
          stage.logoOnly && 'logo-only',
          stage.color || 'black',
          `event-${stage.event.startsWith('js') ? 'js' : 'css'}`
        )}
        id="Visual"
      >
        <SpeakerInfo stage={stage} show={!stage.midSlide && !stage.logoOnly} />

        {stage && <MidSessionSlides stage={stage} />}

        {stage && stage.event.startsWith('js') && (
          <JSVisual
            midSlide={stage.midSlide}
            logoOnly={stage.logoOnly}
            color={stage.color || 'black'}
            presentation={stage.presentation}
          />
        )}
      </div>

      {debug && (
        <div className="debug">
          <div className="presentation"></div>
          <div className="silhouette"></div>
          <div className="guides">
            <div className="center"></div>
            <div className="golden">
              <div className="vertical"></div>
              <div className="horizontal"></div>
            </div>
          </div>
          {/* <div className="stage-bottom"></div> */}
        </div>
      )}
    </>
  )
}

export default IndexPage
