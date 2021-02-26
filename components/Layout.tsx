import { Navbar } from './Navbar';


const  Layout= (props : any) =>  (
  <div>
  <Navbar />
    {props.children}
  </div>
);
export default Layout;