import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Device } from '../types';
import { useReadings } from '../hooks/useReadings';
import { ReadingLabel } from './ReadingLabel';
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";

interface DeviceItemProps {
    device: Device;
}

export const DeviceItem: React.FC<DeviceItemProps> = (
    { device }: DeviceItemProps
) => {
    const { name, serialNumber, id } = device;

    const authContext = useContext(AuthContext);
    const { temperature, humidity } = useReadings(id);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authToken } = authContext;

    if (!authToken) {
        throw new Error('User must be authenticated');
    }

    return (
        <div className='rounded-md bg-slate-700 text-white p-3'>
            <div className='font-bold text-3xl'>{name}</div>
            <div className='pt-2 pb-5 text-gray-400 text-xs'>{serialNumber}</div>
            <div className='flex flex-col gap-4'>
            <ReadingLabel 
                label='Temperature'
                value={temperature?.value}
                timestamp={temperature?.timestamp}
                units='°F'
                icon={<FaTemperatureHalf />}
            />
            <ReadingLabel
                label='Humidity'
                value={humidity?.value}
                timestamp={humidity?.timestamp}
                units='%'
                icon={<MdWaterDrop />}
            />
            </div>
        </div>
    );
}