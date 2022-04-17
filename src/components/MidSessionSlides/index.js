import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'

import SponsorImage from '../SponsorImage'
import SponsorSlide from '../SponsorSlide'
import CSSLogo from '../CSSLogo'
import JSLogo from '../JSLogo'

const SLIDE_INTERVAL = 10000

const reset = (slides) => {
  slides.forEach((slide, i) => {
    slide.classList.remove('show')

    if (i === 0) {
      // slide.classList.add('show')
    }
  })
}

const next = (slides) => {
  let index = slides.findIndex((elem) => elem.classList.contains('show')) + 1

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

const MidSessionSlides = ({ stage }) => {
  const { midSlide, coffee, lunch, event } = stage
  const slides = useRef(null)
  const slideShowInterval = useRef(0)

  useEffect(() => {
    slides.current = Array.from(window.document.querySelectorAll('.slideshow'))

    if (midSlide) {
      reset(slides.current)
      slides.current[0].classList.add('show')
      slideShowInterval.current = setInterval(
        () => next(slides.current),
        SLIDE_INTERVAL
      )
    } else {
      clearInterval(slideShowInterval.current)
    }

    return () => {
      reset(slides.current)
      clearInterval(slideShowInterval.current)
    }
  }, [midSlide, coffee, lunch])

  return (
    <div className={classnames('mid-session-slides')}>
      <div className="sponsors slideshow">
        <div className="sponsors-top">
          <SponsorImage image="wrike-logo-black-green" className="large" />
        </div>
      </div>

      {(coffee || lunch) && (
        <div className="slideshow show">
          <h1>{`${coffee ? 'Coffee' : 'Lunch'} break`}</h1>

          <dl className="session-list">
            {stage.upcoming
              .filter((session) => !!session.name)
              .map((session) => (
                <React.Fragment key={session.topic}>
                  <dd>{session.start}</dd>
                  <dt>
                    {session.topic}
                    {session.name && (
                      <span className="session-name">by {session.name}</span>
                    )}
                  </dt>
                </React.Fragment>
              ))}
          </dl>
        </div>
      )}

      <div className="sponsors slideshow">
        <div className="sponsors-mid">
          <SponsorImage
            image="xata-black-logo-with-butterfly"
            className="medium"
          />
          <SponsorImage image="supercharge" className="medium" />
          <SponsorImage image="stately" className="medium" />
          <SponsorImage image="exadel" className="medium" />
          <SponsorImage image="hasura" className="medium" />
          <SponsorImage image="supercharge" className="medium" />
        </div>
        <div className="sponsors-bottom">
          <SponsorImage image="Logo-ThisDot-Labs-sm" className="small" />
        </div>
      </div>
      <div className="slideshow">
        <SponsorSlide image="oracle" />
      </div>
      <div className="slideshow">
        <SponsorSlide image="vacuumlabs" />
      </div>
      <div className="slideshow logo">
        {event === 'css' ? <CSSLogo /> : <JSLogo />}
      </div>
    </div>
  )
}

export default MidSessionSlides
