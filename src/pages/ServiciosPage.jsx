import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Save,
  AlertCircle,
  CheckCircle,
  Loader2,
  Settings,
} from "lucide-react";
import { serviciosService } from "../services/apiService";
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

const ServiceCard = styled.div`
  background-color: rgba(25, 34, 48, 0.5);
  border-radius: var(--border-radius);
  padding: 20px;
  border-left: 3px solid var(--accent-color);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -15px rgba(255, 205, 0, 0.3);
  }
`;

function ServiciosPage() {
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
      const data = await serviciosService.getServicios();
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
      await serviciosService.updateServicios(
        formData.id_servicio_page,
        formData
      );
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
          <Settings size={24} color="var(--accent-color)" />
          Gestión de Servicios
        </PageTitle>
        <PageDescription>
          Administre los servicios ofrecidos por la empresa que se mostrarán en
          el sitio web.
        </PageDescription>
      </PageHeader>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Descripción General</SectionTitle>
          <Input
            label="Descripción de Servicios"
            name="servicio_page_descripcion"
            value={formData.servicio_page_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Servicios Ofrecidos</SectionTitle>
          <div style={{ display: "flex", gap: "15px", flexDirection:"column"}}>
            <ServiceCard>
              <Input
                label="Servicio 1"
                name="servicio_page_card_1_descripcion"
                value={formData.servicio_page_card_1_descripcion || ""}
                onChange={handleInputChange}
                textarea
              />
            </ServiceCard>

            <ServiceCard>
              <Input
                label="Servicio 2"
                name="servicio_page_card_2_descripcion"
                value={formData.servicio_page_card_2_descripcion || ""}
                onChange={handleInputChange}
              />
            </ServiceCard>

            <ServiceCard>
              <Input
                label="Servicio 3"
                name="servicio_page_card_3_descripcion"
                value={formData.servicio_page_card_3_descripcion || ""}
                onChange={handleInputChange}
              />
            </ServiceCard>

            <ServiceCard>
              <Input
                label="Servicio 4"
                name="servicio_page_card_4_descripcion"
                value={formData.servicio_page_card_4_descripcion || ""}
                onChange={handleInputChange}
              />
            </ServiceCard>

            <ServiceCard>
              <Input
                label="Servicio 5"
                name="servicio_page_card_5_descripcion"
                value={formData.servicio_page_card_5_descripcion || ""}
                onChange={handleInputChange}
              />
            </ServiceCard>

            <ServiceCard>
              <Input
                label="Servicio 6"
                name="servicio_page_card_6_descripcion"
                value={formData.servicio_page_card_6_descripcion || ""}
                onChange={handleInputChange}
              />
            </ServiceCard>
          </div>
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
                Actualizar Servicios
              </>
            )}
          </Button>
        </ButtonContainer>
      </form>
    </PageContainer>
  );
}

export default ServiciosPage;
