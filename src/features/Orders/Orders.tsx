import { Button, Card, Divider, Flex, Spin, Typography } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Order } from '../../types';
import { selectIsFetching, selectOrders } from './ordersSlice';
import { completeOrder, fetchOrders } from './ordersThunks';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const orders: Order[][] = useAppSelector(selectOrders);
  const isFetching = useAppSelector(selectIsFetching);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onDelete = async (orderId: string) => {
    await dispatch(completeOrder(orderId));
    dispatch(fetchOrders());
  };

  return (
    <Flex gap={'large'} vertical>
      <Typography.Text style={{ fontSize: 16 }}>Orders</Typography.Text>

      {isFetching ? (
        <Spin className={'a-centered'} />
      ) : (
        <Flex vertical gap={'middle'}>
          {orders.map((order) => {
            return (
              <Card key={nanoid()}>
                {order.map((current) => (
                  <Flex key={current.dish.title + current.amount} vertical>
                    <Flex justify={'space-between'} align={'center'}>
                      <Typography.Text>
                        {current.dish.title}&nbsp;
                        <Typography.Text type={'secondary'}>x{current.amount}</Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        {current.dish.price * current.amount}&nbsp;
                        <Typography.Text type={'secondary'}>KGS</Typography.Text>
                      </Typography.Text>
                    </Flex>
                  </Flex>
                ))}

                <Divider />

                <Flex align={'flex-end'} justify={'space-between'}>
                  <Flex vertical>
                    <Typography.Text>Delivery: 150 KGS</Typography.Text>
                    <Typography.Text>
                      Order Total:&nbsp;
                      <Typography.Text>
                        {order.reduce((acc, order) => acc + order.dish.price * order.amount, 150)}
                        <Typography.Text type={'secondary'}> KGS</Typography.Text>
                      </Typography.Text>
                    </Typography.Text>
                  </Flex>

                  <Button
                    type={'link'}
                    className={'complete-btn'}
                    onClick={() => onDelete(orderId)}
                  >
                    Complete Order
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
