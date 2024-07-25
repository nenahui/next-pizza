import { Button, Flex, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { DishItem } from '../../components/DishItem/DishItem';

export const Dishes = () => {
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
        <DishItem />
      </Flex>

      <Outlet />
    </Flex>
  );
};
