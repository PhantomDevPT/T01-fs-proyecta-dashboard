import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertTriangle } from 'lucide-react';
import Button from '../components/shared/Button';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--dark-color) 0%, #0d131f 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(25, 34, 48, 0.8) 0%, rgba(18, 24, 32, 0.8) 100%);
    mask-image: linear-gradient(45deg, #000 25%, rgba(0, 0, 0, 0.2) 50%, #000 75%);
    mask-size: 200% 200%;
    animation: ${gradientAnimation} 10s infinite linear;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 36px;
    flex: 0 0 200px;
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const LogoWrapper = styled.div`
  margin-bottom: 24px;
`;

const BrandTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BrandTagline = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LoginHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const LoginTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 12px;
`;

const LoginSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 16px;
  padding-left: 48px;
  background-color: var(--input-bg);
  border: 2px solid ${props => props.hasError ? 'var(--error-color)' : 'transparent'};
  border-radius: var(--border-radius);
  font-size: 1rem;
  color: var(--text-color);
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(255, 205, 0, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.hasError ? 'var(--error-color)' : 'var(--accent-color)'};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--error-color);
  font-size: 0.875rem;
  animation: ${fadeIn} 0.3s ease;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
`;

const FormFooter = styled.div`
  margin-top: 32px;
  text-align: center;
  color: var(--text-secondary);
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor ingrese su correo y contraseña');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <BrandContent>
          <LogoWrapper>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                stroke="#FFCD00" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M7.5 12H16.5" 
                stroke="#FFCD00" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M10.5 7.5L7.5 12L10.5 16.5" 
                stroke="#FFCD00" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M13.5 7.5L16.5 12L13.5 16.5" 
                stroke="#FFCD00" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </LogoWrapper>
          <BrandTitle>FS PROYECTA</BrandTitle>
          <BrandTagline>
            Su aliado confiable en licitaciones de materiales para construcción, ofreciendo soluciones integrales para abastecer proyectos.
          </BrandTagline>
        </BrandContent>
      </LeftPanel>
      
      <RightPanel>
        <LoginFormContainer>
          <LoginHeader>
            <LoginTitle>Bienvenido</LoginTitle>
            <LoginSubtitle>Inicie sesión para acceder al panel de administración</LoginSubtitle>
          </LoginHeader>
          
          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
              <InputWrapper>
                <InputIcon hasError={error && !email}>
                  <User size={18} />
                </InputIcon>
                <InputField
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  hasError={error && !email}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <InputWrapper>
                <InputIcon hasError={error && !password}>
                  <Lock size={18} />
                </InputIcon>
                <InputField
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  hasError={error && !password}
                />
              </InputWrapper>
            </FormGroup>
            
            {error && (
              <ErrorMessage>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </ErrorMessage>
            )}
            
            <ButtonContainer>
              <Button type="submit" disabled={isLoading} style={{ width: '100%' }}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </ButtonContainer>
          </LoginForm>
          
          {/* <FormFooter>
            Use las credenciales por defecto:<br />
            Email: admin@gmail.com<br />
            Contraseña: admin1234
          </FormFooter> */}
        </LoginFormContainer>
      </RightPanel>
    </LoginContainer>
  );
}

export default Login;