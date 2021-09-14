import React, { useEffect, useState } from 'react'
import ListItem from './listItem';
import { projectFirestore } from '../../firebase';
import { Spin, Space } from 'antd';




function ViewList({ adminType, adminDbName }) {


    const [applicantList, setApplicantList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [adminDb, setAdminDb] = useState(null);




    const renderList = (type) => {
        console.log("applicantList in renderlist", applicantList);
        if (type === "aadharAdmin") {
            console.log("inside aadhar admin");
            return (applicantList &&
                applicantList.map((doc) => (
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
            console.log("in pan card if else");
            return (applicantList &&
                applicantList.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.pancardName}
                            id={doc.id}
                            adminDbName={adminDb}
                            adminType={type}
                            status={doc.data.status}
                            listType="Pan Card" />
                    </>)))
        }
        else if (type === "voterIdAdmin") {

            return (applicantList &&
                applicantList.map((doc) => (
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

    const viewAll = (dbName) => {
        return new Promise((resolve, reject) => {
            console.log("db name in view all", dbName);
            const collectionRef = projectFirestore.collection(dbName);
            collectionRef.onSnapshot((snapshot) => {
                // console.log("snapshot:  ", snapshot.docs);
                setApplicantList(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    })))
                resolve("done applicant list")
            })
        })

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
                View All &nbsp;
                {adminType}
                {/* {nameFields['aadharAdmin'].nameField} */}
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

export default ViewList
