import { useState } from 'react';
import axios from 'axios';

//Custom hook for handling HTTP requests using Axios.
const useAxios = (baseUrl) => {
  //state for holdin response data
  const [data, setData] = useState(null);
  //alert
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  //loading spinner
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    //hide alert afeter 5 seconds
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  //HTTP method(get, post,edit,delete), endpoint, payload(optional payload for post and put method)
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true); // set loading state before making request
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data); // update state with response data
      showAlert('Book added successfully', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false); // set loading state false after request is completed
    }
  };

  //helper function for different http methods
  const get = async (endpoint) => makeRequest('get', endpoint);
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) => makeRequest('delete', endpoint);
 
  //return { data, alert, loading, get, post, update, remove}
  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
