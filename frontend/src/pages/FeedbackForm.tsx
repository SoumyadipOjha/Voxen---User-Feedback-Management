import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MessageSquare, Send, Star } from 'lucide-react';
import { feedbackService } from '../services/feedbackService';

interface FormData {
  name: string;
  email: string;
  category: string;
  message: string;
  rating: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
}

export const FeedbackForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: '',
    message: '',
    rating: 5,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await feedbackService.createFeedback(formData);
      
      toast({
        title: 'Feedback submitted successfully!',
        description: 'Thank you for your valuable feedback.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        category: '',
        message: '',
        rating: 5,
      });
      setErrors({});
    } catch (error: any) {
      toast({
        title: 'Failed to submit feedback',
        description: error.response?.data?.message || 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Container maxW="container.md">
      <Card>
        <CardHeader pb={4}>
          <Flex alignItems="center" mb={2}>
            <Icon as={MessageSquare} color="brand.500" boxSize={6} mr={3} />
            <Heading size="lg" color="brand.600">
              Share Your Feedback
            </Heading>
          </Flex>
          <Text color="gray.600">
            We value your opinion! Help us improve by sharing your thoughts and suggestions.
          </Text>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Flex gap={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex gap={4}>
                <FormControl isInvalid={!!errors.category}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Select feedback category"
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="general">General</option>
                  </Select>
                  <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                  >
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? 's' : ''} 
                        {' '}({rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : 'Very Poor'})
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>

              <FormControl isInvalid={!!errors.message}>
                <FormLabel>Your Feedback</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please share your detailed feedback, suggestions, or report any issues..."
                  rows={6}
                  resize="vertical"
                />
                <Flex justifyContent="space-between" mt={1}>
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                  <Text fontSize="sm" color="gray.500">
                    {formData.message.length}/1000 characters
                  </Text>
                </Flex>
              </FormControl>

              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting..."
                leftIcon={<Send size={18} />}
                size="lg"
                width="full"
              >
                Submit Feedback
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};