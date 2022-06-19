import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import YelpApi from '../apis/YelpApi';
import { RestaurantsContext } from '../context/RestaurantsContext';

const Table = () => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await YelpApi.get('/')
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [])

    let navigate = useNavigate()
    const handleEdit = (id) => {
        navigate(`/restaurants/${id}/update`)
    }


    return (
        <div className='list-group'>
            <table className='table table-hover table-dark'>
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>

                <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return(
                        <tr key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{'$'.repeat(restaurant.price_range)}</td>
                        <td>Ratings</td>
                        <td><button className='btn btn-warning' onClick={() => handleEdit(restaurant.id)}>Update</button></td>
                        <td><button className='btn btn-danger'>Delete</button></td>
                    </tr>
                    )
                    
                })}
                </tbody>
            </table>
        </div>
    )
    }

export default Table