import {api} from '../api';

type ResData = {
  resp: [] | string | number | any;
  status: number;
};

const respFormat = (data: any) => {
  const {resp, status}: ResData = data;
  const {errors}: any = resp;
  if (!errors) {
    return resp;
  }
  return {...resp, status};
};

const apiRest = async (material: [], nameApi: string) => {
  try {
    if (!api[nameApi]) {
      throw new Error(`error apiRest: not found (${nameApi})`);
    }
    const data = await api[nameApi](material);
    return respFormat(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Rest = (rest: string | []) => {
  const groupApi = {};
  const restp = !rest ? Object.keys(api) : rest;
  const objetRest = restp instanceof Array ? restp : [restp];

  if (!restp) {
    throw new Error(
      "error useApiRest: the parameter is not an array or string type",
    );
  }

  for (const key in objetRest) {
    if (Object.hasOwnProperty.call(objetRest, key) && restp) {
      const nameApi: string = objetRest[key];
      if (nameApi) {
        groupApi[nameApi] = (material: any) => apiRest(material, nameApi);
      }
    }
  }

  return groupApi;
};

export {apiRest, Rest};
