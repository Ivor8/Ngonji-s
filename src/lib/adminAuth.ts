// Temporary admin authentication until database is set up
export const ADMIN_CREDENTIALS = {
  email: 'admin@ngonji.com',
  password: '12345678'
};

export const validateAdmin = (email: string, password: string) => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};
