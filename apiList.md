# DevTinder APIs

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile
-PATCH /profile/edit (to edit name,gender etc)
-PATCH /profile/password

connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId


-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

userRouter
-GET /connections
-GET /user/requests
-GET /user/feed - Get you the profile of people 


Status: ignore, interested, accepted, rejected
