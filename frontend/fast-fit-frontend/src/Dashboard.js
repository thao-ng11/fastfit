import React from 'react';
import {useState} from 'react'
import { Navigate } from 'react-router-dom'
import MapContainer from './MapContainer';

class Dashboard extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            recipe_router: false,
            workout_router: false,
            health_router: false,
            journal_router: false,
        }
    }
    workoutRoute(event)
    {
        this.setState({workout_router: true})
        this.setState({workout_router: false})
    }
    recipeRoute(event)
    {
        this.setState({recipe_router: true})
    }
    healthRoute(event)
    {
        this.setState({health_router: true})
    }
    journal_router(event)
    {
        this.setState({journal_route: true})
    }
    componentDidMount()
    {
        const journalUrl = `${process.env.REACT_APP_JOURNALS_HOST}` // NEED TO ADD ROUTES TO GET MICROSERVICE INFO DESIRED ON DASHBOARD
        const recipeUrl = `${process.env.REACT_APP_RECIPES_HOST}`
        const healthUrl = `${process.env.REACT_APP_HEALTH_HOST}`
        const workoutUrl = `${process.env.REACT_APP_WORKOUTS_HOST}`
        this.state = {
            recipe_router: false,
            workout_router: false,
            health_router: false,
            journal_router: false,
        }
    }
    render()
    {
        if (this.state.health_router) {return <Navigate to="/health" userInput={this.state.userInput}/>;}
        if (this.state.journal_router) {return <Navigate to="/journal" userInput={this.state.userInput}/>;}
        if (this.state.workout_router) {return <Navigate to="/workout" userInput={this.state.userInput}/>;}
        if (this.state.recipe_router) {return <Navigate to="/recipe" userInput={this.state.userInput}/>;}
        
        return (
            <section className="h-[400px] bg-white tails-selected-element" >
                <div className="max-w-7xl px-5 py-2.5 flex space-x-5 w-full h-full items-center justify-center mx-auto tails-selected-element 2xl:text-center" >
                <div className="flex h-full w-full bg-gray-300 rounded-md tails-selected-element justify-center" >
                    <h1 className="py-2.5 text-3xl font-semibold"> Health Data </h1>
                </div>
                    <div className="flex flex-col space-y-5 w-full h-full">
                        <div className="flex py-2.5 h-1/2 w-full bg-gray-300 rounded-md justify-center">
                            <h1 className="text-3xl font-semibold">Inspirational Quote</h1>
                        </div>
                        <div className="flex h-1/2 w-full bg-gray-300 rounded-md justify-center">
                            <h1 className="text-3xl font-semibold"> Quick Calculate BMI </h1>
                        </div>
                    </div>
                    <div className="flex py-2.5 h-full w-full bg-gray-300 rounded-md justify-center">
                    <h1 className="text-3xl font-semibold">Nutrition</h1>
                    </div>
                </div>
                <div className="max-w-7xl px-5 py-2.5 flex space-x-5 w-full h-full items-center justify-center mx-auto">
                    <div className="flex flex-col space-y-5 w-full h-full">
                        <div className="flex py-2.5 h-1/2 w-full bg-gray-300 rounded-md justify-center">
                            <h1 className="text-3xl font-semibold"> Workouts </h1>
                        </div>
                        <div className="flex py-2.5 h-1/2 w-full bg-gray-300 rounded-md justify-center">
                            <h1 className="text-3xl font-semibold">Listen Fam</h1>
                        </div>
                    </div>
                    <div className="flex py-2.5 h-full w-full bg-gray-300 rounded-md flex-wrap items-center justify-center">
                        <h1 className="text-3xl font-semibold w-full text-center"> Find a Gym </h1>
                    <div>
                        <MapContainer></MapContainer>
                    </div>
                    </div>
                </div>
            </section>
            

        )
    }
}
export default Dashboard