import React, { useEffect, useState } from 'react';
import './City.scss';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';

const City = () => {
  const navigate = useNavigate();

  function longOut() {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedRecord(null);
    setIsEdit(false);
  };

  const getApi = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
      .then(res => res.json())
      .then(item => {
        const transformedData = item.data.map((entry, index) => ({
          ...entry,
          index: index + 1,
        }));
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    getApi();
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
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteApi(record.id)}
          >
            <Button type='primary' danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Add or Edit
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const access_token = localStorage.getItem('access_token');

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('images', image);
    formData.append('text', values.text);

    const url = isEdit 
      ? `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${selectedRecord.id}` 
      : 'https://autoapi.dezinfeksiyatashkent.uz/api/cities';

    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        toast.success(data.message);
        setIsModalOpen(false);
        getApi();
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsEdit(true);
    form.setFieldsValue({
      name: record.name,
      text: record.text,
    });
    setIsModalOpen(true);
  };

  // Delete
  const deleteApi = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        toast.success('City deleted successfully');
        getApi();
      } else {
        toast.error('Error deleting city');
      }
    })
    .catch(error => {
      console.error('Error deleting city:', error);
      toast.error('Error deleting city');
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='container' style={{ width: '1000px', margin: '0 auto', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={showModal} type="primary">Add</Button>
        <Button onClick={longOut} type='primary'>Log out</Button>
      </div>
      <Table bordered caption={'City'} dataSource={data} columns={columns} rowKey="id" style={{ width: "1200px", margin: '5px auto' }} />
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'Please input the text!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Images"
            name="img"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Input type='file' accept='image/*' onChange={handleImageChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default City;
