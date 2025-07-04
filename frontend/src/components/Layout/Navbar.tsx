import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  useColorModeValue,
  IconButton,
  HStack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart3, Github, Linkedin, Menu } from 'lucide-react';
import { useRef } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

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

          {/* Desktop Nav */}
          <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
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
            <HStack spacing={2}>
              <IconButton
                as="a"
                href="https://github.com/SoumyadipOjha/Voxen---User-Feedback-Management"
                aria-label="GitHub"
                icon={<Github size={18} />}
                size="sm"
                variant="ghost"
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/soumyadip-ojha/"
                aria-label="LinkedIn"
                icon={<Linkedin size={18} />}
                size="sm"
                variant="ghost"
              />
            </HStack>
          </Flex>

          {/* Mobile Nav */}
          <IconButton
            ref={btnRef}
            icon={<Menu size={20} />}
            aria-label="Open menu"
            display={{ base: 'flex', md: 'none' }}
            variant="ghost"
            onClick={onOpen}
          />
        </Flex>
      </Container>

      {/* Drawer for mobile */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4} mt={4}>
              <Button
                as={Link}
                to="/"
                variant={location.pathname === '/' ? 'solid' : 'ghost'}
                leftIcon={<MessageSquare size={18} />}
                size="md"
                width="100%"
                onClick={onClose}
              >
                Submit Feedback
              </Button>
              <Button
                as={Link}
                to="/dashboard"
                variant={location.pathname === '/dashboard' ? 'solid' : 'ghost'}
                leftIcon={<BarChart3 size={18} />}
                size="md"
                width="100%"
                onClick={onClose}
              >
                Dashboard
              </Button>
              <HStack spacing={2} pt={2}>
                <IconButton
                  as="a"
                  href="https://github.com/SoumyadipOjha/Voxen---User-Feedback-Management"
                  aria-label="GitHub"
                  icon={<Github size={18} />}
                  size="md"
                  variant="ghost"
                />
                <IconButton
                  as="a"
                  href="https://www.linkedin.com/in/soumyadip-ojha/"
                  aria-label="LinkedIn"
                  icon={<Linkedin size={18} />}
                  size="md"
                  variant="ghost"
                />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};