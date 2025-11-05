import React from 'react';
import { Button, Group, Text, Popover } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import {
  useDisclosure,
  useClickOutside,
  useEventListener,
} from '@mantine/hooks';
import { CartDropdown } from './CartDropdown';
import { useAppSelector } from '../hooks/redux';

interface HeaderProps {
  cartItemCount: number;
  cartTotalPrice: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotalPrice,
}) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const popoverRef = useClickOutside(close, ['mouseup', 'touchend']);

  const cart = useAppSelector((state) => state.cart.items);

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Group>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 0 0 12px',
            backgroundColor: '#f7f7f7',
            borderRadius: '31px',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter, Helvetica',
              fontWeight: 'semibold',
              color: '#000000',
              fontSize: '22px',
              opacity: 0.9,
            }}
          >
            Vegetable
          </Text>

          <Button
            style={{
              height: '33px',
              padding: '0 12px',
              backgroundColor: 'var(--app-primary)',
              borderRadius: '21px',
              color: 'white',
            }}
          >
            SHOP
          </Button>
        </div>
      </Group>

      <Popover
        width={400}
        position="bottom-end"
        withArrow
        shadow="md"
        opened={opened}
        onClose={close}
      >
        <Popover.Target>
          <Button
            onClick={toggle}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '10px 40px',
              backgroundColor: 'var(--app-primary)',
              borderRadius: '8px',
              color: 'white',
            }}
          >
            <Text>
              {cartItemCount > 0
                ? `Cart ${cartItemCount} - $ ${cartTotalPrice.toFixed(2)}`
                : 'Cart'}
            </Text>

            <IconChevronDown size={20} />
          </Button>
        </Popover.Target>

        <Popover.Dropdown ref={popoverRef}>
          <CartDropdown cart={cart} total={cartTotalPrice} />
        </Popover.Dropdown>
      </Popover>
    </header>
  );
};
