import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
// import './index.scss'

const CSSVisual = ({ presentation, midSlide }) => {

  useEffect(() => {
    console.log('useEffect init')

    return () => {
      console.log('useEffect cleanup')

    }
  }, [ false ])

  return (<div />)
}

export default CSSVisual
