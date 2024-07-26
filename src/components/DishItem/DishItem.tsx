import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Popconfirm, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { fetchDishes } from '../../features/Dishes/dishesThunks';
import { deleteDish } from '../../features/DishForm/dishFormThunks';
import { addToCart } from '../../features/Home/homeSlice';
import type { Dish } from '../../types';

interface Props {
  dish: Dish;
  admin?: boolean;
}

export const DishItem: React.FC<Props> = ({ dish, admin = false }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteDish(dish.id));
    dispatch(fetchDishes());
  };

  const addToCartDish = () => {
    if (!admin) {
      dispatch(addToCart(dish));
    }
  };

  return (
    <Card size={'small'} style={{ cursor: admin ? 'default' : 'pointer' }} onClick={addToCartDish}>
      <Flex justify={'space-between'} align={'center'}>
        <Image src={dish.image} width={80} height={80} />

        {admin ? (
          <Flex vertical>
            <Typography.Text style={{ fontSize: 14 }}>{dish.title}</Typography.Text>

            <Typography.Text>
              {dish.price} <Typography.Text type={'secondary'}>KGS</Typography.Text>
            </Typography.Text>
          </Flex>
        ) : (
          <>
            <Typography.Text style={{ fontSize: 14 }}>{dish.title}</Typography.Text>
            <Typography.Text>
              {dish.price} <Typography.Text type={'secondary'}>KGS</Typography.Text>
            </Typography.Text>
          </>
        )}

        {admin && (
          <Flex gap={'middle'} vertical>
            <Link to={`edit-dish/${dish.id}`}>
              <Button size={'small'} type={'default'} icon={<EditOutlined />}>
                Edit
              </Button>
            </Link>
            <Popconfirm
              onConfirm={handleDelete}
              title='Delete the dish'
              description='Are you sure to delete this dish?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button size={'small'} danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
