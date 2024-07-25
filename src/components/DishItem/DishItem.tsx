import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Typography } from 'antd';

export const DishItem = () => {
  return (
    <Card size={'small'}>
      <Flex justify={'space-between'} align={'center'}>
        <Image src={'/peperoni.svg'} width={80} height={80} />

        <Flex vertical>
          <Typography.Title level={5} className={'m-0'}>
            Peperoni
          </Typography.Title>

          <Typography.Text>
            450 <Typography.Text type={'secondary'}>KGS</Typography.Text>
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
