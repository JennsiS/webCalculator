/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import '../css/styles.scss'
import Keys from './Keys'

export default function App() {
  const [content, updateContent] = useState('')
  const [operation, updateOperation] = useState([{ symbol: '=', operating: false }])
  const [result, updateResult] = useState(0)
  const [firstNumber, updateFirst] = useState(0)

  function setDisplay(symbol) {
    let newContent = content
    const contentString = newContent.toString().length
    if (contentString < 9 && symbol !== 'x' && symbol !== '-' && symbol !== '+' && symbol !== '=' && symbol !== '÷' && symbol !== '+/-' && symbol !== '%') {
      newContent += symbol
      updateContent(newContent)
    }
    const actualContent = content

    if (operation[0].operating && symbol === '=') {
      const number2 = Number(actualContent)
      const number1 = Number(firstNumber)
      let newResult = result
      const operatingSymbol = operation[0].symbol
      if (operatingSymbol === '+') {
        newResult = number1 + number2
      } else if (operatingSymbol === '-') {
        newResult = number1 - number2
      } else if (operatingSymbol === 'x') {
        newResult = number1 * number2
      } else if (operatingSymbol === '÷') {
        newResult = number1 / number2
      } else if (operatingSymbol === '%') {
        newResult = number1 % number2
      }

      if (newResult > 999999999 || newResult < 0) {
        newResult = 'ERROR'
      }

      if (newResult % 1 !== 0) {
        const splitResult = newResult.toString().split('.')
        const wholeNumber = splitResult[0].length
        const decimals = 8 - wholeNumber
        newResult = Number(newResult).toFixed(decimals)
      }

      updateResult(newResult)
      const newOperation = operation
      newOperation[0].symbol = ''
      newOperation[0].operating = false
      updateOperation([...newOperation])
      const setResult = newResult
      updateContent(setResult)
    }

    if (symbol === '+' || symbol === 'x' || symbol === '-' || symbol === '÷' || symbol === '%') {
      const number1 = Number(actualContent)
      updateFirst(number1)
      updateContent('')

      const newOperation = operation
      newOperation[0].symbol = symbol
      newOperation[0].operating = true
      updateOperation([...newOperation])
    }

    if (symbol === '+/-') {
      let actualNumber = Number(actualContent)
      actualNumber *= (-1)
      updateContent(actualNumber)
    }
  }

  function deleteContent() {
    const empty = ''
    updateContent(empty)
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
      <Keys keyName="symbolKey mod" symbol="%" clickFunction={setDisplay} />
      <div className="display" id="display">{content}</div>
      <div className="deleteKey">
        <button type="button" className="btn-grad" onClick={() => deleteContent()}>C</button>
      </div>
    </div>
  )
}
