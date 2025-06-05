import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? 'var(--sidebar-width)' : '0')};
  transition: margin-left 0.3s ease;
  padding-top: calc(var(--header-height) + 24px);
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
    padding-top: calc(var(--header-height) + 16px);
  }
`;

const PageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ show }) => (show ? 'block' : 'none')};
  transition: opacity 0.3s ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    if (window.innerWidth < 769) {
      setSidebarOpen(false);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <PageOverlay show={sidebarOpen && window.innerWidth < 769} onClick={closeSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      <MainContent sidebarOpen={sidebarOpen}>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
}

export default Dashboard;