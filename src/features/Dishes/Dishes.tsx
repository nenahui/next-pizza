import { Button, Flex, Typography } from 'antd';
import { DishItem } from '../../components/DishItem/DishItem';

export const Dishes = () => {
  return (
    <Flex vertical gap={'large'}>
      <Flex justify={'space-between'} align={'center'}>
        <Typography.Title level={3} className={'fw-400 m-0'}>
          Dishes
        </Typography.Title>

        <Button type={'primary'}>Add new dish</Button>
      </Flex>

      <Flex gap={'middle'} vertical>
        <DishItem />
      </Flex>
    </Flex>
  );
};
