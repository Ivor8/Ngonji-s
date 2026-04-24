const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Services
  async getServices(params?: { entity?: string; is_active?: boolean }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/services${query ? `?${query}` : ''}`);
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  async createService(data: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Portfolio
  async getPortfolioItems(params?: { entity?: string; is_featured?: boolean }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/portfolio${query ? `?${query}` : ''}`);
  }

  async getPortfolioItem(id: string) {
    return this.request(`/portfolio/${id}`);
  }

  async createPortfolioItem(data: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/portfolio', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async updatePortfolioItem(id: string, data: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request(`/portfolio/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async deletePortfolioItem(id: string) {
    return this.request(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials(params?: { entity?: string; is_active?: boolean }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/testimonials${query ? `?${query}` : ''}`);
  }

  async getTestimonial(id: string) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(data: any) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: any) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Contacts
  async getContacts(params?: { entity?: string; is_read?: boolean }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/contacts${query ? `?${query}` : ''}`);
  }

  async getContact(id: string) {
    return this.request(`/contacts/${id}`);
  }

  async createContact(data: any) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContact(id: string, data: any) {
    return this.request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteContact(id: string) {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleContactReadStatus(id: string) {
    return this.request(`/contacts/${id}/toggle-read`, {
      method: 'PATCH',
    });
  }

  // Bookings
  async getBookings(params?: { entity?: string; status?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/bookings${query ? `?${query}` : ''}`);
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async createBooking(data: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBooking(id: string, data: any) {
    return this.request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBooking(id: string) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  async updateBookingStatus(id: string, status: string) {
    return this.request(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

export const api = new ApiService();
