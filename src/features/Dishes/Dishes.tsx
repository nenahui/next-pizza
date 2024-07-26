import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DishItem } from '../../components/DishItem/DishItem';
import { selectIsDishes, selectIsDishesFetching } from './dishesSlice';
import { fetchDishes } from './dishesThunks';

export const Dishes = () => {
  const dishes = useAppSelector(selectIsDishes);
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectIsDishesFetching);

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
    <Flex vertical gap={'large'}>
      <Flex justify={'space-between'} align={'center'}>
        <Typography.Text style={{ fontSize: 16 }}>Dishes</Typography.Text>

        <Link to={'new-dish'}>
          <Button type={'primary'} icon={<PlusCircleOutlined />}>
            Add new dish
          </Button>
        </Link>
      </Flex>

      <Flex gap={'middle'} vertical>
        {isFetching ? <Spin className={'a-centered'} /> : dishesElements}
      </Flex>

      <Outlet />
    </Flex>
  );
};
