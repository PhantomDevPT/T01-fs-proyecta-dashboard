import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Save,
  Edit,
  Trash,
  PlusCircle,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "../components/shared/Button";
import { Input } from "../components/shared/Input";
import {
  actualizarProducto,
  listarProductos,
  registrarProducto,
} from "../services/apiService";

// Animación y estilos
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

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  width: 500px;
  box-shadow: var(--box-shadow);
  z-index: 1000;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableHeader = styled.thead`
  background-color: #f4f4f4;
`;

const TableRow = styled.tr`
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableHeaderItem = styled.th`
  padding: 12px;
  font-weight: bold;
  color: black;
`;

const TableCell = styled.td`
  padding: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 12px;
`;

export function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id_producto: "",
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    url_imagen: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await listarProductos();
        setProductos(response);
      } catch (error) {
        console.error(error);
        showNotification("Error al cargar los productos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [isUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        await actualizarProducto(formData.id_producto, formData);
        showNotification("Producto actualizado correctamente", "success");
      } else {
        await registrarProducto(formData);
        showNotification("Producto registrado correctamente", "success");
      }
      setIsModalOpen(false);
      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error(error);
      showNotification("Error al guardar el producto", "error");
    } finally {
      setSaving(false);
      setIsEditing(false);
      setFormData({
        nombre: "",
        precio: "",
        descripcion: "",
        categoria: "",
        url_imagen: "",
      });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleEdit = (producto) => {
    setIsEditing(true);
    setFormData({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      url_imagen: producto.url_imagen,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await eliminarProducto(id);
      showNotification("Producto eliminado correctamente", "success");
      setIsUpdate(!isUpdate);
    } catch (error) {
      showNotification("Error al eliminar el producto", "error");
    }
  };

  const handleCreate = () => {
    setIsEditing(false);
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      url_imagen: "",
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      url_imagen: "",
    });
    setIsEditing(false);
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
          <PlusCircle size={24} color="var(--accent-color)" />
          Gestión de Productos
        </PageTitle>
        <PageDescription>
          Administra los productos de tu tienda.
        </PageDescription>
      </PageHeader>

      <ButtonContainer>
        <Button onClick={handleCreate} size="large">
          <PlusCircle size={20} />
          Crear Producto
        </Button>
      </ButtonContainer>

      {/* Modal de Crear/Editar Producto */}
      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                {isEditing ? "Editar Producto" : "Crear Producto"}
              </SectionTitle>
              <Input
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <Input
                label="Precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
              />
              <Input
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                textarea
              />
              <Input
                label="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
              />
              <Input
                label="URL Imagen"
                name="url_imagen"
                value={formData.url_imagen}
                onChange={handleInputChange}
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
                    {/* <Save size={20} /> */}
                    {isEditing ? "Actualizar Producto" : "Crear Producto"}
                  </>
                )}
              </Button>
              <Button type="button" onClick={handleCancel} size="large">
                Cancelar
              </Button>
            </ButtonContainer>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* Cabecera de la Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderItem>Nombre</TableHeaderItem>
            <TableHeaderItem>Precio</TableHeaderItem>
            <TableHeaderItem>Categoría</TableHeaderItem>
            <TableHeaderItem>Acciones</TableHeaderItem>
          </TableRow>
        </TableHeader>
        <tbody>
          {productos.map((producto) => (
            <TableRow key={producto.id_producto}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.precio}</TableCell>
              <TableCell>{producto.categoria}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(producto)}>
                  <Edit size={20} />
                </Button>
                {/* <Button onClick={() => handleDelete(producto.id_producto)}>
                  <Trash size={20} />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}
