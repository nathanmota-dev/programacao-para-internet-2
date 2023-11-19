import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import '../style.css';

const HistoryCard = ({ id, nome, data, onDelete }) => {
    const handleClick = () => {
        onDelete(id);
    };

    return (
        <div className='historyCard'>
            <h2>{nome}</h2>
            <p>{data}</p>
            <button onClick={() => handleClick(id)}>
                <RiDeleteBinLine />
            </button>
        </div>
    );
};


export default HistoryCard;
