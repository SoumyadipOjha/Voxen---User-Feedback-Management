import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Flex,
  Icon,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BarChart3, Users, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { feedbackService } from '../services/feedbackService';
import { AnalyticsChart } from '../components/Dashboard/AnalyticsChart';
import { FeedbackTable } from '../components/Dashboard/FeedbackTable';
import { StatCard } from '../components/Dashboard/StatCard';
import { CategoryChart } from '../components/Dashboard/CategoryChart';
import { RatingChart } from '../components/Dashboard/RatingChart';

interface Analytics {
  categoryStats: Array<{ _id: string; count: number }>;
  statusStats: Array<{ _id: string; count: number }>;
  ratingStats: Array<{ _id: number; count: number }>;
  monthlyStats: Array<{ _id: { year: number; month: number }; count: number }>;
  totalFeedback: number;
  averageRating: number;
}

export const Dashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await feedbackService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <Center h="400px">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!analytics) {
    return (
      <Container maxW="container.xl">
        <Text>Failed to load analytics data.</Text>
      </Container>
    );
  }

  const pendingCount = analytics.statusStats.find(s => s._id === 'pending')?.count || 0;
  const resolvedCount = analytics.statusStats.find(s => s._id === 'resolved')?.count || 0;

  return (
    <Container maxW="container.xl">
      <Box mb={8}>
        <Flex alignItems="center" mb={2}>
          <Icon as={BarChart3} color="brand.500" boxSize={8} mr={3} />
          <Heading size="xl" color="brand.600">
            Feedback Dashboard
          </Heading>
        </Flex>
        <Text color="gray.600" fontSize="lg">
          Monitor and analyze user feedback to improve your product
        </Text>
      </Box>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Total Feedback"
          value={analytics.totalFeedback}
          icon={MessageSquare}
          color="blue"
        />
        <StatCard
          title="Average Rating"
          value={analytics.averageRating.toFixed(1)}
          icon={Star}
          color="yellow"
          suffix=" / 5"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingCount}
          icon={Users}
          color="orange"
        />
        <StatCard
          title="Resolved Issues"
          value={resolvedCount}
          icon={TrendingUp}
          color="green"
        />
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="brand.600">
              Feedback Trends
            </Heading>
            <AnalyticsChart data={analytics.monthlyStats} />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="brand.600">
              Category Distribution
            </Heading>
            <CategoryChart data={analytics.categoryStats} />
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="brand.600">
              Rating Distribution
            </Heading>
            <RatingChart data={analytics.ratingStats} />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="brand.600">
              Status Overview
            </Heading>
            <Box p={4}>
              {analytics.statusStats.map((stat, index) => (
                <Flex key={stat._id} justify="space-between" align="center" py={2}>
                  <Text textTransform="capitalize" color="gray.600">
                    {stat._id.replace('-', ' ')}
                  </Text>
                  <Text fontWeight="bold" color="brand.500">
                    {stat.count}
                  </Text>
                </Flex>
              ))}
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Feedback Table */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4} color="brand.600">
            Recent Feedback
          </Heading>
          <FeedbackTable />
        </CardBody>
      </Card>
    </Container>
  );
};