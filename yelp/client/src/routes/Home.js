import React from 'react'
import Header from "../components/Header"
import NewEntry from '../components/NewEntry'
import Table from '../components/Table'
const Home = () => {
    return (
        <div>
            <Header/>
            <NewEntry/>
            <Table/>
        </div>
    )
}

export default Home