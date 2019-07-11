import { useState, useEffect } from "react";
import axios from "axios";

export default function UseFetch(url, getExists = true, iV = null) {
  const [data, setData] = useState(iV);
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(true);
    axios.get(url).then(res => {
      // console.log("fetch data ran:", res.data);
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

  function postData(dataToPost) {
    console.log("data to post", dataToPost);
    setLoading(true);
    axios.post(url, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function postDataWithId(id, dataToPost) {
    setLoading(true);
    axios.post(`${url}/${id}`, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function putData(id, dataToPost) {
    setLoading(true);
    axios.post(`${url}/${id}`, dataToPost).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  function deleteData(id) {
    setLoading(true);
    axios.post(`${url}/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    let current = true;
    if (current && getExists) {
      fetchData();
    }
    return () => {
      current = false;
    };
  }, [url]);

  //        To make an alias, destructuring from a custom hook
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
