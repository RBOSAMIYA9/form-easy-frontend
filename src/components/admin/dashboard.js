import React, { useEffect } from 'react'
import { Button, Card, Col, Row } from 'antd';
import '../../custom.css'
import { projectFirestore } from '../../firebase';
import useState from 'react-usestateref'


const dbName = {
    aadharAdmin: "aadharCardData",
    panAdmin: "panCardData",
    voterIdAdmin: "voterIdData"
}

function Dashboard({ adminType }) {
    var [all, setAllCount, allCountRef] = useState(0)
    var [approved, setApprovedCount, approvedCountRef] = useState(0)
    var [rejected, setRejectedCount, rejectCountRef] = useState(0)
    const allCount = () => {
        // console.log("dbName in all count", dbName[adminType]);
        const collectionRef = projectFirestore.collection(dbName[adminType]);
        collectionRef.onSnapshot((snapshot) => {
            console.log("snapShot: ", snapshot.docs.length);
            setAllCount( snapshot.docs.length);
        })
    }
    const approvedCount = () => {
        // console.log("dbName in all count", dbName[adminType]);
        const collectionRef = projectFirestore.collection(dbName[adminType]);
        collectionRef.where('status', '==', 'approved').onSnapshot((snapshot) => {
            console.log("approved: ", snapshot.docs.length);
            setApprovedCount(snapshot.docs.length)
        })
    }
    const rejectCount = () => {
        const collectionRef = projectFirestore.collection(dbName[adminType]);
        collectionRef.where('status', '==', 'rejected').onSnapshot((snapshot) => {
            console.log("rejected: ", snapshot.docs.length);
            setRejectedCount(snapshot.docs.length)
        })
    }

    useEffect(() => {
        if (adminType) {
            allCount()
            approvedCount()
            rejectCount()
        }

    }, [])

    return (
        <>
            <h1>
                Welcome to {adminType} Dashboard
            </h1>
            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col xs={24} sm={8}>
                    <Card title="Submitted" bordered={false} style={{ textAlign: 'center' }}>
                        <span className="total">{allCountRef.current}</span>
                        <p>Total Submited</p>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card title="Approved" bordered={false} style={{ textAlign: 'center' }}>
                        <span className="total">{approvedCountRef.current}</span>
                        <p>Total Approved</p>

                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card title="Rejected" bordered={false} style={{ textAlign: 'center' }}>
                        <span className="total">{rejectCountRef.current}</span>
                        <p>Total Rejected</p>

                    </Card>
                </Col>
            </Row>


        </>
    )
}

export default Dashboard
