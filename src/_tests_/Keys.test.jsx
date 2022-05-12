/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Keys from '../components/Keys'

describe('Keys', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  it('Render Component', () => {
    render(<Keys />)
    const TodoElement = screen.getByTestId('keyTest')
    expect(TodoElement).toBeInTheDocument()
  })

  it('Render Component Button', () => {
    render(<Keys />)
    const TodoElement = screen.getByTestId('buttonKey')
    expect(TodoElement).toBeInTheDocument()
  })
  it('Click on a key', () => {
    const selectKeyFn = jest.fn()
    const key = render(<Keys clickFunction={selectKeyFn} />)
    const button = key.getByTestId('buttonKey')
    button.onclick = selectKeyFn
    fireEvent.click(button)
    expect(selectKeyFn).toHaveBeenCalled()
  })
})
