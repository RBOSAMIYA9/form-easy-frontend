import React from 'react'



function contentData() {

    return (
        <>
            <div  style={{textAlign:'left'}}>
                <h1 style={{textAlign:'center'}}>AADHAR</h1>
                <h3>What is AADHAR?</h3>
                <p>Aadhaar number is a 12-digit random number issued by the UIDAI (“Authority”) to the residents of India after satisfying the verification process laid down by the Authority.</p>
                <p>Any individual, irrespective of age and gender, who is a resident of India, may voluntarily enrol to obtain Aadhaar number. Person willing to enrol has to provide minimal demographic and biometric information during the enrolment process which is totally free of cost. An individual needs to enrol for Aadhaar only once and after de-duplication only one Aadhaar shall be generated, as the uniqueness is achieved through the process of demographic and biometric de-duplication.</p>
                <p></p>

                <br />

                <h3>Information</h3>
                

                <ul>
                    <li><b>Demographic Information:</b>   Name, Date of Birth (verified) or Age (declared), Gender, Address, Mobile Number (optional) and Email ID (optional), in case of Introducer-based enrolment- Introducer name and Introducer’s Aadhaar number, in case of Head of Family based enrolmen- Name of Head of Family, Relationship and Head of Family’s Aadhaar number; in case of enrolment of child- Enrolment ID or Aadhaar number of any one parent, Proof of Relationship (PoR) document</li>
                    <li><b>Biometric Information:</b>   Ten Fingerprints, Two Iris Scans, and Facial Photograph</li>
                </ul>

                
                <h3>Documents to be attached</h3>
                <p><b>POI </b> (Proof of Identity) documents containing Name and Photo</p>
                <p> <b>POR</b> (Proof of Relationship) documents containing Name of applicant and Name of HoF (Head of Family)</p>
                <p><b>DOB </b> (Date of Birth) documents containing Name and DOB</p>
                <p><b>POA </b>(Proof of Address) documents containing Name and Address</p>
                <p></p>
            </div>
        </>
    )
}

export default contentData
