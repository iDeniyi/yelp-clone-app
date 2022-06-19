import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import Details from "./routes/Details"
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container-fluid'>
            <Router>
            <Routes>
                <Route exact path = "/" element={<Home/>}/>
                <Route exact path = "/restaurants/:id/update" element={<UpdatePage/>}/>
                <Route exact path = "/restaurants/:id" element={<Details/>}/>
            </Routes>
            </Router>
        </div>
        </RestaurantsContextProvider>
    )
}

export default App;