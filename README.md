# **Digital Cow Hut**

## **Live Link: https://digital-cow-hut-weld.vercel.app/**

---

## Welcome route

- [Website Link](https://digital-cow-hut-weld.vercel.app/)

---

## Auth routes / Common routes

### Registration for user (post route)

- /api/v1/auth/signup [Link](https://digital-cow-hut-weld.vercel.app/api/v1/auth/signup)

- Need **name (firstName, lastName), phoneNumber, password, role, address, budget, income** from **req.body**

### Login (post route)

- /api/v1/auth/login [Link](https://digital-cow-hut-weld.vercel.app/api/v1/auth/login)

- Need **phoneNumber, password** from **req.body**

### Refresh token (post route)

- /api/v1/auth/refresh-token [Link](https://digital-cow-hut-weld.vercel.app/api/v1/auth/refresh-token)

- Need **refreshToken** from **req.cookies**

---

## Admin routes

### Create admin (post route)

- /api/v1/admins/create-admin [Link](https://digital-cow-hut-weld.vercel.app/api/v1/admins/create-admin)

- Need **name (firstName, lastName), phoneNumber, password, address** from **req.body**


- Need **phoneNumber, password** from **req.body**

### Get admin's own profile (get route)

- /api/v1/admins/my-profile [Link](https://digital-cow-hut-weld.vercel.app/api/v1/admins/my-profile)

- Need **jwt** from **req.headers.authorization** => (for admin)


---

## User routes

### Get all users (get route)

- /api/v1/users [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users)

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get single users (get route)

- /api/v1/users/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin)

### Delete users (delete route)

- /api/v1/users/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get own profile (get route)

- /api/v1/users/my-profile [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users/my-profile)

- Need **jwt** from **req.headers.authorization** => (for buyer, seller)

### Update own profile (patch route)

- /api/v1/users/my-profile [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users/my-profile)

- Need **updated profile info** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for buyer, seller)

### Update profile by admin (patch route)

- /api/v1/users/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **updated profile info** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for admin)

---

## Cow routes

### Create cow (post route)

- /api/v1/cows [Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows)

- Need cow **name, age, price,location, breed, weight, label** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for seller)

### Get all cows (get route)

- /api/v1/cows [Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows)

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

#### Pagination and Filtering routes of Cow listing

- api/v1/cows?page=1&limit=5 **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?page=1&limit=5)** => (Page {default: 1} and limit {default: 10})

- api/v1/cows?sortBy=price&sortOrder=asc **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc)** => (sortBy and sortOrder {default: asc})

- api/v1/cows?sortBy=price&sortOrder=desc **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?sortBy=price&sortOrder=desc)** => (sortBy and sortOrder)

- api/v1/cows?minPrice=2000&maxPrice=5000 **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?minPrice=2000&maxPrice=5000)** => (filter by minPrice {default: 0} and maxPrice {default: infinity})

- api/v1/cows?location=Dhaka **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?location=Dhaka)** => (accurate search from name/ location/ breed/ label/ category {case sensitive})

- api/v1/cows?searchTerm=udd **[Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows?searchTerm=udd)** => (any matching search from name/ location/ breed/ label/ category {case insensitive})

### Get single cow (get route)

- /api/v1/cows/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

### Update cow (patch route)

- /api/v1/cows/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows/:id)

- Need **jwt** from **req.headers.authorization** => (for seller)

- Need to be the owner of the cow

- Need **updated cow info** from **req.body**

- Need **id** from **req.params**

### Delete cow (delete route)

- /api/v1/cows/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/cows/:id)

- Need **jwt** from **req.headers.authorization** => (for seller)

- Need to be the owner of the cow

- Need **id** from **req.params**

---

## Order routes

### Create order (post route)

- /api/v1/orders [Link](https://digital-cow-hut-weld.vercel.app/api/v1/orders)

- Need **cowId** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for buyer)

- Cow can't be sold out before your order is placed.

- Need more budget than the cow price.

### Get all orders history (get route)

- /api/v1/orders [Link](https://digital-cow-hut-weld.vercel.app/api/v1/orders)

- Need **jwt** from **req.headers.authorization**

- admin can see all orders

- seller can see those orders which order contains his cow

- buyer can only see those orders for the cow's he has purchased

### Get single order history (get route)

- /api/v1/orders/:id [Link](https://digital-cow-hut-weld.vercel.app/api/v1/orders/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

- Need to be a admin or the specific buyer of this order or specific seller of this order

---

---

---

## Admin Login Info

- phoneNumber : 01521106448888

- password : 123456789

```json
{
  "phoneNumber": "01521106448888",
  "password": "123456789"
}
```

---

---

---
