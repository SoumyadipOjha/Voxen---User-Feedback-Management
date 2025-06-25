import {
  Card,
  CardBody,
  Flex,
  Text,
  Icon,
  Box,
} from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  suffix?: string;
}

export const StatCard = ({ title, value, icon, color, suffix = '' }: StatCardProps) => {
  const colorScheme = {
    blue: { bg: 'blue.50', color: 'blue.500' },
    yellow: { bg: 'yellow.50', color: 'yellow.500' },
    orange: { bg: 'orange.50', color: 'orange.500' },
    green: { bg: 'green.50', color: 'green.500' },
    brand: { bg: 'brand.50', color: 'brand.500' },
  };

  const colors = colorScheme[color as keyof typeof colorScheme] || colorScheme.brand;

  return (
    <Card bg={colors.bg} border="1px" borderColor={colors.color} borderRadius="xl">
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={colors.color}>
              {value}{suffix}
            </Text>
          </Box>
          <Icon as={icon} boxSize={8} color={colors.color} />
        </Flex>
      </CardBody>
    </Card>
  );
};