// import { projectFirestore } from '../firebase';
// import {  useEffect} from 'react'
// import useState from 'react-usestateref'
// const useDbOperations = (dbName) => {
//     var [applicantList, setApplicantList,applicantListRef] = useState(null);


//     const viewAll = (dbName) => {
//         setApplicantList("hello" + dbName)
//     }

//     const viewApproved = (adminType) => {
//         // returm array of all users
//     }

//     const viewRejected = (adminType) => {
//         // returm array of all users
//     }

//     const viewById = (adminType, id) => {
//         // returm array of form data 
//     }

//     const approveById = (adminType, id) => {
//         // approve by id 
//     }


//     const rejectById = (adminType, id) => {
//         // reject by Id 
//     }



//     useEffect(() => {

//         viewAll(dbName);
//         console.log("applicantListRef.current",applicantListRef.current)
//     }, [dbName])
//     return applicantListRef.current;

// }


// export default useDbOperations;