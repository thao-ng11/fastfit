import React from "react";
import { Navigate } from "react-router-dom";
import MealWidget from "./Recipes/mealWidget";
import Weather from "./WeatherCell";
import { getTokenInternal } from "./Authentication";
import WeightWidget from "./health_data/weightWidget";
import WorkoutWidget from "./Workouts/WorkoutWidget";
import JournalWidget from "./journals/journalWidget";
import QuoteWidget from "./quote/quoteWidget";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bmi_calculated: 0,
      calc_height: "",
      calc_weight: "",
      validLogin: true,
    };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
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
  async handleLoginChange(event) {
    let response = await getTokenInternal();
    if (response === false) {
      this.setState({ validLogin: false });
    }
  }

  componentDidMount() {
    this.handleLoginChange();
  }

  render() {
    if (!this.state.validLogin) {
      return <Navigate to="/" userInput={this.state.userInput} />;
    }

    let bmiLong =
      (this.state.calc_weight /
        (this.state.calc_height * this.state.calc_height)) *
      703;
    let bmi = bmiLong.toFixed(2);
    if (Number.isNaN(bmi))
      if (!this.state.calc_height) {
        bmi = 0;
      }

    return (
      <section className="h-[400px] w-full bg-[#073b4c] mt-4 tails-selected-element">
        <div className="max-w-7xl px-5 py-2.5 bg-[#073b4c] flex space-x-5 w-full h-full items-center justify-center mx-auto tails-selected-element 2xl:text-center">
          <a
            href="../workout/plan"
            className="flex py-2.5 w-full h-full bg-[#c7e8f3] rounded-md justify-center text-black hover:text-black hover:border-[#195569] border-transparent border-2"
          >
            <div className="px-4 h-full w-full bg-[#c7e8f3] rounded-md tails-selected-element justify-center">
              <h1 className="text-center py-2 text-3xl font-semibold text-[#8e4162]">
                Workouts for Today
              </h1>
              <div className="text-start grid-rows-1 mt-10">
                <WorkoutWidget />
              </div>
            </div>
          </a>
          <div className="flex flex-col space-y-5 w-full h-full">
            <div className="py-2.5 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-3xl text-center font-semibold text-[#8e4162]">
                Inspirational Quote
              </h1>
              <div>
                <QuoteWidget />
              </div>
            </div>
            <div className="inline-flex flex-col h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="grid place-items-center text-3xl font-semibold text-[#8e4162]">
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
          <a
            href="../meals/user"
            className="flex py-2.5 w-full h-full bg-[#c7e8f3] rounded-md justify-center text-black hover:text-black hover:border-[#195569] border-transparent border-2"
          >
            <div className="py-2.5 h-full w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-3xl text-center font-semibold text-[#8e4162]">
                Meals
              </h1>
              <div>
                <MealWidget />
              </div>
            </div>
          </a>
        </div>
        <div className="max-w-7xl px-5 py-2.5 bg-[#073b4c] flex space-x-5 w-full h-full items-center justify-center mx-auto">
          <div className="flex flex-col space-y-5 w-full h-full">
            <a
              href="../health"
              className="flex py-1 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center text-black hover:text-black hover:border-[#195569] border-transparent border-2"
            >
              <div className="grid place-items-center py-1 w-full bg-[#c7e8f3] rounded-md items-stretch">
                <h1 className=" text-2xl font-semibold text-[#8e4162]">
                  {" "}
                  Weight Tracker{" "}
                </h1>
                <div className="pt-1 w-[440px] h-full grid place-items-center shadow-lg">
                  <WeightWidget />
                </div>
              </div>
            </a>
            <div className="flex flex-col py-2 w-full bg-[#c7e8f3] rounded-md justify-center">
              <h1 className="text-2xl text-center font-semibold text-[#8e4162]">
                Benefits of Journaling
              </h1>
              <JournalWidget />
            </div>
          </div>
          <div className="flex py-2.5 h-full w-full bg-[#c7e8f3] rounded-md flex-wrap items-center justify-center">
            <h1 className="text-2.5xl font-semibold w-full text-center text-[#8e4162]">
              {" "}
              Your Local Weather{" "}
            </h1>
            <div>
              <div className="flex items-center w-full text-2xl">
                <Weather></Weather>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-8 mx-auto sm:px-12 lg:px-20 justify-center">
          <h1 className="text-sm pt-20 font-bold tracking-wide text-center text-[#f1f1f1] uppercase mb-7">
            Built on
          </h1>
          <div className="flex items-center justify-center grid-cols-2 gap-y-8">
            <div className="flex items-center justify-center col-span-1 row-span-1">
              <img
                src="https://upload.wikimedia.org/wikiversity/en/8/8c/FastAPI_logo.png"
                alt="Hubspot"
                className="block object-contain h-9"
              />
            </div>
            <div className="flex items-center justify-center col-span-1 row-span-1">
              <img
                src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
                alt="Youtube"
                className="block object-contain h-7 lg:h-8"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Dashboard;
