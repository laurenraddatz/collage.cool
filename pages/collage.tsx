import { withRouter, useRouter } from 'next/router'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Flex, Text, VStack, Container } from '@chakra-ui/react'

import { Collage } from '../components/collage'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const CollagePage: React.FC<any> = (props) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  console.log('props', props)
  console.log('router', router.query)
  const { user, timePeriod, displayInfo } = router.query

  if (!user) {
    return null
  }

  const rows = parseInt(router.query.rows.toString())
  const columns = parseInt(router.query.columns.toString())
  const shouldDisplayInfo = displayInfo.toString() === 'true'
  const period = timePeriod ?? '7day'

  // change limit if needed
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${LASTFM_API_KEY}&period=${period}&format=json`

  const handleHeaderClick = () => router.push('/')

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

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      align="center"
      justify="flex-start"
      bg="#222"
    >
      <Head>
        <title>collage.cool</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex maxW="lg" p={16}>
        <VStack spacing="12px">
          <Text
            style={{ cursor: 'pointer' }}
            fontSize="5xl"
            color="black"
            as="i"
            fontWeight="600"
            backgroundColor="#f5e3e7"
            onClick={handleHeaderClick}
          >
            &nbsp; collage.cool &nbsp;
          </Text>
        </VStack>
      </Flex>
      <Container maxW="80ch">
        <Collage
          albums={data}
          rows={rows}
          columns={columns}
          shouldDisplayInfo={shouldDisplayInfo}
        />
      </Container>
    </Flex>
  )
}

export default withRouter(CollagePage)
