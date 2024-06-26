// Login.js
import { Button, Input, Form, message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './ AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(()=>{
    if(localStorage.getItem('access_token')) navigate('/car')
},[])
  

  const onFinish = (values) => {
    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      method: 'POST',
      data: values,
    })
      .then(res => {
        if (res.data.success) {

          localStorage.setItem('access_token', res.data.data.tokens.accessToken.token);
          login(res.data.data.tokens.accessToken.token); 
          message.success('Muvafaqiyatli kirdingiz');
          navigate('/car');
        } else {
          message.error('Xatolik bor');
        }
      })
      .catch(err => {
        message.error('Xatolik bor: ' + err.message);
      });
  };

  return (
    <div className='container'>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: '500px', margin: '100px auto' }}
        layout="vertical"
      >
        <Form.Item
          label="Phone"
          name="phone_number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
