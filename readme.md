# ♟️ FaceCheck

> **Chess is better with human connection.**
>
> A modern, minimalistic multiplayer chess platform featuring real-time video calls, frictionless guest play, and a "Soft UI" aesthetic designed for focus.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-beta-orange)
![Stack](https://img.shields.io/badge/stack-React_Next.js-black)

## ✨ Features

*   **🎥 WebRTC Video Integration**: Peer-to-peer 1080p video calls with opponent visibility directly next to the board.
*   **⚡ Zero-Friction Entry**: "Play as Guest" mode allows instant matchmaking without registration.
*   **🎨 Soft UI Design**: A "midnight" dark mode (`bg-[#0B0C10]`) with violet gradients and glassmorphism to reduce eye strain.
*   **📱 Responsive Bento Grid**: Modern grid layout that adapts seamlessly from desktop to mobile.
*   **🔒 Privacy-First**: Direct P2P connections; video streams are never stored on a server.

## 🛠️ Tech Stack

*   **Frontend**: React 19, Next.js 15 (App Router)
*   **Styling**: Tailwind CSS, Headless UI (for accessible components)
*   **Real-time**: WebRTC (Video), Socket.io (Game Moves)
*   **Game Logic**: `chess.js` (Rules), `react-chessboard` (UI)
*   **State Management**: Zustand

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js 18+ installed.

### Installation

1.  **Clone the repository**
    ```
    git clone https://github.com/yourusername/facecheck.git
    cd facecheck
    ```

2.  **Install dependencies**
    ```
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:3000` to see the application.

## 📂 Project Structure

facecheck/
├── components/
│ ├── Landing/ # Hero, Features, and Footer sections
│ ├── Game/ # Chessboard and Move History
│ └── Video/ # WebRTC Video components (Self/Opponent)
├── app/
│ ├── page.tsx # Main Landing Page (Soft UI Version)
│ └── play/ # Game Room Route
├── public/ # Static assets and icons
└── lib/ # Utility functions (socket client, peer connection)


## 🧩 Key Components

### `LandingPage.tsx`
The entry point featuring the "Soft UI" design. It uses:
*   **Gradient Glows**: Fixed position `divs` with high blur values for ambient background lighting.
*   **Interactive Steps**: Hover-responsive cards explaining the "Create -> Invite -> Play" flow.
*   **Mock Interface**: A CSS-only representation of the game board and video feeds for visual context.

### `WebRTCProvider.tsx` (Planned)
Handles the negotiation of ICE candidates and stream management. Currently mocked in the UI for the landing page demo.



---

**Built with ❤️ by Ranjit Das**
