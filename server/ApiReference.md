# Api References

## Controllers 🎮

1. Cart Controller
2. Login Controller
3. Food Controller
4. Order Controller
5. Restaurant Controller

### `Cart Controller 🛒`

Cart controller handler user cart apis

| Method   | Route            | req.body                        | description                   |
| -------- | ---------------- | ------------------------------- | ----------------------------- |
| `get`    | cart/get         | null                            | returns the user cart         |
| `post`   | cart/add         | foodId , quantity, restaurantId | Create a new or update a cart |
| `patch`  | cart/setquantity | foodId , quantity               | set quantity to foods         |
| `delete` | cart/delfood/:id | null                            | delete the cart food if exist |

### `Login Controller 👤`

Login controller handler user apis

| Method  | Route                     | req.body        | description                             |
| ------- | ------------------------- | --------------- | --------------------------------------- |
| `get`   | auth/google               | null            | login with google                       |
| `get`   | auth/google/callback      | null            | google callback                         |
| `get`   | auth/logout               | null            | destroy the session of user             |
| `get`   | auth/getUser              | null            | return a user if user session was exist |
| `post`  | auth/login                | email, password | Login the user and send session id      |
| `post`  | auth/signup               | email           | sends verification email                |
| `post`  | auth/setpassword/:token   | password        | sets password and return the user       |
| `post`  | auth/forgotpassword       | email           | sent a reset password email             |
| `post`  | auth/verify/:token        | null            | verify the user                         |
| `patch` | auth/resetpassword/:token | password        | reset the password                      |

### `Food Controller 🍔`

food controller handler food items apis

| Method   | Route    | req.body                                                        | description                 |
| -------- | -------- | --------------------------------------------------------------- | --------------------------- |
| `get`    | food/all | null                                                            | returns food                |
| `get`    | food/:id | null                                                            | returns food by id if exist |
| `post`   | food/new | state, price, description, open, close, title, category, images | Create a new food item      |
| `patch`  | food/:id | update                                                          | update the food item        |
| `delete` | food/:id | null                                                            | delete the food item        |

### `Order Controller 📈`

Order controller handler payment apis

| Method | Route          | req.body | description                           |
| ------ | -------------- | -------- | ------------------------------------- |
| `post` | order/checkout | null     | Create a new order and set paid to it |

### `Restaurant Controller` 🏨

Restaurant controller handler restaurant apis

| Method   | Route                    | req.body                                                                                                                                                  | description                                  |
| -------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `post`   | restaurant/new           | image, restaurantName, restaurantDescription, restaurantAddress,restaurantCity,restaurantState,restaurantZip,restaurantPhone,open,close,restaurantRegion, | Create a new restaurant                      |
| `post`   | restaurant/verify/:token | null                                                                                                                                                      | verify a new restaurant                      |
| `get`    | restaurant/:id           | null                                                                                                                                                      | return a restaurant                          |
| `get`    | restaurant/admin/:id     | null                                                                                                                                                      | return a restaurant info for admin dashboard |
| `patch`  | restaurant/:id           | update                                                                                                                                                    | update a restaurant                          |
| `delete` | restaurant/:id           | null                                                                                                                                                      | `delete` a restaurant                        |
| `get`    | restaurant/all           | null                                                                                                                                                      | return all verified restaurants              |

---
