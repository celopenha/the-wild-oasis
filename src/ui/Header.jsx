import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: end;
`;
const ProfileHeaderContainer = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <ProfileHeaderContainer onClick={() => navigate("/account")}>
        <UserAvatar />
      </ProfileHeaderContainer>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
