import React, { useState } from 'react'
import LoginPage from '../components/LoginPage'
import AdminArea from '../components/admin/adminArea'

function DashboardPage({ user, setUser }) {
    const [adminType, setAdminType] = useState(null)

    // eslint-disable-next-line
    const [adminDbName, setAdminDbName] = useState(null)
    const [dataToLocalStorage, setDataToLocalStorage] = useState(false);

    return (
        <>
            {user ? <>

                <AdminArea adminType={adminType} setUser={setUser} adminDbName={adminDbName} dataToLocalStorage={dataToLocalStorage} />

            </> : <LoginPage user={user} setUser={setUser} setAdminType={setAdminType} setAdminDbName={setAdminDbName} setDataToLocalStorage={setDataToLocalStorage} />}

        </>
    )
}

export default DashboardPage
