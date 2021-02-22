import Layout from "../components/Layout"
import { getSession } from "next-auth/client";
import React, { useState } from "react"

const CreateListening = ({session}) => {
  const [isSaved, setSaved] = useState();
  const [isError, setError] = useState();
  var curr = new Date();
  curr.setDate(curr.getDate());
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
    
        try {
          const result = await res.json();
          console.log(result);
          if (result._id) {
            setError(false);
            setSaved(true);
          }          
        } catch(error) {
          setError(true);
          setSaved(false);
        }
    }
    return (
    <Layout>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
      <h3 class="text-lg font-medium leading-6 text-gray-900">New Listening</h3>
        <p class="mt-1 text-sm text-gray-600">
          Fill the form with rhe right informations to save your last listening.
        </p>
      </div>
    </div>       
    <div class="mt-5 md:mt-0 md:col-span-1"> 
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
  <button className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg" type='submit'>Create Listening</button>
  </form>        
<br/>
{isSaved && !isError && 
  <div className="py-3 px-5 mb-4 bg-green-100 text-green-900 text-sm rounded-md border border-green-200" role="alert">
      <strong>Successfull registration</strong> A new listening has been saved !
  </div>}
{!isSaved  && isError && 
  <div className="py-3 px-5 mb-4 bg-red-100 text-red-900 text-sm rounded-md border border-red-200" role="alert">
     <strong>Error during registration</strong> Check the informations !
  </div>
}
</div>
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

