import styled from 'styled-components'

type BirdProps = {
  size: number
  top: number
}

const Bird = styled.div<BirdProps>`
  position: absolute;
  background-color: red;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  top: ${({ top }) => top}px;
`

export default Bird
