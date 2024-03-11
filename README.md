# McDonald's Automated Cooking Bots

This project simulates the operation of automated cooking bots for McDonald's, aimed at reducing workforce and increasing efficiency during COVID-19.

## Overview

The project implements an order controller that handles the flow of orders through different stages, from submission to completion. It includes functionalities for normal and VIP orders, as well as the management of cooking bots.

## User Stories

- As a normal customer, I can submit an order, which moves into the "PENDING" area and then to the "COMPLETE" area after processing.
- As a VIP member, my order is prioritized over normal orders and is processed before them.
- As a manager, I can increase or decrease the number of cooking bots available in the restaurant, with immediate processing of pending orders upon bot increase.
- Each cooking bot can process one order at a time, with a processing time of 10 seconds per order.

## Features

- **New Normal Order**: Create a new normal order.
- **New VIP Order**: Create a new VIP order, prioritized over normal orders.
- **Increase Bots**: Add a new cooking bot and process pending orders.
- **Decrease Bots**: Remove the newest cooking bot and update the status of its associated order if processing.
- **Processing Orders**: Bots process pending orders sequentially, with VIP orders prioritized.

## Usage

- Clone the repository
- Install dependencies: `npm install`
- Start: `npm start`
