import Layout from '../components/Layout';
import React, { useState, useEffect } from "react";

/*
import { Chart } from 'react-charts'

const dataChart = [
    {
      label: 'Series 1',
      data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    },
    {
      label: 'Series 2',
      data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    }
  ]
  

const axes = [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ]
*/

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}


const IndexPage = () => {
  /*
  const [data, loadingData] = useFetch("/api/statistics?year=2021");

  console.log(JSON.stringify(data));
  */
  return (
    <Layout>
      <div className="text">Hello ! Welcome to discodiary !</div>
      {/*
      <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={dataChart} axes={axes} />
    </div>*/}
    </Layout>
  );
};

export default IndexPage;