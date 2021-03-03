import Layout from "../components/Layout";
import { getSession } from "next-auth/client";
import AlbumRanking from "../components/AlbumRanking";
import CardValue from "../components/CardValue";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const DashboardPage = ({session}) => {
  const [dashboardData, setDashboardData] = useState({ countAlbum: null, countListening: null, listenings2021:[], allListenings:[] });
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    async function anyNameFunction() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + session.jwt);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const resAlbum = await fetch(apiURL + "/albums/count", requestOptions);
      const resListening = await fetch(apiURL + "/listenings/count",requestOptions);
      const res2021 = await fetch(apiURL + "/albums?year=2021&_limit=-1",requestOptions);
      const resAllListenings = await fetch(apiURL + "/albums?_limit=-1",requestOptions);
    
      setDashboardData({countAlbum : await resAlbum.json(), countListening: await resListening.json(), listenings2021 :await res2021.json(), allListenings: await resAllListenings.json()});
    }
    anyNameFunction();
  }, []);
  if (session) {
    return (
      <Layout>
        Signed in as {session.user.email} <br />
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <CardValue label="Albums" value={dashboardData.countAlbum} />
          </div>
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <CardValue label="Listenings" value={dashboardData.countListening} />
          </div>

          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <button class="h-10 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
              <Link href="/create-listening">
                <a>Create Listening</a>
              </Link>
            </button>
          </div>
        </div>
        <AlbumRanking listenings={dashboardData.listenings2021} size="5" year="2021" />
        <AlbumRanking listenings={dashboardData.allListenings} size="5" year="0" />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="text">You aren't authorized to view this page</div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default DashboardPage;
