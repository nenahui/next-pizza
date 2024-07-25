import { Button, Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DishItem } from '../../components/DishItem/DishItem';
import { selectIsDishes } from './dishesSlice';
import { fetchDishes } from './dishesThunks';

export const Dishes = () => {
  const dishes = useAppSelector(selectIsDishes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const dishesElements = dishes.map((dish) => <DishItem dish={dish} key={dish.id} />);

  return (
    <Flex vertical gap={'large'}>
      <Flex justify={'space-between'} align={'center'}>
        <Typography.Title level={3} className={'fw-400 m-0'}>
          Dishes
        </Typography.Title>

        <Link to={'new-dish'}>
          <Button type={'primary'}>Add new dish</Button>
        </Link>
      </Flex>

      <Flex gap={'middle'} vertical>
        {dishes.length === 0 ? (
          <Typography.Text type={'secondary'}>No dishes found.</Typography.Text>
        ) : (
          dishesElements
        )}
      </Flex>

      <Outlet />
    </Flex>
  );
};
