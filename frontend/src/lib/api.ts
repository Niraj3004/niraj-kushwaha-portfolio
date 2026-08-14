// Typed API client — wraps fetch with auth headers and base URL
const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
};

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T = unknown>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown,
  isFormData = false
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method,
    headers,
    body: isFormData
      ? (body as FormData)
      : body
      ? JSON.stringify(body)
      : undefined,
  });

  // Auto-logout on 401
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request<{ data: { token: string; user: { email: string } } }>(
      "/auth/login",
      "POST",
      { email, password }
    ),
};

// ── Projects ──────────────────────────────────────────────────
export const projectsApi = {
  getAll: () => request<{ data: any[] }>("/projects"),
  getById: (id: string) => request<{ data: any }>(`/projects/${id}`),
  create: (formData: FormData) =>
    request<{ data: any }>("/projects", "POST", formData, true),
  update: (id: string, formData: FormData) =>
    request<{ data: any }>(`/projects/${id}`, "PATCH", formData, true),
  delete: (id: string) => request(`/projects/${id}`, "DELETE"),
};

// ── Posts ─────────────────────────────────────────────────────
export const postsApi = {
  getAll: () => request<{ data: any[] }>("/posts"),
  getById: (id: string) => request<{ data: any }>(`/posts/${id}`),
  create: (body: unknown) => request<{ data: any }>("/posts", "POST", body),
  update: (id: string, body: unknown) =>
    request<{ data: any }>(`/posts/${id}`, "PATCH", body),
  delete: (id: string) => request(`/posts/${id}`, "DELETE"),
};

// ── Testimonials ──────────────────────────────────────────────
export const testimonialsApi = {
  getAll: () => request<{ data: any[] }>("/testimonials"),
  create: (body: unknown) =>
    request<{ data: any }>("/testimonials", "POST", body),
  delete: (id: string) => request(`/testimonials/${id}`, "DELETE"),
};

// ── Contact / Messages ────────────────────────────────────────
export const contactApi = {
  getAll: () => request<{ data: any[] }>("/contact"),
};
