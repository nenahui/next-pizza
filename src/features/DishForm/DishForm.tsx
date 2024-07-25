import { Button, Flex, Form, Input, InputNumber, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { ApiDish } from '../../types';
import { fetchDishes } from '../Dishes/dishesThunks';
import {
  selectInitialValues,
  selectIsCreating,
  selectIsDishFetching,
  selectIsEditing,
} from './dishFormSlice';
import { createDish, editDish, getDishValues } from './dishFormThunks';

interface Props {
  formType: 'edit' | 'create';
}

export const DishForm: React.FC<Props> = ({ formType }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(true);
  const [form] = Form.useForm<ApiDish>();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);
  const isEditing = useAppSelector(selectIsEditing);
  const isFetching = useAppSelector(selectIsDishFetching);
  const initialValues = useAppSelector(selectInitialValues);
  const { dishId } = useParams();

  useEffect(() => {
    if (formType === 'edit' && dishId) {
      dispatch(getDishValues(dishId));
    }
  }, [formType, dishId, dispatch]);

  useEffect(() => {
    if (formType === 'edit' && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, formType, form]);

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    navigate('/admin/dishes');
  };

  const onFinish = async (values: ApiDish) => {
    if (formType === 'create') {
      await dispatch(createDish(values));
    } else if (formType === 'edit' && dishId) {
      await dispatch(editDish({ ...values, id: dishId }));
    }

    await dispatch(fetchDishes());
    handleCancel();
  };

  return (
    <Modal
      open={modalVisible}
      footer={[]}
      onCancel={handleCancel}
      title={formType === 'create' ? 'Create a new dish' : 'Edit dish'}
      style={{ maxWidth: 350 }}
    >
      <Form layout={'vertical'} form={form} onFinish={onFinish}>
        <Flex gap={'10px'} vertical>
          <Form.Item<ApiDish>
            label={'Name of the dish'}
            name={'title'}
            className={'m-0'}
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ApiDish>
            label={'Cost of the dish'}
            name={'price'}
            className={'m-0'}
            rules={[{ type: 'number', required: true, message: 'Please enter a price' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<ApiDish>
            label={'Enter a link to the image of the dish'}
            name={'image'}
            className={'m-0'}
            rules={[{ type: 'url', required: true, message: 'Please enter a url to the image' }]}
          >
            <Input />
          </Form.Item>

          <Button
            type='primary'
            htmlType={'submit'}
            loading={isCreating || isEditing || isFetching}
          >
            {formType === 'create' ? 'Create a dish' : 'Edit dish'}
          </Button>

          <Button onClick={handleCancel} danger>
            Cancel
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
