import { useSession } from 'next-auth/client'
import React, { useState, useEffect, useReducer } from "react"

export default function TopByYear() {
  const [ session, loading ] = useSession()
  const [topByYear, setTopByYear] = useState(null);
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const year = '2001'

  if(session) {
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+session.jwt);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(apiURL+'/albums?year='+year, requestOptions)
        .then(response => {
          return response.json()
      }).then (json => {
        json.forEach(album => {
          album.score = 0
          album.value = 0
          for (let i = 0; i < album.listenings.length; i++) {
            album.score = album.score + album.listenings[i].score;
          }
          album.score = album.score / album.listenings.length;
          album.value = album.score + 0.01*album.listenings.length
        });
        
        json.sort(function(a, b){
          return (b.value - a.value) ;
        });
        console.log(json);
        setTopByYear(json);
      })
        // .then(result => setTopByYear(result))
        //  .then(console.log(topByYear))
        //  .catch(error => console.log('error', error));
        
      });
      return <p>{topByYear.length}</p>

  }       
}