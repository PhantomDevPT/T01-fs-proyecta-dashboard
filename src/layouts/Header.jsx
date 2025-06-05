import React from 'react';
import styled from 'styled-components';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: ${({ sidebarOpen }) => (sidebarOpen ? 'var(--sidebar-width)' : '0')};
  height: var(--header-height);
  background: linear-gradient(90deg, rgba(25, 34, 48, 0.9) 0%, rgba(18, 24, 32, 0.95) 100%);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 90;
  transition: left 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    left: 0;
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  background-color: var(--accent-color);
  color: var(--dark-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  border: 2px solid var(--background-color);
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: var(--dark-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

function Header({ toggleSidebar }) {
  const { user } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ToggleButton onClick={toggleSidebar}>
          <Menu size={24} />
        </ToggleButton>
        <PageTitle>Dashboard</PageTitle>
      </div>
      
      <HeaderRight>
        <IconButton>
          <Bell size={20} />
          <NotificationBadge>2</NotificationBadge>
        </IconButton>
        
        <UserProfile>
          <Avatar>{getInitials(user?.name)}</Avatar>
          <UserInfo>
            <UserName>{user?.name || 'Admin User'}</UserName>
            <UserRole>Administrador</UserRole>
          </UserInfo>
        </UserProfile>
        
        <IconButton>
          <User size={20} />
        </IconButton>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;