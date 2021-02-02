import domtoimage from 'dom-to-image'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Album } from './types'

const ALBUM_SIZE = 300 // 174 for large

interface Props {
  albums: Album[]
  rows: string
  columns: string
  shouldDisplayInfo: boolean
}

const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width * ALBUM_SIZE}px;
  height: ${(props) => props.height * ALBUM_SIZE}px;
  max-height: '100%';
  max-width: '100%';

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
  max-width: ${ALBUM_SIZE}px;

  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-family: sans-serif;
  letter-spacing: 0.03rem;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`

const AlbumImage = styled.div<{ src: string }>`
  position: relative;
  margin: 0;
  background-image: url(${(props) => props.src});
  height: ${ALBUM_SIZE}px;
  width: ${ALBUM_SIZE}px;
`

export const Collage: React.FC<Props> = ({
  albums,
  rows,
  columns,
  shouldDisplayInfo,
}) => {
  const [shouldRenderImage, setShouldRenderImage] = useState(false)
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  const width = columns ? parseInt(columns.toString()) : 3
  const height = rows ? parseInt(rows.toString()) : 3
  const sizedAlbums = albums.slice(0, width * height)

  useEffect(() => {
    const node = document.getElementById('collage')
    if (node) {
      domtoimage
        .toPng(node)
        .then((dataUrl) => {
          setImgUrl(dataUrl)
          // i pretend i do not see it
          setTimeout(() => {
            setShouldRenderImage(true)
          }, 1500)
        })
        .catch((error) => {
          console.error('oops', error)
        })
    }
  }, [albums.length, rows, columns])

  return shouldRenderImage && imgUrl ? (
    <img src={imgUrl} />
  ) : (
    <Wrapper width={width} height={height} id="collage">
      {sizedAlbums.map((album) => (
        <AlbumImage src={album.image[3]['#text']} key={album.name}>
          {shouldDisplayInfo && (
            <Label>
              <div>{album.artist.name}</div>
              <div>{album.name}</div>
            </Label>
          )}
        </AlbumImage>
      ))}
    </Wrapper>
  )
}
