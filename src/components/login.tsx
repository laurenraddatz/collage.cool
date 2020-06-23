import React from 'react'
import styled from '@emotion/styled'

const Header = styled.h1`
  font-size: 32px;

  color: black;
  font-style: italic;
  background-color: #f5e3e7;

  margin-top: -50px;
`

const Form = styled.form`
  margin-top: 24px;

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

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Login: React.FC<Props> = ({
  handleSubmit,
  handleUsernameChange,
}) => (
  <>
    <Header>&nbsp; collage.cool &nbsp;</Header>
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="last.fm username"
        onChange={handleUsernameChange}
      />
    </Form>
  </>
)
