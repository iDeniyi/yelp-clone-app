import React, {useContext, useState} from 'react'
import YelpApi from '../apis/YelpApi'
import { RestaurantsContext } from '../context/RestaurantsContext'


const NewEntry = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')
    const addRestaurants = useContext(RestaurantsContext)

    const handleSubmit =  async (e) => {
        try {
            const response = await YelpApi.post('/', {
                name: name,
                location: location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurants)
        } catch (err) {
            console.log(err)
        }
    }


    return(
        <div className='mb-4'>
            <form action="">
                <div className='form-row'>
                    <div className='col'>
                        <input type='text' value={name} onChange={e => setName(e.target.value)} className='form-control' placeholder='name'/>
                    </div>
                    <div className='col'>
                        <input type='text' value={location} onChange={e => setLocation(e.target.value)}className='form-control' placeholder='location'/>
                    </div>
                    <div className='col'>
                        <select className='custom-select my-1 mr-sm-2' placeholder='price range' value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Add</button>

                </div>
            </form>
        </div>
    )
}

export default NewEntry