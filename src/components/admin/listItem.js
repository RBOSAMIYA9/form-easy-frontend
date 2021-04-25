import React from 'react'
import useState from 'react-usestateref'
import { Button, Card, Col, Row, Modal } from 'antd';
import '../../custom.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { projectFirestore } from '../../firebase';


const { confirm } = Modal;


function ListItem({ menuType, name, adminDbName, id, status, listType }) {
    const [viewAllVisible, setViewAllVisible] = useState(false);
    const [modalContent, setModalContent, modalContentRef] = useState("");
    const [modalContentKeys, setModalContentKeys, modalContentKeysRef] = useState([]);
    const [modalContentValues, setModalContentValues, modalContentValuesRef] = useState([]);
    const collectionRef = projectFirestore.collection(adminDbName);
    // console.log("status", status);

    var disableApproved = false;
    var disableRejected = false;
    if (status === "approved") {
        disableApproved = true
    }
    else if (status === "rejected") {
        disableRejected = true
    }


    const viewById = (applicantId) => {
        console.log("view by id ", applicantId.id);
        collectionRef.doc(applicantId.id).get().then((doc) => {
            var data = doc.data();
            data.createdAt = data.createdAt.toDate().toLocaleDateString()
            data.dob = data.dob.toDate().toLocaleDateString()
            // function toLocaleDateString() { [native code] }
            console.log("data", data);
            setModalContent(data)
            // console.log("keys", modalContentKeysRef.current);
        })
        


        setModalContentKeys(Object.keys(modalContentRef.current))
        setModalContentValues(Object.values(modalContentRef.current))

        console.log("keys", modalContentKeysRef.current);
        console.log("values", modalContentValuesRef.current);
        // console.log("date",modalContentValues[2].toDate());
    }

    const approveById = (applicantId) => {
        // console.log(applicantId.id);
        collectionRef.doc(applicantId.id).update({
            status: "approved",
        });
    }

    const rejectById = (applicantId) => {
        console.log('id:', applicantId.id)
        console.log("reject by id");
        collectionRef.doc(applicantId.id).update({
            status: "rejected",
        });
    }

    function showConfirm() {
        confirm({
            title: `Are you sure you want to reject the form?`,

            icon: <ExclamationCircleOutlined />,
            onOk() {

                rejectById({ id });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <>
            <Row>
                <Col span={24} style={{ padding: '15px', textAlign: 'left' }}>
                    <Card bordered={false} style={{ textAlign: 'center' }}>
                        <span className="listContainer">
                            <span className="listNameContainer">
                                <span className="listName">
                                    {name}
                                </span>
                                <span className="listType">
                                    {listType} 
                                </span>
                            </span>
                            <span className="listItemContainer">

                                {menuType == "approvedList" ?
                                    <>
                                        <span className="listItem">

                                            <Button onClick={() => {
                                                setViewAllVisible(true)
                                                viewById({ id })
                                            }}>View</Button>
                                        </span>
                                        <span className="listItem">
                                            <Button type="danger" onClick={showConfirm}> Reject</Button>
                                        </span>
                                    </>
                                    : menuType == "rejectedList" ? <>
                                        <span className="listItem">

                                            <Button onClick={() => {
                                                setViewAllVisible(true)
                                                viewById({ id })
                                            }}>View</Button>
                                        </span>
                                        <span className="listItem">
                                            <Button type="primary" onClick={() => approveById({ id })}>Approve</Button>
                                        </span>

                                    </> : <>
                                        <span className="listItem">

                                            <Button onClick={() => {
                                                setViewAllVisible(true)
                                                viewById({ id })
                                            }}>View</Button>
                                        </span>
                                        <span className="listItem">
                                            <Button type="primary" disabled={disableApproved} onClick={() => approveById({ id })}>Approve</Button>
                                        </span>
                                        <span className="listItem">
                                            <Button type="danger" disabled={disableRejected} onClick={showConfirm}> Reject</Button>
                                        </span>
                                    </>}


                            </span>

                        </span>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Modal 1000px width"
                visible={viewAllVisible}
                onOk={() => setViewAllVisible(false)}
                onCancel={() => setViewAllVisible(false)}
                width={1000}
            >
                {
                    modalContentKeys &&
                    modalContentKeys.map((values, index) => (
                        <>
                            <p><span><b>{values}</b> : </span><span>{modalContentValues[index]}</span></p>
                        </>
                    ))
                }
            </Modal>





        </>
    )
}

export default ListItem
