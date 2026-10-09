# CodeAlpha Restaurant Management System

A REST API for managing restaurant operations, including menu items, customer orders, tables, reservations, and inventory.

## Features

- Create and view menu items
- Place and retrieve orders
- Track order status
- Manage restaurant tables
- Create and manage table reservations
- Check table availability for a requested date and time
- Track inventory quantities and minimum stock levels
- Update inventory when order processing consumes stock
- Optional staff/admin access and reporting

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- joi
- bcryptjs and jsonwebtoken (if authentication is implemented)
- express-validator (if used for validation)

## Project Structure

```text
CodeAlpha_RestaurantManagement/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   ├── tableController.js
│   │   ├── reservationController.js
│   │   └── inventoryController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── loggerMiddleware.js
│   │   └── errorMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── menuItemModel.js
│   │   ├── orderModel.js
│   │   ├── orderItemModel.js
│   │   ├── tableModel.js
│   │   ├── reservationModel.js
│   │   └── inventoryModel.js
│   ├── routes/
│   │   ├── menuRoute.js
│   │   ├── orderRoute.js
│   │   ├── tableRoute.js
│   │   ├── reservationRoute.js
│   │   └── inventoryRoute.js
│   │   └── userRoute.js
│   ├── services/
│   │   ├── orderService.js
│   │   ├── reservationService.js
│   │   └── inventoryService.js
│   │   └── userService.js
│   └── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── README.md
```

## Requirements

- Node.js and npm
- A MongoDB database, local or hosted

## Installation

```bash
git clone https://github.com/Emmacfemi/CodeAlpha_RestaurantManagementSystem.git
cd CodeAlpha_RestaurantManagement
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password@cluster0.ysohavt.mongodb.net/
JWT_SECRET=ehsjfsbjsinfjbubfosbbubufbsj busbubusbubdjbjhdbjd
```

`JWT_SECRET` is required only if JWT authentication is implemented. Do not commit `.env` or share credentials.

## Run the Application

```bash
npm run dev
```

If the project does not define a development script, use the start command in `package.json`, for example:

```bash
npm start
```

## API Endpoints

These are suggested routes. Update the table to match the endpoints your code actually implements.

### Menu

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | List menu items |
| `GET` | `/api/menu/:id` | Get one menu item |
| `POST` | `/api/menu` | Create a menu item |
| `PUT` | `/api/menu/:id` | Update a menu item |
| `DELETE` | `/api/menu/:id` | Delete a menu item |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Place an order |
| `GET` | `/api/orders` | List orders (apply access controls as needed) |
| `GET` | `/api/orders/:id` | Get order details |
| `PUT` | `/api/orders/:id/status` | Update order status |

### Tables

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tables` | List tables |
| `GET` | `/api/tables/available` | Check available tables, if implemented |
| `POST` | `/api/tables` | Create a table |
| `PUT` | `/api/tables/:id` | Update a table |

### Reservations

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reservations` | Create a reservation |
| `GET` | `/api/reservations` | List reservations |
| `GET` | `/api/reservations/:id` | Get reservation details |
| `PUT` | `/api/reservations/:id` | Update a reservation |
| `DELETE` | `/api/reservations/:id` | Cancel a reservation |

### Inventory

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/inventory` | List inventory items |
| `GET` | `/api/inventory/:id` | Get inventory item details |
| `POST` | `/api/inventory` | Add an inventory item |
| `PUT` | `/api/inventory/:id` | Update inventory |
| `DELETE` | `/api/inventory/:id` | Delete an inventory item |

## Data Models

- **User** — customer or staff account, if accounts are implemented
- **MenuItem** — name, description, price, category, and availability
- **Order** — customer/reference, order items, total, status, and order type
- **OrderItem** — menu item reference, quantity, price at order time, and subtotal
- **Table** — table number, seating capacity, and status
- **Reservation** — customer, table, date/time, guest count, and status
- **Inventory** — ingredient/supply name, quantity, unit, minimum stock, and status

`OrderItem` is a supporting model that allows one order to contain multiple menu items.

## Core Business Rules

- Validate menu items and quantities before accepting an order.
- Check stock availability before reducing inventory.
- Avoid negative inventory quantities.
- Update inventory when an order is processed, according to the application's chosen stock-consumption rules.
- Check table availability for the requested reservation date and time; a table's current status alone may not represent availability for every future time slot.
- Validate reservation dates, guest counts, and table capacity.
- Restrict administrative operations if role-based access control is implemented.

## Testing

Use Postman, Insomnia, or `curl` to test menu CRUD, order creation and status updates, table availability, reservation conflicts, inventory changes, and invalid requests.

## Author

**CodeAlpha Backend Development Internship — Task 3**
