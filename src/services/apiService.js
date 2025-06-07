import axios from "axios";

const API_BASE_URL = "http://localhost/T01-fs-proyecta-api/public/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const inicioService = {
  getInicio: async () => {
    try {
      const response = await api.get("/inicioPage/listarInicio");
      return response.data[0];
    } catch (error) {
      console.error("Error fetching inicio data:", error);
      throw error;
    }
  },
  updateInicio: async (id, data) => {
    try {
      const response = await api.patch(
        `/inicioPage/actualizarInicio/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating inicio data:", error);
      throw error;
    }
  },
};

export const nosotrosService = {
  getNosotros: async () => {
    try {
      const response = await api.get("/nosotrosPage/listarNosotros");
      return response.data[0];
    } catch (error) {
      console.error("Error fetching nosotros data:", error);
      throw error;
    }
  },
  updateNosotros: async (id, data) => {
    try {
      const response = await api.patch(
        `/nosotrosPage/actualizarNosotros/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating nosotros data:", error);
      throw error;
    }
  },
};

export const serviciosService = {
  getServicios: async () => {
    try {
      const response = await api.get("/servicioPage/listarServicios");
      return response.data[0];
    } catch (error) {
      console.error("Error fetching servicios data:", error);
      throw error;
    }
  },
  updateServicios: async (id, data) => {
    try {
      const response = await api.patch(
        `/servicioPage/actualizarServicio/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating servicios data:", error);
      throw error;
    }
  },
};

//* PRODUCTOS
// Función para obtener el listado de productos
export const listarProductos = async () => {
  try {
    const response = await api.get(`/productosPage/listarProductos`);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error; // Lanza el error para que se maneje en el componente
  }
};

// Función para registrar un nuevo producto
export const registrarProducto = async (producto) => {
  try {
    const response = await api.post(
      `/productosPage/registrarProducto`,
      producto
    );
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    throw error; // Lanza el error para que se maneje en el componente
  }
};

// Función para actualizar un producto existente
export const actualizarProducto = async (id_producto, producto) => {
  try {
    const response = await api.patch(
      `/productosPage/actualizarProducto/${id_producto}`,
      producto
    );
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error; // Lanza el error para que se maneje en el componente
  }
};
