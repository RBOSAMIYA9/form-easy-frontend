import { useEffect, useState } from 'react'
import ListItem from './listItem'
import { projectFirestore } from '../../firebase';
import { Spin, Space } from 'antd';



function ApprovedList({ adminType, adminDbName }) {

    // eslint-disable-next-line
    const [approvedList, setApprovedList] = useState([])
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [adminDb, setAdminDb] = useState(null);


    const viewAll = (dbName) => {
        // console.log("dbName in viewall", dbName)
        return new Promise((resolve, reject) => {
            const collectionRef = projectFirestore.collection(dbName);
            collectionRef.where("status", '==', 'approved').onSnapshot((snapshot) => {
                setApprovedList(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    })))
                resolve("view all done")
            })
        })


    }
    const renderList = (type) => {
        console.log("renderList admintype", type);
        if (type === "aadharAdmin") {
            console.log("inside aadhar admin");
            return (approvedList &&
                approvedList.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.fullName}
                            id={doc.id}
                            adminDbName={adminDb}
                            adminType={type}
                            status={doc.data.status}
                            listType="Aadhar Card" />
                    </>)))

        }
        else if (type === "panAdmin") {
            return (approvedList &&
                approvedList.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.pancardName}
                            id={doc.id}
                            adminDbName={adminDb}
                            adminType={type}
                            status={doc.data.status}
                            listType="Pan Card"

                        />
                    </>)))
        }
        else if (type === "voterIdAdmin") {

            return (approvedList &&
                approvedList.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.name}
                            id={doc.id}
                            adminDbName={adminDb}
                            adminType={type}
                            status={doc.data.status}
                            listType="VoterId Card" />
                    </>)))
        }

    }
    useEffect(() => {


        setLoading(true);

        var data = JSON.parse(localStorage.getItem('user'))
        console.log("data from localstorage")
        console.log("data from localstorage", data)
        viewAll(data.dbName).then((data) => {
            setLoading(false);
        })
        setAdmin(data.adminType)
        setAdminDb(data.dbName)

        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        setLoading(true);

        if (adminType) {

            viewAll(adminDbName).then((data) => {
                setLoading(false);
            })
            setAdmin(adminType);
            setAdminDb(adminDbName);
        }
        // eslint-disable-next-line
    }, [adminType])

    return (
        <>
            <h1>
                Approved list

            </h1>

            {loading ? (
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            ) : (
                renderList(admin)
            )}



        </>


    )
}

export default ApprovedList
