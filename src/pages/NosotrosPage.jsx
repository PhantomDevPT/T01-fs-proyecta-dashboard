import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Save, AlertCircle, CheckCircle, Loader2, Users } from "lucide-react";
import { nosotrosService } from "../services/apiService";
import Button from "../components/shared/Button";
import { Input } from "../components/shared/Input";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const FormSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: var(--box-shadow);
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 12px;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
`;

const Notification = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: var(--border-radius);
  background-color: ${(props) =>
    props.type === "success"
      ? "rgba(16, 185, 129, 0.2)"
      : "rgba(239, 68, 68, 0.2)"};
  color: ${(props) =>
    props.type === "success" ? "var(--success-color)" : "var(--error-color)"};
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
`;

function NosotrosPage() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await nosotrosService.getNosotros();
      setFormData(data);
    } catch (error) {
      showNotification("Error al cargar los datos", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await nosotrosService.updateNosotros(formData.id_nosotros_page, formData);
      showNotification("Datos actualizados correctamente", "success");
    } catch (error) {
      showNotification("Error al actualizar los datos", "error");
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  if (loading) {
    return (
      <PageContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <LoadingIcon size={40} color="var(--accent-color)" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {notification && (
        <NotificationContainer>
          <Notification type={notification.type}>
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {notification.message}
          </Notification>
        </NotificationContainer>
      )}

      <PageHeader>
        <PageTitle>
          <Users size={24} color="var(--accent-color)" />
          Gestión de Página Nosotros
        </PageTitle>
        <PageDescription>
          Administre el contenido mostrado en la sección "Nosotros" del sitio
          web.
        </PageDescription>
      </PageHeader>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Descripción General</SectionTitle>
          <Input
            label="Descripción Principal"
            name="nosotros_page_descripcion"
            value={formData.nosotros_page_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Historia y Desarrollo</SectionTitle>
          <Input
            label="Contenido 1"
            name="nosotros_page_contenido1"
            value={formData.nosotros_page_contenido1 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Contenido 2"
            name="nosotros_page_contenido2"
            value={formData.nosotros_page_contenido2 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Contenido 3"
            name="nosotros_page_contenido3"
            value={formData.nosotros_page_contenido3 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Contenido 4"
            name="nosotros_page_contenido4"
            value={formData.nosotros_page_contenido4 || ""}
            onChange={handleInputChange}
            textarea
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Nuestra Esencia</SectionTitle>
          <Input
            label="Descripción de Esencia"
            name="nosotros_page_esencia_descripcion"
            value={formData.nosotros_page_esencia_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />

          <Input
            label="Visión"
            name="nosotros_page_vision"
            value={formData.nosotros_page_vision || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Misión"
            name="nosotros_page_mision"
            value={formData.nosotros_page_mision || ""}
            onChange={handleInputChange}
            textarea
          />
        </FormSection>

        <ButtonContainer>
          <Button type="submit" disabled={saving} size="large">
            {saving ? (
              <>
                <LoadingIcon size={20} />
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} />
                Actualizar Información
              </>
            )}
          </Button>
        </ButtonContainer>
      </form>
    </PageContainer>
  );
}

export default NosotrosPage;
