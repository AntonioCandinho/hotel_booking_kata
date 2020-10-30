# Hotel Booking Kata

Typescript implementation of the [Corporate Hotel Booking Kata] (https://katalyst.codurance.com/corporate-hotel-booking)

## How is it implemented?

The public API, a.k.a the service interface described in the Kata, is the facade to all the use cases for the following service. Use cases and public API are not separated. By doing this, I above doing some extra work at the cost of more coupling. If we needed to have a strict Service interface, with no extra methods, I will probably go by separating the service concerns into a Public API, Internal API, and use cases.

Almost everything is synchronous that will probably not happen in a more realistic scenario, altough that could change easily.

This Kata uses Jest for testing, you can run the tests by typing `npx jest`. There is no linter configured for this project.
