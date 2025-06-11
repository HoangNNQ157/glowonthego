import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/auth.service';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
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
      await AuthService.login(formData.userName, formData.password);
      toast.success('Đăng nhập thành công!');

      const currentUser = AuthService.getCurrentUser();
      console.log(currentUser);
      if (currentUser && currentUser.roleId) {
        if (Number(currentUser.roleId) == 1) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        console.warn("User logged in, but roleId not found. Redirecting to home.");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* The login form will go here */}
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Enter your email and password to login:</p>
        <div className="login-form">
          <div className="login-input-group">
            <input type="text" placeholder="Username" className="login-input" name="userName" value={formData.userName} onChange={handleChange} />
          </div>
          <div className="login-input-group login-password-group">
            <input type="password" placeholder="Password" className="login-input" name="password" value={formData.password} onChange={handleChange} />
            <a href="#" className="login-forgot-password">Forgot your password?</a>
          </div>
          <button className="login-button" type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'LOGIN'}
          </button>
          <div className="login-signup-text">
            Don't have an account? <a href="/account">Sign up</a>
          </div>
          <div className="login-social-buttons">
            <button className="login-social-button login-facebook">
              <div className="login-social-icon">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 4.5C0.5 2.29086 2.29086 0.5 4.5 0.5H40.5V40.5H4.5C2.29086 40.5 0.5 38.7091 0.5 36.5V4.5Z" fill="white" fillOpacity="0.1"/>
                  <g clipPath="url(#clip0_85_29)">
                    <path d="M26.487 8.66064V12.1964H24.3843C23.6164 12.1964 23.0986 12.3571 22.8307 12.6785C22.5628 12.9999 22.4289 13.4821 22.4289 14.1249V16.6562H26.353L25.8307 20.6205H22.4289V30.7856H18.3307V20.6205H14.9155V16.6562H18.3307V13.7365C18.3307 12.0758 18.795 10.7879 19.7236 9.8727C20.6521 8.95752 21.8887 8.49993 23.4334 8.49993C24.7459 8.49993 25.7637 8.5535 26.487 8.66064Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_85_29">
                      <rect width="13.72" height="24" fill="white" transform="matrix(1 0 0 -1 13.6401 32.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Sign in with Facebook
            </button>
            <button className="login-social-button login-google">
              <div className="login-social-icon">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 4.5C0.5 2.29086 2.29086 0.5 4.5 0.5H40.5V40.5H4.5C2.29086 40.5 0.5 38.7091 0.5 36.5V4.5Z" fill="white" fillOpacity="0.1"/>
                  <g clipPath="url(#clip0_85_34)">
                    <path d="M20.4903 19.0267H30.2001C30.3073 19.6249 30.3608 20.1964 30.3608 20.741C30.3608 22.6785 29.9546 24.4084 29.1421 25.9307C28.3296 27.4531 27.1711 28.6428 25.6666 29.4999C24.1622 30.3571 22.4367 30.7856 20.4903 30.7856C19.0885 30.7856 17.7537 30.5156 16.4858 29.9754C15.218 29.4352 14.1242 28.7053 13.2046 27.7856C12.2849 26.866 11.555 25.7723 11.0149 24.5044C10.4747 23.2365 10.2046 21.9017 10.2046 20.4999C10.2046 19.0981 10.4747 17.7633 11.0149 16.4955C11.555 15.2276 12.2849 14.1339 13.2046 13.2142C14.1242 12.2946 15.218 11.5647 16.4858 11.0245C17.7537 10.4843 19.0885 10.2142 20.4903 10.2142C23.1689 10.2142 25.468 11.1115 27.3876 12.9062L24.5885 15.5981C23.4903 14.5356 22.1242 14.0044 20.4903 14.0044C19.3385 14.0044 18.2738 14.2946 17.2961 14.8749C16.3184 15.4553 15.5439 16.2432 14.9724 17.2388C14.401 18.2343 14.1153 19.3214 14.1153 20.4999C14.1153 21.6785 14.401 22.7656 14.9724 23.7611C15.5439 24.7566 16.3184 25.5446 17.2961 26.1249C18.2738 26.7053 19.3385 26.9955 20.4903 26.9955C21.2671 26.9955 21.9814 26.8883 22.6332 26.674C23.2849 26.4598 23.8207 26.1919 24.2403 25.8705C24.6599 25.549 25.026 25.183 25.3385 24.7723C25.651 24.3615 25.8809 23.9731 26.0283 23.6071C26.1756 23.241 26.276 22.8928 26.3296 22.5624H20.4903V19.0267Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_85_34">
                      <rect width="20.58" height="24" fill="white" transform="matrix(1 0 0 -1 10.2002 32.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 