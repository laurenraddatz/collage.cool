import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
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
  Stack,
  Heading,
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
  '1 week': '7day',
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
  const [timePeriod, setTimePeriod] = useState<TimeValue>(timeOptions['1 week'])
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
      <Center maxW="lg" p={16}>
        <VStack spacing="12px">
          <Heading
            style={{ cursor: 'pointer' }}
            fontSize="5xl"
            color="black"
            as="i"
            fontWeight="600"
            backgroundColor="#f5e3e7"
            onClick={handleHeaderClick}
            isTruncated
          >
            &nbsp; collage.cool &nbsp;
          </Heading>
          <Text align="center">
            Generate a collage from your{' '}
            <Link color="#b8060f" href="https://www.last.fm">
              Last.fm
            </Link>{' '}
            scrobbles
          </Text>
        </VStack>
      </Center>
      <VStack bg="white" spacing={8}>
        <Stack spacing="16px" direction={['column', 'row']}>
          <CustomForm onSubmit={handleUsernameSubmit}>
            <Input
              type="text"
              placeholder="last.fm username"
              onChange={handleUsernameChange}
              required={true}
            />
          </CustomForm>
          <Button
            size="md"
            colorScheme="red"
            variant="ghost"
            onClick={toggleOptions}
          >
            {showOptions ? 'Hide options' : 'Show options'}
          </Button>
          <Button
            size="md"
            colorScheme="red"
            onClick={handleOptionsSubmit}
            isDisabled={user === ''}
          >
            Generate
          </Button>
        </Stack>
        {showOptions && (
          <Flex w="100%">
            <VStack
              spacing={8}
              align="flex-start"
              justify="flex-start"
              w="100%"
            >
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
                  defaultValue={timeOptions['1 week']}
                  onChange={handleTimePeriodChange}
                >
                  {Object.keys(timeOptions).map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
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
