import {useState, useEffect} from 'react';

const useData = (func: Function, init: any = null) => {
  const [data, setData] = useState({
    data: init,
    loadData: true,
  });

  const dataFunc = async () => {
    try {
      setData({
        data: data.data,
        loadData: true,
      });
      const resp = await func();
      setData({
        data: resp,
        loadData: false,
      });
    } catch (error) {
      console.error('useData: ', error);
    }
  };

  useEffect(() => {
    dataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};

export default useData;
