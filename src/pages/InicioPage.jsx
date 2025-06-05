import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Save, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { inicioService } from "../services/apiService";
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

function InicioPage() {
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
      const data = await inicioService.getInicio();
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
      await inicioService.updateInicio(formData.id_inicio_page, formData);
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
        <PageTitle>Gestión de Página de Inicio</PageTitle>
        <PageDescription>
          Administre el contenido mostrado en la página de inicio del sitio web.
        </PageDescription>
      </PageHeader>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Información Principal</SectionTitle>
          <Input
            label="Descripción Principal"
            name="Inicio_descripcion"
            value={formData.Inicio_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />

          <Input
            label="Descripción Secundaria 1"
            name="descripcion_secundaria1"
            value={formData.descripcion_secundaria1 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Descripción Secundaria 2"
            name="descripcion_secundaria2"
            value={formData.descripcion_secundaria2 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Descripción Secundaria 3"
            name="descripcion_secundaria3"
            value={formData.descripcion_secundaria3 || ""}
            onChange={handleInputChange}
            textarea
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Sección de Trayectoria</SectionTitle>
          <Input
            label="Descripción de Trayectoria"
            name="s_trayectoria_descripcion"
            value={formData.s_trayectoria_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />

          <Input
            label="Trayectoria 1"
            name="s_taryectoria_descripcion1"
            value={formData.s_taryectoria_descripcion1 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Trayectoria 2"
            name="s_taryectoria_descripcion2"
            value={formData.s_taryectoria_descripcion2 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Trayectoria 3"
            name="s_taryectoria_descripcion3"
            value={formData.s_taryectoria_descripcion3 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Trayectoria 4"
            name="s_taryectoria_descripcion4"
            value={formData.s_taryectoria_descripcion4 || ""}
            onChange={handleInputChange}
            textarea
          />

          {/* <FormGrid style={{ marginTop: "24px" }}> */}
          <Input
            label="Trayectoria Secundaria 1"
            name="s_taryectoria_secundaria_1"
            value={formData.s_taryectoria_secundaria_1 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Trayectoria Secundaria 2"
            name="s_taryectoria_secundaria_2"
            value={formData.s_taryectoria_secundaria_2 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Trayectoria Secundaria 3"
            name="s_taryectoria_secundaria_3"
            value={formData.s_taryectoria_secundaria_3 || ""}
            onChange={handleInputChange}
            textarea
          />
          {/* </FormGrid> */}
        </FormSection>

        <FormSection>
          <SectionTitle>Sección de Materiales</SectionTitle>
          <Input
            label="Descripción de Materiales"
            name="c_material_descripcion"
            value={formData.c_material_descripcion || ""}
            onChange={handleInputChange}
            textarea
          />

          <Input
            label="Material Card 1"
            name="c_material_card1"
            value={formData.c_material_card1 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Material Card 2"
            name="c_material_card2"
            value={formData.c_material_card2 || ""}
            onChange={handleInputChange}
            textarea
          />
          <Input
            label="Material Card 3"
            name="c_material_card3"
            value={formData.c_material_card3 || ""}
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

export default InicioPage;
