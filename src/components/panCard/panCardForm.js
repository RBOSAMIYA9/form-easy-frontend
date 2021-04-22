import React from 'react'
import {
    Form,
    Select,
    InputNumber,
    Row,
    Checkbox,
    Col,
    Radio,
    message,
    Button,
    Upload,
    Spin,
    Input,
    DatePicker
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import moment from 'moment';
import '../../custom.css'
import country from 'country_state_district';
import { uploadData, uploadPhoto } from '../../firebase/addData'
import useState from 'react-usestateref'
import ThankYou from '../thankYou'


const states = country.getStatesByCountryId(1);
const dateFormat = 'YYYY/MM/DD';

const fireBaseTableName = "panCardData"
const types = ['image/png', 'image/jpeg', 'image/jpg']

const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    labelAlign: 'left'
};



function PanCardForm() {

    const allFiles = ["photo", "sign", "aadharCard"]
    const [error, setError] = useState(false);

    const [disableFatherName, setDisableFatherName] = useState(false)
    const [otherName, setOtherName, otherNameRef] = useState(false);
    const [individual, setIndividual] = useState(false);
    const [motherName, setMotherName] = useState(false);
    const [motherNameOnPan, setMotherNameOnPan] = useState(false);
    const [fatherNameOnPan, setFatherNameOnPan] = useState(false);
    const [haveAadhar, setHaveAadhar] = useState(false);


    var [filePhoto, setFilePhoto, filePhotoRef] = useState(null);
    var [fileSign, setFileSign, fileSignRef] = useState(null);
    var [fileAadhar, setFileAadhar, fileAadharRef] = useState(null);

    const [loading, setLoading] = useState(false);
    const [formFilled, setFormFilled, filledRef] = useState(false);


    let notHaveAadhar = !haveAadhar;

    function onChange(value) {
        console.log('changed', value);
    }


    const normFile = (e) => {
        if (e.fileList.length && types.includes(e.file.type)) {
            console.log("file is ok");
            setError(false);
        }
        else {
            console.log('file is not ok');

            setError(true);
            message.error('Please upload file in jpg/png/jpeg format.');
        }
        return e && e.fileList;
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };



    const uploadAllImages = async (refId) => {
        console.log("uploading image");
        return new Promise((resolve, reject) => {

            Promise.all([uploadPhoto(filePhotoRef.current, refId, allFiles[0], fireBaseTableName),
            uploadPhoto(fileSignRef.current, refId, allFiles[1], fireBaseTableName),
            uploadPhoto(fileAadharRef.current, refId, allFiles[2], fireBaseTableName)])
                .then(() => {
                    resolve("done aaaaaaa")
                    setFormFilled(true);
                })
        })
    }


    const onFinish = (values) => {
        setLoading(true);
        console.log('Success:', values);
        // console.log("photo",values.identityProof[0])

        Object.keys(values).forEach(function (key, index) {
            if (this[key] == undefined) this[key] = null;
        }, values);
        console.log('After: ', values);
        setFilePhoto(values.aadharCardPhoto[0])
        setFileSign(values.passportPhoto[0])
        setFileAadhar(values.sign[0])

        console.log("filePhoto: ", filePhotoRef.current)
        console.log("fileSign: ", fileSignRef.current)
        console.log("fileIdProof: ", fileAadharRef.current)
        delete values.aadharCardPhoto;
        delete values.passportPhoto;
        delete values.sign;
        values.dob = values.dob._d

        values.status = "submitted"
        console.log("values", values)
        uploadData(values, fireBaseTableName).then((ref) => {
            console.log("got rref now uploading images");
            uploadAllImages(ref.id).then((res) => {
                console.log(res)
                // setLoading(false);
            }).catch(e => console.log("error occured", e))

        }).catch(e => console.log("error", e))
            .finally(() => { setLoading(false); setFormFilled(true); });

    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };



    return (
        <>
            {formFilled ? <ThankYou /> : <>
                <Spin size="large" spinning={loading}>
                    <h1>PanCard Form</h1>
                    <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            'input-number': 3,
                            rate: 3.5,
                        }}
                    >
                        <Form.Item name="applicantStatus" label="Status of Applicant" rules={[{ required: true, message: 'Please select applicantStatus' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="individual" onClick={() => setIndividual(true)}>Individual</Radio>
                                <Radio value="trusts">Trusts</Radio>

                                <Radio value="huf">Hindu Undivided family</Radio>
                                <Radio value="bodyOfIndividual">Body of individual</Radio>

                                <Radio value="company">Compny</Radio>
                                <Radio value="localAuthority">Local authority</Radio>

                                <Radio value="partership">Partership firm</Radio>
                                <Radio value="judicialPerson">Artificial judicial person</Radio>

                                <Radio value="govt">Goveronment</Radio>
                                <Radio value="association">Association Of person</Radio>

                                <Radio value="llp">Limited liablity partnership</Radio>


                            </Radio.Group>
                        </Form.Item>
                        <hr />
                        <h3 style={{ textAlign: 'left' }}>Full Name (Full expanded name to be mentioned as appearing in proof of identity/date of birth/address documents: initials are not permitted)</h3>

                        <Form.Item name="nameTitle" label="Title" rules={[{ required: true, message: 'Please select title' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="shri">Shri</Radio>
                                <Radio value="smt">Smt.</Radio>
                                <Radio value="kumari">Kumari</Radio>
                                <Radio value="ms">M/s</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="lastname" style={{ textAlign: "left" }} label="Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="firstname" style={{ textAlign: "left" }} label="First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="middlename" style={{ textAlign: "left" }} label="Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
                            <Input />
                        </Form.Item>
                        <hr />
                        <h3 style={{ textAlign: 'left' }} >Abbreviations of the above name, as you would like it, to be printed on the PAN card</h3>
                        <Form.Item name="pancardName" style={{ textAlign: "left" }} label="Name " rules={[{ required: true, message: 'Please enter  Name!' }]}>
                            <Input />
                        </Form.Item>
                        <hr />
                        {/* rules={[{ required: true, message: 'Please select appropriate' }]} */}
                        <Form.Item name="otherName" label="Known by other name" rules={[{ required: otherNameRef.current, message: 'Please enter  Name!' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="yes" onClick={() => {
                                    setOtherName(true);
                                    console.log("otherNameRef", otherNameRef.current, "otherName", otherName);
                                }}>Yes</Radio>
                                <Radio value="no" onClick={() => {
                                    setOtherName(false)
                                    console.log("otherNameRef", otherNameRef.current, "otherName", otherName);
                                }}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {otherName ? (
                            <>
                                <Form.Item name="otherNameTitle" label="Title" rules={[{ required: { otherName }, message: 'Please select title' }]} style={{ textAlign: "left" }}>
                                    <Radio.Group>
                                        <Radio value="shri">Shri</Radio>
                                        <Radio value="smt">Smt.</Radio>
                                        <Radio value="kumari">Kumari</Radio>
                                        <Radio value="ms">M/s</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name="otherLastname" style={{ textAlign: "left" }} label="Last Name" rules={[{ required: { otherName }, message: 'Please enter Last Name!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="otherFirstname" style={{ textAlign: "left" }} label="First Name" rules={[{ required: { otherName }, message: 'Please enter First Name!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="otherMiddlename" style={{ textAlign: "left" }} label="Middle Name" rules={[{ required: { otherName }, message: 'Please enter Middle Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </>
                        ) : <></>}

                        <hr />
                        {individual ? (<>
                            <Form.Item name="gender" label="Gender" style={{ textAlign: "left" }} rules={[{ required: true, message: 'Please select gender' }]}>
                                <Radio.Group>
                                    <Radio value="male" >Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="tansgender">Transgender</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </>) :
                            (<></>)}


                        <hr />


                        <h4 style={{ textAlign: 'left' }}>Date of Birth</h4>
                        <p style={{ textAlign: 'left' }}>Incorporation/Agreement/Partnership or  Trust Deed / Formation of Body of individuals or Association of Persons</p>
                        <Form.Item name="dob" style={{ textAlign: "left" }} label="Date Of Birth " rules={[{ required: true, message: 'Please enter Date Of Birth!' }]}>
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                        <hr />
                        {
                            individual ? (<>
                                <h3 style={{ textAlign: 'left' }}>Details of Parents (applicable only for individual applicants)</h3>
                                <p style={{ textAlign: 'left' }}>
                                    Whether mother is a single parent and you wish to apply for PAN by furnishing the name of your mother only?
                        </p>
                                <Form.Item name="singleParent" label="Tick Applicable" rules={[{ required: true, message: 'Please select applicable' }]} style={{ textAlign: "left" }}>
                                    <Radio.Group>
                                        <Radio value="yes" onClick={() => {
                                            setMotherName(true)
                                            setDisableFatherName(true)
                                        }
                                        }>Yes</Radio>
                                        <Radio value="no" onClick={() => {
                                            setMotherName(false)
                                            setDisableFatherName(false)
                                        }}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name="parentNameOnPan" label="Parent Name On PanCard" rules={[{ required: true, message: 'Please select applicable' }]} style={{ textAlign: "left" }}>
                                    <Radio.Group>
                                        <Radio value="motherNname"
                                            onClick={() => {
                                                setMotherNameOnPan(true)
                                                setFatherNameOnPan(false)
                                            }}>Mother's Name</Radio>
                                        <Radio value="fatherName"
                                            onClick={() => {
                                                setMotherNameOnPan(false)
                                                setFatherNameOnPan(true)
                                            }}
                                            disabled={disableFatherName}
                                        >Father's Name</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {(motherName || motherNameOnPan) ? (
                                    <>
                                        <Form.Item name="motherLastname" style={{ textAlign: "left" }} label="Mother's Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="motherFirstname" style={{ textAlign: "left" }} label="Mother's First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="motherMiddlename" style={{ textAlign: "left" }} label="Mother's Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
                                            <Input />
                                        </Form.Item>
                                    </>
                                ) : (fatherNameOnPan ? (<>
                                    <Form.Item name="fatherLastname" style={{ textAlign: "left" }} label="Father's Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="fatherFirstname" style={{ textAlign: "left" }} label="Father's First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="fatherMiddlename" style={{ textAlign: "left" }} label="Father's Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
                                        <Input />
                                    </Form.Item>
                                </>) :
                                    (<></>)


                                )}

                            </>) : <></>
                        }
                        <hr />
                        <h3 style={{ textAlign: 'left' }}>Address</h3>
                        <h4>Residence Address</h4>
                        <Input.Group name="residentAddress" label="Residence Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                            <Form.Item name="addressLineOne" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="addressLineTwo" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="addressLineThree" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="addressLineFour" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="city" style={{ textAlign: "left" }} label="Town / City / District" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="state"
                                label="State"
                                hasFeedback
                                rules={[{ required: true, message: 'Please select your state!' }]}
                                style={{ textAlign: "left" }}
                            >
                                <Select placeholder="Please select a state">
                                    {
                                        states.map((state) => (
                                            <Option key={state.id} value={state.name}>{state.name}</Option>
                                        ))
                                    }

                                </Select>
                            </Form.Item>
                            <Form.Item label="Pincode" style={{ textAlign: "left" }}>
                                <Form.Item name="pincode" rules={[{ required: true, message: 'Please select your pincode!' }]} >
                                    <InputNumber style={{ width: 100 }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item name="Country" style={{ textAlign: "left" }} label="Country" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                        </Input.Group>

                        <h4>Office Address</h4>
                        <Input.Group name="officeAddress" label="Residence Address" style={{ textAlign: "left" }}>
                            <Form.Item name="officeAddressL0" style={{ textAlign: "left" }} label="Office Name" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="officeAddressL1" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="officeAddressL2" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="officeAddressL3" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="officeAddressL4" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="officeCity" style={{ textAlign: "left" }} label="Town / City / District" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="officeState"
                                label="State"
                                hasFeedback
                                rules={[{ required: true, message: 'Please select your state!' }]}
                                style={{ textAlign: "left" }}
                            >
                                <Select placeholder="Please select a state">
                                    {
                                        states.map((state) => (
                                            <Option key={state.id} value={state.name}>{state.name}</Option>
                                        ))
                                    }

                                </Select>
                            </Form.Item>
                            <Form.Item label="officePincode" style={{ textAlign: "left" }}>
                                <Form.Item name="pincode" rules={[{ required: true, message: 'Please select your pincode!' }]} >
                                    <InputNumber style={{ width: 100 }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item name="Country" style={{ textAlign: "left" }} label="Country" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                        </Input.Group>
                        <Form.Item name="communicationAddress" label="Address Of communication" rules={[{ required: true, message: 'Please select appropriate' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="Office">Office</Radio>
                                <Radio value="Residance">Residance</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <hr />
                        <h3 style={{ textAlign: 'left' }} >Telephone Number & Email ID details</h3>
                        <Form.Item name="email" style={{ textAlign: "left" }} label="Email" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input type="email" />
                        </Form.Item>
                        {/* rules={[{ required: true, message: 'Please enter detail!' }]} */}
                        <Form.Item name="mobileNo" label="Contact No" >

                            <InputNumber style={{ width: 120 }} maxlength="10" />

                        </Form.Item>
                        {!individual ? (
                            <>
                                <Form.Item label="Registration No" style={{ textAlign: "left" }}>
                                    <Form.Item name="registrationNo" rules={[{ required: true, message: 'Please select your Registration!' }]} >
                                        <InputNumber style={{ width: 'auto' }} />
                                    </Form.Item>
                                </Form.Item>
                            </>
                        ) : <></>}
                        <hr />
                        <h3 style={{ textAlign: 'left' }} >
                            In case of a person, who is required to quote Aadhaar number or the Enrolment ID of Aadhaar application form as per section 139 AA
                </h3>
                        {/* rules={[{ required: true, message: 'Please select title' }]}  */}
                        <Form.Item name="haveAadhar" label="Aadhar Card alloted?" style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="yes" onClick={() => setHaveAadhar(true)}>Yes</Radio>
                                <Radio value="no" onClick={() => setHaveAadhar(false)}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {haveAadhar ? (
                            <>
                                <Form.Item label="Aadhar No" labelCol={{ span: 4 }}
                                    style={{ textAlign: "left" }}>
                                    <Form.Item name="aadharNumber"

                                        rules={[{ required: { haveAadhar }, message: 'Please enter Aadhar Number!' }]}>
                                        <InputNumber style={{ width: 'auto' }} maxlength="12" className="aadhar-number" onChange={onChange} />
                                    </Form.Item>

                                </Form.Item>
                            </>
                        ) : <>
                            <Form.Item label="Aadhar Enrolment ID:" labelCol={{ span: 6 }}
                                style={{ textAlign: "left" }} >
                                <Form.Item name="enrlId"

                                    rules={[{ required: { notHaveAadhar }, message: 'Please enter Aadhar Enrolment Number!' }]}>
                                    <InputNumber style={{ width: 200 }} maxlength="28" className="aadhar-number" onChange={onChange} />
                                </Form.Item>

                            </Form.Item>
                        </>}

                        <h4>Name as per Aadhar id or Enrollment application</h4>
                        <Form.Item name="nameAsAadhar" style={{ textAlign: "left" }} label="Name" rules={[{ required: true, message: 'Please enter Name!' }]}>
                            <Input />
                        </Form.Item>
                        <hr />
                        <h3 style={{ textAlign: 'left' }}>Sources of Income</h3>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                <Row>
                                    <Col >
                                        <Checkbox value="Salary">Salary</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="incomeFromBussiness">Income from Business / Profession</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="incomeFromProperty">Income from House property</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="capitalGains">Capital Gains</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="otherSources">Income from Other sources</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="noIncome">No income</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                            <Form.Item label="Bussiness/ proffesion code:" labelCol={{ span: 6 }}
                                style={{ textAlign: "left" }} >
                                <Form.Item name="proffesionCode">
                                    <InputNumber style={{ width: 200 }} maxlength="3" className="aadhar-number" onChange={onChange} />
                                </Form.Item>

                            </Form.Item>
                        </Form.Item>
                        <hr />
                        <h3 style={{ textAlign: 'left' }}>
                            Full name, address of the Representative Assessee, who is assessible under the Income Tax Act in respect of the person, whose particulars have
                            been given in the column 1-13.
                </h3>
                        <Input.Group name="representativeDetails" >
                            <Form.Item name="representativeFullName">
                                <Form.Item name="representativeNameTitle" label="Title" style={{ textAlign: "left" }}>
                                    <Radio.Group>
                                        <Radio value="shri">Shri</Radio>
                                        <Radio value="smt">Smt.</Radio>
                                        <Radio value="kumari">Kumari</Radio>
                                        <Radio value="ms">M/s</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name="representativeLastname" style={{ textAlign: "left" }} label="Last Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeFirstname" style={{ textAlign: "left" }} label="First Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeMiddlename" style={{ textAlign: "left" }} label="Middle Name">
                                    <Input />
                                </Form.Item>
                            </Form.Item>
                            <Input.Group name="representativeAddress" label="Address" style={{ textAlign: "left" }}>
                                <Form.Item name="representativeAddressL1" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeAddressL2" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeAddressL3" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeAddressL4" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="representativeCity" style={{ textAlign: "left" }} label="Town / City / District" >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="representativeState"
                                    label="State"
                                    hasFeedback
                                    style={{ textAlign: "left" }}
                                >
                                    <Select placeholder="Please select a state">
                                        {
                                            states.map((state) => (
                                                <Option key={state.id} value={state.name}>{state.name}</Option>
                                            ))
                                        }

                                    </Select>
                                </Form.Item>
                                <Form.Item label="Pincode" style={{ textAlign: "left" }}>
                                    <Form.Item name="representativePincode">
                                        <InputNumber style={{ width: 100 }} />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item name="representativeCountry" style={{ textAlign: "left" }} label="Country">
                                    <Input />
                                </Form.Item>
                            </Input.Group>
                        </Input.Group>
                        <hr />
                        <Form.Item name="place" style={{ textAlign: "left" }} label="Place" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sign"
                            label="Upload Your Sign"
                            valuePropName="signList"
                            getValueFromEvent={normFile}
                            extra=""
                            style={{ textAlign: "left" }}
                            rules={[{ required: true, message: 'Please upload your photo!' }]}
                        >
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="aadharCardPhoto"
                            label="Upload Your AAdharCard photo"
                            valuePropName="aadhar-card-photo"
                            getValueFromEvent={normFile}
                            extra=""
                            style={{ textAlign: "left" }}
                            rules={[{ required: true, message: 'Please upload your aadharcard  photo!' }]}
                        >
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="passportPhoto"
                            label="Upload Your Passport size photo"
                            valuePropName="passport-size-photo"
                            getValueFromEvent={normFile}
                            extra=""
                            style={{ textAlign: "left" }}
                            rules={[{ required: true, message: 'Please upload your Passport size  photo!' }]}
                        >
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{ textAlign: "center" }} >
                            <Button type="primary" htmlType="submit" disabled={error} >
                                Submit
                    </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </>}

        </>
    )
}

export default PanCardForm
