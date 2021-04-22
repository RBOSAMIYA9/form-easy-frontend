import { projectStorage, projectFirestore, timeStamp } from '../firebase';


const uploadData = async (data,fireBaseTableName) => {

    console.log("uploding aadhar data");
    console.log("firebasetable in uploadData", fireBaseTableName);
    return new Promise((resolve, reject) => {


        const collectionRef = projectFirestore.collection(fireBaseTableName);
        var ref = collectionRef.add({ ...data, "createdAt": timeStamp() })
        ref.then((ref) => {
            console.log("ref:", ref);
            resolve(ref)
        })

    })


}



const uploadPhoto = async (image, refId, fileType,tableName) => {
    console.log("in upload image");
    console.log("image ", image);
    console.log("firebasetable in uploadPhoto", tableName);

    return new Promise((resolve, reject) => {
        if (image) {
            // filePhoto.name ="abcxyz"
            const storageRef = projectStorage.ref(image.name);
            const collectionRef = projectFirestore.collection(tableName);

            storageRef.put(image).on('state_changed', (snap) => {
                // let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                // setProgress(percentage);
                // console.log("percentage");
            }, (err) => {
                console.log("err: ", err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                // const createdAt = timeStamp();
                // await collectionRef.add({ url, createdAt });

                //find by id and update url

                await collectionRef.doc(refId).update({
                    [fileType]: url
                }).then(() => {
                    console.log(fileType, " uploaded to firebase");
                    resolve("uploaded")
                });

                // setUrl(url);


            });
            // console.log("image uploaded made");
        }
        else
            console.log("if khotu paidu");
    })
}

export { uploadData, uploadPhoto };