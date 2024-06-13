import axios from "axios";

export const protocol = window.location.protocol; // http or https
console.log("http", `${protocol}//${process.env.VITE_DJANGO_API_URL}`);

export const api = axios.create({
  baseURL: `${protocol}//${process.env.VITE_DJANGO_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
