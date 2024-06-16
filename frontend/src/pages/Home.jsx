import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import Category from '../components/Category'
import InventoryForm from '../components/InventoryForm'

const Home = () => {
    const [category, setCategory] = useState([1, 2, 3])
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1' },
        { id: 1, name: 'Item 11' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ])
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('https://legendary-eureka-x7xjwxwxxjrc6vr6-3000.app.github.dev/items')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await res.json();
            // console.log('Successfully added:', result);
            setItems(result)
        }
        getData()
    }, [items])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (item) => {
        console.log('New Inventory Item:', item);
        // Here you can add code to save the item to a database or state management
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://legendary-eureka-x7xjwxwxxjrc6vr6-3000.app.github.dev/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Successfully added:', result);
            // Perform additional actions such as updating state or notifying the user
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const [toggle, setToggle] = useState(false)
    return (
        <div className='w-full bg-gray-100 flex items-center justify-center'>
            <div className='mx-auto w-full'>
                <Navbar />
                <Hero />
                <Category categories={category} items={items} />
                {/* Add item */}
                <button className='mx-4 my-4 px-4 py-2 rounded-lg bg-blue-600 text-white' onClick={() => setToggle(!toggle)}>Add item </button>
                <InventoryForm onSubmit={handleFormSubmit} toggle={toggle} />
                {loading && <div className="mt-4 text-blue-500">Submitting...</div>}
                {error && <div className="mt-4 text-red-500">{error}</div>}
                <Footer />
            </div>
        </div>
    )
}

export default Home