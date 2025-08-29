import axios from "axios";
const baseURL = "http://localhost:53688/api/";

export const ENDPOINTS = {
  CUSTOMER: "Customer",
  FOODITEM: "FoodItem",
  ORDER: "Order",
};
export const createAPIEndpoints = endpoint => {
  let url = baseURL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    fetchById: id => axios.get(url + id),
    create: newRecord => axios.post(url, newRecord),
    update: (id, updated) => axios.put(url + id, updated),
    delete: id => axios.delete(url + id),
  };
};
