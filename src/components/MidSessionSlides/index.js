import React from 'react'
import classnames from 'classnames'
import './index.scss'

import SponsorImage from '../SponsorImage'

const MidSessionSlides = ({ stage }) => (
  <div className={classnames('mid-session-slides')}>
    <div className="sponsors">
      <div className="sponsors-top">
        <SponsorImage image="mozilla" className="large" />
      </div>
      <div className="sponsors-mid">
        <SponsorImage image="risingstack" className="medium" />
        <SponsorImage image="supercharge" className="medium" />
        <SponsorImage image="bonomi" className="medium" />
        <SponsorImage image="vacuumlabs" className="medium" />
        <SponsorImage image="microsoft" className="medium" />
        <SponsorImage image="mito" className="medium" />
        <SponsorImage image="sinnerschrader" className="medium" />
        <SponsorImage image="epam" className="medium" />
      </div>
      <div className="sponsors-bottom">
        <SponsorImage image="zalando" className="small" />
        <SponsorImage image="snyk" className="small" />
      </div>
    </div>
  </div>
)

export default MidSessionSlides
