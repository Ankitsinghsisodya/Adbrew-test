import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export const todoApi = {
  getAll: async () => {
    const response = await client.get("/todos/");
    return response.data;
  },
  create: async (description) => {
    const response = await client.post("/todos/", { description });
    return response.data;
  },
};
