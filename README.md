# Blog Aggregator CLI

This is a command-line RSS feed aggregator built with TypeScript and PostgreSQL.

It allows users to:
- register and log in
- add and follow RSS feeds
- scrape feeds and collect posts
- browse aggregated posts from the command line

This project is intended for developers who want a simple terminal-based tool for tracking content from multiple RSS feeds in one place.

## Requirements

To run the Blog Aggregator, you will need:

- Node.js
- npm
- PostgreSQL
- a configured PostgreSQL database
- a `.gatorconfig.json` config file

This is the expected path of the config file:
- macOS/Linux: ~/.gatorconfig.json
- Windows: C:\Users\YourName\.gatorconfig.json

## Installation 

1. Clone the repository:
    ```bash
    git clone https://github.com/CJOrtega/blog-aggregator.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Make sure PostgreSQL is installed and running.
4. Create a PostgreSQL database for the project.
5. Run database migrations. (npm run migrate)

## Configuration

Create a `.gatorconfig.json` file in your home directory:

```json
{
  "db_url": "your_postgres_connection_string",
  "current_user_name": ""
}
```

## Usage 

Use commands with:
```
npm run start <command> [arguments]
```

## Commands

- `register <name>`: create a new user
- `login <name>`: log in as an existing user
- `users`: list all users
- `addfeed <name> <url>`: add a new feed
- `feeds`: list all feeds
- `follow <url>`: follow a feed
- `following`: list feeds followed by the current user
- `unfollow <url>`: unfollow a feed
- `agg <time_between_reqs>`: continuously fetch posts from feeds. Expects a duration such as `20s`, `5ms`, `1h`, etc.
- `browse [limit]`: show "limit" number of posts. limit should be an integer.
