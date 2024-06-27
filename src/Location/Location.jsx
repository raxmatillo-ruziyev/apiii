import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox } from 'antd';
import {  Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Location = () => {
    function longOut(){
        localStorage.removeItem('access_token');
        navigate('/login')
      }
  
    const navigate = useNavigate()
    useEffect(()=>{
        if (!localStorage.getItem('access_token')) {
            navigate('/login')
        }
    })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/locations')
      .then(res => res.json())
      .then(item => {console.log(item.data);
        const transformedData = item.data.map((entry, index) => ({
          ...entry,
          index: index + 1,
        }));
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image_src',
      key: 'image_src',
      render: (image_src) => (
        <img
          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`}
          alt="City"
          style={{ width: '100px' }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)} >Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)} style={{marginLeft:'20px'}}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log('Edit:', record);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
    // Add delete functionality here
  };

  return (
    <div className='container' style={{ width: '1000px', margin: '0 auto', padding: '10px' }}>
      
      <div style={{display:'flex',justifyContent:'space-between'}}>
    <Button onClick={showModal} type="primary">Add</Button>
      <Button onClick={longOut} type='primary'>Log out</Button>
    </div>
      <Table bordered caption={'Location'} dataSource={data} columns={columns} rowKey="id" style={{ width: "1200px", margin: '5px auto' }} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Location;
