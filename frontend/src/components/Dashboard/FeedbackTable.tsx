import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Flex,
  Select,
  Input,
  Button,
  HStack,
  useToast,
  IconButton,
  Tooltip,
  Box,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star } from 'lucide-react';

import { feedbackService } from '../../services/feedbackService';

interface Feedback {
  _id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  rating: number;
  status: string;
  createdAt: string;
}

interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}



export const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const toast = useToast();

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await feedbackService.getAllFeedback(filters);
      setFeedbacks(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast({
        title: 'Failed to fetch feedback',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await feedbackService.updateFeedbackStatus(id, newStatus);
      toast({
        title: 'Status updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchFeedbacks(); // Refresh the data
    } catch (error) {
      toast({
        title: 'Failed to update status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'reviewed':
        return 'blue';
      case 'resolved':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getCategoryDisplay = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      'suggestion': 'Suggestion',
      'bug-report': 'Bug Report',
      'feature-request': 'Feature Request',
      'general': 'General'
    };
    return categoryNames[category] || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true });
 
  const tableWidthMobile = isMobile ? '100%' : isTablet ? '90%'
  : '80%';
  const tableWidthTablet = isTablet ? '90%' : '80%';
  const tableWidthDesktop = !isMobile && !isTablet ? '80%' : '100%';
  const tableWidthTabletDesktop = isTablet ? '80%' : '100%';
  const tableWidthMobileDesktop = isMobile ? '100%' : '80%';
  const tableWidth = isMobile ? tableWidthMobile : isTablet ? tableWidthTablet : tableWidthDesktop;
  const tableWidthResponsive = isMobile ? tableWidthMobileDesktop : tableWidthTabletDesktop;
  const tableWidthFinal = isMobile ? tableWidth : isTablet ? tableWidthResponsive : tableWidthDesktop;
  const tableWidthFinalResponsive = isMobile ? tableWidthMobile : isTablet ? tableWidthTablet : tableWidthDesktop;
  const tableWidthFinalResponsiveDesktop = isMobile ? tableWidthMobile : isTablet ? tableWidthTablet : tableWidthDesktop;
  

  return (
    <>
      {/* Filters */}
      <Flex mb={4} gap={4} wrap="wrap" align="center">
        <Flex align="center" gap={2}>
          <Search size={16} />
          <Input
            placeholder="Search feedback..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            maxW="200px"
          />
        </Flex>

        <Select
          placeholder="All categories"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          maxW="150px"
        >
          <option value="suggestion">Suggestion</option>
          <option value="bug-report">Bug Report</option>
          <option value="feature-request">Feature Request</option>
          <option value="general">General</option>
        </Select>

        <Select
          placeholder="All statuses"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          maxW="150px"
        >
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="resolved">Resolved</option>
        </Select>

        <Select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            setFilters(prev => ({ ...prev, sortBy, sortOrder }));
          }}
          maxW="150px"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="rating-desc">Highest Rating</option>
          <option value="rating-asc">Lowest Rating</option>
        </Select>
      </Flex>

       <Box overflowX="auto">
      <Table variant="simple" bg="white" borderRadius="lg">
        <Thead bg="gray.50">
          <Tr>
            <Th>User</Th>
            <Th>Category</Th>
            <Th>Message</Th>
            <Th>Rating</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={7} textAlign="center" py={8}>
                Loading...
              </Td>
            </Tr>
          ) : feedbacks.length === 0 ? (
            <Tr>
              <Td colSpan={7} textAlign="center" py={8}>
                No feedback found
              </Td>
            </Tr>
          ) : (
            feedbacks.map((feedback) => (
              <Tr key={feedback._id}>
                <Td>
                  <Text fontWeight="medium">{feedback.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {feedback.email}
                  </Text>
                </Td>
                <Td>
                  <Badge colorScheme="brand" variant="subtle">
                    {getCategoryDisplay(feedback.category)}
                  </Badge>
                </Td>
                <Td maxW="300px">
                  <Text noOfLines={2}>{feedback.message}</Text>
                </Td>
                <Td>
                  <Flex align="center" gap={1}>
                    <Star size={16} fill="currentColor" color="orange" />
                    <Text>{feedback.rating}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Select
                    value={feedback.status}
                    onChange={(e) => handleStatusUpdate(feedback._id, e.target.value)}
                    size="sm"
                    variant="filled"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="resolved">Resolved</option>
                  </Select>
                </Td>
                <Td>
                  <Text fontSize="sm">{formatDate(feedback.createdAt)}</Text>
                </Td>
                <Td>
                  <Badge colorScheme={getStatusColor(feedback.status)}>
                    {feedback.status}
                  </Badge>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
      {/* Pagination */}
      <Flex mt={4} justify="space-between" align="center">
        <Text fontSize="sm" color="gray.600">
          Showing {((pagination.current - 1) * filters.limit) + 1} to{' '}
          {Math.min(pagination.current * filters.limit, pagination.total)} of{' '}
          {pagination.total} results
        </Text>

        <HStack>
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeft size={16} />}
            size="sm"
            isDisabled={!pagination.hasPrev}
            onClick={() => handlePageChange(pagination.current - 1)}
          />
          
          <Text fontSize="sm" px={2}>
            Page {pagination.current} of {pagination.pages}
          </Text>
          
          <IconButton
            aria-label="Next page"
            icon={<ChevronRight size={16} />}
            size="sm"
            isDisabled={!pagination.hasNext}
            onClick={() => handlePageChange(pagination.current + 1)}
          />
        </HStack>
      </Flex>
    </>
  );
};