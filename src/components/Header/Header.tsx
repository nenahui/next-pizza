import { DatabaseOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Flex, Menu, type MenuProps, Typography } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/admin/dishes'}>Dishes</Link>,
    key: 'dishes',
    icon: <DatabaseOutlined />,
  },
  {
    label: <Link to={'/admin/orders'}>Orders</Link>,
    key: 'orders',
    icon: <OrderedListOutlined />,
  },
];

export const Header = () => {
  const { pathname: currentPage } = useLocation();
  const [current, setCurrent] = useState(
    currentPage.includes('admin') ? 'dishes' : currentPage.slice(7)
  );

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <header>
      <Flex align={'center'} justify={'space-between'} className={'mb-10'}>
        <Typography.Text style={{ fontSize: 22 }} className={'logo'}>
          Next {currentPage.includes('admin') ? 'Admin' : 'Pizza'}
        </Typography.Text>

        {currentPage.includes('admin') && (
          <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
        )}
      </Flex>
    </header>
  );
};
