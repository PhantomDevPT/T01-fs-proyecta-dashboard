import styled, { css } from 'styled-components';

const getInputSize = ({ size }) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 12px;
        font-size: 0.875rem;
      `;
    case 'large':
      return css`
        padding: 16px 20px;
        font-size: 1.125rem;
      `;
    default:
      return css`
        padding: 12px 16px;
        font-size: 1rem;
      `;
  }
};

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputField = styled.input`
  ${getInputSize}
  background-color: var(--input-bg);
  color: var(--text-color);
  border: 2px solid ${props => props.error ? 'var(--error-color)' : 'transparent'};
  border-radius: var(--border-radius);
  transition: var(--transition);
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(255, 205, 0, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const TextareaField = styled.textarea`
  ${getInputSize}
  background-color: var(--input-bg);
  color: var(--text-color);
  border: 2px solid ${props => props.error ? 'var(--error-color)' : 'transparent'};
  border-radius: var(--border-radius);
  transition: var(--transition);
  resize: vertical;
  min-height: 120px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(255, 205, 0, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error-color);
  font-size: 0.8rem;
  margin-top: 4px;
`;

export function Input({ label, error, textarea, ...props }) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      {textarea ? (
        <TextareaField error={error} {...props} />
      ) : (
        <InputField error={error} {...props} />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

export default Input;