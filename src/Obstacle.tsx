import styled from 'styled-components'

type ObstacleProps = {
  height: number
  width: number
  top: number
  left: number
}

const Obstacle = styled.div<ObstacleProps>`
  position: relative;
  background-color: #00ab41;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`

export default Obstacle
