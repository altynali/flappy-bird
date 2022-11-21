import styled from 'styled-components'

type GameProps = {
  height: number
  width: number
}

const GameBox = styled.div<GameProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #87ceeb;
  overflow: hidden;
`

export default GameBox
