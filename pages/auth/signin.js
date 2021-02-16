import { providers, signIn } from 'next-auth/client'
import Layout from '../../components/Layout';


export default function SignIn({ providers }) {
  return (
    <Layout>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button class="p-2 my-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 ring-red-300 ring-offset-2 place-content-center" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </Layout>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}