<template>
  <div
    class="background-container py-5 sm:py-10 font-montserrat w-full h-full bg-cover bg-left bg-fixed md:py-36 lg:py-44"
    :style="dynamicBackground"
  >
    <div v-if="weatherData" class="px-4 sm:px-10 md:px-20 w-full">
      <div
        class="py-5 backdrop-blur-sm bg-neutral-400/50 px-4 rounded-lg md:bg-black/30 md:float-right md:w-1/2"
      >
        <div>
          <p class="text-lg sm:text-xl md:text-2xl lg:text-4xl">
            Current Weather
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 py-4">
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                City
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ weatherData.name }}
              </p>
            </div>
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                Sunrise
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ convertUnixToTime(weatherData.sys.sunrise) }}
              </p>
            </div>
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                Sunset
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ convertUnixToTime(weatherData.sys.sunset) }}
              </p>
            </div>
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                Feels like
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ kelvinToCelsius(weatherData.main.feels_like) }}°C
              </p>
            </div>
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                Temp-max
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ kelvinToCelsius(weatherData.main.temp_max) }}°C
              </p>
            </div>
            <div class="leading-10 pb-3">
              <p
                class="text-xs text-black/50 font-semibold sm:text-sm md:text-base lg:text-lg"
              >
                Temp-min
              </p>
              <p class="text-md font-bold md:text-lg lg:text-xl">
                {{ kelvinToCelsius(weatherData.main.temp_min) }}°C
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-10 sm:pt-15 md:pt-20 lg:py-28">
        <div>
          <div class="lg:flex">
            <p class="text-5xl md:text-6xl lg:text-[4rem]">
              {{ kelvinToCelsius(weatherData.main.temp) }}°C
            </p>
            <div class="px-4">
              <img
                :src="getWeatherIconUrl(weatherData.weather[0].icon)"
                :alt="weatherData.weather[0].description"
              />
              <p class="capitalize">{{ weatherData.weather[0].description }}</p>
            </div>
          </div>
          <div class="flex items-center pt-4">
            <p class="pr-2 md:text-lg lg:text-3xl">{{ weatherData.name }}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p
        class="text-center text-md md:text-lg lg:text-2xl py-48 md:py-[14.4rem] w-full h-full"
      >
        fetching weather information...
      </p>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: 'WeatherComp',
  computed: {
    weatherData() {
      return this.$store.state.weatherData
    },
    dynamicBackground() {
      if (
        this.weatherData &&
        this.weatherData.weather &&
        this.weatherData.weather.length > 0
      ) {
        const condition = this.weatherData.weather[0].main.toLowerCase()

        if (condition.includes('clear')) {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?clear sky')",
          }
        } else if (condition.includes('haze')) {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?haze')",
          }
        } else if (condition.includes('rain')) {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?rain')",
          }
        } else if (condition.includes('clouds')) {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?clouds')",
          }
        } else if (condition.includes('thunderstorm')) {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?thunderstorm')",
          }
        } else {
          return {
            'background-image':
              "url('https://source.unsplash.com/random/900x700/?clouds')",
          }
        }
      } else {
        return {
          'background-image':
            "url('https://source.unsplash.com/random/900x700/?clouds')",
        }
      }
    },
  },
  created() {
    this.$store.dispatch('fetchDataByLocation')
  },
  methods: {
    kelvinToCelsius(temp) {
      return (temp - 273.15).toFixed(1)
    },
    convertUnixToTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },
    getWeatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/w/${iconCode}.png`
    },
  },
}
</script>

<style>
.background-container {
  background-image: url('https://source.unsplash.com/random/900x700/?clouds');
  color: #fff;
}
</style>