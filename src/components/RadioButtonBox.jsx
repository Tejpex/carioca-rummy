import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const RadioButtonBox = ({person}) => {
  const {
    sortByValue,
    sortBySuit,
    setNewHand,
    sortingOn,
    setSortingOn
  } = useCarioca()

  const handleSorting = (value) => {
    if (value === "value") {
      const cards = sortByValue(person.hand)
      setNewHand(person, cards)
    } else if (value === "suit") {
      const cards = sortBySuit(person.hand)
      setNewHand(person, cards)
    }
    setSortingOn(value)
  }

  return (
    <Box>
      <form onChange={() => handleSorting(event.target.value)}>
        <legend>Sortera korten:</legend>
        <ButtonDiv>
          <CheckboxField>
            <HiddenInput
              type="radio"
              id="sort-off"
              name="sorting"
              value="off"
              defaultChecked={sortingOn === "off"}
            />
            <Checkmark />
            Av
          </CheckboxField>
        </ButtonDiv>
        <ButtonDiv>
          <CheckboxField>
            <HiddenInput
              type="radio"
              id="sort-value"
              name="sorting"
              value="value"
              defaultChecked={sortingOn === "value"}
            />
            <Checkmark />
            Värde
          </CheckboxField>
        </ButtonDiv>
        <ButtonDiv>
          <CheckboxField>
            <HiddenInput
              type="radio"
              id="sort-suit"
              name="sorting"
              value="suit"
              defaultChecked={sortingOn === "suit"}
            />
            <Checkmark />
            Färg
          </CheckboxField>
        </ButtonDiv>
      </form>
    </Box>
  )
}

const Box = styled.div`
  margin: -7px 10px 0;
  font-family: "Raleway", serif;
  display: flex;
  flex-direction: column;
`

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`

const CheckboxField = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const HiddenInput = styled.input`
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  height: 35px;
  width: 25px;
  margin: -10px 5px;
`

const Checkmark = styled.span`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: var(--secondary);
  border-radius: 10%;
  margin-left: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--secondary-light);
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid var(--secondary-light);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  ${HiddenInput}:checked + &::after {
    display: block;
    animation: drawCheck 0.3s ease forwards;
  }

  @keyframes drawCheck {
    from {
      opacity: 0;
      transform: rotate(45deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(45deg) scale(1);
    }
  }
`

