/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
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
})
