import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/auth.service';
import './Login.scss'; // We'll reuse the login styles

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    fullname: '',
    email: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.register(
        formData.userName,
        formData.email,
        formData.password,
        formData.fullname,
        formData.phoneNumber
      );
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Register</h1>
        <p className="login-subtitle">Create your account:</p>
        <div className="login-form">
          <div className="login-input-group">
            <input 
              type="text" 
              placeholder="Username" 
              className="login-input" 
              name="userName" 
              value={formData.userName} 
              onChange={handleChange} 
            />
          </div>
          <div className="login-input-group">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="login-input" 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange} 
            />
          </div>
          <div className="login-input-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="login-input" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className="login-input-group">
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="login-input" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
          </div>
          <div className="login-input-group">
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <button className="login-button" type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'REGISTER'}
          </button>
          <div className="login-signup-text">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 