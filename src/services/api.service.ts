import { AppConfig } from "../config";
import { mainHeader } from "../helper";

export const apiService = {
  
  getAll,
  save,

};

const config = {
  apiUrl: AppConfig.apiUrl,
};



function getAll(url: string) {
  const requestOptions: object = {
    method: "GET",
    headers: mainHeader(),
  };

  return fetch(`${config.apiUrl}${url}`, requestOptions).then(handleResponse);
}



function save(url: string, data: any) {
  let headers = mainHeader();
  let formdata = new FormData();
 

  Object.keys(data).forEach((key: any) => {
   
      if (data[key] !== "") {
        formdata.append(key, data[key]);
      }
    
  });

  const requestOptions: object = {
    method: "POST",
    headers: headers,
    body: formdata,
   
  };


  return fetch(`${config.apiUrl}${url}`, requestOptions).then(handleResponse);
}





function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
     
      const error = (data && data.message) || response.statusText;
     
      return Promise.reject(error);
    }
    return data;
  });
}


