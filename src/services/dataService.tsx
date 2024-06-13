import { api } from "./api";

const get = async (route: string) => {
  try {
    const { data } = await api.get(`${route}`);
    return data;
  } catch (error) {
    return error;
  }
};

const DataService = {
  get,
};

export default DataService;
