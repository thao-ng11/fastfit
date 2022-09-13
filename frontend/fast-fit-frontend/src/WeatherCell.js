import React from "react";

const IDLE = "IDLE";
const BUSY = "BUSY";
const DONE = "DONE";

export default class Weather extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        actualTemp: 0,
        feelsLike: 0,
        minTemp: 0,
        maxTemp: 0,
        name: "",
        weather: {},
        wind: {},
        status: IDLE
      }
      this.handleData = this.handleData.bind(this)
      this.locationFound = this.locationFound.bind(this)
    }
  
    componentDidMount() {
        console.log("in component did mount")
        console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY)
      this.setState({
        status: BUSY
      }, () => {
        navigator.geolocation.getCurrentPosition(this.locationFound,
          this.locationError)
      })
    }
  
    locationFound(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`)
        .then(response => response.json())
        .then(data => this.handleData(data))
        .catch(error => console.log(error))
    }
  
    handleData(data) {
      const { main, weather, wind, name } = data;
      this.setState({
        actualTemp: Math.round(main.temp).toString(),
        feelsLike: Math.round(main.feels_like).toString(),
        minTemp: Math.round(main.temp_min).toString(),
        maxTemp: Math.round(main.temp_max).toString(),
        name: name,
        weather: weather[0],
        wind: wind,
        status: DONE
      })
    }
  
    locationError() {
      return "Unable to retrieve your location"
    }
  
    render() {
      const { actualTemp, feelsLike, minTemp, maxTemp, name,
        wind, weather, status } = this.state;
      const { type } = this.props;
      let weatherData, containerStyle, cardStyle, tabHeader;
      if (status === DONE) {
        weatherData = (
          <>
            <div className="top-info flex space-between">
              <div className="description flex left gap-0-6">
                <div className="icon">
                  <img className="weather-icon" src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                </div>
                <span className="description">{weather.description}</span>
              </div>
              <div className="location flex right gap-0-6">
                <div className="icon">
                  <i className="fa-solid fa-map-pin" />
                </div>
                <span>
                  {name}
                </span>
              </div>
            </div>
  
            <div className="weather-container grid-2-col col-gap-2 w-100">
              <div className="title-col flex-col left grid-col-1 grid-row-1">
                <span className="sm-title">
                  feels like
                </span>
              </div>
              <div className="flex-col left grid-col-1 grid-row-2">
                <span className="big-temp">{feelsLike}&#176;</span>
              </div>
              <div className="flex-col left grid-col-2 grid-row-1">
                <span className="sm-title">
                  today
                </span>
              </div>
              <div className="flex-row grid-col-2 grid-row-2 gap-2">
                <div className="flex-col labels">
                  <span>actual</span>
                  <span>max</span>
                  <span>min</span>
                </div>
                <div className="flex-col">
                  <strong>{actualTemp}<span className="sm-labels">&#176;F</span></strong>
                  <strong>{maxTemp}<span className="sm-labels">&#176;F</span></strong>
                  <strong>{minTemp}<span className="sm-labels">&#176;F</span></strong>
                </div>
              </div>
            </div>
  
          </>
        )
      } else if (status === BUSY) {
        weatherData = (
          <span className="center pad-2">
            Communicating with nearby satilites, one moment please 🛰
          </span>
        )
      } else if (status === IDLE) {
        weatherData = (
          <span className="center pad-2">
            Please enable weather services to get your local weather report 🙏
          </span>
        )
      }
  
  
      return (
        <div className={containerStyle}>
          {tabHeader}
          <div className={cardStyle}>
            {weatherData}
          </div>
        </div>
      )
    }
  }