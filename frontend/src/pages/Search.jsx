import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';

const Search = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Helper to parse query parameters
    const useQuery = () => new URLSearchParams(location.search);

    const query = useQuery();
    const searchQuery = query.get('query') || '';
    const searchBy = query.get('criteria') || 'name';

    const fetchItems = async (query, criteria) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://legendary-eureka-x7xjwxwxxjrc6vr6-3000.app.github.dev/api/search?query=${query}&criteria=${criteria}`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetchItems(searchQuery, searchBy);
        }
    }, [searchQuery, searchBy]);

    // Update the URL
    const updateQuery = (query, criteria) => {
        const params = createSearchParams();
        if (query) params.set('query', query);
        if (criteria) params.set('criteria', criteria);
        navigate({ search: params.toString() });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        updateQuery(value, searchBy);
    };

    const handleCriteriaChange = (e) => {
        const value = e.target.value;
        updateQuery(searchQuery, value);
    };

    return (
        <>
            <form class="max-w-lg mx-auto">
                <div class="flex">
                    <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <select id="dropdown-button"
                        value={searchBy}
                        onChange={handleCriteriaChange}
                        data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="description">Description</option>
                    </select>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="hidden py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                            </li>
                        </ul>
                    </div>
                    <div class="relative w-full">
                        <input type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                <ul className="space-y-4 my-4">
                    {items.map((item) => (
                        <li key={item._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p>{item.description}</p>
                                <p><strong>Category:</strong> {item.category}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> ${item.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </form >
        </>
    )
}

export default Search