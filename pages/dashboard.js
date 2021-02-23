import Layout from '../components/Layout';
import { getSession } from "next-auth/client";
import React from "react"
import AlbumRanking from '../components/AlbumRanking';
import CardValue from '../components/CardValue';
import Link from 'next/link'

const DashboardPage = ({session, countAlbum, countListening, listenings}) => {    
    if(session) {        
        return <Layout>    
          Signed in as {session.user.email} <br/>
          <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                  <CardValue label="Albums" value= {countAlbum}/>
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                  <CardValue label="Listenings" value= {countListening}/>
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                <button class="h-10 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                <Link href="/create-listening">
                    <a>Create Listening</a>
                  </Link>                  
                </button>
                </div>
            </div>        
            <AlbumRanking listenings={listenings} size="5" />
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

  const resAlbum = await fetch(apiURL+'/albums/count', requestOptions);
  const countAlbum = await resAlbum.json();

  const resListening = await fetch(apiURL+'/listenings/count', requestOptions);
  const countListening = await resListening.json();

  const res = await fetch(apiURL+'/albums?year=2021', requestOptions);
  const listenings = await res.json();

  return {
    props: {
      session,
      countAlbum,
      countListening,
      listenings
    },
  };
};
  

export default DashboardPage;