This app use public data provided by the [CRE](https://www.gob.mx/cre) (COMISIÓN REGULADORA DE ENERGIA) to display location and prices of your nearest gas stations in Mexico.

![main](https://github.com/JMRamosJuarez/cre-mx-fuels/assets/19629268/ed0f1a9b-b07f-457a-91eb-4b56e7f40bd6)

Also shows distance and shortest route

![route](https://github.com/JMRamosJuarez/cre-mx-fuels/assets/19629268/0444b5fc-6f02-4716-bf5b-837c8c1e35ed) ![navigation](https://github.com/JMRamosJuarez/cre-mx-fuels/assets/19629268/1ea04944-b121-4ca1-aaf6-fdc5abf7f1c1)


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Generate a Google Maps API Key

Learn how to generate your own API Key [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Step 2: Create a .env.dev file

First, you will need to create a ".env.dev" file and add this variables:

```
CRE_URL=https://datos.gob.mx/busca/dataset/estaciones-de-servicio-gasolineras-y-precios-finales-de-gasolina-y-diesel
CRE_DATA_BASE_URL=https://publicacionexterna.azurewebsites.net
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ app:

### For Android

```bash
# OR using Yarn
yarn android
```
If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ shortly provided you have set up your emulator/simulator correctly.

