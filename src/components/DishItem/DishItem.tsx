import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Typography } from 'antd';
import type { Dish } from '../../types';

interface Props {
  dish: Dish;
}

export const DishItem: React.FC<Props> = ({ dish }) => {
  return (
    <Card size={'small'}>
      <Flex justify={'space-between'} align={'center'}>
        <Image src={dish.image} width={80} height={80} />

        <Flex vertical>
          <Typography.Title level={5} className={'m-0'}>
            {dish.title}
          </Typography.Title>

          <Typography.Text>
            {dish.price} <Typography.Text type={'secondary'}>KGS</Typography.Text>
          </Typography.Text>
        </Flex>

        <Flex gap={'middle'} vertical>
          <Button type={'default'} icon={<EditOutlined />}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
