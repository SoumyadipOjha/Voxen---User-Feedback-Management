import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart3 } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} mb={8}>
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <MessageSquare size={24} color="#d53f8c" />
            <Text fontSize="xl" fontWeight="bold" ml={2} color="brand.500">
              Voxen
            </Text>
          </Flex>

          <Flex gap={4}>
            <Button
              as={Link}
              to="/"
              variant={location.pathname === '/' ? 'solid' : 'ghost'}
              leftIcon={<MessageSquare size={18} />}
              size="sm"
            >
              Submit Feedback
            </Button>
            <Button
              as={Link}
              to="/dashboard"
              variant={location.pathname === '/dashboard' ? 'solid' : 'ghost'}
              leftIcon={<BarChart3 size={18} />}
              size="sm"
            >
              Dashboard
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};