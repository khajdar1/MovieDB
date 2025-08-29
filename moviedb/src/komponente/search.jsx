import React, { useState } from 'react';

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return; 
        onSearch(trimmedQuery);
        setQuery('');
    }

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretraži film..."
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );

}