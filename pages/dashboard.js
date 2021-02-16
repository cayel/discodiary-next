import Layout from '../components/Layout';
import { getSession, signIn, signOut, jwt } from "next-auth/client";
import React, { useState, useEffect } from "react"

const DashboardPage = ({session}) => {
    const [countAlbum, setCountAlbum] = useState(null);
    const [countListening, setCountListening] = useState(null);
    const apiURL = 'http://localhost:1337'

    
    if(session) {
        useEffect(() => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+session.jwt);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(apiURL+'/albums/count', requestOptions)
              .then(response => response.text())
              .then(result => setCountAlbum(result))
              .catch(error => console.log('error', error));
        
            fetch(apiURL+'/listenings/count', requestOptions)
              .then(response => response.text())
              .then(result => setCountListening(result))
              .catch(error => console.log('error', error));
        
          });        
        
        return <Layout>    
          Signed in as {session.user.email} <br/>
          <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-600">Albums</h5>
                                <h3 class="font-bold text-3xl">{countAlbum} <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-600">Listenings</h5>
                                <h3 class="font-bold text-3xl">{countListening}<span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </Layout>
      }

      return <Layout>
        <div className="text">You aren't authorized to view this page</div>
      </Layout>      
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    return {
      props: {
        session,
      },
    };
  };
  

export default DashboardPage;