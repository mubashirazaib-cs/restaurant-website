import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

describe('restaurant app', () => {
  it('adds items to the cart and shows the total', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add biryani/i }))
    await user.click(screen.getByRole('button', { name: /add karahi/i }))

    expect(screen.getByText(/cart/i)).toBeInTheDocument()
    expect(screen.getByText(/2 items/i)).toBeInTheDocument()
    expect(screen.getByText(/total: rs\. 1200/i)).toBeInTheDocument()
  })
})
