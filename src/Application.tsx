import React, { useState, useLayoutEffect } from 'react'
import ProgressSpinner from './components/progressSpinner'
import styles from './Application.css'

const MAX_PROGRESS = 3000

/** Demo application with the required logic to demo the progress spinner. */
const Application = () => {
  const [isSpinning, setIsSpinning] = useState(true)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)

  useLayoutEffect(() => {
    if (isSimulating && currentProgress < MAX_PROGRESS) {
      setTimeout(() => {
        setCurrentProgress(currentProgress + 1)
      })
    } else if (!isSimulating) {
      setCurrentProgress(0)
    }
  }, [isSimulating, currentProgress])

  return (
    <div className={styles.container}>
      <div className={styles.demoWrapper}>
        <ProgressSpinner progress={currentProgress} total={MAX_PROGRESS} spin={isSpinning} />
        <div className={styles.controls}>
          <button onClick={() => setIsSimulating(!isSimulating)}>
            {isSimulating ? 'Reset simulation' : 'Start simulation'}
          </button>
          <button onClick={() => setIsSpinning(!isSpinning)}>
            {isSpinning ? 'Stop spinning' : 'Start spinning'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Application
