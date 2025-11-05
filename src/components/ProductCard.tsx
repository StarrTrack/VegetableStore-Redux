import React, { useState } from 'react';
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  NumberInput,
  Stack,
} from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { addToCart } from '../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  const parts = product.name.split(' - ');
  const name = parts[0];
  const weight = parts.length > 1 ? parts.slice(1).join(' - ') : null;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'white',
        border: isHovered
          ? '2px solid var(--mantine-color-green-6)'
          : '2px solid transparent',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: isHovered
          ? '0 12px 30px rgba(0,0,0,0.25)'
          : '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        cursor: 'default',
        position: 'relative',
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.name}
          radius="md"
          fit="contain"
        />
      </Card.Section>

      <Stack spacing="md" mt="md">
        <Group justify="space-between" align="center">
          <Group align="center" spacing="xs">
            <Text fw={600} size="lg">
              {name}
            </Text>

            {weight && (
              <Text color="dimmed" size="sm">
                {weight}
              </Text>
            )}
          </Group>

          <Group spacing="xs">
            <Button
              variant="light"
              size="xs"
              radius="md"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <IconMinus size={12} />
            </Button>

            <NumberInput
              value={quantity}
              onChange={(val) => setQuantity(Number(val) || 1)}
              min={1}
              hideControls
              styles={{
                input: {
                  width: '40px',
                  textAlign: 'center',
                },
              }}
            />

            <Button
              variant="light"
              size="xs"
              radius="md"
              onClick={() => setQuantity(quantity + 1)}
              color="green"
            >
              <IconPlus size={12} />
            </Button>
          </Group>
        </Group>

        <Group justify="space-between" align="center">
          <Text fw={700} size="xl" style={{ flex: 1 }}>
            ${product.price.toFixed(2)}
          </Text>

          <Button
            variant="light"
            color="green"
            radius="md"
            onClick={handleAddToCart}
            leftSection={<IconShoppingCart size={20} />}
            style={{
              flex: 6,
              marginLeft: 'var(--mantine-spacing-md)',
            }}
          >
            Add to cart
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
