import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'

import SponsorSlide from '../SponsorSlide'
import JSLogo from '../JSLogo'

import Abbyy from '../../../public/sponsors/abbyy.inline.svg'
import Auth0 from '../../../public/sponsors/auth0.inline.svg'
import Epam from '../../../public/sponsors/epam.inline.svg'
import Exadel from '../../../public/sponsors/exadel.inline.svg'
import Genesys from '../../../public/sponsors/genesys.inline.svg'
import Hasura from '../../../public/sponsors/hasura.inline.svg'
import Hotjar from '../../../public/sponsors/hotjar.inline.svg'
import Littledata from '../../../public/sponsors/littledata.inline.svg'
import Newrelic from '../../../public/sponsors/newrelic.inline.svg'
import Oracle from '../../../public/sponsors/oracle.inline.svg'
import Stately from '../../../public/sponsors/stately.inline.svg'
import Supercharge from '../../../public/sponsors/supercharge.inline.svg'
import TalonOne from '../../../public/sponsors/talon-one.inline.svg'
import ThisDot from '../../../public/sponsors/this-dot.inline.svg'
import Twilio from '../../../public/sponsors/twilio.inline.svg'
import Wrike from '../../../public/sponsors/wrike.inline.svg'
import Xata from '../../../public/sponsors/xata.inline.svg'

const SLIDE_INTERVAL = 10000

const reset = (slides) => {
  slides.forEach((slide, i) => {
    slide.classList.remove('show')
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
      //slideShowInterval.current = setInterval(
      //  () => next(slides.current),
      //  SLIDE_INTERVAL
      //)
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
          <Wrike className="large" />
          <Genesys className="large" />
          <Oracle className="large" />
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
          <div className="sponsor-container">
            <h4>Day One Afterparty by</h4>
            <Auth0 className="medium" />
          </div>

          <div className="sponsor-container">
            <h4>Scholarship Support & Closed Captions by</h4>
            <Abbyy className="medium" />
          </div>

          <div className="sponsor-container">
            <h4>Sketchnotes by</h4>
            <Hasura className="medium" />
          </div>
        </div>
      </div>
      <div className="sponsors slideshow">
        <div className="sponsors-mid">
          <Xata className="medium" />
          <Epam className="medium" />
          <Newrelic className="medium" />
          <Stately className="medium" />
          <Exadel className="medium" />
          <Supercharge className="medium" />
          <Littledata className="medium" />
        </div>
      </div>
      <div className="sponsors slideshow">
        <div className="sponsors-bottom">
          <Hotjar className="small" />
          <TalonOne className="small" />
          <ThisDot className="small" />
          <Twilio className="small" />
        </div>
      </div>
      <div className="slideshow">
        <SponsorSlide image="oracle" />
      </div>
      <div className="slideshow">
        <SponsorSlide image="wrike" />
      </div>
      <div className="slideshow">
        <SponsorSlide image="genesys" />
      </div>
      <div className="slideshow">
        <SponsorSlide image="stately" />
      </div>
      <div className="slideshow logo">
        <JSLogo />
      </div>
    </div>
  )
}

export default MidSessionSlides
