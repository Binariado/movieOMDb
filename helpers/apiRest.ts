import {api} from '../api';
import _ from 'lodash';

type Props = Array<{}> | Array<[]> | Object | string | number | any;

const apiRest = async (nameApi: string, material: Props) => {
  try {
    const fun = _.find(api, (item, key) => key === nameApi);
    if (!fun) {
      throw new Error(`error apiRest: not found (${nameApi})`);
    }
    return await fun(material);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const restGroup = (rest: string | []) => {
  let groupApi = {};
  const restp = !rest ? Object.keys(api) : rest;
  const objetRest = restp instanceof Array ? restp : [restp];

  if (!restp) {
    throw new Error(
      'error useApiRest: the parameter is not an array or string type',
    );
  }

  for (const key in objetRest) {
    if (Object.hasOwnProperty.call(objetRest, key) && restp) {
      const nameApi: string = objetRest[key];
      if (nameApi) {
        groupApi = {
          ...groupApi,
          [nameApi]: (material: any) => apiRest(material, nameApi),
        };
      }
    }
  }
  return groupApi;
};

export {apiRest, restGroup};
