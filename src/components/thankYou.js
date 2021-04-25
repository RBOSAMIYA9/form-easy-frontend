import React from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Typography } from 'antd';

import '../custom.css'
const { Text } = Typography;

function ThankYou({formName}) {
    return (
        <>
            <Card title="Success!" style={{ marginBottom: '15rem' }} bordered={false}>
                <CheckCircleTwoTone className="thankyou" twoToneColor="#52c41a" />
                <h1>Thanks You for filling the form</h1>
                <p>You can check the status of your form By sending us message  <b><Text mark> {formName} status </Text></b>  &nbsp; on whatsApp </p>
            </Card>
        </>
    )
}

export default ThankYou
