
import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import { DEVICE_PAGE_PATH } from '../constants';
import { LoginInput } from './LoginInput';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login, authToken } = authContext;

  if (authToken) {
    return <Navigate replace to={DEVICE_PAGE_PATH} /> 
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login(username, password);
    if (!result) {
      setError(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setError(false);
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError(false);
  }

  return (
    <div className="flex flex-row justify-center items-center h-screen font-mono bg-gradient-to-r from-cyan-500 to-pink-500">
        <div className='bg-white rounded-lg p-14 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 mx-2'>
            <div className='text-3xl flex justify-center mb-10 font-bold'>Login</div>
            <form onSubmit={handleSubmit}>
            <LoginInput value={username} handleChange={handleUsernameChange} label='Username' type='text' error={error}/>
            <LoginInput value={password} handleChange={handlePasswordChange} label='Password' type='password' error={error}/>
            {error && <div className='text-lg flex justify-center my-5 font-bold text-red-500'>Invalid username or password!</div>}
            <div className='flex flex-row justify-center'>
                <button 
                    type="submit" 
                    className='w-3/4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-3xl p-2 font-bold mt-20'
                >
                    Login
                </button>
            </div>
            </form>
        </div>
    </div>
  );
};