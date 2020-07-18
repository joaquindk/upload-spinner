import React from 'react'
import Application from 'src/components/Application'
import { render } from '@testing-library/react'

describe('Application', () => {
  it('should render the application', () => {
    const { container } = render(<Application />)

    expect(container).toMatchSnapshot()
  })
})
