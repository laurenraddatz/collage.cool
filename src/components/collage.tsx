import domtoimage from 'dom-to-image'
import React from 'react'
import styled from '@emotion/styled'

import { Album } from '../types'

const ALBUM_SIZE = 174

interface Props {
  albums: Album[]
  size?: number
}

interface WrapperProps {
  width: number
  height: number
}

interface ImageProps {
  src: string
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(props) => props.width * ALBUM_SIZE}px;
  height: ${(props) => props.height * ALBUM_SIZE}px;

  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, ${ALBUM_SIZE}px);
`

const Label = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 0 4px 2px 4px;

  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  font-family: sans-serif;
  letter-spacing: 0.03rem;
`

const Image = styled.div<ImageProps>`
  position: relative;
  margin: 0;
  background-image: url(${(props) => props.src});
  height: ${ALBUM_SIZE}px;
  width: ${ALBUM_SIZE}px;
`

export const Collage: React.FC<Props> = ({ albums, size = 3 }) => {
  const sizedAlbums = albums.slice(0, size * size)

  const width = size
  const height = size
  // large: 174px
  // extralarge: 300px

  return (
    <Wrapper width={width} height={height}>
      {sizedAlbums.map((album) => (
        <Image src={album.image[2]['#text']} key={album.name}>
          <Label>
            <div>{album.artist.name}</div>
            <div>{album.name}</div>
          </Label>
        </Image>
      ))}
    </Wrapper>
  )
}
