import React from 'react'
import cx from 'classnames'
import { Group } from '@vx/group'
import { Arc } from '@vx/shape'
import { ParentSize } from '@vx/responsive'
import styles from './ProgressSpinner.css'

/** Types of segments shown on the progress spinner. */
const SegmentTypes = Object.freeze({
  PROGRESS: 'PROGRESS',
  REMAINING: 'REMAINING'
})

type SegmentKeys = keyof typeof SegmentTypes;
type SegmentTypeValues = typeof SegmentTypes[SegmentKeys]

type ProgressEntry = {
  type: SegmentTypeValues,
  value: number
}

type Props = {
  /** Current progress. */
  progress: number,
  /** Total progress for which the task is considered completed. */
  total: number,
  /** Color used for the segment showing the currently completed progress. */
  progressColor: string,
  /** Color used for the segment showing the ramaining progress. */
  remainingColor: string,
  /** Color used for the background. */
  backgroundColor: string,
  /** Width of the circle stroke. */
  strokeWidth: number
  /** Font size for the progress text. */
  fontSizePx: number
  /** True if the progress arc should spin. */
  spin: boolean
}

/**
 * Component used to show the progress of a task. Given a 'progress' progress count
 * and a 'total' count, it will calculate the progress as a percentage and show a spinner
 * made up of 2 segments:
 *  1. A segment to showing current progress, shown in a color defined by the color prop.
 *  2. A placeholder segment showing the remaining progress. The current progress overlaps this segment which remain
 * on the background.
 * The current progress segment rotates clockwise until the task completes, if the spin prop is true.
 * After that a task completed state is shown with a video.
 */
const ProgressSpinner = ({ progress, total, progressColor, remainingColor, backgroundColor, strokeWidth, fontSizePx, spin }: Props) => {
  const progressRatio = progress / total
  const progressRad = progressRatio * 2 * Math.PI

  const renderArc = ({ endAngle, color, radius }: {endAngle: number, color: string, radius: number}) => (
    <Arc
      data={{}}
      outerRadius={radius}
      innerRadius={radius - strokeWidth}
      cornerRadius={strokeWidth}
      startAngle={0} endAngle={endAngle} fill={color}/>
  )

  return (
    <ParentSize>
      {({ width, height }) => {
        const centerY = height / 2
        const centerX = width / 2
        const radius = Math.min(width, height) / 2

        if (progressRatio >= 1) {
          return (
            <div className={styles.videoWrapper}>
              <video
                src="https://prod-cdn.wetransfer.net/packs/media/transfer_window/transfer_completed-3-5dbf2f01.mp4"
                autoPlay
                loop
                style={{ width: `${radius * 2}px` }}/>
            </div>
          )
        }

        return (
          <div className={cx(styles.spinnerWrapper, { [styles.spinning]: !!progress && spin })}>
            <svg width={width} height={height}>
              <rect rx={14} width={width} height={height} fill={backgroundColor} />
              <Group top={centerY} left={centerX}>
                {renderArc({ endAngle: 2 * Math.PI, color: remainingColor, radius })}
                {renderArc({ endAngle: progressRad, color: progressColor, radius })}
              </Group>
            </svg>
            <div className={styles.textWrapper} style={{ fontSize: `${fontSizePx}px`, lineHeight: `${fontSizePx}px` }}>
              <div className={styles.progressValue}>{`${Math.floor(progressRatio * 100)}`}</div>
              <div className={styles.percentage} style={{ fontSize: `${fontSizePx * 0.4}px`, color: remainingColor }}>%</div>
            </div>
          </div>
        )
      }}
    </ParentSize>)
}

ProgressSpinner.defaultProps = {
  progressColor: '#3687EF',
  remainingColor: '#E1E6E9',
  strokeWidth: 8,
  backgroundColor: 'white',
  fontSizePx: 72,
  spin: true
}

export default ProgressSpinner
