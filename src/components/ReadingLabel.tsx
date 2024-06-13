import ClipLoader from "react-spinners/ClipLoader";
import React, { ReactNode } from 'react';

interface ReadingLabelProps {
    value?: number;
    timestamp?: string;
    units: string;
    label: string
    icon: ReactNode;
    loading: boolean;
}

export const ReadingLabel: React.FC<ReadingLabelProps> = (
    { value, timestamp, icon, units, loading }: ReadingLabelProps
) => {
    let date;
    if (timestamp) {
        date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'}
        ).format(new Date(timestamp))
    }
    return (
        <div className='bg-slate-600 rounded-md p-2 flex justify-between items-center'>
            <div className='flex justify-center items-center text-5xl md:text-7xl'>{icon}</div>
            {!loading ?
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-end items-center text-5xl md:text-7xl'>{value ? `${Math.round(value * 10) / 10}${units}` : 'N/A'}</div>
                    <div className='text-gray-400 text-xs flex justify-end'>{date ? date : 'N/A'}</div>
                </div>
                :
                <ClipLoader color='#ffffff' loading={loading} size={50} />
            }
        </div>
    );
}