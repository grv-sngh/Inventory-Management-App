import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://legendary-eureka-x7xjwxwxxjrc6vr6-3000.app.github.dev/items/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data[0]);
      } catch (error) {
        setError('Failed to fetch item details.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
      <p className="mt-4 text-gray-600">{item.description}</p>
      <div className="mt-6">
        <span className="block text-gray-700">Quantity: {item.quantity}</span>
        <span className="block text-gray-700">Price: ${item.price}</span>
        <span className="block text-gray-700">Category: {item.category}</span>
      </div>
    </div>
  );
};

export default ItemDetail;
