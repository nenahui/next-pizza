import { Button, Card, Divider, Flex, Modal, Spin, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DishItem } from '../../components/DishItem/DishItem';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import { selectCart, selectIsDishes, selectIsFetching, selectTotalPrice } from './homeSlice';
import { fetchDishes } from './homeThunks';

export const Home = () => {
  const dishes = useAppSelector(selectIsDishes);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const [modalVisible, setModalVisible] = useState(false);
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const dishesElements =
    dishes.length === 0 ? (
      <Typography.Text type={'secondary'}>No dishes found.</Typography.Text>
    ) : (
      dishes.map((dish) => <DishItem dish={dish} key={dish.id} />)
    );

  return (
    <>
      <Flex gap={'middle'} vertical>
        <Card size={'small'} className={'order-block'}>
          <Divider>
            <Statistic title={'Order total'} value={`${totalPrice} KGS`} />
            <Button
              type={'primary'}
              onClick={() => setModalVisible(true)}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </Divider>
        </Card>
        <Flex gap={'middle'} vertical>
          {isFetching ? <Spin className={'a-centered'} /> : dishesElements}
        </Flex>
      </Flex>

      <Modal
        okText={'Order'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        style={{ maxWidth: 350 }}
        title={'Your order'}
        onOk={() => console.log(cart)}
      >
        {cart.map((dish) => (
          <OrderItem dish={dish} key={dish.dish.id} />
        ))}
      </Modal>
    </>
  );
};
