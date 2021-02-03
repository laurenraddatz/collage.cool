import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import { Album } from './types'

const ALBUM_SIZE = 300 // 174 for large

interface Props {
  albums: Album[]
  rows: string
  columns: string
  shouldDisplayInfo: boolean
  handleImgUrl: (url: string) => void
}

const CanvasCollage = styled.canvas`
  flex: auto;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

export const Collage: React.FC<Props> = ({
  albums,
  rows,
  columns,
  shouldDisplayInfo,
  handleImgUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const width = columns ? parseInt(columns.toString()) : 3
  const height = rows ? parseInt(rows.toString()) : 3
  const sizedAlbums = albums.slice(0, width * height)

  useEffect(() => {
    if (canvasRef.current && sizedAlbums.length !== 0) {
      const context = canvasRef.current.getContext('2d')

      if (context) {
        let index = 0
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const artist = sizedAlbums[index].artist.name
            const album = sizedAlbums[index].name

            const xcoord = x * ALBUM_SIZE
            const ycoord = y * ALBUM_SIZE

            const image = new Image()
            image.onload = () => {
              context.drawImage(image, xcoord, ycoord)
              context.font = '14px sans-serif'
              context.textBaseline = 'middle'
              context.save()
              if (shouldDisplayInfo) {
                context.shadowColor = '#000'
                context.shadowOffsetX = -1
                context.shadowOffsetY = 1
                context.fillStyle = '#fff'
                context.fillText(`${artist}`, xcoord + 4, ycoord + 10)
                context.fillText(`${album}`, xcoord + 4, ycoord + 24)
              }
              context.restore()
            }
            image.src = sizedAlbums[index].image[3]['#text']
            index++
          }
        }
      }
    }
  }, [canvasRef, sizedAlbums])

  return (
    <CanvasCollage
      ref={canvasRef}
      width={width * ALBUM_SIZE}
      height={height * ALBUM_SIZE}
    />
  )
}
