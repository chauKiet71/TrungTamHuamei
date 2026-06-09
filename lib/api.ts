export const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      window.location.href = '/login';
    }
    throw new Error('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
  }
  
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || 'Có lỗi xảy ra khi kết nối tới máy chủ.');
  }
  
  return data;
};

export const api = {
  async get(url: string) {
    const res = await fetch(url, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    return handleResponse(res);
  },

  async post(url: string, data: any) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async patch(url: string, data: any) {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
};
