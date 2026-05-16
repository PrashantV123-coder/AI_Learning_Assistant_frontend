import React, {Children, useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {

    const {user} = useContext(UserContext);

    if (!user) return null;

  return (
    <div>
        <Navbar />

        {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout