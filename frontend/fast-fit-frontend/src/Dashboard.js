import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import MapContainer from "./MapContainer";
import MealWidget from "./Recipes/mealWidget";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_router: false,
      workout_router: false,
      health_router: false,
      journal_router: false,
      bmi_calculated: 0,
      calc_height: "",
      calc_weight: "",
    };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }
  handleHeightChange(event) {
    const value = event.target.value;
    this.setState({ calc_height: value });
  }
  handleWeightChange(event) {
    const value = event.target.value;
    this.setState({ calc_weight: value });
  }
  calculateBMI(event) {}
  workoutRoute(event) {
    this.setState({ workout_router: true });
  }
  recipeRoute(event) {
    this.setState({ recipe_router: true });
  }
  healthRoute(event) {
    this.setState({ health_router: true });
  }
  journal_router(event) {
    this.setState({ journal_route: true });
  }
  componentDidMount() {
    const journalUrl = `${process.env.REACT_APP_JOURNALS_HOST}`; // NEED TO ADD ROUTES TO GET MICROSERVICE INFO DESIRED ON DASHBOARD
    const recipeUrl = `${process.env.REACT_APP_RECIPES_HOST}`;
    const healthUrl = `${process.env.REACT_APP_HEALTH_HOST}`;
    const workoutUrl = `${process.env.REACT_APP_WORKOUTS_HOST}`;
  }
  render() {
    if (this.state.health_router === true) {
      return <Navigate to="/health" userInput={this.state.userInput} />;
    }
    if (this.state.journal_router === true) {
      return <Navigate to="/journal" userInput={this.state.userInput} />;
    }
    if (this.state.workout_router === true) {
      return <Navigate to="/workout" userInput={this.state.userInput} />;
    }
    if (this.state.recipe_router === true) {
      return <Navigate to="/recipe" userInput={this.state.userInput} />;
    }
    let bmiLong =
      (this.state.calc_weight /
        (this.state.calc_height * this.state.calc_height)) *
      703;
    let bmi = bmiLong.toFixed(2);
    if (bmi == NaN)
      if (!this.state.calc_height) {
        bmi = 0;
      }

    return (
      <section className="h-[400px] w-full bg-[#073b4c] tails-selected-element">
        <div className="max-w-7xl px-5 py-2.5 bg-[#073b4c] flex space-x-5 w-full h-full items-center justify-center mx-auto tails-selected-element 2xl:text-center">
          <div className="flex h-full w-full bg-[#c7e8f3] rounded-md tails-selected-element justify-center">
            <h1 className="py-2.5 text-3xl font-semibold text-[#8e4162]" > Health Data </h1>
          </div>
          <div className="flex flex-col space-y-5 w-full h-full">
            <div className="flex flex-wrap py-2.5 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-3xl font-semibold text-[#8e4162]">Inspirational Quote</h1>
            </div>
            <div className="inline-flex flex-col h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="flex-wrap text-3xl font-semibold text-[#8e4162]">
                Quick Calculate BMI
              </h1>
              <div className="flex flex-wrap justify-center">
                <h2 className=" flex flex-wrap align-middle">Height: </h2>
                <input
                  value={this.state.calc_height}
                  onChange={this.handleHeightChange}
                  type="text"
                  id="height"
                  className="flex flex-wrap border-grey-light w-full ml-2 mr-2 rounded mt-2 mb-2 h-5 bg-[#f1f1f1]"
                  name="height"
                  placeholder=" inches"
                />
                <div className="break"></div>
                <h2 className="flex flex-wrap">Weight: </h2>
                <input
                  value={this.state.calc_weight}
                  onChange={this.handleWeightChange}
                  type="text"
                  id="weight"
                  className="flex flex-wrap border-grey-light w-full ml-2 mr-2 rounded mt-2 mb-2 h-5 bg-[#f1f1f1]"
                  name="weight"
                  placeholder=" lbs"
                />
                <p className="flex flex-wrap mr-2">BMI: </p>
                {bmi}
              </div>
            </div>
          </div>
          <div className="flex py-2.5 h-full w-full bg-[#c7e8f3] rounded-md justify-center">
            <h1 className="text-3xl font-semibold text-[#8e4162]">Meals</h1>
            <MealWidget />
          </div>
        </div>
        <div className="max-w-7xl px-5 py-2.5 bg-[#073b4c] flex space-x-5 w-full h-full items-center justify-center mx-auto">
          <div className="flex flex-col space-y-5 w-full h-full">
            <div className="flex py-2.5 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-3xl font-semibold text-[#8e4162]"> Workouts </h1>
            </div>
            <div className="flex py-2.5 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-3xl font-semibold text-[#8e4162]">Journal</h1>
            </div>
          </div>
          <div className="flex py-2.5 h-full w-full bg-[#c7e8f3] rounded-md flex-wrap items-center justify-center">
            <h1 className="text-3xl font-semibold w-full text-center text-[#8e4162]">
              {" "}
              Find a Gym{" "}
            </h1>
            <div className="justify-items-center">
              <MapContainer></MapContainer>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Dashboard;
