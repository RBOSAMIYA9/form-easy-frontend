import React from 'react'
// , { useState }
import {
    Form,
    Select,
    InputNumber,

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
// import {useState as useStateRef} from 'react-usestateref'
import useState from 'react-usestateref'
import ThankYou from '../thankYou'

const states = country.getStatesByCountryId(1);
const dateFormat = 'YYYY/MM/DD';

const fireBaseTableName = "aadharCardData"

const types = ['image/png', 'image/jpeg', 'image/jpg']
const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
    labelAlign: 'left'
};


function AadharCardForm() {
    const allFiles = ["photo", "sign", "identityProof"]
    const [aadharNoInput, setaadharNoInput] = useState(false);
    const [error, setError] = useState(false);
    // const [filePhoto, setFilePhoto] = useState(null);
    // const [fileSign, setFileSign] = useState(null);
    // const [fileIdProof, setFileIdProof] = useState(null);

    var [filePhoto, setFilePhoto, filePhotoRef] = useState(null);
    var [fileSign, setFileSign, fileSignRef] = useState(null);
    var [fileIdProof, setFileIdProof, fileIdProofRef] = useState(null);

    const [loading, setLoading] = useState(false);
    const [formFilled, setFormFilled, formFilledRef] = useState(false);

    const toggleAadharNoInput = (e) => {

        if (e.target.value === "update") {
            setaadharNoInput(true);
        }
        else {
            setaadharNoInput(false);
        }

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

    function onChange(value) {
        console.log('changed', value);
    }

    const uploadAllImages = async (refId) => {
        
        return new Promise((resolve, reject) => {
            
            Promise.all([uploadPhoto(filePhotoRef.current, refId, allFiles[0],fireBaseTableName),
            uploadPhoto(fileSignRef.current, refId, allFiles[1],fireBaseTableName),
            uploadPhoto(fileIdProofRef.current, refId, allFiles[2],fireBaseTableName)])
                .then(() => {
                    resolve("done aaaaaaa")
                    
                })
        })
    }
    const onFinish = (values) => {

        setLoading(true);
        console.log('Success:', values);
        // console.log("photo",values.identityProof[0])

        setFilePhoto(values.photo[0])
        setFileSign(values.sign[0])
        setFileIdProof(values.identityProof[0])

        console.log("filePhoto: ", filePhotoRef.current)
        console.log("fileSign: ", fileSignRef.current)
        console.log("fileIdProof: ", fileIdProofRef.current)

        delete values.identityProof;
        delete values.sign;
        delete values.photo;
        values.dob = values.dob._d
        if (!values.aadharNumber) {
            values.aadharNo = null;
        }

        values.status = "submitted"

        uploadData(values,fireBaseTableName).then((ref) => {
            console.log("got rref now uploading images");
            uploadAllImages(ref.id).then((res) => {
                console.log(res)
                // setLoading(false);
            }).catch(e => console.log("error", e))

        }).catch(e => console.log("error", e))
            .finally(() => { setLoading(false); setFormFilled(true);});


    };



    return (
        <>
            {formFilled  ? <ThankYou /> : <>
                <Spin size="large" spinning={loading}>
                    <h1>AadharCard Form</h1>
                    <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            'input-number': 3,
                            rate: 3.5,
                        }}
                    >

                        <Form.Item name="nationality" label="Nationality" rules={[{ required: true, message: 'Please select nationality' }]} style={{ textAlign: "left" }}>
                            <Radio.Group  >
                                <Radio value="Indian">Indian Resident</Radio>
                                <Radio value="Nri">Non Resident Indian</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="enrolmentType" label="Enrolment Type" style={{ textAlign: "left" }} rules={[{ required: true, message: 'Please select enrolment type' }]}>
                            <Radio.Group>
                                <Radio value="new" onChange={(e) => toggleAadharNoInput(e)}>New Enrolment</Radio>
                                <Radio value="update" onChange={(e) => toggleAadharNoInput(e)}>Update Request</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {aadharNoInput ? (
                            <>
                                <Form.Item label="Aadhar No" labelCol={{ span: 3 }}
                                    style={{ textAlign: "left" }} >
                                    <Form.Item name="aadharNumber"

                                        rules={[{ required: true, message: 'Please enter Aadhar Number!' }]}>
                                        <InputNumber style={{ width: 'auto' }} minlength="12" maxLength="12" className="aadhar-number" onChange={onChange} />
                                    </Form.Item>

                                </Form.Item>
                                {/* form comple */}
                            </>
                        ) : (<></>)}
                        
                        <Form.Item name="fullName" style={{ textAlign: "left" }} label="Full Name" rules={[{ required: true, message: 'Please enter Name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="relationOf" style={{ textAlign: "left" }} label="C/O" rules={[{ required: true, message: 'Please enter C/O!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="addressLineOne" style={{ textAlign: "left" }} label="House No / Apt" rules={[{ required: true, message: 'Please enter House no / Bridg / Apt' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="addressLineTwo" style={{ textAlign: "left" }} label="Street / road / lane" rules={[{ required: true, message: 'Please enter Street / road / lane' }]}>
                            <Input />
                        </Form.Item>


                        <Form.Item name="landmark" style={{ textAlign: "left" }} label="Landmark " rules={[{ required: true, message: 'Please enter landmark' }]}>
                            <Input />
                        </Form.Item>



                        <Form.Item name="locality" style={{ textAlign: "left" }} label="Area/locality/sector " rules={[{ required: true, message: 'Please enter Area/locality/sector' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="settlement" style={{ textAlign: "left" }} label="Village / town / city " rules={[{ required: true, message: 'Please enter landmark' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="postoffice" style={{ textAlign: "left" }} label="PostOffice " rules={[{ required: true, message: 'Please enter postOffice' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="district" style={{ textAlign: "left" }} label="District " rules={[{ required: true, message: 'Please enter district' }]}>
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

                        <Form.Item name="dob" style={{ textAlign: "left" }} label="Date Of Birth " rules={[{ required: true, message: 'Please enter Date Of Birth!' }]}>
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                        <Form.Item
                            name="photo"
                            label="Upload Your Photo"
                            valuePropName="photoList"
                            getValueFromEvent={normFile}
                            extra=""
                            style={{ textAlign: "left" }}

                            rules={[{ required: true, message: 'Please upload your photo!' }]}
                        >
                            {/*  action="/upload.do" */}
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} maxCount={1}>
                                <Button icon={<UploadOutlined />}  >Click to upload</Button>
                            </Upload>

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
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>


                        <Form.Item
                            name="identityProof"
                            label="Identity Proof"
                            valuePropName="identity-proof-list"
                            getValueFromEvent={normFile}
                            extra=""
                            style={{ textAlign: "left" }}

                            rules={[{ required: true, message: 'Please upload your photo!' }]}
                        >
                            <Upload name="logo" listType="picture" customRequest={dummyRequest} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>




                        <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{ textAlign: "center" }} >
                            <Button type="primary" htmlType="submit" disabled={error}>
                                Submit
                    </Button>
                        </Form.Item>
                    </Form>
                </Spin>


            </>}

        </>
    )
}

export default AadharCardForm
