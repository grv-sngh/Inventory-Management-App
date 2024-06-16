import React from 'react'
import Card from './Card'

const Gallery = ({ items, cat }) => {
    return (
        <div>
            {items.map((item) => (
                <>
                    {item.id == cat && <Card key={item.id} item={item} />}
                </>
            ))}
        </div>
    )
}

export default Gallery