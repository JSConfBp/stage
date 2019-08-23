import React from 'react'
import './index.scss'

const SpeakerInfo = ({ stage }) =>
  stage.speaker && (
    <div className="speaker-info">
      <span className="name">{stage.speaker.name}</span>
      <span className="topic">{stage.speaker.topic}</span>
    </div>
  )

export default SpeakerInfo
