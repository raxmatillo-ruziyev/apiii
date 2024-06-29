import React, { useEffect, useState } from 'react';
import './City.scss';
import { Table, Button, Modal, Form, Input, Checkbox, Upload } from 'antd';
import {  Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';

const City = () => {
  function longOut(){
    localStorage.removeItem('access_token');
    navigate('/login')
  }
    const navigate = useNavigate()
    useEffect(()=>{
        if (!localStorage.getItem('access_token')) {
            navigate('/login')
        }
    },[])
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

const getApi =()=>{
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
      .then(res => res.json())
      .then(item => {console.log(item.data);
        const transformedData = item.data.map((entry, index) => ({
          ...entry,
          index: index + 1,
        }));
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));}
useEffect(() => {
  getApi();
},[])

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
      title: 'Text',
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





  //post
  const [name , setName] = useState()
  const [image , setImage] = useState()
  const [text , setText] = useState()
  const access_token = localStorage.getItem('access_token')
  const formData  = new FormData();
  formData.append('name',name)
  formData.append('images',image)
  formData.append('text',text)
  


  const addData =(e)=>{
    e.preventDefault();
  
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities',{
      method:'POST',
      body: formData,
      headers:{
        'Authorization':`Bearer ${access_token}`
      },
    
    })
    .then(res=>res.json())
    // addData()
    .then(data=>{
     if(data.success===true){
      toast.success(data.message)
      setIsModalOpen(false)
      getApi()
     }
     else{ toast.error(data.message)}
    })

  }


  return (
    <div  className='container'  style={{ width: '1000px', margin: '0 auto', padding: '10px' }}>
     
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Button onClick={showModal} type="primary">Add</Button>
      <Button onClick={longOut} type='primary'>Log out</Button>
    </div>
      <Table bordered caption={'City'} dataSource={data} columns={columns} rowKey="id" style={{ width: "1200px", margin: '5px auto' }} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input  onChange={(e)=>setName(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input  onChange={(e)=>setText(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Images"
            name="img"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type='file' accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
          </Form.Item>
         

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button onClick={addData} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default City;

