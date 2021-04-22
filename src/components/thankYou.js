import React, { useState, useEffect } from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card} from 'antd';
import '../custom.css'


function ThankYou() {
    return (
        <>
            <Card title="Success!" style={{marginBottom:'15rem'}} bordered={false}>
                <CheckCircleTwoTone className="thankyou" twoToneColor="#52c41a" />
                <h1>Thanks You for filling the form</h1>
                <p>We will send You a client copy of this form on No : 8888888888 </p>
            </Card>
        </>
    )
}

export default ThankYou
