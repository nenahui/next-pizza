import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Popconfirm, Typography } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { fetchDishes } from '../../features/Dishes/dishesThunks';
import { deleteDish } from '../../features/DishForm/dishFormThunks';
import type { Dish } from '../../types';

interface Props {
  dish: Dish;
}

export const DishItem: React.FC<Props> = ({ dish }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteDish(dish.id));
    dispatch(fetchDishes());
  };

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
          <Popconfirm
            onConfirm={handleDelete}
            title='Delete the dish'
            description='Are you sure to delete this dish?'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Flex>
      </Flex>
    </Card>
  );
};
