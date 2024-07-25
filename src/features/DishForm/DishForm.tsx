import { Button, Flex, Form, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import type { Dish } from '../../types';
import { createDish } from './dishFormThunks';

export const DishForm = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(true);
  const [form] = Form.useForm<Dish>();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setModalVisible(false);
    navigate('/admin/dishes');
  };

  const onFinish = async (values: Dish) => {
    console.log(values);
    await dispatch(createDish(values));
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      open={modalVisible}
      footer={[]}
      onCancel={handleCancel}
      title={'Create a new dish'}
      style={{ maxWidth: 350 }}
    >
      <Form layout={'vertical'} form={form} onFinish={onFinish}>
        <Flex gap={'10px'} vertical>
          <Form.Item<Dish>
            label={'Name of the dish'}
            name={'title'}
            className={'m-0'}
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Dish>
            label={'Cost of the dish'}
            name={'price'}
            className={'m-0'}
            rules={[{ type: 'number', required: true, message: 'Please enter a price' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<Dish>
            label={'Enter a link to the image of the dish'}
            name={'image'}
            className={'m-0'}
            rules={[{ type: 'url', required: true, message: 'Please enter a url to the image' }]}
          >
            <Input />
          </Form.Item>

          <Button type='primary' htmlType={'submit'}>
            Create a dish
          </Button>

          <Button onClick={handleCancel} danger>
            Cancel
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
