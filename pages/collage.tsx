import React, { useEffect, useState } from 'react'
import { withRouter, useRouter } from 'next/router'

import { Collage } from '../src/components/collage'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const CollagePage: React.FC<any> = (props) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  const user = router.query.user
  // change later or automatically determine
  const size = 4
  const period = '7day'
  // change limit if needed
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${LASTFM_API_KEY}&period=${period}&format=json`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.topalbums.album)
        },
        (error) => {
          setError(error)
        }
      )
  }, [url])

  return <Collage albums={data} />
}

export default withRouter(CollagePage)
