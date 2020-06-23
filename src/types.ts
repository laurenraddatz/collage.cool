export interface Album {
  artist: Artist
  '@attr': {
    rank: string;
  }
  image: Image[]
  playcount: string // numerical string, e.g., "5"
  url: string
  name: string
  mbid: string
}

interface Artist {
  url: string
  name: string
  mbid: string
}

interface Image {
  size: 'small' | 'medium' | 'large' | 'extralarge'
  '#text': string
}