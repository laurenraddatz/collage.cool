import type { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, loadImage } from 'canvas'
import invariant from 'tiny-invariant'

const ALBUM_SIZE = 300
const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const reduceToSingle = (val: string | string[]): string =>
  Array.isArray(val) ? val[0] : val

export const fetchAlbums = async (user: string, period: string) => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${LASTFM_API_KEY}&limit=${100}&period=${period}&format=json`
  const result = await fetch(url).then((res) => res.json())
  return result.topalbums.album
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.query.user, 'expected query.user')
  invariant(req.query.timePeriod, 'expected query.timePeriod')

  const user = reduceToSingle(req.query.user)
  const period = reduceToSingle(req.query.timePeriod)
  const columns = parseInt(reduceToSingle(req.query.columns), 10)
  const rows = parseInt(reduceToSingle(req.query.rows), 10)
  const shouldDisplayInfo = reduceToSingle(req.query.displayInfo) === 'true'

  const albums = await fetchAlbums(user, period)

  const width = !Number.isNaN(columns) ? columns : 3
  const height = !Number.isNaN(rows) ? rows : 3
  const sizedAlbums = albums.slice(0, width * height)

  const canvas = createCanvas(width * ALBUM_SIZE, height * ALBUM_SIZE)
  const context = canvas.getContext('2d')

  let index = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const artist = sizedAlbums[index].artist.name
      const album = sizedAlbums[index].name

      const xcoord = x * ALBUM_SIZE
      const ycoord = y * ALBUM_SIZE

      const image = await loadImage(sizedAlbums[index].image[3]['#text'])

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

      index++
    }
  }

  res.status(200)
  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Content-Disposition', 'inline;')
  return res.send(canvas.toBuffer('image/jpeg'))
}
