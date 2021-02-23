import Layout from '../components/Layout';
import { getSession } from "next-auth/client";
import React from "react"
import AlbumRanking from '../components/AlbumRanking';

const Top2021Page = ({session, listenings}) => {    
    if(session) {        
        return <Layout>    
            <AlbumRanking listenings={listenings} size="0" />
        </Layout>
      }
      return <Layout>
        <div className="text">You aren't authorized to view this page</div>
      </Layout>      
}


export const getServerSideProps = async ({ req }) => {
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const session = await getSession({ req });

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+session.jwt);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch(apiURL+'/albums?year=2021', requestOptions);
  const listenings = await res.json();

  return {
    props: {
      session,
      listenings
    },
  };
};
  

export default Top2021Page;