import React from 'react';
import { Text, Group, Button, Stack, Image, Divider } from '@mantine/core';
import {
  IconMinus,
  IconPlus,
  IconMoodSad,
  IconTrash,
} from '@tabler/icons-react';
import { CartItem } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';

interface CartDropdownProps {
  cart: CartItem[];
  total: number;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ cart, total }) => {
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Stack spacing="md" style={{ maxWidth: '100%', minWidth: 300 }}>
      {cart.length === 0 ? (
        <Stack align="center" spacing="xs">
          <IconMoodSad size={60} color="gray" />
          <Text align="center">Your cart is empty!</Text>
        </Stack>
      ) : (
        <>
          {cart.map((item, index) => {
            const [name, weight] = item.product.name.split(' - ');

            return (
              <React.Fragment key={item.product.id}>
                <Group spacing="sm" noWrap>
                  <Image
                    style={{ flex: 1 }}
                    src={item.product.image}
                    width={60}
                    height={60}
                    fit="contain"
                    radius="sm"
                  />

                  <Stack spacing="xs" style={{ flex: 4 }}>
                    <Text size="sm" fw={600}>
                      {name}{' '}
                      <Text component="span" size="sm" color="dimmed">
                        {weight}
                      </Text>
                    </Text>

                    <Text size="sm" fw={600}>
                      ${item.product.price.toFixed(2)}
                    </Text>
                  </Stack>

                  <Group spacing={4} align="center">
                    <Button
                      variant="subtle"
                      size="xs"
                      p={2}
                      onClick={() =>
                        handleUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      color="gray"
                    >
                      <IconMinus size={14} />
                    </Button>

                    <Text
                      size="sm"
                      fw={500}
                      style={{ minWidth: '20px', textAlign: 'center' }}
                    >
                      {item.quantity}
                    </Text>

                    <Button
                      variant="subtle"
                      size="xs"
                      p={2}
                      onClick={() =>
                        handleUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      color="green"
                    >
                      <IconPlus size={14} />
                    </Button>

                    <Button
                      variant="subtle"
                      color="red"
                      size="xs"
                      p={2}
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      title="Remove from cart"
                    >
                      <IconTrash size={20} />
                    </Button>
                  </Group>
                </Group>

                {index < cart.length - 1 && <Divider my="sm" color="gray.3" />}
              </React.Fragment>
            );
          })}

          <Divider my="sm" color="gray.3" />

          <Group style={{ width: '100%', justifyContent: 'space-between' }}>
            <Text fw={700} size="lg">
              Total
            </Text>
            <Text fw={700} size="lg">
              ${total.toFixed(2)}
            </Text>
          </Group>
        </>
      )}
    </Stack>
  );
};
