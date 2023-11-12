import axios from 'axios'
import { getLocation } from '~/utils/geolocation' 

export const state = () => ({
  API_KEY: 'cc70344adcf33e62098ea8c397b79f66',
  weatherData: null,
})

export const mutations = {
  setData(state, data) {
    state.weatherData = data
  },
}

export const actions = {
  async fetchDataByLocation({ commit }) {
    try {
      const { latitude, longitude } = await getLocation()

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.state.API_KEY}`
      )
      commit('setData', response.data)
    } catch (error) {
      console.error(error)
    }
  },
}
