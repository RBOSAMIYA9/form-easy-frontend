import { useEffect } from 'react'
import ListItem from './listItem'
import useState from 'react-usestateref'
import { projectFirestore } from '../../firebase';

function ApprovedList({ adminType, adminDbName }) {
    const [approvedList, setApprovedList, approvedListRef] = useState([])
    const viewAll = () => {

        const collectionRef = projectFirestore.collection(adminDbName);
        collectionRef.where("status", '==', 'approved').onSnapshot((snapshot) => {
            setApprovedList(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                })))

        })
        // console.log("before setting data ", approvedList);
        // console.log("before setting data ", approvedListRef.current);

    }
    const renderList = (type) => {
        console.log("renderList admintype", type);
        if (type.adminType === "aadharAdmin") {
            console.log("inside aadhar admin");
            return (approvedListRef.current &&
                approvedListRef.current.map((doc) => (
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
        else if (type.adminType === "panAdmin") {
            return (approvedListRef.current &&
                approvedListRef.current.map((doc) => (
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

            return (approvedListRef.current &&
                approvedListRef.current.map((doc) => (
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
        console.log("aaplicationList", approvedList, approvedListRef.current);
    }, [])

    return (
        <>
            <h1>
                Approved list
                {/* {adminType} {adminDbName} */}
            </h1>
            {renderList({ adminType })}
            {/* {
                approvedListRef.current &&
                approvedListRef.current.map((doc) => (
                    <>

                        <ListItem
                            menuType="approvedList"
                            key={doc.id}
                            name={doc.data.fullName}
                            id={doc.id}
                            adminDbName={adminDbName}
                            adminType={adminType}
                            status={doc.data.status}
                        />
                    </>
                ))

            } */}

        </>


    )
}

export default ApprovedList
