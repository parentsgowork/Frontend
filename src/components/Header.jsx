import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../constants/theme';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '../stores/useAuthStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  }

  return (
    <>
      <HeaderContainer>
        <MobileMenuButton onClick={() => setIsMenuOpen(true)}>
          <FaBars />
        </MobileMenuButton>
        <Link to="/">
          <Logo>다시일해!</Logo>
        </Link>
        {/* Desktop Nav */}
        <Nav>
          {/* <NavItem href="#">재취업 가능성 분석</NavItem> */}
          <NavItem to="/bookmark/job">채용 정보</NavItem>
          <NavItem to="/bookmark/education">교육 정보</NavItem>
          <NavItem to="/bookmark/policy">고용정책/복지 정보</NavItem>
          <NavItem to="/resume">자기소개서</NavItem>
        </Nav>

        {isLoggedIn ? (
          <StartButton onClick={handleLogoutClick}>로그아웃</StartButton>
        ) : (
          <ButtonWrapper>
            <StartButton onClick={() => navigate('/login')}>로그인</StartButton>
            <StartButton onClick={() => navigate('/signup')}>시작하기</StartButton>
          </ButtonWrapper>
          
        )}
      </HeaderContainer>

      {/* Mobile Slide Menu */}
      {isMenuOpen && (
        <SlideMenu>
          <CloseButton onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </CloseButton>
          <SlideNav>
            {/* <NavItem href="#">재취업 가능성 분석</NavItem> */}
            <NavItem to="/bookmark/job">채용 정보</NavItem>
            <NavItem to="/bookmark/education">교육 정보</NavItem>
            <NavItem to="/bookmark/policy">고용정책/복지 정보</NavItem>
            <NavItem to="/resume">자기소개서</NavItem>
          </SlideNav>
        </SlideMenu>
      )}
    </>
  );
};

export default Header;

// ───────────── Styled Components ─────────────

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  font-family: 'Black';
  color: #1a73e8;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  color: #1a73e8;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Regular';
  transition: color 0.2s;

  &:hover {
    color: #0b59c4;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StartButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Regular';
  transition: background-color 0.2s;

  &:hover {
    background-color: #0b59c4;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
    color: #1a73e8;
  }
`;

const SlideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 2rem 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #1a73e8;
  margin-bottom: 2rem;
`;

const SlideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

