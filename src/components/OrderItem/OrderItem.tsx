import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { removeFromCart } from '../../features/Home/homeSlice';
import type { CartDish } from '../../types';

interface Props {
  dish: CartDish;
}

export const OrderItem: React.FC<Props> = ({ dish }) => {
  const dispatch = useAppDispatch();

  return (
    <Flex key={dish.dish.id} justify={'space-between'} align={'center'}>
      <Typography.Paragraph>
        {dish.dish.title} <Typography.Text type={'secondary'}>x{dish.amount}</Typography.Text>
      </Typography.Paragraph>

      <Typography.Text>
        {dish.dish.price * dish.amount}&nbsp;
        <Typography.Text type={'secondary'}>KGS</Typography.Text>
        <Button
          type={'link'}
          danger
          icon={<DeleteOutlined />}
          onClick={() => dispatch(removeFromCart(dish.dish.id))}
        />
      </Typography.Text>
    </Flex>
  );
};
