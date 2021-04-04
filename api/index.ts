import {build} from 'search-params';
import {URL_API, API_KEY} from './const';

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

const responsed = async (resp: undefined | string | [], status: number) => {
  return respFormat({
    resp: resp,
    status: status,
  });
};

type Props = Array<{}> | Array<[]> | Object | string | number | any;

export const api = {
  async searchMoview(material: Props) {
    try {
      const myHeaders = new Headers();

      const $params = build({...material, apikey: API_KEY});

      var request = {
        method: 'GET',
        headers: myHeaders,
      };

      return await fetch(`${URL_API}/?${$params}`, request)
        .then(async resp => responsed(await resp.json(), resp.status))
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error('searchMoview: ', error);
    }
  },
};
