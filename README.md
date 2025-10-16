📰 WP-Aggregator

WP-Aggregator is a lightweight and visually engaging web application that automatically fetches and displays the latest posts from any WordPress website.
It retrieves the newest 10 posts, lists their titles vertically, and generates QR codes that link directly to each post.

✨ Overview

The application continuously scrolls through the titles — from top to bottom and back up — creating a smooth, dynamic, and ever-moving content feed.
It automatically refreshes every hour to ensure that new posts are displayed as soon as they’re published.

This makes it ideal for live dashboards, digital displays, or content aggregators where information must stay current without manual updates.

🎨 Design

At the top of the page, a simple header features:

A logo (logo.jpg) on the left side

A centered title for clean symmetry and readability

The overall design follows a modern, minimalist aesthetic, ensuring excellent readability and balance on all screen sizes.

⚙️ Key Features

🕸️ Fetches live posts using the WordPress REST API

🆕 Displays the latest 10 posts (newest at the top)

🔁 Auto-refreshes hourly to keep data updated

🎞️ Smooth vertical auto-scroll animation

📱 QR codes next to each title for quick access

💻 Built using pure HTML, CSS, and JavaScript — no frameworks

🧠 Usage

Open the script.js file.

Locate the following line:

const targetSite = "Enter Web Site Address HERE";


Replace it with your WordPress site URL, for example:

const targetSite = "https://exampleblog.com";


Place logo.jpg in the same directory as index.html.

Open index.html in your browser — the app will start automatically.
