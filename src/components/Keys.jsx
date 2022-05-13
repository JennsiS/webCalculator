/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react'
import '../css/keyStyles.scss'

export default function Cards(props) {
  const { keyName } = props
  const { symbol } = props
  const { clickFunction } = props

  return (
    <div className={keyName} data-testid="keyTest">
      <button data-testid={`buttonKey-${symbol}`} type="button" className="btn-grad" onClick={() => { clickFunction(symbol) }}>{symbol}</button>
    </div>
  )
}
