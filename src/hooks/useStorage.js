import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timeStamp } from '../firebase';

const useStorage = (filePhoto, fileSign, fileIdProof, submit, aadharData) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    console.log("form values in usestoreage ", aadharData);
    const uploadPhoto = (image) => {
        if (image) {
            // filePhoto.name ="abcxyz"
            const storageRef = projectStorage.ref(image.name);
            

            storageRef.put(image).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
                // console.log("percentage");
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                // const createdAt = timeStamp();
                // await collectionRef.add({ url, createdAt });
                console.log("data uploaded to firebase");
                setUrl(url);
                
            });
            console.log("image uploaded made");
        }
    }

    const uploadData = (aadharData) =>{
        console.log("uploding aadhar data");
        const collectionRef = projectFirestore.collection('adharCardData');
        collectionRef.add(aadharData)
          .then((ref) => {
            console.log("Added doc: ", ref);
            // Added doc with ID:  ZzhIgLqELaoE3eSsOazu
          });
    }

    useEffect(() => {
        // references
        console.log("use  effect called ");
        console.log("aadharData in useEffect",aadharData);
        if (aadharData) {
            uploadData(aadharData);
            uploadPhoto(filePhoto);
            uploadPhoto(fileSign);
            uploadPhoto(fileIdProof);
        }
        //   console.log("use  ",filePhoto)
       

    }, [submit]);
    // console.log(progress, url);
    return { progress, url, error };

}


export default useStorage;