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
import { UploadOutlined } from '@ant-design/icons';
// import moment from 'moment';
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


function PanCardForm() {
    const [disableFatherName, setDisableFatherName] = useState(false)
    const [otherName, setOtherName] = useState(false);
    const [individual, setIndividual] = useState(false);
    const [motherName, setMotherName] = useState(false);
    const [motherNameOnPan, setMotherNameOnPan] = useState(false);
    const [fatherNameOnPan, setFatherNameOnPan] = useState(false);
    const [haveAadhar, setHaveAadhar] = useState(false);

    let notHaveAadhar = !haveAadhar;
    function onChange(value) {
        console.log('changed', value);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };



    return (
        <>
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
                        <Radio value="b-individual">Body of individual</Radio>

                        <Radio value="company">Compny</Radio>
                        <Radio value="local-authority">Local authority</Radio>

                        <Radio value="partership">Partership firm</Radio>
                        <Radio value="a-judicial-person">Artificial judicial person</Radio>

                        <Radio value="govt">Goveronment</Radio>
                        <Radio value="association">Association Of person</Radio>

                        <Radio value="llp">Limited liablity partnership</Radio>


                    </Radio.Group>
                </Form.Item>
                <hr />
                <h3 style={{ textAlign: 'left' }}>Full Name (Full expanded name to be mentioned as appearing in proof of identity/date of birth/address documents: initials are not permitted)</h3>

                <Form.Item name="name-title" label="Title" rules={[{ required: true, message: 'Please select title' }]} style={{ textAlign: "left" }}>
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
                <Form.Item name="other-name" label="Known by other name" style={{ textAlign: "left" }}>
                    <Radio.Group>
                        <Radio value="yes" onClick={() => setOtherName(true)}>Yes</Radio>
                        <Radio value="no" onClick={() => setOtherName(false)}>No</Radio>
                    </Radio.Group>
                    {otherName ? (
                        <>
                            <Form.Item name="other-name-title" label="Title" rules={[{ required: { otherName }, message: 'Please select title' }]} style={{ textAlign: "left" }}>
                                <Radio.Group>
                                    <Radio value="shri">Shri</Radio>
                                    <Radio value="smt">Smt.</Radio>
                                    <Radio value="kumari">Kumari</Radio>
                                    <Radio value="ms">M/s</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="other-lastname" style={{ textAlign: "left" }} label="Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="other-firstname" style={{ textAlign: "left" }} label="First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="other-middlename" style={{ textAlign: "left" }} label="Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    ) : <></>}
                </Form.Item>
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
                        <Form.Item name="single-parent" label="Tick Applicable" rules={[{ required: true, message: 'Please select applicable' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="yes" onClick={() => {
                                    setMotherName(true)
                                    setDisableFatherName(true)
                                }
                                }>Yes</Radio>
                                <Radio value="no" onClick={() => setMotherName(false)}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="parent-name-on-Pan" label="Parent Name On PanCard" rules={[{ required: true, message: 'Please select applicable' }]} style={{ textAlign: "left" }}>
                            <Radio.Group>
                                <Radio value="mother-name"
                                    onClick={() => {
                                        setMotherNameOnPan(true)
                                        setFatherNameOnPan(false)
                                    }}>Mother's Name</Radio>
                                <Radio value="father-name"
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
                                <Form.Item name="mother-lastname" style={{ textAlign: "left" }} label="Mother's Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="mother-firstname" style={{ textAlign: "left" }} label="Mother's First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="mother-middlename" style={{ textAlign: "left" }} label="Mother's Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (fatherNameOnPan ? (<>
                            <Form.Item name="father-lastname" style={{ textAlign: "left" }} label="Father's Last Name" rules={[{ required: true, message: 'Please enter Last Name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="father-firstname" style={{ textAlign: "left" }} label="Father's First Name" rules={[{ required: true, message: 'Please enter First Name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="father-middlename" style={{ textAlign: "left" }} label="Father's Middle Name" rules={[{ required: true, message: 'Please enter Middle Name!' }]}>
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
                <Input.Group name="resident-address" label="Residence Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                    <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" rules={[{ required: true, message: 'Please enter detail!' }]}>
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
                <Input.Group name="office-address" label="Residence Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                    <Form.Item name="address-line-zero" style={{ textAlign: "left" }} label="Office Name" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" rules={[{ required: true, message: 'Please enter detail!' }]}>
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
                <Form.Item name="communicationAddress" label="Address Of communication" rules={[{ required: true, message: 'Please select nationality' }]} style={{ textAlign: "left" }}>
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
                    <Input.Group size="compact">
                        <Row gutter={8}>
                            <Col span={2}>
                                <InputNumber defaultValue="+91" style={{ width: 50 }} />
                            </Col>
                            <Col span={2}>
                                <InputNumber style={{ width: 120 }} maxlength="10" />
                            </Col>
                        </Row>
                    </Input.Group>
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
                <Form.Item name="have-aadhar" label="Aadhar Card alloted?" style={{ textAlign: "left" }}>
                    <Radio.Group>
                        <Radio value="yes" onClick={() => setHaveAadhar(true)}>Yes</Radio>
                        <Radio value="no" onClick={() => setHaveAadhar(false)}>No</Radio>
                    </Radio.Group>
                    {haveAadhar ? (
                        <>
                            <Form.Item label="Aadhar No" labelCol={{ span: 4 }}
                                style={{ textAlign: "left" }}>
                                <Form.Item name="aadhar-number"

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
                </Form.Item>
                <h4>Name as per Aadhar id or Enrollment application</h4>
                <Form.Item name="name-as-aadhar" style={{ textAlign: "left" }} label="Name" rules={[{ required: true, message: 'Please enter Name!' }]}>
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
                                <Checkbox value="income-from-bussiness">Income from Business / Profession</Checkbox>
                            </Col>
                            <Col >
                                <Checkbox value="income-from-property">Income from House property</Checkbox>
                            </Col>
                            <Col >
                                <Checkbox value="capital-gains">Capital Gains</Checkbox>
                            </Col>
                            <Col >
                                <Checkbox value="other-source">Income from Other sources</Checkbox>
                            </Col>
                            <Col >
                                <Checkbox value="no-income">No income</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                    <Form.Item label="Bussiness/ proffesion code:" labelCol={{ span: 6 }}
                        style={{ textAlign: "left" }} >
                        <Form.Item name="proffesion-code">
                            <InputNumber style={{ width: 200 }} maxlength="3" className="aadhar-number" onChange={onChange} />
                        </Form.Item>

                    </Form.Item>
                </Form.Item>
                <hr />
                <h3 style={{ textAlign: 'left' }}>
                    Full name, address of the Representative Assessee, who is assessible under the Income Tax Act in respect of the person, whose particulars have
                    been given in the column 1-13.
                </h3>
                <Input.Group name="representative-details" >
                    <Form.Item name="full-name">
                        <Form.Item name="name-title" label="Title" rules={[{ required: true, message: 'Please select title' }]} style={{ textAlign: "left" }}>
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
                    </Form.Item>
                    <Input.Group name="representative-address" label="Address" rules={[{ required: true, message: 'Please enter address' }]} style={{ textAlign: "left" }}>
                        <Form.Item name="address-line-one" style={{ textAlign: "left" }} label="Flat / Room / Door / Block No." rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-two" style={{ textAlign: "left" }} label="Name of Premises / Building / Village" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-three" style={{ textAlign: "left" }} label="Road / Street / Lane/Post Office" rules={[{ required: true, message: 'Please enter detail!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address-line-four" style={{ textAlign: "left" }} label="Area / Locality / Taluka/ Sub- Division" rules={[{ required: true, message: 'Please enter detail!' }]}>
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

export default PanCardForm
