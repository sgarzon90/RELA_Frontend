const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function http(url: string, opts?: RequestInit) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
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
export const createProduct = (data: any) =>
  http("/products", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id: number, data: any) =>
  http(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteProduct = (id: number) =>
  http(`/products/${id}`, { method: "DELETE" });

export const getSales = (status?: string) =>
  http(`/sales${status ? `?status=${status}` : ""}`);
export const createSale = (data: any) =>
  http("/sales", { method: "POST", body: JSON.stringify(data) });
export const createPayment = (data: any) =>
  http("/payments", { method: "POST", body: JSON.stringify(data) });
