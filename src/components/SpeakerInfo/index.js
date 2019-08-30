import React from 'react'
import classnames from 'classnames'
import './index.scss'

const SpeakerInfo = ({ stage, show }) =>
  stage.speaker && (
    <div className={classnames('speaker-info', show && 'show-speaker-info')}>
      <span className="name">{stage.speaker.name}</span>
      <span className="topic">{stage.speaker.topic}</span>
    </div>
  )

export default SpeakerInfo
