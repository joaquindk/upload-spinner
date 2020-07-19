import React from 'react'
import ProgressSpinner from 'src/components/progressSpinner'
import { render } from '@testing-library/react'

// Mocks the ParentSize component to return a 200x200 size
jest.mock('@vx/responsive', () => ({
  ...jest.requireActual('@vx/responsive'),
  ParentSize: ({ children }) => children({ width: 200, height: 200 })
}))

describe('ProgressSpinner', () => {
  describe('with zero progress.', () => {
    it('should render a progress spinner with no progress', () => {
      const { container } = render(<ProgressSpinner progress={0} total={100} />)

      expect(container).toMatchSnapshot()
      expect(container.querySelectorAll('path').length).toBe(2)
      expect(container.querySelector('.progressValue').innerHTML).toBe('0')
    })

    it('should ignore the spin property and not make the spinner spin when the progress is zero.', () => {
      const { container } = render(<ProgressSpinner progress={0} total={100} spin />)

      expect(container.querySelectorAll('.spinning').length).toBe(0)
    })
  })

  describe('with some progress without having completed ', () => {
    it('should render a progress spinner with some progress that has not yet comleted', () => {
      const { container } = render(<ProgressSpinner progress={20} total={100} />)

      expect(container).toMatchSnapshot()
      expect(container.querySelectorAll('path').length).toBe(2)
      expect(container.querySelector('.progressValue').innerHTML).toBe('20')
      expect(container.querySelectorAll('.spinning').length).toBe(1)
    })

    it('should not make the progress segment spin if the spin prop is false', () => {
      const { container } = render(<ProgressSpinner progress={20} total={100} spin={false} />)

      expect(container).toMatchSnapshot()
      expect(container.querySelectorAll('.spinning').length).toBe(0)
    })

    it('should correctly apply each of the style properties passed to the spinner', () => {
      const componentProps = {
        progressColor: 'red',
        remainingColor: 'yellow',
        backgroundColor: 'green',
        fontSizePx: 20
      }
      const { container } = render(
        <ProgressSpinner progress={20} total={100} {...componentProps} />
      )

      expect(container.querySelectorAll('path')[1].getAttribute('fill')).toBe(
        componentProps.progressColor
      )
      expect(container.querySelectorAll('path')[0].getAttribute('fill')).toBe(
        componentProps.remainingColor
      )
      expect(container.querySelector('rect').getAttribute('fill')).toBe(
        componentProps.backgroundColor
      )
      expect(container.querySelector('.textWrapper').getAttribute('style')).toEqual(
        `font-size: ${componentProps.fontSizePx}px; line-height: ${componentProps.fontSizePx}px;`
      )
    })
  })

  describe('with finished progress', () => {
    it('should render a completed state video with auto play and loop', () => {
      const { container } = render(<ProgressSpinner progress={100} total={100} />)

      expect(container.querySelectorAll('svg').length).toBe(0)
      expect(container.querySelectorAll('video').length).toBe(1)
      expect(container).toMatchSnapshot()
    })
  })
})
