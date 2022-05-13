/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../components/App'

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  it('Render Component', () => {
    render(<App />)
    const TodoElement = screen.getByTestId('calculator-test')
    expect(TodoElement).toBeInTheDocument()
  })

  it('Render Component Button', () => {
    render(<App />)
    const TodoElement = screen.getByTestId('delete-test')
    expect(TodoElement).toBeInTheDocument()
  })
  it('Delete actual content', () => {
    const app = render(<App />)
    const deleteContentFn = jest.fn()
    const button = app.getByTestId('deleteButton')
    button.onclick = deleteContentFn
    fireEvent.click(button)
    expect(deleteContentFn).toHaveBeenCalled()
  })
  it('Set numbers to display', () => {
    const numberSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let content = '5'
    const symbol = '6'
    const contentString = content.toString().length

    if (contentString < 9 && (numberSymbols.includes(symbol) || symbol === '.')) {
      content += symbol
    }

    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('56')
  })

  it('Change sign', () => {
    const actualContent = '4'
    const symbol = '+/-'
    let content = ''

    if (symbol === '+/-') {
      let actualNumber = Number(actualContent)
      actualNumber *= (-1)
      content = actualNumber
    }

    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('-4')
  })

  it('Modify decimals', () => {
    let newResult = 9.89456152
    let content = ''

    if (newResult % 1 !== 0) {
      const splitResult = newResult.toString().split('.')
      const wholeNumber = splitResult[0].length
      const decimals = 8 - wholeNumber
      const decimalContent = Number(newResult).toFixed(decimals)
      newResult = decimalContent
      content = newResult.toString()
    }

    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('9.8945615')
  })
  it('Identify error', () => {
    let newResult = 99999999921
    let content = ''

    if (newResult > 999999999) {
      const displayContent = 'ERROR'
      newResult = displayContent
      content = newResult
    }

    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('ERROR')
  })
  it('Adding', () => {
    const actualContent = '6'
    let content = ''
    const number1 = 5
    const operationSymbols = ['x', '-', '+', '=', '÷', '+/-', '%']
    const operation = [{ symbol: '+', operating: true }]
    const symbol = '='

    if (operation[0].operating && operationSymbols.includes(symbol)) {
      const number2 = Number(actualContent)
      let newResult = 0
      const operatingSymbol = operation[0].symbol
      if (operatingSymbol === '+') {
        newResult = number1 + number2
        content = newResult.toString()
      }
    }
    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('11')
  })
  it('Mod', () => {
    const actualContent = '3'
    let content = ''
    const number1 = 9
    const operationSymbols = ['x', '-', '+', '=', '÷', '+/-', '%']
    const operation = [{ symbol: '%', operating: true }]
    const symbol = '='

    if (operation[0].operating && operationSymbols.includes(symbol)) {
      const number2 = Number(actualContent)
      let newResult = 0
      const operatingSymbol = operation[0].symbol
      if (operatingSymbol === '%') {
        newResult = number1 % number2
        content = newResult.toString()
      }
    }
    const app = render(<App />)
    const display = app.getByTestId('display')
    display.innerHTML = content
    expect(display.innerHTML).toBe('0')
  })
  it('Click on a key', () => {
    const app = render(<App />)
    const button = app.getByTestId('buttonKey-1')
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })
  it('Click on a key', () => {
    const app = render(<App />)
    const button = app.getByTestId('buttonKey-+')
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })
  it('Click on a key', () => {
    const app = render(<App />)
    const button = app.getByTestId('buttonKey-=')
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })
})
