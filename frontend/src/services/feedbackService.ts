const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://voxen-user-feedback-management.onrender.com/api'
  : '/api';

interface FeedbackData {
  name: string;
  email: string;
  category: string;
  message: string;
  rating: number;
}

interface FeedbackFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

class FeedbackService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createFeedback(data: FeedbackData) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllFeedback(filters: FeedbackFilters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const endpoint = `/feedback${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getFeedbackById(id: string) {
    return this.request(`/feedback/${id}`);
  }

  async updateFeedbackStatus(id: string, status: string) {
    return this.request(`/feedback/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteFeedback(id: string) {
    return this.request(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalytics() {
    const response = await this.request('/feedback/analytics');
    return response.data;
  }
}

export const feedbackService = new FeedbackService();