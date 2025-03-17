# Pomodoro Clock

A modern Pomodoro timer application built with React and Tailwind CSS.

## Features

- Customizable timer durations (15, 25, 50 minutes)
- 5-minute break timer after each session
- Visual countdown with donut progress indicator
- Sound notifications
- Responsive design
- Easy to use interface

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your configuration:
   ```env
   VITE_DURATIONS=15,25,50
   VITE_BREAK_DURATION=5
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables can be configured:

- `VITE_DURATIONS`: Comma-separated list of timer durations in minutes (default: "15,25,50")
- `VITE_BREAK_DURATION`: Break duration in minutes (default: 5)

## Usage

1. Select your desired work duration
2. Click Start to begin the timer
3. Take a 5-minute break when the timer ends
4. Repeat!

## Technologies Used

- React
- Tailwind CSS
- Vite
- use-sound

## License

MIT License

Copyright (c) 2025 Eddie Chan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
