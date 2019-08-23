import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import io from 'socket.io-client'

import SpeakerInfo from '../components/SpeakerInfo'
import JSVisual from '../components/JSVisual'

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
  const [stage, setStage] = useState(Object.assign({}, emptyStage))

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
    <div
      className={classnames(
        'visual',
        stage.presentation && 'presentation-active',
        stage.color || 'black'
      )}
      id="Visual"
    >

      <JSVisual />
      <SpeakerInfo stage={stage} />

      <div className={classnames('presentation')}></div>
      <div className="silhouette"></div>
      <div className="stage-bottom"></div>
    </div>
  )
}

export default IndexPage
