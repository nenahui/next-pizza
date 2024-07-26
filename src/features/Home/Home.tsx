import { Flex, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DishItem } from '../../components/DishItem/DishItem';
import { selectIsDishes, selectIsFetching } from './homeSlice';
import { fetchDishes } from './homeThunks';

export const Home = () => {
  const dishes = useAppSelector(selectIsDishes);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();

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
    <Flex gap={'middle'} vertical>
      {isFetching ? <Spin className={'a-centered'} /> : dishesElements}
    </Flex>
  );
};
