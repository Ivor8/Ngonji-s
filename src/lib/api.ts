const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`\n🌐 HTTP REQUEST DEBUG: ${options.method || 'GET'} ${url}`);
    console.log('Request headers:', options.headers);
    console.log('Request body type:', options.body?.constructor?.name);
    console.log('Request body size:', options.body ? (options.body as any).size || 'unknown' : 'none');
    
    // Don't set Content-Type for FormData - let browser set it automatically
    const defaultHeaders = options.body instanceof FormData 
      ? {} 
      : { 'Content-Type': 'application/json' };

    try {
      console.log('🚀 Sending fetch request...');
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        console.log('❌ Response not OK, parsing error...');
        const errorData = await response.json().catch((e) => {
          console.log('Failed to parse error JSON:', e);
          return {};
        });
        console.log('Error data:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ Response parsed successfully:', responseData);
      return responseData;
    } catch (error) {
      console.error('❌ API request failed:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
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
    console.log('\n=== FRONTEND UPLOAD DEBUG START ===');
    console.log('Creating portfolio item...');
    console.log('Data:', data);
    console.log('Image file:', imageFile);
    
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        console.log(`📝 Adding field ${key}:`, data[key]);
        formData.append(key, data[key]);
      }
    });
    
    if (imageFile) {
      console.log('📸 Adding image file:', {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type
      });
      formData.append('image', imageFile);
    } else {
      console.log('⚠️ No image file provided');
    }

    // Debug FormData contents
    console.log('🔍 FormData entries:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    console.log('🚀 Sending request to /upload/portfolio');
    console.log('=== FRONTEND UPLOAD DEBUG END ===\n');

    return this.request('/upload/portfolio', {
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
