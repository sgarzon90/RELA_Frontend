// Define la URL base de la API, obteniéndola de las variables de entorno o usando un valor por defecto.
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Función genérica para realizar solicitudes HTTP a la API.
async function http(url: string, opts?: RequestInit) {
  // Inicializa los encabezados de la solicitud.
  const headers: Record<string, string> = {};
  // Si el cuerpo de la solicitud no es FormData, establece el Content-Type a application/json.
  if (!(opts?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Obtiene el token de autenticación del almacenamiento local.
  const token = localStorage.getItem("token");
  // Si hay un token, lo agrega al encabezado de autorización.
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Realiza la solicitud fetch a la API.
  const res = await fetch(`${BASE}${url}`, {
    headers,
    ...opts,
  });

  // Si la respuesta no es exitosa, maneja el error.
  if (!res.ok) {
    let errorMessage = res.statusText;

    try {
      const data = await res.json();

      // Extrae el mensaje de error de la respuesta de la API de NestJS.
      if (data?.message) {
        errorMessage = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else {
        errorMessage = JSON.stringify(data);
      }
    } catch {
      const text = await res.text();
      if (text) errorMessage = text;
    }

    // Lanza un error con el mensaje de error.
    throw new Error(errorMessage);
  }

  // Devuelve la respuesta en formato JSON.
  return res.json();
}

// --- Endpoints de Productos ---
export const getProducts = () => http("/products");
export const createProduct = (data: FormData) =>
  http("/products", { method: "POST", body: data });
export const updateProduct = (id: number, data: FormData) =>
  http(`/products/${id}`, { method: "PATCH", body: data });
export const deleteProduct = (id: number) =>
  http(`/products/${id}`, { method: "DELETE" });

// --- Endpoints de Ventas ---
export const getSales = (status?: string) =>
  http(`/sales${status ? `?status=${status}` : ""}`);
export const createSale = (data: any) =>
  http("/sales", { method: "POST", body: JSON.stringify(data) });
export const updateSale = (id: number, data: any) =>
  http(`/sales/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteSale = (id: number) =>
  http(`/sales/${id}`, { method: "DELETE" });

// --- Endpoints de Pagos ---
export const createPayment = (data: any) =>
  http("/payments", { method: "POST", body: JSON.stringify(data) });

// --- Endpoints de Reportes ---
export const getSummary = () => http("/reports/summary");
export const getTopSellingProducts = () => http("/reports/top-selling-products");

// --- Endpoints de Autenticación ---
export const login = (data: any) =>
  http("/auth/login", { method: "POST", body: JSON.stringify(data) });

// --- Endpoints de Usuarios ---
export const getUsers = () => http("/users");
export const createUser = (data: any) =>
  http("/users", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id: number, data: any) =>
  http(`/users/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteUser = (id: number) =>
  http(`/users/${id}`, { method: "DELETE" });

// --- Endpoints de Atributos ---
export const getTipos = () => http("/attributes/tipo");
export const createTipo = (data: any) =>
  http("/attributes/tipo", { method: "POST", body: JSON.stringify(data) });
export const deleteTipo = (id: number) =>
  http(`/attributes/tipo/${id}`, { method: "DELETE" });
export const updateTipo = (id: number, data: any) =>
  http(`/attributes/tipo/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const getColors = () => http("/attributes/color");
export const createColor = (data: any) =>
  http("/attributes/color", { method: "POST", body: JSON.stringify(data) });
export const deleteColor = (id: number) =>
  http(`/attributes/color/${id}`, { method: "DELETE" });
export const updateColor = (id: number, data: any) =>
  http(`/attributes/color/${id}`, { method: "PATCH", body: JSON.stringify(data) });
