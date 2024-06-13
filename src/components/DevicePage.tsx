import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import { LOGIN_PATH } from '../constants';
import { DeviceGrid } from './DeviceGrid';

export const DevicePage: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authToken } = authContext;

    if (!authToken) {
        return <Navigate replace to={LOGIN_PATH} />
    }

    return (
        <div className='bg-slate-900 h-screen w-screen box-border'>
            <DeviceGrid />
        </div>
    );
}