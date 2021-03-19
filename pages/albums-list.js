import Layout from '../components/Layout';
import AlbumRanking from '../components/AlbumRanking';
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";

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

function AlbumList({session}) {
  if(session) {        
    const router = useRouter()
    const { year } = router.query ;
    const [albums, loadingAlbums] = useFetch("/api/statistics?year="+year+"&sortByScore=-1&sortByListenings=-1");
    return (
      <Layout>
        {loadingAlbums ? (
          "Loading..."
        ) : (
          <AlbumRanking listenings={albums} size="0" year={year}/>
        )}
      </Layout>
    )
  }
  return <Layout>
    <div className="text">You aren't authorized to view this page</div>
  </Layout>    
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { 
      session
    }
  }
}

export default AlbumList;
  