import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { searchServicesByTags, searchServicesByAllTags } from "./searchService.js";
import { searchArtByTags } from "./searchArt.js";
import "./Search.css";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artResults, setArtResults] = useState([]);

    const handleSearch = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const services = await searchServicesByAllTags(query);
            setResults(services);

            const artLinks = await searchArtByTags(query);
            setArtResults(artLinks);
        } catch (err) {
            console.error("Search failed:", err);
            setError("Failed to fetch services.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="container">
        <Header />
        <div className="main">
            <Sidebar />
            <div className="content">
                <form className="search-form" onSubmit={handleSearch}>
                    <input className="search-input" type="text" placeholder="Enter tags, comma separated"
                        value={query} onChange={e => setQuery(e.target.value)} disabled={loading} />
                    <button className="search-button" type="submit" disabled={loading} >
                        {loading ? "Searching…" : "Search"}
                    </button>
                </form>

                {error && <p className="search-error">{error}</p>}
                
                {/* Services Section */}
                <p>Services</p>
                <div className="cards-container">
                    {results.length > 0 ? (
                        results.map(service => (
                            <Link key={service.id} to={`/profile/${service.userId}`} className="card-link" >
                                <div className="card service-card" style={{backgroundImage: `url(${service.imageLink})`}}>
                                    <div className="card-overlay">
                                        <p className="service-title">{service.title}</p>
                                        <p className="service-price">${service.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))) : (
                        !loading && (<p className="no-results">No services found.</p>)
                    )}
                </div>

                {/* Art Section */}
                <p>Artwork</p>
                <div className="cards-container">
                    {artResults.length > 0 ? (
                        artResults.map((url, idx) => (
                            <div key={idx} className="search-card" style={{backgroundImage: `url(${url})`}}/>
                        ))) : (
                        !loading && (<p className="no-results">No artwork found.</p>)
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Search;