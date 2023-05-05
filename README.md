# Untis Book Rent Backend

This project is a REST API for a library management system, which allows users to manage books, book rentals, school classes, and user accounts.

## Features

- User authentication and authorization
- Book management
- Book rental management
- School class management

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= 14.x.x
- npm >= 6.x.x
- PostgreSQL >= 12.x.x
- TypeScript >= 4.x.x

### Installation

1. Clone the repository:

```bash
git clone git@github.com:Cylop/untis-book-rent-backend.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and set the environment variables as required.

```bash
ISBNDB_KEY=
ISBNDB_URL

NODE_ENV
PORT

DB_URL
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_DATABASE

SECRET_KEY

LOG_FORMAT
LOG_DIR

ORIGIN
```

4. Compile TypeScript files:

```bash
npm run build
```

5. Start the development server:

```bash
npm run dev
```


## Running the tests

Run the following command to execute the tests:

```bash
npm test
```


## Built With

- [Express](https://expressjs.com/) - Web framework for Node.js
- [TypeORM](https://typeorm.io/) - Object-relational mapping library for TypeScript and JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript

## Contributing

Please read the [CONTRIBUTING.md](#) file for details on the process for submitting pull requests to the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.



