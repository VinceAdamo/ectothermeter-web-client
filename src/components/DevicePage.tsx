import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import { LOGIN_PATH } from '../constants';
import { useDevices } from '../hooks/useDevices';
import { DeviceItem } from './DeviceItem';

export const DevicePage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const devices = useDevices();

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authToken } = authContext;

    if (!authToken) {
        return <Navigate replace to={LOGIN_PATH} />
    }

    if (!devices) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-slate-900 h-screen w-screen box-border'>
            <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 font-mono p-5'>
                {
                    devices.map((device) => (
                        <DeviceItem device={device} key={device.id}/>
                    ))
                }
            </div>
        </div>
    );
}