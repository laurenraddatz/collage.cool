import { Router, useRouter } from 'next/router'
import Head from 'next/head'
import React, { MouseEvent, useState } from 'react'
import styled from '@emotion/styled'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  Slider,
  SliderThumb,
  SliderFilledTrack,
  SliderTrack,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Text,
  Center,
  VStack,
  Link,
  HStack,
} from '@chakra-ui/react'

export const Main = styled.div`
  background-color: white;
  font-family: sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0;
  min-height: 100vh;
`

const Header = styled.h1`
  font-size: 32px;

  color: black;
  font-style: italic;
  font-weight: 600;
  background-color: #f5e3e7;
`

const CustomForm = styled.form`
  &::after {
    display: block;
    content: '';
    border-bottom: solid 4px black;
    transition: transform 200ms ease-in-out;
    transform: scaleX(0.5);
    transform-origin: 0 50%;
  }

  &:focus-within::after {
    transform: scaleX(1);
  }
`

const Input = styled.input`
  font-size: 16px;
  margin: 4px 2px;

  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`

const timeOptions = {
  '7 days': '7day',
  '1 month': '1month',
  '3 months': '3month',
  '6 months': '6month',
  '12 months': '12month',
  overall: 'overall',
}
type TimeKey = keyof typeof timeOptions
type TimeValue = typeof timeOptions[TimeKey]

const Home = () => {
  const [user, setUser] = useState('')
  const [timePeriod, setTimePeriod] = useState<TimeValue>(timeOptions['7 days'])
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const [displayInfo, setDisplayInfo] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const router = useRouter()

  const handleHeaderClick = () => router.push('/')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value)

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(
      `/collage?user=${user}&rows=${rows}&columns=${columns}&timePeriod=${timePeriod}&displayInfo=${displayInfo}`
    )
  }

  const handleOptionsSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>
    router.push(
      `/collage?user=${user}&rows=${rows}&columns=${columns}&timePeriod=${timePeriod}&displayInfo=${displayInfo}`
    )

  const toggleOptions = () => setShowOptions(!showOptions)

  const handleRowsChange = (value: number) => setRows(value)

  const handleColumnsChange = (value: number) => setColumns(value)

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisplayInfo(e.target.checked)

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTimePeriod(timeOptions[e.currentTarget.value as TimeKey])

  return (
    <Flex direction="column" w="100%" align="center" justify="center">
      <Head>
        <title>collage.cool</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Center maxW="lg" p={16}>
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
          <Text>
            Generate a collage from your{' '}
            <Link color="#b8060f" href="https://www.last.fm">
              Last.fm
            </Link>{' '}
            scrobbles
          </Text>
        </VStack>
      </Center>
      <VStack bg="white" spacing={8}>
        <HStack spacing="16px">
          <CustomForm onSubmit={handleUsernameSubmit}>
            <Input
              type="text"
              placeholder="last.fm username"
              onChange={handleUsernameChange}
            />
          </CustomForm>
          <Button
            size="md"
            colorScheme="red"
            variant="ghost"
            onClick={toggleOptions}
          >
            {showOptions ? 'hide options' : 'show options'}
          </Button>
          <Button size="md" colorScheme="red" onClick={handleOptionsSubmit}>
            Generate
          </Button>
        </HStack>
        {showOptions && (
          <Flex w="100%">
            <VStack spacing={8} align="flex-start" justify="flex-start" w="xs">
              <FormControl id="rows">
                <FormLabel>Rows</FormLabel>
                <HStack spacing={4}>
                  <Slider
                    colorScheme="blackAlpha"
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={3}
                    onChange={handleRowsChange}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb bg="black" />
                  </Slider>
                  <Text>{rows}</Text>
                </HStack>
              </FormControl>
              <FormControl id="columns">
                <FormLabel>Columns</FormLabel>
                <HStack spacing={4}>
                  <Slider
                    colorScheme="blackAlpha"
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={3}
                    onChange={handleColumnsChange}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb bg="black" />
                  </Slider>
                  <Text>{columns}</Text>
                </HStack>
              </FormControl>
              <FormControl id="time-period">
                <FormLabel>Time Period</FormLabel>
                <Select
                  variant="flushed"
                  colorScheme="blackAlpha"
                  focusBorderColor="black"
                  icon={<ChevronDownIcon />}
                  defaultValue={timeOptions['7 days']}
                  onChange={handleTimePeriodChange}
                >
                  {Object.keys(timeOptions).map((timeOption) => (
                    <option value={timeOption}>{timeOption}</option>
                  ))}
                </Select>
              </FormControl>
              <Checkbox
                defaultChecked
                colorScheme="blackAlpha"
                onChange={handleDisplayChange}
              >
                Show titles
              </Checkbox>
            </VStack>
          </Flex>
        )}
      </VStack>
    </Flex>
  )
}

export default Home
