/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormVerticalRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRowVertical = ({label, error, children}) => {
  return (
    <StyledFormVerticalRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormVerticalRow>
  );
};

export default FormRowVertical;
