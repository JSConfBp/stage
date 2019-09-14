import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'

import SponsorImage from '../SponsorImage'

const SLIDE_INTERVAL = 3000

const reset = slides => {
  slides.forEach((slide, i) => {
    slide.classList.remove('show')

    if (i === 0) {
      slide.classList.add('show')
    }
  })
}

const next = slides => {
  let index = slides.findIndex(elem => elem.classList.contains('show')) + 1

  if (index === slides.length) {
    index = 0
  }

  slides.forEach((slide, i) => {
    slide.classList.remove('show')
    if (i === index) {
      slide.classList.add('show')
    }
  })
}

const MidSessionSlides = ({ stage: { midSlide } }) => {
  const slides = useRef(null)
  const slideShowInterval = useRef(0)

  useEffect(() => {
    slides.current = Array.from(window.document.querySelectorAll('.slideshow'))

    if (midSlide) {
      reset(slides.current)
      slideShowInterval.current = setInterval(() => next(slides.current), SLIDE_INTERVAL)
    } else {
      clearInterval(slideShowInterval.current)
    }

    return () => {
      clearInterval(slideShowInterval.current)
    }
  }, [midSlide])

  return (
    <div className={classnames('mid-session-slides')}>
      <div className="sponsors slideshow show">
        <div className="sponsors-top">
          <SponsorImage image="mozilla" className="large" />
          <SponsorImage image="vacuumlabs" className="large" />
          <SponsorImage image="oracle" className="large" />
          <SponsorImage image="tresorit" className="large" />
        </div>

      </div>
      <div className="sponsors slideshow">

        <div className="sponsors-mid">
          <SponsorImage image="risingstack" className="medium" />
          <SponsorImage image="supercharge" className="medium" />
          <SponsorImage image="bonomi" className="medium" />
          <SponsorImage image="microsoft" className="medium" />
          <SponsorImage image="blackrock" className="medium" />
          <SponsorImage image="instructure" className="medium" />
          <SponsorImage image="sinnerschrader" className="medium" />
          <SponsorImage image="epam" className="medium" />
          <SponsorImage image="mito" className="medium" />
        </div>
        <div className="sponsors-bottom">
          <SponsorImage image="zalando" className="small" />
          <SponsorImage image="snyk" className="small" />
        </div>
      </div>
      <div className="slideshow">slideshow</div>
      <div className="logo slideshow">logo</div>
    </div>
  )
}

export default MidSessionSlides
