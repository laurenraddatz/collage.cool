import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled'

import { Album } from './types'

interface Props {
  albums: Album[]
  size?: number
}

export const Collage: React.FC<Props> = ({ albums, size }) => {
  const artists = albums.map(a => a.name)
  console.log(artists)

  return (
    <div>wassup world</div>
  )
}