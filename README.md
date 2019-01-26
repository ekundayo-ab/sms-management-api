# SMS Management API

An API that models sending and receiving of messages between provided contacts.

### Requirements
- PostgreSQL
- NodeJS and NPM

### Installation
- Clone this repository `git clone`
- Rename `.env.sample` file to `.env` and include the postgres database credentials for your machine.
- `cd` into project directory on the terminal `cd sms-management-api`
- Install dependencies `npm install`

### Running the API
- Run project `npm run start-dev`
- To build for production do `npm run build`

### Tests
- To run tests do `npm test` or `npm run test`

### API Endpoints
Request type  | Endpoint                                    | Action
--------------|---------------------------------------------|--------------------------------------------------
GET           | /api/contacts                               | Get all contacts
GET           | /api/contacts/id                            | Get a single contact
POST          | /api/contacts                               | Create a new contact
DELETE	      | /api/contacts/id                            | Delete a contact
POST	        | /api/sms/send	                              | Send an SMS or Create an SMS
GET           | /api/sms/:smsId/read                        | Read an SMS or Get an SMS
