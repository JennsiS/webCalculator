/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import '../css/styles.scss'
import Keys from './Keys'

export default function App() {
  const [content, updateContent] = useState('')
  const [operation, updateOperation] = useState([{ symbol: '', operating: false }])
  const [result, updateResult] = useState(0)
  const [firstNumber, updateFirst] = useState(0)
  const [secondNumber, updateSecond] = useState(0)
  const [prevSymbol, updatePrevSymbol] = useState('')
  const operationSymbols = ['x', '-', '+', '=', '÷', '+/-', '%']
  const numberSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  function setDisplay(symbol) {
    let newContent = content
    // Check if a number key is selected after an operation key to delete the display content
    if (numberSymbols.includes(symbol) && operationSymbols.includes(prevSymbol)) {
      const empty = ''
      updateContent(empty)
      newContent = empty
    }
    // Get the length of the actual content in display
    const contentString = newContent.toString().length

    // Add content to the display while max length it is not exceeded
    if (contentString < 9 && (numberSymbols.includes(symbol) || symbol === '.')) {
      newContent += symbol
      updateContent(newContent)
    }
    // Get the update content
    const actualContent = content

    // Check if actual state is making an operation to collect the second number and operate
    if (operation[0].operating && operationSymbols.includes(symbol)) {
      let number2 = secondNumber
      number2 = Number(actualContent)
      updateSecond(number2)
      updateContent('')
      const number1 = Number(firstNumber)
      let newResult = result
      const operatingSymbol = operation[0].symbol
      if (operatingSymbol === '+') {
        newResult = number1 + number2
      } else if (operatingSymbol === '-') {
        newResult = (number1 - number2)
      } else if (operatingSymbol === 'x') {
        newResult = number1 * number2
      } else if (operatingSymbol === '÷') {
        newResult = number1 / number2
      } else if (operatingSymbol === '%') {
        newResult = number1 % number2
      } else if (operatingSymbol === '=') {
        newResult = number2
      }

      // Verify that the result doesn't exceed the max length in the display
      if (newResult > 999999999) {
        const displayContent = 'ERROR'
        newResult = displayContent
        updateResult(0)
        updateContent(newResult)
      }

      // If the result is a float number, count the capacity of decimal numbers that
      // doesn't exceed the max length in the display
      if (newResult % 1 !== 0) {
        const splitResult = newResult.toString().split('.')
        const wholeNumber = splitResult[0].length
        const decimals = 8 - wholeNumber
        const decimalContent = Number(newResult).toFixed(decimals)
        newResult = decimalContent
      }

      updateResult(newResult)
      updateContent(newResult.toString())
      updateFirst(newResult)
      const newOperation = operation
      newOperation[0].symbol = symbol
      updateOperation([...newOperation])
    }

    // Get the first number for the first time while not operating
    if (operationSymbols.includes(symbol) && !operation[0].operating) {
      const number1 = Number(actualContent)
      updateFirst(number1)
      updateContent('')
      const newOperation = operation
      newOperation[0].symbol = symbol
      newOperation[0].operating = true
      updateOperation([...newOperation])
    }

    // Change the sign of the actual number
    if (symbol === '+/-') {
      let actualNumber = Number(actualContent)
      actualNumber *= (-1)
      updateContent(actualNumber)
    }
    updatePrevSymbol(symbol)
  }

  function deleteContent() {
    const empty = ''
    updateContent(empty)
    updateResult(0)
    const newOperation = operation
    newOperation[0].symbol = ''
    newOperation[0].operating = false
  }

  return (
    <>
      <div className="title">
        <h2>Calculator</h2>
      </div>
      <div className="calculator" data-testid="calculator-test">
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
        <div className="deleteKey" data-testid="delete-test">
          <button type="button" className="btn-grad" onClick={() => deleteContent()}>C</button>
        </div>
      </div>

    </>
  )
}
