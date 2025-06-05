import styled, { css, keyframes } from 'styled-components';

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  70% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const getButtonColor = ({ variant }) => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: transparent;
        color: var(--accent-color);
        border: 2px solid var(--accent-color);
        
        &:hover {
          background-color: rgba(255, 205, 0, 0.1);
        }
      `;
    case 'danger':
      return css`
        background-color: var(--error-color);
        
        &:hover {
          background-color: #dc2626;
        }
      `;
    case 'success':
      return css`
        background-color: var(--success-color);
        
        &:hover {
          background-color: #059669;
        }
      `;
    case 'warning':
      return css`
        background-color: var(--warning-color);
        
        &:hover {
          background-color: #d97706;
        }
      `;
    default:
      return css`
        background-color: var(--accent-color);
        color: var(--dark-color);
        
        &:hover {
          background-color: #e0b600;
        }
      `;
  }
};

const getButtonSize = ({ size }) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: 0.875rem;
      `;
    case 'large':
      return css`
        padding: 16px 32px;
        font-size: 1.125rem;
      `;
    default:
      return css`
        padding: 12px 24px;
        font-size: 1rem;
      `;
  }
};

export const Button = styled.button`
  ${getButtonSize}
  ${getButtonColor}
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    width: 100px;
    height: 100px;
    transform: scale(0);
    animation: ${rippleEffect} 0.6s ease-out;
    opacity: 0;
  }
  
  &:active::after {
    animation: none;
    transform: scale(0);
    opacity: 0;
  }
`;

export default Button;