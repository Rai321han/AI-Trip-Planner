import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a travel plan for the destination: Dhaka Division for 3 days.\nTraveler type: 3,  with a friendly budget.\nProvide a list of hotel options including the name, address, price, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions.\nSuggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for 3 days, including the best time to visit in a itinerary array.\nOutput in proper JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "destination": "Dhaka Division",\n  "duration": "3 days",\n  "traveler_type": "Budget-friendly",\n  "hotels": [\n    {\n      "name": "Hotel 71",\n      "address": "R-71, Kemal Ataturk Ave, Dhaka 1213, Bangladesh",\n      "price": "from $25/night",\n      "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/0a/ae/d3/hotel-71.jpg?w=900&h=-1&s=1",\n      "geo_coordinates": {\n        "latitude": 23.7340,\n        "longitude": 90.4081\n      },\n      "rating": 4,\n      "description": "Centrally located with modern amenities, offering comfortable stays at affordable prices."\n    },\n    {\n      "name": "Hotel Abakash",\n      "address": "10/8, Naya Paltan, Dhaka 1000, Bangladesh",\n      "price": "from $20/night",\n      "image_url": "https://r1imghtlak.mmtcdn.com/58a2f80140ff11e59f2d0242ac110003.jpg",\n      "geo_coordinates": {\n        "latitude": 23.7324,\n        "longitude": 90.4149\n      },\n      "rating": 3.5,\n      "description": "A budget-friendly option in a bustling area, known for its convenience and basic amenities."\n    },\n    {\n      "name": "Eastern Residence",\n      "address": "Plot 5 & 6, Road 97, Dhaka 1212, Bangladesh",\n      "price": "from $18/night",\n      "image_url": "https://q-cf.bstatic.com/xdata/images/hotel/max500/309700378.jpg?k=d90ca1b73430e558883ab4c34a9a5028121fa922142210a00e2be8f11725b82d&o=",\n      "geo_coordinates": {\n        "latitude": 23.7532,\n        "longitude": 90.3921\n      },\n      "rating": 3,\n      "description": "Basic accommodation with clean rooms and essential facilities, ideal for budget travelers."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "activities": [\n        {\n          "name": "Lalbagh Fort",\n          "description": "Explore the unfinished Mughal fort with beautiful gardens, mosques, and a museum.",\n          "image_url": "https://www.thelostpassport.com/wp-content/uploads/2023/02/Lalbagh-Fort-Dhaka.jpg",\n          "geo_coordinates": {\n            "latitude": 23.7178,\n            "longitude": 90.3962\n          },\n          "ticket_price": "$3",\n          "rating": 4.5,\n          "travel_time": "30 minutes from city center",\n          "best_time": "Morning (9am-12pm)"\n        },\n        {\n          "name": "Ahsan Manzil",\n          "description": "Visit the magnificent pink palace, once home to the Nawabs of Dhaka, showcasing the city\'s rich history.",\n          "image_url": "https://www.thelostpassport.com/wp-content/uploads/2023/02/Ahsan-Manzil-Dhaka-1.jpg",\n          "geo_coordinates": {\n            "latitude": 23.7147,\n            "longitude": 90.4072\n          },\n          "ticket_price": "$3",\n          "rating": 4,\n          "travel_time": "15 minutes from Lalbagh Fort",\n          "best_time": "Afternoon (2pm-5pm)"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "activities": [\n        {\n          "name": "Sadarghat River Front",\n          "description": "Experience the vibrant life of the Buriganga River with bustling markets and traditional boats.",\n          "image_url": "https://www.dhakatribune.com/uploads/2021/06/sadarghat-launch-terminal-1623180396924.jpg",\n          "geo_coordinates": {\n            "latitude": 23.7098,\n            "longitude": 90.4112\n          },\n          "ticket_price": "Free",\n          "rating": 4,\n          "travel_time": "20 minutes from city center",\n          "best_time": "Morning (8am-10am)"\n        },\n        {\n          "name": "Dhaka University Area",\n          "description": "Explore the historical campus, visit the Curzon Hall, and enjoy street food at TSC.",\n          "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Curzon_Hall_Dhaka_University_02.JPG",\n          "geo_coordinates": {\n            "latitude": 23.7311,\n            "longitude": 90.3947\n          },\n          "ticket_price": "Free",\n          "rating": 4.5,\n          "travel_time": "30 minutes from Sadarghat",\n          "best_time": "Late Afternoon (4pm-7pm)"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "activities": [\n        {\n          "name": "National Parliament House",\n          "description": "Admire the architectural marvel of Louis Kahn\'s iconic building, symbolising Bangladesh\'s democracy.",\n          "image_url": "https://cdn.britannica.com/10/184110-050-DA4230EE/National-Assembly-Building-Dhaka-Bangladesh-Louis-Kahn.jpg",\n          "geo_coordinates": {\n            "latitude": 23.7610,\n            "longitude": 90.3758\n          },\n          "ticket_price": "$5 (guided tours)",\n          "rating": 4.5,\n          "travel_time": "45 minutes from city center",\n          "best_time": "Morning (10am-1pm)"\n        },\n        {\n          "name": "Hatirjheel Project",\n          "description": "Relax by the lake, enjoy boat rides, and witness the colorful musical fountain show in the evening.",\n          "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e2/73/f3/hatir-jheel.jpg?w=1200&h=-1&s=1",\n          "geo_coordinates": {\n            "latitude": 23.7567,\n            "longitude": 90.4137\n          },\n          "ticket_price": "Free (boat rides extra)",\n          "rating": 4,\n          "travel_time": "30 minutes from Parliament House",\n          "best_time": "Evening (5pm-8pm)"\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
