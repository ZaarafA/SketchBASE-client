import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Portfolio = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching data from a server
        const fetchArtworks = async () => {
            try {
                setTimeout(() => {
                    setArtworks([
                        { id: '1', title: 'Artwork 1', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '2', title: 'Artwork 2', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '3', title: 'Artwork 3', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '4', title: 'Artwork 4', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '5', title: 'Artwork 5', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '6', title: 'Artwork 6', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '7', title: 'Artwork 7', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                        { id: '8', title: 'Artwork 8', imageUrl: 'https://placehold.co/400x300/EEE/31343C'},
                    ]);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    return (
        <div className="home-container" style={{ position: 'relative' }}>
            <Header />
            <div className="home-main" style={{ display: 'flex' }}>
                <Sidebar />
                <div className="home-content" style={{ flexGrow: 1 }}>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Artist Portfolio</h1>
                    <div className="image-cards" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
                        {artworks.map((artwork) => (
                            <div key={artwork.id} className="image-card">
                                <img
                                    src={artwork.imageUrl}
                                    alt={artwork.title}

                                />
                                <p>{artwork.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="fixed bottom-0 right-0 m-4 text-center">
                        <Link to="/" className="back-button button-redirect ">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
