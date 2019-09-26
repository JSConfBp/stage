import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import io from 'socket.io-client'

import SpeakerInfo from '../components/SpeakerInfo'
import JSVisual from '../components/JSVisual'
import CSSVisual from '../components/CSSVisual'
import MidSessionSlides from '../components/MidSessionSlides'

import './index.scss'

const emptyStage = {
  event: '',
  speaker: {
    name: '',
    topic: '',
  },
}

const SOCKET_URL = 'https://stage-control.herokuapp.com/'

const IndexPage = props => {
  const [stage, setStage] = useState(Object.assign({}, emptyStage))
  const [centered, setCentered] = useState(true)

  useEffect(() => {
    console.log('useEffect init')

    const socket = io(SOCKET_URL, {})

    socket.on('update', data => {
      console.log('stage update', data)
      setStage(data)
    })

    return () => {
      console.log('useEffect cleanup')
      socket.close()
    }
  }, [props])

  return (
    <>
      <div
        className={classnames(
          'visual',
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
          <JSVisual presentation={stage.presentation} />
        )}
        {stage && stage.event === 'css' && (
          <CSSVisual presentation={stage.presentation} />
        )}
      </div>


      {/* <div className="debug">
        <div className="presentation"></div>
        <div className="silhouette"></div>
        <div className="stage-bottom"></div>
      </div> */}

      
    </>
  )
}

export default IndexPage
