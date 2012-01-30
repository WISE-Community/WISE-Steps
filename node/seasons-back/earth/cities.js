// nice web color picker: http://www.allscoop.com/tools/Web-Colors/web-colors.php

var city_colors = {
  bright_red:       '#ff0000',
  dark_red:         '#770022',
  bright_blue:      '#0000ff',
  dark_blue:        '#004488',
  bright_green:     '#00ff00',
  dark_green:       '#445500',
  bright_purple:    '#ff11ff',
  dark_purple:      '#770099',
  bright_orange:    '#ff7711',
  dark_orange:      '#dd4400',
  bright_turquoise: '#00bbbb',
  dark_turquoise:   '#007777',
};

var cities = [

    {
        name: "Fairbanks",
        country: "United States",
        active: true,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 147.43,
            signed_latitude: 64.51,
            latitude: 64.51,
            lat_dir: "N",
            longitude: 147.43,
            long_dir: "W",
            elev: 133
        },
        average_temperatures: [-24, -19.5, -13, -2, 9, 15, 16, 12.5, 7, -4, -16, -23],
        source: "http://www.climatetemp.info/usa/fairbanks-alaska.html"
    },

    {
        name: "Anchorage",
        country: "United States",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 149.9,
            signed_latitude: 61.21,
            latitude: 61.21,
            lat_dir: "N",
            longitude: 149.9,
            long_dir: "W",
            elev: 19
        },
        average_temperatures: [-10.5, -7.5, -5, 2, 8, 12, 15, 13.5, 9, 2, -6, -10.5],
        source: "http://www.climatetemp.info/usa/anchorage-alaska.html"
    },

    {
        name: "Vancouver",
        country: "Canada",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 123.1,
            signed_latitude: 49.25,
            latitude: 49.25,
            lat_dir: "N",
            longitude: 123.1,
            long_dir: "W",
            elev: 34
        },
        average_temperatures: [2.1, 4.0, 4.9, 9.1, 12.7, 17.4, 19.6, 18.1, 15.7, 10.0, 7.1, 2.1],
        source: "http://climate.weatheroffice.gc.ca/climateData/monthlydata_e.html?Prov=XX&timeframe=3&StationID=889&Month=1&Day=1&Year=2009&cmdB1=Go"
    },

    {
        name: "Washington, D.C.",
        country: "United States",
        active: true,
        color: city_colors.bright_blue,
        location: {
            signed_longitude: 77.02,
            signed_latitude: 38.54,
            latitude: 38.54,
            lat_dir: "N",
            longitude: 77.02,
            long_dir: "W",
            elev: 22
        },
        average_temperatures: [3, 3.5, 7, 14, 19, 24, 26, 25, 21, 15, 9, 3.5],
        source: "http://www.climatetemp.info/usa/washington-district-of-columbia.html"
    },

    {
        name: "San Francisco",
        country: "United States",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 122.42,
            signed_latitude: 37.77,
            latitude: 37.77,
            lat_dir: "N",
            longitude: 122.42,
            long_dir: "W",
            elev: 26
        },
        average_temperatures: [9, 10.5, 12, 13, 15, 16, 17, 17, 18, 16, 13, 10],
        source: "http://www.climatetemp.info/usa/san-francisco-california.html"
    },

    {
        name: "Miami",
        country: "United States",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 80.25,
            signed_latitude: 25.75,
            latitude: 25.75,
            lat_dir: "N",
            longitude: 80.25,
            long_dir: "W",
            elev: 1
        },
        average_temperatures: [19, 20, 22, 24, 26, 27, 28, 28, 28, 26, 23, 20],
        source: "http://www.climatetemp.info/usa/miami-florida.html"
    },

    {
        name: "Quito",
        country: "Ecuador",
        active: true,
        color: city_colors.bright_green,
        location: {
            signed_longitude: 78.35,
            signed_latitude: -0.15,
            latitude: 0.15,
            lat_dir: "S",
            longitude: 78.35,
            long_dir: "W",
            elev: 2811
        },
        average_temperatures: [15, 14.5, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        source: "http://www.climatetemp.info/ecuador/"
    },

    {
        name: "Galapagos Island",
        country: "Chile",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 91.1,
            signed_latitude: -0.75,
            latitude: 0.75,
            lat_dir: "S",
            longitude: 91.1,
            long_dir: "W",
            elev: 184
        },
        average_temperatures: [26, 26.5, 27, 27, 26, 24, 22, 21.5, 21, 22, 23, 24],
        source: "http://www.climatetemp.info/galapagos-islands/"
    },

    {
        name: "Rio de Janeiro",
        country: "Brazil",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: 43.25,
            signed_latitude: -27.75,
            latitude: 27.75,
            lat_dir: "S",
            longitude: 43.25,
            long_dir: "W",
            elev: 13
        },
        average_temperatures: [25.5, 26.5, 26, 25, 22, 22, 21, 22, 23, 24, 25, 26],
        source: "http://www.climatetemp.info/brazil/rio-de-janeiro.html"
    },

    {
        name: "Canberra",
        country: "Australia",
        active: true,
        color: city_colors.bright_purple,
        location: {
            signed_longitude: -149.08,
            signed_latitude: -35.15,
            latitude: 35.15,
            lat_dir: "S",
            longitude: 149.08,
            long_dir: "E",
            elev: 559
        },
        average_temperatures: [20.5, 20, 17, 14, 9, 7, 6, 7, 10, 13, 15, 18.5],
        source: "http://www.climatetemp.info/australia/canberra.html"
    },

    {
        name: "Melbourne",
        country: "Australia",
        active: false,
        color: city_colors.bright_red,
        location: {
            signed_longitude: -144.95,
            signed_latitude: -37.8,
            latitude: 37.8,
            lat_dir: "S",
            longitude: 144.95,
            long_dir: "E",
            elev: 15
        },
        average_temperatures: [20, 20, 19, 16, 12, 11, 10, 10.5, 13, 14, 17, 18],
        source: "http://www.climatetemp.info/australia/melbourne.html"
    },
    
    {
        name: "Rio Gallegos",
        country: "Argentina", 
        active: true,
        color: city_colors.bright_orange,
        location: {
            signed_longitude: 69.13,
            signed_latitude: -51.38,
            latitude: 51.38,
            lat_dir: "S",
            longitude: 69.13,
            long_dir: "W",
            elev: 22
        },
        average_temperatures: [12.5, 11.5, 11, 8, 4, 1, 1, 2.5, 6, 9, 11, 12],
        source: "http://www.climatetemp.info/argentina/rio-gallegos.html"
    },
    
    {
        name: "McMurdo Station",
        country: "Antarctica",
        active: true,
        color: city_colors.bright_turquoise,
        location: {
            signed_longitude: -166.73,
            signed_latitude: -77.88,
            latitude: 77.88,
            lat_dir: "S",
            longitude: 166.73,
            long_dir: "E",
            elev: 24
        },
        average_temperatures: [-2.9, -9.5, -18.2, -20.7, -21.7, -23, -25.7, -26.1, -24.6, -18.9, -9.7, -3.4],
        source: "http://www.coolantarctica.com/Antarctica%20fact%20file/antarctica%20environment/climate_graph/vostok_south_pole_mcmurdo.htm"
    }

];