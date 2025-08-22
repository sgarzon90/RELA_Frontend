const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function http(url: string, opts?: RequestInit) {
  const headers: Record<string, string> = {};
  if (!(opts?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${url}`, {
    headers,
    ...opts,
  });

  if (!res.ok) {
    let errorMessage = res.statusText;

    try {
      const data = await res.json();

      // NestJS suele devolver { statusCode, message, error }
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

    throw new Error(errorMessage);
  }

  return res.json();
}

export const getProducts = () => http("/products");
export const createProduct = (data: FormData) =>
  http("/products", { method: "POST", body: data });
export const updateProduct = (id: number, data: FormData) =>
  http(`/products/${id}`, { method: "PATCH", body: data });
export const deleteProduct = (id: number) =>
  http(`/products/${id}`, { method: "DELETE" });

export const getSales = (status?: string) =>
  http(`/sales${status ? `?status=${status}` : ""}`);
export const createSale = (data: any) =>
  http("/sales", { method: "POST", body: JSON.stringify(data) });
export const updateSale = (id: number, data: any) =>
  http(`/sales/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteSale = (id: number) =>
  http(`/sales/${id}`, { method: "DELETE" });
export const createPayment = (data: any) =>
  http("/payments", { method: "POST", body: JSON.stringify(data) });

export const getSummary = () => http("/reports/summary");
export const getTopSellingProducts = () => http("/reports/top-selling-products");

export const login = (data: any) =>
  http("/auth/login", { method: "POST", body: JSON.stringify(data) });

export const getUsers = () => http("/users");
export const createUser = (data: any) =>
  http("/users", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id: number, data: any) =>
  http(`/users/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteUser = (id: number) =>
  http(`/users/${id}`, { method: "DELETE" });
