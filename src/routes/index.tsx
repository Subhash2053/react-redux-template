
import {  Routes ,Route,Navigate } from "react-router-dom";
import { DefaultLayout } from "../component/layout/layout";
import Client from "../views/client";
import ClientCreate from "../views/client/create";





export const MainRoutes = () => {
 
  return (
    
    <Routes>
      <Route path="/" element={<Navigate replace to="/client" />} />
     <Route path='/client' element={
     <DefaultLayout>
     <Client/>
     </DefaultLayout>} />
     
     <Route path='/client/create' element={<DefaultLayout><ClientCreate/></DefaultLayout>} />
  
    </Routes>
    
  );
};

export default MainRoutes;
