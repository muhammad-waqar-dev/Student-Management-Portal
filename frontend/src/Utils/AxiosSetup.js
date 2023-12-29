import axios from "./Axios";


const apiHelper = async (
  reqType,
  endpoint,
  data={},
  token=false
) => {
  let headersData = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let headersDataForPDF = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
    }
  }

  if (token) {
    let token = localStorage.getItem("accessToken");
    headersData = {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
  let result;
  switch (reqType) {
    case "get": {
      let response = await axios.get(endpoint, headersData);
      console.log(response);
      result = response;
      break;
    }
    case "post": {
      let response = await axios.post(endpoint, data, headersData);
      console.log(response);
      result = response;
      break;
    }
    case "put": {
      let response = await axios.put(endpoint, data, headersData);
      console.log(response);
      result = response;
      break;
    }
    case "delete": {
      let response = await axios.delete(endpoint, data, headersData);
      console.log(response);
      result = response;
      break;
    }
    case "pdf": {
      let response = await axios.put(endpoint, data, headersDataForPDF);
      console.log(response);
      result = response;
      break;
    }
  }
  return result;
};

export default apiHelper;