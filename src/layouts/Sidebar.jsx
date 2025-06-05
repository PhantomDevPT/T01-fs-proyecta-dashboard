import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Settings, Users, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: linear-gradient(180deg, var(--dark-color) 0%, #12161f 100%);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
  z-index: 100;
  transition: transform 0.3s ease, width 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
  
  ${({ isOpen }) => !isOpen && css`
    transform: translateX(-100%);
  `}
  
  @media (max-width: 768px) {
    width: 280px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--accent-color);
  font-size: 1.3rem;
  font-weight: 700;
`;

const MenuIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Navigation = styled.nav`
  padding: 24px 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  color: var(--text-color);
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background-color: rgba(255, 205, 0, 0.1);
  }
  
  &.active {
    color: var(--accent-color);
    background-color: rgba(255, 205, 0, 0.15);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--accent-color);
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
`;

const ItemText = styled.span`
  animation: ${fadeIn} 0.3s ease;
  font-weight: 500;
`;

const SidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
    color: var(--error-color);
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

function Sidebar({ isOpen, closeSidebar }) {
  const { logout } = useAuth();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
  };
  
  const menuItems = [
    { path: '/dashboard/inicio', label: 'Inicio', icon: <Home /> },
    { path: '/dashboard/servicios', label: 'Servicios', icon: <Settings /> },
    { path: '/dashboard/nosotros', label: 'Nosotros', icon: <Users /> },
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>
          <span>FS PROYECTA</span>
        </Logo>
        <MenuIcon onClick={closeSidebar}>
          <Menu />
        </MenuIcon>
      </SidebarHeader>
      
      <SidebarContent>
        <Navigation>
          {menuItems.map((item) => (
            <NavItem 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => {
                if (window.innerWidth < 769) closeSidebar();
              }}
            >
              <IconWrapper>{item.icon}</IconWrapper>
              <ItemText>{item.label}</ItemText>
            </NavItem>
          ))}
        </Navigation>
        
        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </LogoutButton>
        </SidebarFooter>
      </SidebarContent>
    </SidebarContainer>
  );
}

export default Sidebar;