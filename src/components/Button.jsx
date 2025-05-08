import styled from "styled-components"

export const Button = ({text, func, color}) => {
  return (
    <MyButton onClick={func} color={color}>
      {text}
    </MyButton>
  )
}

const MyButton = styled.button`
  height: 35px;
  background-color: var(--light);
  color: black;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  &:hover {
    background-color:${(props) => props.color || "var(--primary-light)"};
  }
`