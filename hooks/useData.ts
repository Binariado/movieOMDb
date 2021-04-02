import {useState, useEffect} from 'react';

const useData = (func: Function) => {
  const [data, setData] = useState({
    data: null,
    loadData: false,
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
