import styled, {css} from 'styled-components'

export const

H3 = styled.h3`
  font-size: 1rem;
  font-weight: inherit;
`,

Value = styled.p`
  font-size: 1.4rem;
`,

Label = styled.label`
  display: block;
`,

Input = styled.input`
  background-color: inherit;
  border: 2px solid var(--secondary);
  border-radius: 2px;
  padding: 2px;
  font-size: .9rem;
`,

Submit = styled.input`
  background-color: inherit;
  border: 2px solid var(--secondary);
  border-radius: 2px;
  font-size: .8rem;
`,

Form = styled.form`
  display: flex;
  justify-content: space-between;
  --element-height: 1.5rem;

  ${Input}, ${Submit} {
    height: 1.5rem;
  }

  ${Input} {
    width: 82.5%;
  }

  ${Submit} {
    width: 14%;
  }
`,

Ul = styled.ul`
  list-style: none;
`

export default css`
  box-shadow: 0 0 1rem var(--shadow, grey);
  padding: 1.6rem;

  ${Form} {
    margin: 4px 0 2rem 0;
  }

  ${H3} {
    margin-top: 2rem;
  }
`