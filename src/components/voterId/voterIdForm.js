import React from 'react'
// , { useState }
import {
    Form,
    Select,
    InputNumber,
    Row,
    Radio,
    Spin,
    message,
    Col,
    Button,
    Upload,
    Checkbox,
    Input,
    DatePicker
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import moment from 'moment';
import '../../custom.css'
import country from 'country_state_district';
import { uploadData, uploadPhoto } from '../../firebase/addData'
// import {useState as useStateRef} from 'react-usestateref'
import useState from 'react-usestateref'
import ThankYou from '../thankYou'


const states = country.getStatesByCountryId(1);
const dateFormat = 'YYYY/MM/DD';

const fireBaseTableName = "voterIdData"
const types = ['image/png', 'image/jpeg', 'image/jpg']

const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    labelAlign: 'left'
};

function VoterIdForm() {
    const [haveEPiC, setHaveEpic] = useState(false);
    const [shifting, setShifting] = useState(false)

    const allFiles = ["photo", "sign", "aadharCard"]
    const [error, setError] = useState(false);

    // eslint-disable-next-line
    var [filePhoto, setFilePhoto, filePhotoRef] = useState(null);
    
    // eslint-disable-next-line
    var [fileSign, setFileSign, fileSignRef] = useState(null);
    
    // eslint-disable-next-line
    var [fileAadhar, setFileAadhar, fileAadharRef] = useState(null);

    const [loading, setLoading] = useState(false);

        // eslint-disable-next-line
    const [formFilled, setFormFilled, filledRef] = useState(false);

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


    function onChange(value) {
        console.log('changed', value);
    }

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
        // values.disablity = values.disablity[0]
        values.haveEpic = null
        // if (!values.aadharNumber) {
        //     values.aadharNo = "None";
        // }

        values.status = "submitted"
        console.log("values", values)
        uploadData(values, fireBaseTableName).then((ref) => {
            console.log("got rref now uploading images");
            uploadAllImages(ref.id).then((res) => {
                console.log(res)
                // setLoading(false);
            }).catch(e => console.log("error", e))

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
                    <h1>Voter Id form</h1>
                    <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            'input-number': 3,
                            rate: 3.5,
                        }}
                    >
                        <Form.Item name="enrolmentType" label="Enrolment Type" style={{ textAlign: "left" }} rules={[{ required: true, message: 'Please select enrolment type' }]}>
                            <Radio.Group>
                                <Radio value="new" onClick={() => setShifting(false)}>First Time Voter</Radio>
                                <Radio value="update" onClick={() => setShifting(true)}>shifting from another constituency</Radio>
                            </Radio.Group>
                        </Form.Item>



                        <Form.Item name="name" style={{ textAlign: "left" }} label="Name" rules={[{ required: true, message: 'Please enter  Name!' }]}>
                            <Input />
                        </Form.Item>


                        <Form.Item name="surname" style={{ textAlign: "left" }} label="Surname" rules={[{ required: true, message: 'Please enter  surname!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="relativeName" style={{ textAlign: "left" }} label="Name & surname of a Relative" rules={[{ required: true, message: 'Please enter  surname!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="relationType" label="Type of relation" rules={[{ required: true, message: 'Please select Type of relation' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>

                                <Radio value="mother">Mother</Radio>
                                <Radio value="father">Father</Radio>

                                <Radio value="husband">Husband</Radio>
                                <Radio value="wife">Wife</Radio>

                                <Radio value="other">Other</Radio>
                                {/* calculate age as on 1st jan present year */}




                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="dob" style={{ textAlign: "left" }} label="Date Of Birth " rules={[{ required: true, message: 'Please enter Date Of Birth!' }]}>
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender" style={{ textAlign: "left" }} rules={[{ required: true, message: 'Please select gender' }]}>
                            <Radio.Group>
                                <Radio value="male" >Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="tansgender">Transgender</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <h4>Current address</h4>
                        <br></br>

                        <Input.Group name="currentAddress" label="Current Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                            <Form.Item name="currentAddressL1" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="currentAddressL2" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="currentAddressL3" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="currentAddressL4" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="currentCity" style={{ textAlign: "left" }} label="Town / City / District" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="currentState"
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
                                <Form.Item name="currentPincode" rules={[{ required: true, message: 'Please select your pincode!' }]} >
                                    <InputNumber style={{ width: 100 }} />
                                </Form.Item>
                            </Form.Item>

                        </Input.Group>

                        <h4>Permanent address</h4>
                        <br></br>

                        <Input.Group name="permanantAddress" label="Permanent Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                            <Form.Item name="permanentAddressL1" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="permanentAddressL2" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="permanentAddressL3" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="permanentAddressL4" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="permanentCity" style={{ textAlign: "left" }} label="Town / City / District" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="permanentState"
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
                                <Form.Item name="permanentPincode" rules={[{ required: true, message: 'Please select your pincode!' }]} >
                                    <InputNumber style={{ width: 100 }} />
                                </Form.Item>
                            </Form.Item>

                        </Input.Group>


                        <Form.Item name="haveEpic" label="Have EPIC?" style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="yes" onClick={() => setHaveEpic(true)}>Yes</Radio>
                                <Radio value="no" onClick={() => setHaveEpic(false)}>No</Radio>
                            </Radio.Group>
                            {haveEPiC ? (
                                <>
                                    <Form.Item label="EPIC No" labelCol={{ span: 4 }}
                                        style={{ textAlign: "left" }}>
                                        <Form.Item name="epicNumber"

                                            rules={[{ required: { haveEPiC }, message: 'Please enter Aadhar Number!' }]}>
                                            <Input style={{ width: 'auto' }} maxlength="12" className="aadhar-number" onChange={onChange} />
                                        </Form.Item>

                                    </Form.Item>
                                </>
                            ) : <>

                            </>}
                        </Form.Item>


                        {/* disablity */}

                        <Form.Item style={{ textAlign: 'center' }} name="disablity" label="Disablity IF any" rules={[{ required: true, message: 'Please select One' }]}>
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                <Row>
                                    <Col >
                                        <Checkbox value="visual">Visual impairment</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="speech-hearing">Speech & hearing disability</Checkbox>
                                    </Col>

                                    <Col >
                                        <Checkbox value="locomotor">Locomotor disability</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="other">Other</Checkbox>
                                    </Col>
                                    <Col >
                                        <Checkbox value="None">None</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>

                        <Form.Item name="email" style={{ textAlign: "left" }} label="Email">
                            <Input type="email" />
                        </Form.Item>

                        <Form.Item name="mobileNo" label="Contact No" style={{ textAlign: "left" }}>

                            <InputNumber style={{ width: 120 }} maxlength="10" />

                        </Form.Item>



                        {shifting ? (<>
                            <h4 style={{ textAlign: "left" }}>Address of earlier place of ordinary residence (if applying due to shifting from another constituency)</h4>
                            <Input.Group name="shiftingPermanentAddress" label="Old Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                                <Form.Item name="shiftingPermanentAddressL1" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="shiftingPermanentAddressL2" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="shiftingPermanentAddressL3" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="shiftingPermanentAddressL4" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="shiftingPermanentCity" style={{ textAlign: "left" }} label="Town / City / District" rules={[{ required: true, message: 'Please enter detail!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="shiftingPermanentAddressState"
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
                                    <Form.Item name="shiftingPermanentAddresPincode" rules={[{ required: true, message: 'Please select your pincode!' }]} >
                                        <InputNumber style={{ width: 100 }} />
                                    </Form.Item>
                                </Form.Item>

                            </Input.Group>
                        </>) : (<>

                        </>)}


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
                            <Upload name="logo" listType="picture" customRequest={dummyRequest}>
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
                            <Upload name="logo" listType="picture" customRequest={dummyRequest}>
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
                            <Upload name="logo" listType="picture" customRequest={dummyRequest}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{ textAlign: "center" }} >
                            <Button type="primary" disabled={error}  htmlType="submit">
                                Submit
                    </Button>
                        </Form.Item>
                    </Form>
                </Spin>

            </>}

        </>
    )
}

export default VoterIdForm
