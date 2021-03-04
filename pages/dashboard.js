import Layout from "../components/Layout";
import { getSession } from "next-auth/client";
import AlbumRanking from "../components/AlbumRanking";
import CardValue from "../components/CardValue";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function useFetch(url, session) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + session.jwt);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

const DashboardPage = ({ session }) => {
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const [countAlbum, loadingCountAlbum] = useFetch(
    apiURL + "/albums/count",
    session
  );
  const [countListening, loadingCountListening] = useFetch(
    apiURL + "/listenings/count",
    session
  );
  const [listenings2021, loadingListenings2021] = useFetch(
    apiURL + "/albums?year=2021&_limit=-1",
    session
  );
  const [allListenings, loadingAllListenings] = useFetch(
    apiURL + "/albums?_limit=-1",
    session
  );

  if (session) {
    return (
      <Layout>
        Signed in as {session.user.email} <br />
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            {loadingCountAlbum ? (
              "Loading..."
            ) : (
              <CardValue label="Albums" value={countAlbum} />
            )}
          </div>
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            {loadingCountListening ? (
              "Loading..."
            ) : (
              <CardValue label="Listenings" value={countListening} />
            )}
          </div>

          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <button class="h-10 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
              <Link href="/create-listening">
                <a>Create Listening</a>
              </Link>
            </button>
          </div>
        </div>
        {loadingListenings2021 ? (
          "Loading..."
        ) : (
          <AlbumRanking listenings={listenings2021} size="5" year="2021" />
        )}
        {loadingAllListenings ? (
          "Loading..."
        ) : (
          <AlbumRanking listenings={allListenings} size="5" year="0" />
        )}
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
