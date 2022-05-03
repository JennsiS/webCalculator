/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import '../css/styles.scss'
import Keys from './Keys'

export default function App() {
  const [content, updateContent] = useState(0)
  function setDisplay(symbol) {
    let newContent = content
    newContent += symbol
    updateContent(newContent)
  }
  return (
    <div className="calculator">
      <Keys keyName="numericKey one" symbol="1" clickFunction={setDisplay} />
      <Keys keyName="numericKey two" symbol="2" clickFunction={setDisplay} />
      <Keys keyName="numericKey three" symbol="3" clickFunction={setDisplay} />
      <Keys keyName="numericKey four" symbol="4" clickFunction={setDisplay} />
      <Keys keyName="numericKey five" symbol="5" clickFunction={setDisplay} />
      <Keys keyName="numericKey six" symbol="6" clickFunction={setDisplay} />
      <Keys keyName="numericKey seven" symbol="7" clickFunction={setDisplay} />
      <Keys keyName="numericKey eight" symbol="8" clickFunction={setDisplay} />
      <Keys keyName="numericKey nine" symbol="9" clickFunction={setDisplay} />
      <Keys keyName="numericKey zero" symbol="0" clickFunction={setDisplay} />
      <Keys keyName="symbolKey dot" symbol="." clickFunction={setDisplay} />
      <Keys keyName="symbolKey equal" symbol="=" clickFunction={setDisplay} />
      <Keys keyName="symbolKey add" symbol="+" clickFunction={setDisplay} />
      <Keys keyName="symbolKey sub" symbol="-" clickFunction={setDisplay} />
      <Keys keyName="symbolKey multiply" symbol="x" clickFunction={setDisplay} />
      <Keys keyName="symbolKey div" symbol="÷" clickFunction={setDisplay} />
      <Keys keyName="symbolKey sign" symbol="+/-" clickFunction={setDisplay} />
      <div className="display" id="display">{content}</div>
    </div>
  )
}
