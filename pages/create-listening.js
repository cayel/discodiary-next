import Layout from "../components/Layout"
import { getSession } from "next-auth/client";
import React from "react"

const CreateListening = ({session}) => {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var defaultDate = curr.toISOString().substr(0,10);
    const createListening = async event  => {
      event.preventDefault()        
      const res = await fetch('/api/createlistening', {
          body: JSON.stringify({
            date: event.target.date.value,
            discogsId: event.target.discogsId.value,
            score: event.target.score.value,
            token: session.jwt
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
    
        const result = await res.json();
    }
    return (
    <Layout>
        <div className="container mx-auto">
<form className="space-y-4 text-gray-700" onSubmit={createListening}>
  <div className="flex flex-wrap">
    <div className="w-full">
      <label className="block mb-1" htmlFor="date">Date</label>
      <input className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="date" id="date" defaultValue={defaultDate}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
    <div className="w-full px-2 md:w-1/2">
      <label className="block mb-1" htmlFor="discogsId">Discogs Id</label>
      <input className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="number" id="discogsId"/>
    </div>
    <div className="w-full px-2 md:w-1/2">
      <label className="block mb-1" htmlFor="score">Score</label>
      <input className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="decimal" id="score"/>
    </div>
  </div>
  <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2' type='submit'>Create Listening</button>
</form>        
</div>
      </Layout>
    )
  }

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session
    },
  };
};
  
  
export default CreateListening

