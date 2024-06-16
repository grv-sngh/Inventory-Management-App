import React, { useState } from 'react'
import Gallery from './Gallery'
import Card from './Card'

const Category = ({ categories, items }) => {
    const [cat, setCat] = useState('')

    const handleClick = (category) => {
        setCat(category)
    }

    return (
        <div>
            {categories.map((category) => (
                <button className="mx-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => handleClick(category)} value={category}>{category}</button>
            ))}
            <div>
                <p>Category: {cat || "No Category Selected!"}</p>
                <Gallery items={items} cat={cat} />
            </div>
        </div>
    )
}

export default Category