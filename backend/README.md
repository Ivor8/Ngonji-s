# Ngonji Backend API

Backend API for Ngonji Holding Firm built with Node.js, Express, and MongoDB.

## Features

- RESTful API services for all entities
- Image upload support with Multer
- MongoDB data persistence
- Input validation with express-validator
- Error handling and logging
- CORS support
- Rate limiting
- File serving for uploaded images

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

5. Update the `.env` file with your MongoDB URI and other configuration

## Database Setup

The app will automatically connect to MongoDB using the URI provided in the `.env` file.

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Seeding the Database

To populate the database with sample data:
```bash
npm run seed
```

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio` - Create new portfolio item (with image upload)
- `PUT /api/portfolio/:id` - Update portfolio item (with image upload)
- `DELETE /api/portfolio/:id` - Delete portfolio item

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `PATCH /api/contacts/:id/toggle-read` - Toggle read status

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `PATCH /api/bookings/:id/status` - Update booking status

## Query Parameters

Most GET endpoints support these query parameters:
- `entity` - Filter by entity type (law, realestate, foundation, credit)
- `is_active` - Filter by active status (true/false)
- `is_featured` - Filter by featured status (true/false)
- `status` - Filter by status (pending, confirmed, cancelled, completed)

## File Uploads

Portfolio items support image uploads. Use `multipart/form-data` with an `image` field.

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- `400` - Validation errors
- `404` - Resource not found
- `500` - Server errors

## Rate Limiting

API is rate-limited to 100 requests per 15 minutes per IP address.

## Health Check

Check API status:
```bash
GET /api/health
```

## Folder Structure

```
backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── scripts/        # Database scripts
├── uploads/        # Uploaded files
├── server.js       # Express server
├── package.json    # Dependencies
└── .env            # Environment variables
```
