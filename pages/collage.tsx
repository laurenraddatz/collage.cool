import { withRouter, useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { Flex, Text, VStack, Container } from '@chakra-ui/react'

import { Collage } from '../components/collage'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const CollagePage: React.FC<any> = (props) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  const rows = props.rows ?? router.query.rows
  const columns = props.columns ?? router.query.columns
  const shouldDisplayInfo =
    props.displayInfo === 'true' ?? router.query.displayInfo === 'true'
  const period = props.timePeriod ?? router.query.timePeriod
  const user = props.user ?? router.query.user

  // change limit if needed
  const url = `//ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${LASTFM_API_KEY}&period=${period}&format=json`

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

  if (!user) {
    return null
  }

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, rows, columns, timePeriod, displayInfo } = context.query

  return {
    props: { user, rows, columns, timePeriod, displayInfo },
  }
}
