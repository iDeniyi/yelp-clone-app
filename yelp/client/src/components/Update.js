import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import YelpApi from '../apis/YelpApi';
import { RestaurantsContext } from '../context/RestaurantsContext';

const Update = (props) => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    let navigate = useNavigate();


    useEffect (() => {
        const fetchData = async() => {
            const response = await YelpApi.get(`/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData();
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const updateRestaurant = await YelpApi.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })
        navigate('/')
    }
    return (
        <div>
            <form action=''>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type='text'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type='text'/>
                </div>
                <div>
                    <label htmlFor='name'>Price Range</label>
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' className='form-control'>
                        <option disabled>Price Range</option>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                        <option value='5'>$$$$$</option>
                    </select>
                </div>
                <br/>
                <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default Update