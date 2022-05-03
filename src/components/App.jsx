/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import '../css/styles.scss'
import Keys from './Keys'

export default function App() {
  const [content, updateContent] = useState(0)
  const [operation, updateOperation] = useState([{ symbol: '=', operating: false }])
  const [result, updateResult] = useState(0)
  const [firstNumber, updateFirst] = useState(0)

  function setDisplay(symbol) {
    let newContent = content
    const contentString = newContent.toString().length
    if (contentString <= 9 && symbol !== 'x' && symbol !== '-' && symbol !== '+' && symbol !== '=' && symbol !== '÷' && symbol !== '+/-') {
      newContent += symbol
      updateContent(newContent)
    }

    if (symbol === '+' || symbol === 'x' || symbol === '-' || symbol === '÷') {
      let number1 = firstNumber
      number1 = newContent
      updateFirst(number1)
      updateContent(0)

      const newOperation = operation
      newOperation[0].symbol = symbol
      newOperation[0].operating = true
      updateOperation([...newOperation])
      console.log(operation)
      console.log(firstNumber)
    }

    if (operation[0].operating) {
      const number2 = newContent
      const number1 = firstNumber
      let newResult = result

      if (symbol === '+') {
        newResult = number1 + number2
        console.log(`1 ${number1}`)
        console.log(`2 ${number2}`)
        console.log(`suma ${newResult}`)
      } else if (symbol === '-') {
        newResult = number1 - number2
      } else if (symbol === 'x') {
        newResult = number1 * number2
      } else if (symbol === '÷') {
        newResult = number1 / number2
      }
      updateResult(newResult)
      const newOperation = operation
      newOperation[0].symbol = symbol
      newOperation[0].operating = false
      updateOperation([...newOperation])
      console.log(result)
    }

    if (symbol === '=') {
      newContent = result
      updateContent(newContent)
    }
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
