import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spin, Space } from 'antd';
import '../../custom.css'
import { projectFirestore } from '../../firebase';



const dbName = {
    aadharAdmin: "aadharCardData",
    panAdmin: "panCardData",
    voterIdAdmin: "voterIdData"
}

function Dashboard({ adminType, dataToLocalStorage }) {
    var [allCounter, setAllCounter] = useState(0);
    var [approved, setApprovedCount] = useState(0);
    var [rejected, setRejectedCount] = useState(0);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(false);

    const allCount = (type) => {
        // console.log("dbName in all count", dbName[adminType]);
        return new Promise((resolve, reject) => {
            const collectionRef = projectFirestore.collection(dbName[type]);
            collectionRef.onSnapshot((snapshot) => {
                console.log("snapShot: ", snapshot.docs.length);
                setAllCounter(snapshot.docs.length);
                resolve("all count set")
            })
        })

    }
    const approvedCount = (type) => {
        // console.log("dbName in all count", dbName[adminType]);
        return new Promise((resolve, reject) => {
            const collectionRef = projectFirestore.collection(dbName[type]);
            collectionRef.where('status', '==', 'approved').onSnapshot((snapshot) => {
                console.log("approved: ", snapshot.docs.length);
                setApprovedCount(snapshot.docs.length)
                resolve("approved Count set")
            })
        })

    }




    const rejectCount = (type) => {
        return new Promise((resolve, reject) => {
            const collectionRef = projectFirestore.collection(dbName[type]);
            collectionRef.where('status', '==', 'rejected').onSnapshot((snapshot) => {
                console.log("rejected: ", snapshot.docs.length);
                setRejectedCount(snapshot.docs.length)
                resolve("reject Count set")
            })
        })

    }

    useEffect(() => {

        // console.log("data from localstorage adminType",data.adminType)
        // console.log("data from localstorage dbName",data.dbName)
        setLoading(true)

        if (adminType) {

            Promise.all([allCount(adminType), approvedCount(adminType), rejectCount(adminType)]).then((value) => {
                // console.log(value);
                setLoading(false);
            });



            setAdmin(adminType)
        }

        // eslint-disable-next-line
    }, [adminType])



    //added to handle page refresh and differciate between refresh and re render
    useEffect(() => {
        // console.log("dataToLocalStorage:::::::::::::::", dataToLocalStorage)
        setLoading(true);
        if (localStorage.getItem('user'))
            readDataFromLocalStorege();

        // eslint-disable-next-line
    }, [])

    const readDataFromLocalStorege = () => {
        var data = JSON.parse(localStorage.getItem('user'))
        console.log("data from localstorage")
        console.log("data from localstorage", data)


        Promise.all([allCount(data.adminType), rejectCount(data.adminType), approvedCount(data.adminType)]).then((value) => {
            // console.log(value);
            setLoading(false)
        });

        setAdmin(data.adminType)
    }

    return (
        <>
            <h1>
                Welcome to {admin} Dashboard
            </h1>

            {loading ? (
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            ) : (
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col xs={24} sm={8}>
                        <Card title="Submitted" bordered={false} style={{ textAlign: 'center' }}>
                            <span className="total">{allCounter}</span>
                            <p>Total Submited</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card title="Approved" bordered={false} style={{ textAlign: 'center' }}>
                            <span className="total">{approved}</span>
                            <p>Total Approved</p>

                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card title="Rejected" bordered={false} style={{ textAlign: 'center' }}>
                            <span className="total">{rejected}</span>
                            <p>Total Rejected</p>

                        </Card>
                    </Col>
                </Row>
            )}



        </>
    )
}

export default Dashboard
