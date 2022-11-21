import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'
import Bird from './Bird'
import GameBox from './GameBox'
import Obstacle from './Obstacle'
import { useKeyPress } from './useKeyPressedHook'
import {
  BIRD_SIZE,
  GAME_HEIGHT,
  GAME_WIDTH,
  GRAVITY,
  JUMP_HEIGHT,
  OBS_GAP,
  OBS_WIDTH,
} from './variables'

function App() {
  const [birdPosition, setBirdPosition] = useState<number>(100)
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [obstacleHeight, setObstacleHeight] = useState<number>(50)
  const [obstacleLeft, setObstacleLeft] = useState<number>(
    GAME_WIDTH - OBS_WIDTH
  )
  const [score, setScore] = useState(0)

  const restartPress = useKeyPress('r')

  const bottomObsHeight = GAME_HEIGHT - OBS_GAP - obstacleHeight

  useEffect(() => {
    let timeId: NodeJS.Timer
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY)
      }, 24)
    }

    return () => {
      clearInterval(timeId)
    }
  }, [birdPosition, gameHasStarted])

  useEffect(() => {
    let obstacleLeftId: NodeJS.Timer
    if (gameHasStarted && obstacleLeft >= -OBS_WIDTH) {
      obstacleLeftId = setInterval(
        () => setObstacleLeft((obstacleLeft) => obstacleLeft - 5),
        24
      )
    } else if (gameHasStarted) {
      setObstacleLeft(GAME_WIDTH - OBS_WIDTH)
      setObstacleHeight(
        Math.floor(Math.random() * (GAME_HEIGHT - OBS_GAP) + 10)
      )
      setScore((score) => score + 1)
    }

    return () => {
      clearInterval(obstacleLeftId)
    }
  }, [gameHasStarted, obstacleLeft])

  useEffect(() => {
    const hasCollidedWithTopObs =
      birdPosition >= 0 && birdPosition < obstacleHeight
    const hasCollidedWithBottomObs =
      birdPosition <= GAME_HEIGHT &&
      birdPosition >= GAME_HEIGHT - bottomObsHeight
    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBS_WIDTH &&
      (hasCollidedWithBottomObs || hasCollidedWithTopObs)
    ) {
      setGameHasStarted(false)
      setGameOver(true)
    }
  }, [birdPosition, bottomObsHeight, obstacleHeight, obstacleLeft])

  useEffect(() => {
    if (restartPress) {
      setGameHasStarted(false)
      setGameOver(false)
      setBirdPosition(100)
      setObstacleHeight(50)
      setObstacleLeft(GAME_WIDTH - OBS_WIDTH)
      setScore(0)
    }
  }, [restartPress])

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT
    if (gameOver) return

    if (!gameHasStarted) {
      setGameHasStarted(true)
    } else if (newBirdPosition < 0) {
      setBirdPosition(0)
    } else {
      setBirdPosition(newBirdPosition)
    }
  }

  return (
    <Div onClick={handleClick}>
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <Bird size={BIRD_SIZE} top={birdPosition} />
        <Obstacle
          height={obstacleHeight}
          width={OBS_WIDTH}
          left={obstacleLeft}
          top={0}
        />
        <Obstacle
          height={bottomObsHeight}
          width={OBS_WIDTH}
          left={obstacleLeft}
          top={GAME_HEIGHT - (obstacleHeight + bottomObsHeight)}
        />
      </GameBox>
      <span>
        {gameOver
          ? 'Game over. Press R to restart'
          : `Score: ${score} ${!gameHasStarted ? 'Click to start.' : ''}`}
      </span>
    </Div>
  )
}

export default App

const Div = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  & span {
    color: white;
    font-size: 24px;
    position: absolute;
  }
`
