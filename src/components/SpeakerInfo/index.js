import React from 'react'
import classnames from 'classnames'
import JSLogo from '../JSLogo'
import './index.scss'

const SpeakerInfo = ({ stage, show }) =>
  stage.speaker && (
    <div className={classnames('speaker-info', show && 'show-speaker-info')}>
      <span className="twitter">{stage.speaker.twitter}</span>
      <span className="name">{stage.speaker.name}</span>
      <span className="topic">{stage.speaker.topic}</span>
      <div className="logo-container">
        <JSLogo className="logo" variant="square" />
      </div>
    </div>
  )

export default SpeakerInfo
