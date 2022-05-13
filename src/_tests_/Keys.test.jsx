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
})
