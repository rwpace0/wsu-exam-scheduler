# WSU Exam Scheduler

This project is a comprehensive exam scheduler designed to benefit students by efficiently organizing and displaying exam schedules. It utilizes a PostgreSQL database to store all exam-related information, with a React frontend for intuitive user interaction.

## Visit The Site

Feel free to check out the project [here](https://wsuexamscheduler.vercel.app/)!

## Features

* **PostgreSQL Database:** Stores detailed information about exams, including dates, times, sections, and locations.
* **React Frontend:** A user-friendly interface for viewing, filtering, and managing exam information, built with React.
* **Tailwind CSS:** Provides responsive and clean styling throughout the application.
* **Supabase Integration:** Handles database operations and authentication securely.
* **Vite Build Tool:** Ensures fast development and optimized production builds.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Vercel (frontend), Supabase (database)

## Prerequisites

Before running this project locally, ensure you have the following installed:

* Node.js and npm (Node Package Manager)
* A Supabase account for the database
* IDE (VS Code, etc.)

## Installation

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Create a `.env` file in the root directory with the following variables:
   ```
   DB_URL=your_supabase_url
   ```
5. Run `npm run dev` to start the development server.

## Usage

* Access the application via `http://localhost:5173` during development.
* Browse through the exam schedule, filter by courses, dates, or locations.
* If authenticated, manage exam entries through the admin interface.

## Database Structure

The PostgreSQL database hosted on Supabase contains the following main tables:
- `primary`: The name of the class
- `term`: The semester the class takes place in
- `campus`: The university location
- `section`: The specific section of a class
- `day`: The date the final exam takes place
- `time`: The time period of the exam

## Deployment

This project is set up for seamless deployment:

1. Frontend is deployed on Vercel with automatic updates from the main branch
2. Database is hosted on Supabase

## Contributing

Contributions are welcome! If you'd like to enhance this project or report issues, please submit a pull request or open an issue.

## License

[MIT License](LICENSE)
