import { useState, useEffect } from "react";
import axios from "axios";

export default function UseFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(true);
    axios.get(url).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function fetchDataWithId(id) {
    setLoading(true);
    axios.get(`${url}/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function postData() {
    setLoading(true);
    axios.post(url, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function postDataWithId(id) {
    setLoading(true);
    axios.post(`${url}/${id}`, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function putData(id) {
    setLoading(true);
    axios.post(`${url}/${id}`, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function deleteData(id) {
    setLoading(true);
    axios.post(`${url}/${id}`, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    let current = true;
    if (current) {
      fetchData();
    }
    return () => {
      current = false;
    };
  }, [url]);

  //   const {postData: myCustomName , h: myOtherTest} = myHook('/api');
  //   const {r: test, h: myTest} = myHook('/api');

  //   const [r, t] = myHook('/api');
  //   const [x, y] = myHook('/api');

  return {
    data,
    postData,
    loading,
    postDataWithId,
    fetchDataWithId,
    fetchData,
    deleteData,
    putData
  };
}
