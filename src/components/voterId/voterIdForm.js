import React, { useState } from 'react'
import {
    Form,
    Select,
    InputNumber,
    Row,
    Radio,
    Col,
    Button,
    Upload,
    Checkbox,
    Input,
    DatePicker
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../../custom.css'
import country from 'country_state_district';

const states = country.getStatesByCountryId(1);
const dateFormat = 'YYYY/MM/DD';


const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    labelAlign: 'left'
};

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
function VoterIdForm() {
    const [haveEPiC, setHaveEpic] = useState(false);
    const [shifting, setShifting] = useState(false)
    function onChange(value) {
        console.log('changed', value);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
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
                <Form.Item name="enrolment-type" label="Enrolment Type" style={{ textAlign: "left" }} rules={[{ required: true, message: 'Please select enrolment type' }]}>
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
                <Form.Item name="relative-name" style={{ textAlign: "left" }} label="Name & surname of a Relative" rules={[{ required: true, message: 'Please enter  surname!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="relation-type" label="Type of relation" rules={[{ required: true, message: 'Please select Type of relation' }]} style={{ textAlign: "left" }}>
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

                <Input.Group name="resident-address" label="Current Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                    <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
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

                </Input.Group>


                <Input.Group name="permanant-address" label="Permanent Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                    <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
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

                </Input.Group>


                <Form.Item name="have-aadhar" label="Have EPIC?" style={{ textAlign: "left" }}>
                    <Radio.Group>
                        <Radio value="yes" onClick={() => setHaveEpic(true)}>Yes</Radio>
                        <Radio value="no" onClick={() => setHaveEpic(false)}>No</Radio>
                    </Radio.Group>
                    {haveEPiC ? (
                        <>
                            <Form.Item label="EPIC No" labelCol={{ span: 4 }}
                                style={{ textAlign: "left" }}>
                                <Form.Item name="aadhar-number"

                                    rules={[{ required: { haveEPiC }, message: 'Please enter Aadhar Number!' }]}>
                                    <Input style={{ width: 'auto' }} maxlength="12" className="aadhar-number" onChange={onChange} />
                                </Form.Item>

                            </Form.Item>
                        </>
                    ) : <>

                    </>}
                </Form.Item>


                {/* disablity */}

                <Form.Item style={{ textAlign: 'center' }} name="disablity" label="Disablity IF any">
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
                    <Input.Group name="permanant-address" label="Old Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                        <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Street / Area / Locality" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Town/Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
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
                    <Upload name="logo" listType="picture">
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
                    <Upload name="logo" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="passport-photo"
                    label="Upload Your Passport size photo"
                    valuePropName="passport-size-photo"
                    getValueFromEvent={normFile}
                    extra=""
                    style={{ textAlign: "left" }}
                    rules={[{ required: true, message: 'Please upload your Passport size  photo!' }]}
                >
                    <Upload name="logo" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{ textAlign: "center" }} >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default VoterIdForm
