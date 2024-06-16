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
    // useEffect(() => {
    //     let req, res = fetch('')
    // }, [])
    const handleFormSubmit = (item) => {
        console.log('New Inventory Item:', item);
        // Here you can add code to save the item to a database or state management
    };
    const [toggle, setToggle] = useState(false)
    return (
        <div className='w-full bg-gray-100 flex items-center justify-center'>
            <div className='flex flex-col mx-auto w-full'>
                <Navbar />
                <Hero />
                <Category categories={category} items={items} />
                {/* Add item */}
                <button className='px-4 bg-blue-500' onClick={() => setToggle(!toggle)}>Add item </button>
                <InventoryForm onSubmit={handleFormSubmit} toggle={toggle}/>
                <Footer />
            </div>
        </div>
    )
}

export default Home