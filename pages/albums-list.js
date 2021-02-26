import Layout from '../components/Layout';
import AlbumRanking from '../components/AlbumRanking';
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

function AlbumList({session, albums}) {
  if(session) {        
    const router = useRouter()
    const { year } = router.query ;
    var albumsList
    if ( year != 0) {
      albumsList = albums.filter( element => element.year == year);
    } else {
      albumsList = albums;
    }
    return (
      <Layout>
        <AlbumRanking listenings={albumsList} size="0" year={year}/>
      </Layout>
    )
  }
  return <Layout>
    <div className="text">You aren't authorized to view this page</div>
  </Layout>    
}

export async function getServerSideProps(context) {
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const session = await getSession(context)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+session.jwt);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };  
  const res = await fetch(apiURL+'/albums/', requestOptions);

  const albums = await res.json()
  return {
    props: { 
      session,
      albums,
    }
  }
}

export default AlbumList;
  