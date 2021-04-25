import { useEffect } from 'react'
import ListItem from './listItem'

import useState from 'react-usestateref'
import { projectFirestore } from '../../firebase';


function RejectedList({ adminType, adminDbName }) {

    // eslint-disable-next-line
    const [rejectedList, setRejectedList, rejectedListRef] = useState([])
    const viewAll = () => {

        const collectionRef = projectFirestore.collection(adminDbName);
        // collectionRef.where("status", '==', 'rejected').onSnapshot((snapshot) => {

        //     setRejectedList(snapshot.docs.map((doc) => doc.data()))
        // })

        collectionRef.where("status", '==', 'rejected').onSnapshot((snapshot) => {
            setRejectedList(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                })))

        })

    }
    const renderList = (type) => {
        console.log("renderList admintype", type);
        if (type.adminType === "aadharAdmin") {
            console.log("inside aadhar admin");
            return (rejectedListRef.current &&
                rejectedListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.fullName}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status} 
                            listType="Aadhar Card"
                            />
                    </>)))

        }
        else if (type.adminType === "panAdmin") {
            return (rejectedListRef.current &&
                rejectedListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.pancardName}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status} 
                            listType="Pan Card"
                            />
                    </>)))
        }
        else if (type.adminType === "voterIdAdmin") {

            return (rejectedListRef.current &&
                rejectedListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.name}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status}
                            listType="VoterId Card"  />
                    </>)))
        }

    }
    useEffect(() => {
        console.log("useeffect called")
        viewAll()
        console.log("aaplicationList", rejectedList, rejectedListRef.current);

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <h1>
                RejectedList
                 {/* {adminType} {adminDbName} */}
            </h1>


            {renderList({ adminType })}

            {/* 
            {
                rejectedListRef.current &&
                rejectedListRef.current.map((doc) => (
                    <>
                        <ListItem menuType="rejectedList"
                            key={doc.id}
                            name={doc.data.fullName}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            id={doc.id}
                            status={doc.data.status}
                        />
                    </>
                ))

            } */}

        </>
    )
}

export default RejectedList
