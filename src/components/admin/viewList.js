import React, { useEffect } from 'react'
import ListItem from './listItem'
import useState from 'react-usestateref'
import { projectFirestore } from '../../firebase';





function ViewList({ adminType, adminDbName }) {

    // eslint-disable-next-line
    const [applicantList, setApplicantList, applicantListRef] = useState([])
    
    // const [superList, setSuperList, superListRef] = useState([])
    
    
    const superlist = [];
    // const nameFields = {
    //     aadharAdmin: "fullname",
    //     panAdmin: "pancardName",
    //     voterIdAdmin: "name"
    // }



    const renderList = (type) => {
        console.log("applicantList in renderlist", applicantListRef.current);
        if (type === "aadharAdmin") {
            console.log("inside aadhar admin");
            return (applicantListRef.current &&
                applicantListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.fullName}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status}
                            listType="Aadhar Card" />
                    </>)))

        }
        else if (type === "panAdmin") {
            console.log("in pan card if else");
            return (applicantListRef.current &&
                applicantListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.pancardName}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status}
                            listType="Pan Card" />
                    </>)))
        }
        else if (type === "voterIdAdmin") {

            return (applicantListRef.current &&
                applicantListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="viewAll"
                            key={doc.id}
                            name={doc.data.name}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status}
                            listType="VoterId Card" />
                    </>)))
        }

    }
    const renderContent = (adminType) => {
        console.log("adminType in render Content", adminType.adminType);
        if (adminType.adminType === "super") {
            return (
                <>
                
                    {renderList("aadharAdmin")}
                </>


            )
        }
        else

            return (renderList(adminType.adminType))
    }
    const viewAll = (dbName) => {
        console.log("db name in view all", dbName);
        const collectionRef = projectFirestore.collection(dbName);
        collectionRef.onSnapshot((snapshot) => {
            // console.log("snapshot:  ", snapshot.docs);
            setApplicantList(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                })))
            superlist.push(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                    db: dbName
                })))
        })

        // console.log("before setting data ", applicantList);
        console.log("before setting data ", applicantListRef.current);
        
    }

    useEffect(() => {

        if (adminType === "super") {
            console.log("useeffect adminType", adminType)
            viewAll("aadharCardData")
            // viewAll("voterIdData")
            // viewAll("panCardData")
        }
        else { viewAll(adminDbName) }

        // eslint-disable-next-line
    }, [])


    return (
        <>
            <h1>
                View All &nbsp;
                {adminType}
                {/* {nameFields['aadharAdmin'].nameField} */}
            </h1>
            
            {renderContent({ adminType })}



        </>
    )
}

export default ViewList
