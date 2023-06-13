import axios from "axios";
const NetworkClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

NetworkClient.interceptors.request.use((config: any) => {
  return config;
});

export default NetworkClient;
