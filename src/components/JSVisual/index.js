import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'

const JSVisual = ({ presentation, color, logoOnly, midSlide }) => {
  return (
    <div
      className={classnames(
        'visual',
        presentation ? 'presentation-active' : '',
        color,
        logoOnly ? 'logo-only' : '',
        midSlide ? 'midsession-slides-active' : ''
      )}
    >
      <div className="rectangle-left"></div>
      <div className="rectangle-right"></div>
      <div className="rectangle-bottom"></div>
    </div>
  )
}

export default JSVisual
