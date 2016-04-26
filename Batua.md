FORMAT: 1A
HOST: http://52.36.228.74:1337

# Batua

Batua is a Payment Andriod Mobile Application targeting the general public users, using which payments can be made across merchants shops like restaurants, coffee shops etc.

## Admin API [/api/admin/]

### Admin Login [POST /api/admin/user/login]

+ Request (application/json)
            
    + Body

            {
                "email":"aditya@tecsolsoftware.com",
                "password":"123456"
            }
        
+ Response 200 (application/json)

            {
                "id": 7,
                "name": "Aditya",
                "email": "aditya@tecsolsoftware.com",
                "token": "0922QvJiT8DkZDtVuwrs6SoZ",
                "userGroup":"Admin"
            }

+ Response 400 (applicaiton)


### Admin Forgot Password [PUT /api/admin/user/forgotpassword]
    
+ Request  (application/json)

    + Body

            {
                "email": "username@domain.com"
            }

+ Response 200 (application/json)
    
    + Body
    
            {
                "message": "Email sent"
            }
            
+ Response 400 (application/json)

+ Response 404 (application/json)


### Admin Reset Password [PUT /api/admin/user/resetpassword]

+ Request  (application/json)

    + Headers
        
            Access-Token: "092B7NhDGwEwjf77xjaFJgeP"
            
    + Body

            {
                  "email":"vikash.baghel@tecsolsoftware.com",
                  "password":"123456"
            }

+ Response 200 (application/json)
 
            {
                "message": "Password reset"
            }
 
+ Response 400 (application/json)


### Admin Change Password [PUT /api/admin/user/changepassword]

+ Request  (application/json)
            
    + Body

            {
                "userId":1,
                "currentPassword":"1234567",
                "newPassword":"123456"
            }

+ Response 200 (application/json)
            
            {
                "message": "Password Changed"
            }
            
+ Response 400 (application/json)

            {
                "errors":[
                    {
                        "message": "Minimum Password Length is 6"
                    }
                ]
            }


### Create New User [POST /api/admin/user]

+ Request (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "profileImageUrl":"url",
                "userGroupId":1
            }
        
+ Response 201 (application/json)

            {   
                "id": 1,
                "name": "vikash singh",
                "email": "vikashcool1991@tecsolsoftware.com",
                "phone": 9479897807,
                "profileImageUrl": "url",
                "userGroupId": 1,
                "status": "Active",
                "updatedAt": "2016-04-07T10:57:57.000Z",
                "createdAt": "2016-04-07T10:57:57.000Z"
            }

+ Response 400 (applicaiton)

        {   
            "errors":[
                        {"message": "Already exist"}
                    ]
        }

### Get User List [GET /api/admin/user/{id}]
        
+ Response 200 (application/json)
    
    + Body
    
            {
                "id": 2,
                "name": "shubham",
                "phone": 123456785,
                "email": "shubham@tecsolsoftware.com",
                "status": "Active",
                "profileImageUrl": "url",
                "userGroups":{
                                "id": 3,
                                "name": "Field Sales Agent",
                                "createdAt": "2016-04-04T11:30:24.000Z",
                                "updatedAt": "2016-04-04T11:30:24.000Z"
                            }
            }

+ Response 400 (applicaiton)


### Update User [PUT /api/admin/user/]

+ Request (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {   
                "id":1,
                "name":"vikash singh",
                "phone":9876543210,
                "profileImageUrl":"url",
                "userGroupId":1
            }
        
+ Response 200 (application/json)

            {   
                "id": 1,
                "name": "vikash singh",
                "email": "vikashcool1991@tecsolsoftware.com",
                "phone": 9479897807,
                "profileImageUrl": "url",
                "userGroupId": 1,
                "status": "Active",
                "updatedAt": "2016-04-07T10:57:57.000Z",
                "createdAt": "2016-04-07T10:57:57.000Z"
            }

+ Response 400 (applicaiton)

        {   
            "errors":[
                        {
                            "message": "Already exist"
                        }
                    ]
        }        

### Activate/Suspend User [PUT /api/admin/user/setstatus]

+ Request (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "id":1,
                status:"Active"
            }
        
+ Response 200 (application/json)

            {   
                "id":1,
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "profileImageUrl":"url",
                "status":"Active"
            }

+ Response 400 (applicaiton)


### Admin Logout [PUT /api/admin/user/logout]

+ Request (application/json)
            
    + Header
    
            Access-Token:"092B7NhDGwEwjf77xjaFJgeP"
        
+ Response 200 (application/json)
    
    + Body

            {
                "message": "Logged out"
            }
            
+ Response 400 (applicaiton)


## Sales Agent API [/api/salesagent/]

### Sales Agent Normal Login [POST /api/salesagent/normal/login]

+ Request (application/json)
    
    + Body

            {
                "password":"123456",
                "email":"kajal.jadhav@tecsolsoftware.com",
                "deviceId":"device1"
            }
        
+ Response 200 (application/json)

            {
                "id": 3,
                "name": "Kajal Anant Jadhav",
                "email": "kajal.jadhav@tecsolsoftware.com",
                "token": "092slrhat8grS6hoE4DkhpvP",
                "profileImageUrl": "https://batua-test.s3.amazonaws.com/7512d4e3-3731-4699-a3fb-d60ee215fc6a.jpg",
                "phone": 9345246567,
                "userGroup": "Field Sales Agent"
            }

+ Response 401 (applicaiton)

            {
                "errors":[
                    {
                        "message": "Incorrect Password"
                    }
                ]
            }


### Sales Agent Social Login [POST /api/salesagent/social/login]

+ Request (application/json)
    
    + Body

            {
                "googleId":"123456",
                "email":"kajal.jadhav@tecsolsoftware.com",
                "deviceId":"device1"
            }
        
+ Response 200 (application/json)

            {
                "id": 3,
                "name": "Kajal Anant Jadhav",
                "email": "kajal.jadhav@tecsolsoftware.com",
                "token": "092slrhat8grS6hoE4DkhpvP",
                "userGroup": "Field Sales Agent",
                "profileImageUrl": "https://batua-test.s3.amazonaws.com/7512d4e3-3731-4699-a3fb-d60ee215fc6a.jpg",
                "phone": 9345246567,
            }

+ Response 401 (applicaiton)

            {
                "errors":[
                    {
                        "message": "Incorrect Email"
                    }
                ]
            }
            

### Sales Agent Forgot Password/Resend OTP [PUT /api/salesagent/forgotpassword]

+ Request  (application/json)

    + Body

            {
                "phone":"9479897807"
            }

+ Response 200 (application/json)

    + Body
            
            {
                "message": "OTP Sent"
            }

+ Response 401 (application/json)

    + Body
    
            {
                "errors":[
                    {
                        "message": "Incorrect Phone"
                    }
                ]
            }


### Sales Agent Reset Password [PUT /api/salesagent/resetpassword]

+ Request  (application/json)

    + Body

            {
                "userId":14,
                "password":"12345678"
            }

+ Response 200 (application/json)

    + Body
            
            {
                "message": "Password Reset"
            }

+ Response 400 (application/json)

    + Body
    
            {
                "errors":[
                    {
                        "message": "Incorrect Password"
                    }
                ]
            }


### Sales Agent OTP Verification [PUT /api/salesagent/verifyotp]

+ Request  (application/json)

    + Body

            {
                "otp": 123456,
                "phone":123457856,
                "deviceId":"device1"
            }

+ Response 200 (application/json)

    + Body
            
            {
                "userId": 14
            }

+ Response 401 (application/json)


### Salesagent Get Profile [GET /api/salesagent/{salesagentId}/profile]
    
+ Response 200 (application/json)

    + Body 
        
            {
                "id": 14,
                "name": "vikash",
                "profileImageUrl": "url",
                "email": "vikash.baghel@tecsolsoftware.com"
            }

+ Response 400 (application/json)


### Salesagent Update Profile [PUT /api/salesagent/{:salesagentId}/profile]

+ Request (application/json)

    + Body
    
            {
                "id":14,
                "name":"vikash singh",
                "profileImageUrl":"https://batua-test.s3.amazonaws.com/1d44bf1e-b507-43cd-8515-4f5211135373.jpg",
                "currentPassword":"1234567",
                "newPassword":"123456"
            }
            
        
+ Response 200 (application/json)

            {
                "id": 14,
                "name": "vikash singh",
                "email": "vikash.baghel@tecsolsoftware.com",
                "profileImageUrl": "https://batua-test.s3.amazonaws.com/1d44bf1e-b507-43cd-8515-4f5211135373.jpg",
                "phone": 123457856
            }

+ Response 400 (application/json)


### Sales Agent Logout [PUT /api/salesagent/logout]

+ Request  (application/json)
    
    + Header
    
            Access-Token:"092E8vstN81XjO62tJIPdnt6"
    
    + Body

            {
                "deviceId":"device1",
                "userId":14
            }

+ Response 200 (application/json)

    + Body
            
            {
                "message": "Logged out"
            }

+ Response 400 (application/json)


## User API [/api/user/]

### Normal Signup [POST /api/user/normal/signup]

+ Request (application/json)

    + Body
    
            {
                "phone":9876543211,
                "email":"abc@abc.com",
                "password":"123456"
            }
            
        
+ Response 201 (application/json)

            {
                "message":"Registered Successfuly.Please verify phone and Signin."
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Already Registered"
                    }
                ]
            }


### Social Signup [POST /api/user/social/signup]

+ Request (application/json)

    + Body
    
            {
                "email":"abcaa@abc.com",
                "name":"vikash",
                "googleId":"1234567"
            }
            
        
+ Response 201 (application/json)

            {
                "userId": 29
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Invalid Email"
                    }
                ]
            }


### Send OTP after Signup [PUT /api/user/signup/sendotp]

+ Request (application/json)

    + Body
    
            {
                "userId":28,
                "phone":9479897802
            }
            
        
+ Response 200 (application/json)

            {
                "message": "OTP Sent"
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Phone is already Registered"
                    }
                ]
            }


### OTP Verification after Signup [PUT /api/user/signup/verifyotp]

+ Request (application/json)

    + Body
    
            {
                "otp":442586,
                "phone":9479897802
            }
            
        
+ Response 200 (application/json)

            {
                "id": 28,
                "name": null,
                "email": "abca@abc.com",
                "profileImageUrl": null,
                "phone": 9479897802,
                "token": "093eGGfnGDvtstZ3juHxgeBH",
                "userGroup": "User"
            }
            
+ Response 401 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect OTP"
                    }
                ]
            }


### Normal Login [POST /api/user/normal/login]

+ Request (application/json)

    + Body
    
            {
                "userName":"abc@abc.com",
                "password":"123456",
                "deviceId":"device1"
            }
            
        
+ Response 200 (application/json)

            {
                "id": 27,
                "name": null,
                "email": "abc@abc.com",
                "profileImageUrl": null,
                "phone": 9876543211,
                "token": "093eJJO6uGSpP5bp0vuAR4vR",
                "userGroup": "User"
            }
            
+ Response 401 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Credentials"
                    }
                ]
            }


### Social Login [POST /api/user/social/login]

+ Request (application/json)

    + Body
    
            {
                "email":"abc@abc.com",
                "facebookId":"123456",
                "deviceId":"device1"
            }
            
        
+ Response 200 (application/json)

            {
                "id": 27,
                "name": null,
                "email": "abc@abc.com",
                "profileImageUrl": null,
                "phone": 9876543211,
                "token": "093eJJO6uGSpP5bp0vuAR4vR",
                "userGroup": "User"
            }
            
+ Response 401 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Credentials"
                    }
                ]
            }


### Forgot Password/Resend OTP [PUT /api/user/forgotpassword]

+ Request (application/json)

    + Body
    
            {
                "phone": "9479897807"
            }
            
        
+ Response 200 (application/json)

            {
                "message": "OTP Sent"
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Phone"
                    }
                ]
            }


### Verify OTP [PUT /api/user/verifyotp]

+ Request (application/json)

    + Body
    
            {
                "otp": 123456,
                "phone": 123457856,
                "deviceId": "device1"
            }
            
        
+ Response 200 (application/json)

            
            {
                "userId": 14
            }
            
+ Response 401 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect OTP"
                    }
                ]
            }


### Reset Password [PUT /api/user/resetpassword]

+ Request (application/json)

    + Body
    
            {
                "userId": 14,
                "password": "12345678"
            }
            
        
+ Response 200 (application/json)

            
            {
                "message": "Password Reset"
            }
            
+ Response 401 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Password"
                    }
                ]
            }


### Get Users Profile [GET /api/user/:userId/profile]
    
+ Response 200 (application/json)

    + Body 
        
            {
                "id": 14,
                "name": "vikash",
                "profileImageUrl": "url",
                "email": "vikash.baghel@tecsolsoftware.com"
            }

+ Response 400 (application/json)


### Update User Profile [PUT /api/user/profile]

+ Request (application/json)

    + Body
    
            {
                "id":14,
                "name":"vikash singh",
                "email":"vikash.baghel@tecsolsoftware.com",
                "profileImageUrl":"https://batua-test.s3.amazonaws.com/1d44bf1e-b507-43cd-8515-4f5211135373.jpg",
            }
            
        
+ Response 200 (application/json)

            {
                "id": 1,
                "name": "vikash",
                "phone": 9479897807,
                "profileImageUrl": "someUrl",
                "email": "vikash.baghel@tecsolsoftware.com",
                "isPinActivated": false
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Email Is One Time Editable"
                    }
                ]
            }


### Change Password [PUT /api/user/changepassword]

+ Request (application/json)

    + Body
    
            {
                "userId":30,
                "currentPassword":"1234567",
                "newPassword":"123456"
            }
            
        
+ Response 200 (application/json)

            {
                "message": "Password Changed"
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Current Password"
                    }
                ]
            }
            

### Update PIN Status [PUT /api/user/pin/status]

+ Request (application/json)

    + Body
    
            {
                "userId":1,
                "isPinActivated":true
            }
            
        
+ Response 200 (application/json)

        {
            "id": 1,
            "name": "vikash singh",
            "email": "vikash.baghel@tecsolsoftware.com",
            "profileImageUrl": "https://batua-test.s3.amazonaws.com/1d44bf1e-b507-43cd-8515-4f5211135373.jpg",
            "phone": 9479897807,
            "isPinActivated": true
        }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "isPinActivated should be Boolean"
                    }
                ]
            }


### PIN Login [PUT /api/user/pin/login]

+ Request (application/json)

    + Header
    
            Access-Token:"092E8vstN81XjO62tJIPdnt6"
    
    + Body
    
            {
                "userId":1,
                "pin":"1234",
                "deviceId":"device1"
            }
            
        
+ Response 200 (application/json)

            {
                "id": 1,
                "name": "vikash baghel",
                "email": "vikash.baghel@tecsolsoftware.com",
                "profileImageUrl": "url",
                "phone": 9479897807,
                "userGroup": "User"
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect PIN"
                    }
                ]
            }

            
### Forgot PIN [PUT /api/user/pin/forgot]

+ Request (application/json)

    + Body
    
            {
                "phone": "9479897807"
            }
            
        
+ Response 200 (application/json)

            {
                "message": "OTP Sent"
            }
            
+ Response 400 (application/json)
    
            {
                "errors":[
                    {
                        "message": "Incorrect Phone"
                    }
                ]
            }


### Reset PIN [PUT /api/user/pin/reset]

+ Request (application/json)

    + Body
    
            {
                "userId":3,
                "currentPin":4321,
                "newPin":1234
            }
            
        
+ Response 200 (application/json)

        {
            "message":"PIN Reset"
        }
            
+ Response 400 (application/json)
    
        {
            "errors":[
                {
                    "message": "New PIN should be 4 Digit Integer"
                }
            ]
        }


### Logout [PUT /api/user/logout]

+ Request  (application/json)
    
    + Header
    
            Access-Token:"092E8vstN81XjO62tJIPdnt6"
    
    + Body

            {
                "deviceId":"device1",
                "userId":14
            }

+ Response 200 (application/json)

    + Body
            
            {
                "message": "Logged out"
            }

+ Response 400 (application/json)


## Upload Image [/api/image/upload]

### Upload Image [POST /api/image/upload]

+ Request (multipart/form-data)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "image":$image,
            }
            
        
+ Response 200 (application/json)

        {
            "url" : "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png"
        }

+ Response 400 (application/json)
    

## User Groups [/api/usergroup/{id}]

### Create Group [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "Field Sales Agent"
                
            }
            
        
+ Response 201 (application/json)

        {
            "id":1,
            "name": "Field Sales Agent"
            
        }

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Get User Groups [GET]
        
+ Response 200 (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body 
        
            [
               {   
                    "id":"1"
                    "name": "Field Sales Agent,
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":"2"
                    "name": "super admin",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Update Group [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name": "Sales Agent"
                
            }
            
        
+ Response 200 (application/json)

        {
            "id":1,
            "name": "Sales Agent"
            
        }

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Delete Group [DELETE]

+ Request (/api/usergroup/{id})


+ Response 200 (application/json)


+ Response 400 (application/json)


## Create New Merchant [/api/merchant]

### Create Merchant [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "merchantName",
                "shortCode":"merchant123",
                "profileImageUrl":"someUrl",
                "email":"username@domain.com",
                "phone":9876543210,
                "imageGallery":[ "imageUrl1","imageUrl2","imageUrl3"],
                "fee":50,
                "categoryId":1,
                "cityId":1,
                "address":"give some address ",
                "pincode":485001,
                "latitude":17.7426
                "longitude":75.1546,
                "accountHolder": "vikash singh",
                "accountNumber":546879463132131644,
                "ifscCode":"hdfc10554",
                "branchName":"branch name of bank",
                "bankName":"HDFC",
                "status":"Drafted",
                "createdSalesId": 3
            }
            
        
+ Response 201 (application/json)

    
        
            {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            }

+ Response 400 (application/json)
    

+ Response 401 (application/json)

### Get Active Merchant [GET /api/merchant/:id?]

+ Response 200 (application/json)

            [
                {
                    "id": 1,
                    "name": "Kajal002",
                    "shortCode": "kajal002",
                    "profileImageUrl": null,
                    "phone": 9886543672,
                    "email": null,
                    "address": null,
                    "latitude": null,
                    "longitude": null,
                    "averageRating": null,
                    "fees": 50,
                    "bankName": "HDFC",
                    "branchName": "Kormanagala",
                    "accountHolder": "Kajal",
                    "accountNumber": 9876543210987654,
                    "ifscCode": "HDFC001",
                    "status": "Active",
                    "createdAt": "2016-04-04T11:31:06.000Z",
                    "updatedAt": "2016-04-04T11:31:06.000Z",
                    "locationId": 1,
                    "createdSalesId": 2,
                    "categoryId": 1
                }
            ]

+ Response 400 (application/json)
    
    + Body 
    
            {
                "errors":[
                    {
                        "message": "Does not exist"
                    }
                ]
            }

### Get Merchant For User [GET /api/user/:userId/merchant/:id?]

+ Response 200 (application/json)

            [    {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            },
                {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            }
            ]

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Get Merchant For sales Agent [GET /api/salesagent/:salesAgentId/merchant/:id?]

+ Response 200 (application/json)

        [    {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            },
                {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            }
            ]

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Get Merchant For Admin [GET /api/admin/:adminId/merchant/:id?]

+ Response 200 (application/json)

            [    {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            },
                {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            }
            ]

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Update Merchant [PUT /api/merchant]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":8,
                "name": "merchantName",
                "shortCode":"merchant123",
                "profileImageUrl":"someUrl",
                "email":"username@domain.com",
                "phone":9876543210,
                "imageGallery":[ "imageUrl1","imageUrl2","imageUrl3"],
                "fee":50,
                "categoryId":1,
                "cityId":1,
                "address":"give some address ",
                "pincode":485001,
                "latitude":17.7426
                "longitude":75.1546,
                "accountHolder": "vikash singh",
                "accountNumber":546879463132131644,
                "ifscCode":"hdfc10554",
                "branchName":"branch name of bank",
                "bankName":"HDFC",
                "status":"Active",
                "createdSalesId": 3
                
            }

+ Response 200 (application/json)
    
        {
                "id": 4,
                "name": "Kajal004",
                "shortCode": "kajal004",
                "profileImageUrl": "url",
                "phone": 9886543643,
                "email": null,
                "address": null,
                "latitude": null,
                "longitude": null,
                "averageRating": null,
                "fees": 50,
                "bankName": "HDFC",
                "branchName": "Kormanagala",
                "accountHolder": "Kajal",
                "accountNumber": 9876543210987654,
                "ifscCode": "HDFC001",
                "status": "Pending for approval",
                "createdAt": "2016-04-04T12:07:21.000Z",
                "updatedAt": "2016-04-04T12:07:21.000Z",
                "locationId": 4,
                "createdSalesId": 2,
                "categoryId": 1,
                "User":{
                            "id": 2,
                            "name": "shubham",
                            "phone": 123456785,
                            "email": "shubham@tecsolsoftware.com"
                        },
                "Galleries":[
                                {"id": 10, "url": "1", "type": "image",…},
                                {"id": 11, "url": "2", "type": "image",…},
                                {"id": 12, "url": "3", "type": "image",…}
                            ],
                "Category":{
                                "id": 1,
                                "name": "Restaurant",
                                "createdAt": "2016-04-04T11:28:25.000Z",
                                "updatedAt": "2016-04-04T11:28:25.000Z"
                            },
                "Location":{
                                "id": 4,
                                "area": null,
                                "pincode": 123456,
                                "createdAt": "2016-04-04T12:07:21.000Z",
                                "updatedAt": "2016-04-04T12:07:21.000Z",
                                "cityId": 1,
                                "City":{
                                            "id": 1,
                                            "name": "Ajmer",
                                            "state": null,
                                            "country": null,
                                            "createdAt": "2016-04-04T11:28:20.000Z",
                                            "updatedAt": "2016-04-04T11:28:20.000Z"
                                        }
                            }
            }

+ Response 400 (application/json)


+ Response 401 (application/json)

### Suspend/Activate/Permanent Suspend Merchant [PUT /api/merchant/setstatus]

+ Request  (application/json)

    + Body

            {
                "id":1,
                "status": "Active"
            }

+ Response 200 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Create Category [/api/category]

###  Create Category [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "categoryName"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "merchantName",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Category [GET /api/category/{id}]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name": "categoryName1",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "name": "categoryName2",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


###  Update Category [PUT /api/category]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   "id":1,
                "name": "categoryName3"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "categoryName3",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


###  Delete Category [DELETE]

+ Request (/api/category/{id}) 


+ Response 200 (application/json)
    
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## City [/api/city]

### Create City [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "city1",
                "state":"state",
                "country":"india"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "city1",
                "state":"state",
                "country":"india"
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update City [PUT /api/city]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   "id":1,
                "name": "city2",
                "state":"state",
                "country":"india"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "city2",
                "state":"state",
                "country":"india"
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get City [GET /api/city/{id}]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name": "city1",
                    "state":"state",
                    "country":"india"
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "name": "city2",
                    "state":"state",
                    "country":"india"
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete City [DELETE]

+ Request (/api/city/{id})


+ Response 200 (application/json)
    
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Rate & Review Merchant [/api/ratereview]

### Create Review [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Review [GET /api/ratereview/user/{userId}/merchant/{merchantId}]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "rating":4,
                    "review":"give some review",
                    "userId":   {
                                    "id":23,
                                    "name":"vikash singh",
                                    "profileImageUrl":"url",
                                    "createdAt": "2016-11-12T05:03:46.000Z",
                                    "updatedAt": "2016-11-12T05:03:46.000Z"
                                },
                    "merchantId":{
                                    "id":12,
                                    "name":"merchantName",
                                    "profileImageUrl":"url",
                                    "createdAt": "2016-11-12T05:03:46.000Z",
                                    "updatedAt": "2016-11-12T05:03:46.000Z"
                                }
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Review [PUT /api/ratereview]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "rating":5,
                "review":"give some new review",
                "userId":23,
                "merchantId":12
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "rating":5,
                "review":"give some new review",
                "userId":23,
                "merchantId":12
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Review [DELETE /api/ratereview/{id}]

+ Request (application/json)


+ Response 200 (application/json)
    
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Promocode Management [/api/promocode]

### Create Promocode [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            { 
                 "promocode": "DEEVALI20",
                 "discountPercentage":"20",
                 "description":"Clearance Sale",
                 "maximumAmountLimit":"2500",
                 "merchantId":[7,8],
                 "validFrom":"2016-04-27T11:03:12.000Z",
                 "validTo":"2016-04-29T11:03:12.000Z",
                 "percentageCostBourneByBatua":"5",
                 "percentageCostBourneByMerchant":"2"
            }

+ Response 201 (application/json)
    
    + Body
    
            {
                "status": "active",
                "id": 3,
                "promocode": "DEEVALI0",
                "discountPercentage": "0",
                "description": "Clearance Sale",
                "maximumAmountLimit": "2500",
                "validFrom": "2016-04-27T11:03:12.000Z",
                "validTo": "2016-04-29T11:03:12.000Z",
                "percentageCostBourneByBatua": "5",
                "percentageCostBourneByMerchant": "2",
                "updatedAt": "2016-04-05T05:41:58.000Z",
                "createdAt": "2016-04-05T05:41:58.000Z"
            }

+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Promocode [PUT /api/promocode/{id}]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            { 
                 "promocode": "DEEVALI12",
                 "discountPercentage":"12",
                 "description":"Clearance Sale",
                 "maximumAmountLimit":"1000",
                 "merchantId":[8],
                 "validFrom":"2016-05-27T11:03:12.000Z",
                 "validTo":"2016-05-29T11:03:12.000Z",
                 "percentageCostBourneByBatua":"5",
                 "percentageCostBourneByMerchant":"2"
            }

+ Response 200 (application/json)
    
    + Body
    
            {
                "id": 1,
                "promocode": "DEEVALI12",
                "discountPercentage": 12,
                "description": "Clearance Sale",
                "maximumAmountLimit": 1000,
                "validFrom": "2016-05-27T11:03:12.000Z",
                "validTo": "2016-05-29T11:03:12.000Z",
                "percentageCostBourneByBatua": 5,
                "percentageCostBourneByMerchant": 2,
                "status": "active",
                "createdAt": "2016-04-05T05:16:25.000Z",
                "updatedAt": "2016-04-05T12:15:22.000Z"
            }

    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Promocode [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {
                    "id": 1,
                    "promocode": "DEEVALI12",
                    "discountPercentage": 12,
                    "description": "Clearance Sale",
                    "maximumAmountLimit": 1000,
                    "validFrom": "2016-05-27T11:03:12.000Z",
                    "validTo": "2016-05-29T11:03:12.000Z",
                    "percentageCostBourneByBatua": 5,
                    "percentageCostBourneByMerchant": 2,
                    "status": "active",
                    "createdAt": "2016-04-05T05:16:25.000Z",
                    "updatedAt": "2016-04-05T12:15:22.000Z",
                    "merchants": [
                        {
                            "id": 8,
                            "name": "Kajal",
                            "shortCode": "kajal123",
                            "profileImageUrl": "url",
                            "phone": 9886432663,
                            "email": null,
                            "address": null,
                            "latitude": null,
                            "longitude": null,
                            "averageRating": null,
                            "fees": 50,
                            "bankName": "HDFC",
                            "branchName": "Kormanagala",
                            "accountHolder": "Kajal",
                            "accountNumber": 9876543210987654,
                            "ifscCode": "HDFC001",
                            "status": "Pending for approval",
                            "createdAt": "2016-04-05T05:14:21.000Z",
                            "updatedAt": "2016-04-05T05:14:21.000Z",
                            "locationId": null,
                            "createdSalesId": 2,
                            "categoryId": 2,
                            "MerchantsPromocodes": {
                                "id": 10,
                                "createdAt": "2016-04-05T12:15:22.000Z",
                                "updatedAt": "2016-04-05T12:15:22.000Z",
                                "merchantId": 8,
                                "promocodeId": 1
                            }
                        }
                    ]
                },
                {
                    "id": 2,
                    "promocode": "DEEVALI100",
                    "discountPercentage": 10,
                    "description": "Clearance Sale",
                    "maximumAmountLimit": 2500,
                    "validFrom": "2016-04-27T11:03:12.000Z",
                    "validTo": "2016-04-29T11:03:12.000Z",
                    "percentageCostBourneByBatua": 5,
                    "percentageCostBourneByMerchant": 2,
                    "status": "active",
                    "createdAt": "2016-04-05T05:32:46.000Z",
                    "updatedAt": "2016-04-05T05:32:46.000Z",
                    "merchants": [
                        {
                            "id": 7,
                            "name": "Hashim123",
                            "shortCode": "hashim1020",
                            "profileImageUrl": "url",
                            "phone": 2147483647,
                            "email": null,
                            "address": null,
                            "latitude": null,
                            "longitude": null,
                            "averageRating": null,
                            "fees": 50,
                            "bankName": "HDFC",
                            "branchName": "Kormanagala",
                            "accountHolder": "Kajal",
                            "accountNumber": 9876543210987654,
                            "ifscCode": "HDFC001",
                            "status": "Pending for approval",
                            "createdAt": "2016-04-05T05:11:31.000Z",
                            "updatedAt": "2016-04-05T05:11:31.000Z",
                            "locationId": null,
                            "createdSalesId": 2,
                            "categoryId": 2,
                            "MerchantsPromocodes": {
                                "id": 3,
                                "createdAt": "2016-04-05T05:32:46.000Z",
                                "updatedAt": "2016-04-05T05:32:46.000Z",
                                "merchantId": 7,
                                "promocodeId": 2
                            }
                        },
                        {
                            "id": 8,
                            "name": "Kajal",
                            "shortCode": "kajal123",
                            "profileImageUrl": "url",
                            "phone": 9886432663,
                            "email": null,
                            "address": null,
                            "latitude": null,
                            "longitude": null,
                            "averageRating": null,
                            "fees": 50,
                            "bankName": "HDFC",
                            "branchName": "Kormanagala",
                            "accountHolder": "Kajal",
                            "accountNumber": 9876543210987654,
                            "ifscCode": "HDFC001",
                            "status": "Pending for approval",
                            "createdAt": "2016-04-05T05:14:21.000Z",
                            "updatedAt": "2016-04-05T05:14:21.000Z",
                            "locationId": null,
                            "createdSalesId": 2,
                            "categoryId": 2,
                            "MerchantsPromocodes": {
                                "id": 4,
                                "createdAt": "2016-04-05T05:32:46.000Z",
                                "updatedAt": "2016-04-05T05:32:46.000Z",
                                "merchantId": 8,
                                "promocodeId": 2
                            }
                        }
                    ]
                },
                {
                    "id": 3,
                    "promocode": "DEEVALI0",
                    "discountPercentage": 0,
                    "description": "Clearance Sale",
                    "maximumAmountLimit": 2500,
                    "validFrom": "2016-04-27T11:03:12.000Z",
                    "validTo": "2016-04-29T11:03:12.000Z",
                    "percentageCostBourneByBatua": 5,
                    "percentageCostBourneByMerchant": 2,
                    "status": "active",
                    "createdAt": "2016-04-05T05:41:58.000Z",
                    "updatedAt": "2016-04-05T05:41:58.000Z",
                    "merchants": [
                        {
                            "id": 7,
                            "name": "Hashim123",
                            "shortCode": "hashim1020",
                            "profileImageUrl": "url",
                            "phone": 2147483647,
                            "email": null,
                            "address": null,
                            "latitude": null,
                            "longitude": null,
                            "averageRating": null,
                            "fees": 50,
                            "bankName": "HDFC",
                            "branchName": "Kormanagala",
                            "accountHolder": "Kajal",
                            "accountNumber": 9876543210987654,
                            "ifscCode": "HDFC001",
                            "status": "Pending for approval",
                            "createdAt": "2016-04-05T05:11:31.000Z",
                            "updatedAt": "2016-04-05T05:11:31.000Z",
                            "locationId": null,
                            "createdSalesId": 2,
                            "categoryId": 2,
                            "MerchantsPromocodes": {
                                "id": 5,
                                "createdAt": "2016-04-05T05:41:58.000Z",
                                "updatedAt": "2016-04-05T05:41:58.000Z",
                                "merchantId": 7,
                                "promocodeId": 3
                            }
                        },
                        {
                            "id": 8,
                            "name": "Kajal",
                            "shortCode": "kajal123",
                            "profileImageUrl": "url",
                            "phone": 9886432663,
                            "email": null,
                            "address": null,
                            "latitude": null,
                            "longitude": null,
                            "averageRating": null,
                            "fees": 50,
                            "bankName": "HDFC",
                            "branchName": "Kormanagala",
                            "accountHolder": "Kajal",
                            "accountNumber": 9876543210987654,
                            "ifscCode": "HDFC001",
                            "status": "Pending for approval",
                            "createdAt": "2016-04-05T05:14:21.000Z",
                            "updatedAt": "2016-04-05T05:14:21.000Z",
                            "locationId": null,
                            "createdSalesId": 2,
                            "categoryId": 2,
                            "MerchantsPromocodes": {
                                "id": 6,
                                "createdAt": "2016-04-05T05:41:58.000Z",
                                "updatedAt": "2016-04-05T05:41:58.000Z",
                                "merchantId": 8,
                                "promocodeId": 3
                            }
                        }
                    ]
                }
            ]

+ Response 400 (application/json)


+ Response 401 (application/json)


### Suspend/Activate/Permanent Suspend [PUT /api/promocode/{id}/status]

+ Request  (application/json)

    + Body

            {
                "status": "active"
            }

+ Response 200 (application/json)
    
    + Body
    
            {
                "id": 1,
                "promocode": "DEEVALI12",
                "discountPercentage": 12,
                "description": "Clearance Sale",
                "maximumAmountLimit": 1000,
                "validFrom": "2016-05-27T11:03:12.000Z",
                "validTo": "2016-05-29T11:03:12.000Z",
                "percentageCostBourneByBatua": 5,
                "percentageCostBourneByMerchant": 2,
                "status": "active",
                "createdAt": "2016-04-05T05:16:25.000Z",
                "updatedAt": "2016-04-05T13:22:58.000Z"
            }

+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Offer Discount Management [/api/offer]

### Create Offer Discount [POST /api/offer]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            { 
                 "discountPercentage":"20",
                 "description":"Clearance Sale",
                 "maximumAmountLimit":"2500",
                 "merchantId":[7,8],
                 "validFrom":"2016-04-27T11:03:12.000Z",
                 "validTo":"2016-04-29T11:03:12.000Z"
            }

+ Response 201 (application/json)
    
    + Body
    
            {
                "status": "Active",
                "id": 2,
                "discountPercentage": "20",
                "description": "Clearance Sale",
                "maximumAmountLimit": "2500",
                "validFrom": "2016-04-27T11:03:12.000Z",
                "validTo": "2016-04-29T11:03:12.000Z",
                "updatedAt": "2016-04-06T09:42:00.000Z",
                "createdAt": "2016-04-06T09:42:00.000Z"
            }

    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Offer Discount [PUT /api/offer/{id}]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            { 
                 "discountPercentage":"15",
                 "description":"Clearance Sale",
                 "maximumAmountLimit":"2500",
                 "merchantId":[8],
                 "validFrom":"2016-04-27T11:03:12.000Z",
                 "validTo":"2016-04-29T11:03:12.000Z"
            }

+ Response 200 (application/json)
    
    + Body
    
            {
                "id": 6,
                "discountPercentage": 15,
                "description": "Clearance Sale",
                "maximumAmountLimit": 2500,
                "validFrom": "2016-04-27T11:03:12.000Z",
                "validTo": "2016-04-29T11:03:12.000Z",
                "status": "active",
                "createdAt": "2016-04-06T07:38:39.000Z",
                "updatedAt": "2016-04-06T07:42:24.000Z"
            }

    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Offer Discount [GET /api/offer/{id}]

+ Response 200 (application/json)
    
    + Body
    
            {
                "id": 1,
                "discountPercentage": 20,
                "description": "Clearance Sale",
                "maximumAmountLimit": 2500,
                "validFrom": "2016-04-27T11:03:12.000Z",
                "validTo": "2016-04-29T11:03:12.000Z",
                "status": "Active",
                "createdAt": "2016-04-06T08:54:20.000Z",
                "updatedAt": "2016-04-06T08:54:20.000Z",
                "merchants": [
                    {
                        "id": 7,
                        "name": "Hashim123",
                        "shortCode": "hashim1020",
                        "profileImageUrl": "url",
                        "phone": 2147483647,
                        "email": null,
                        "address": null,
                        "latitude": null,
                        "longitude": null,
                        "averageRating": null,
                        "fees": 50,
                        "bankName": "HDFC",
                        "branchName": "Kormanagala",
                        "accountHolder": "Kajal",
                        "accountNumber": 9876543210987654,
                        "ifscCode": "HDFC001",
                        "status": "Pending for approval",
                        "createdAt": "2016-04-05T05:11:31.000Z",
                        "updatedAt": "2016-04-05T05:11:31.000Z",
                        "locationId": null,
                        "createdSalesId": 2,
                        "categoryId": 2,
                        "MerchantsOffers": {
                            "id": 1,
                            "createdAt": "2016-04-06T08:54:20.000Z",
                            "updatedAt": "2016-04-06T08:54:20.000Z",
                            "offerDiscountId": null,
                            "merchantId": 7,
                            "offerId": 1
                        }
                    },
                    {
                        "id": 8,
                        "name": "Kajal",
                        "shortCode": "kajal123",
                        "profileImageUrl": "url",
                        "phone": 9886432663,
                        "email": null,
                        "address": null,
                        "latitude": null,
                        "longitude": null,
                        "averageRating": null,
                        "fees": 50,
                        "bankName": "HDFC",
                        "branchName": "Kormanagala",
                        "accountHolder": "Kajal",
                        "accountNumber": 9876543210987654,
                        "ifscCode": "HDFC001",
                        "status": "Pending for approval",
                        "createdAt": "2016-04-05T05:14:21.000Z",
                        "updatedAt": "2016-04-05T05:14:21.000Z",
                        "locationId": null,
                        "createdSalesId": 2,
                        "categoryId": 2,
                        "MerchantsOffers": {
                            "id": 2,
                            "createdAt": "2016-04-06T08:54:20.000Z",
                            "updatedAt": "2016-04-06T08:54:20.000Z",
                            "offerDiscountId": null,
                            "merchantId": 8,
                            "offerId": 1
                        }
                    }
                ]
            }

        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Suspend/Activate/Permanent Suspend Offer Discount [PUT /api/offer/{id}/status]

+ Request  (application/json)

    + Body

            {
                "status": "Active"
            }

+ Response 200 (application/json)
    + Body 
    
            {
                "id": 6,
                "discountPercentage": 15,
                "description": "Clearance Sale",
                "maximumAmountLimit": 2500,
                "validFrom": "2016-04-27T11:03:12.000Z",
                "validTo": "2016-04-29T11:03:12.000Z",
                "status": "active",
                "createdAt": "2016-04-06T07:38:39.000Z",
                "updatedAt": "2016-04-06T07:43:56.000Z"
            }

+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Normal SignUp [/user/normalSignUp]

### Normal SignUp [POST]

+ Request (application/json)
    
    + Body

            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "password":"123456",
                "groupId":1,
                "deviceToken":"APA91bGl8H-kxi4eEVIcNHExgbsI5zB32Aj42340iAkL7_D6g2VYTlTvYDKIqfKeiX9eDswg7xFifVhOmrJtmRAtzviDKZEVlaq3FiWAzNB8jpyaEv8d22uH04MyUn_XwsUs4kwV88ZC"
            }
        
+ Response 201 (application/json)

            {
                "id": 1,
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dgfjsdgjkbdjkbvs",
                "profileImageUrl": null
            }

+ Response 400 (applicaiton)

        {
            "success": false,
            "message": "Already exist"
        }

## Social SignUp [/user/socialSignUp]

### Social SignUp [POST]

+ Request (application/json)
    
    + Body

            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "socialId": "hehdbdhbchvywegduahsjxnsajbcdjscvcbjdsbn@facebook.com",
                "socialType": "FACEBOOK",
                "profileImageUrl":"https://beatniks-s3.s3.amazonaws.com/e4207a81-2dd1-4c49-b4e5-0391380e235f.jpg",
                "deviceToken":"APA91bGl8H-kxi4eEVIcNHExgbsI5zB32Aj42340iAkL7_D6g2VYTlTvYDKIqfKeiX9eDswg7xFifVhOmrJtmRAtzviDKZEVlaq3FiWAzNB8jpyaEv8d22uH04MyUn_XwsUs4kwV88ZC"
            }
        
+ Response 201 (application/json)

            {
                "id": 1,
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dgfjsdgjkbdjkbvs",
                "profileImageUrl": "https://beatniws.com/e4207a81e235f.jpg"
            }

+ Response 400 (applicaiton)

        {
            "success": false,
            "message": "Already exist"
        }

## Mobile verification [/user/mobileVerification]

### Verify Mobile Number [POST]

+ Request (application/json)
    
    + Body

            {
                "phone": 9876543210,
                "otp": 123456
            }
            
+ Response 200 (application/json)

        {
            "success": true,
            "accessToken": "08yGxPpUNeRcF8UK18g0lnHW"
        }

+ Response 400 (applicaiton)

        {
            "success": false,
            "message": "Bad Request"
        }

## Login [/user/login]

### Login [POST]

+ Request (application/json)
    
    + Body

            {
                "email":"username@domain.com",
                "password":"123456",
                "deviceToken": "bdkjgbekjgbjksbgvjsnb",
                "groupId": 1
            }
            
+ Response 200 (application/json)

            {
                "id": 1,
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dgfjsdgjkbdjkbvs",
                "profileImageUrl": "https://beatniws.com/e4207a81e235f.jpg"
            }

+ Response 400 (applicaiton)

        {
            "success": false,
            "message": "Already exist"
        }

## PIN Login [/user/{id}/pinlogin]

### PIN Login [POST]

+ Request (application/json)
    
    + Body

            {
                "userId":24,
                "pin":1234,
                "deviceToken": "bdkjgbekjgbjksbgvjsnb",
                "groupId": 1
            }
            
+ Response 200 (application/json)

            {   
                "id":1,
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dhfvhjevfhjvbhgfvhsdvsjv"
            }

+ Response 400 (applicaiton)

            {
                "success": false,
                "message": "Bad Request"
            }
            

## Logout [/user/{id}/logout]

### Logout [PUT]

+ Request  (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "id": "1"
            }

+ Response 200 (application/json)
       

+ Response 400 (application/json)
    
            {
                "message":"Unable to logout"
            }

## Forgot Password [/user/forgotPassword]
    
    Used for resend otp also.
    
### forgotPassword [POST]

+ Request  (application/json)

    + Body

            {
                "mobile": 9876543210
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Set New Password [/user/setNewPassword]

### Set New Password [POST]

+ Request  (application/json)

    + Body

            {
                "mobile": 9876543210
                "newPassword" : "1234",
                "otp": 123456
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

 
+ Response 400 (application/json)





## Save PIN [/user/savePin]

### Save PIN [POST]

+ Request  (application/json)

    + Headers
        
             Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "userId": "1",
                "PIN" : "1234"
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

 
+ Response 400 (application/json)



## Reset PIN [/user/resetPin]

### Reset PIN [POST]

+ Request  (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "userId": "1",
                "currentPIN" : 1234,
                "newPIN" : 4321
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

 
+ Response 400 (application/json)



## Forgot PIN [/user/forgotPin]

### Forgot PIN [POST]

+ Request  (application/json)
    
    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "phone": 9876543210,
                "otp" : 753238,
                "newPIN" : "1234"
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

 
+ Response 400 (application/json)



## Push Notification [/user/notification]

### Create Notification [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "userId": [1,2,3,...],
                "message": "thanks for login"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "success":true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Payment Modes [/payment/modes]

### Create Payment Modes [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "name":"netbanking",
                "walletTypeId":null
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"netbanking",
                "walletTypeId":null
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Payment Mode [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name":"cards",
                "walletTypeId":null
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"cards",
                "walletTypeId":null
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Payment Mode [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name":"cards",
                    "walletTypeId":null
                },
                {   
                    "id":2,
                    "name":"wallets",
                    "walletTypeId": {
                                        "id":2,
                                        "name":"mobikwik",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    }
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Payment Mode [DELETE]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"cards",
                "walletTypeId":null
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Transaction History [/user/{id}/transaction/history]

### Get Transaction History [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
            
+ Response 400 (application/json)


+ Response 401 (application/json)


## Transaction Details [/user/{id}/transaction/{id}/details]

### Get Transaction Details [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## User Wallet Recharged List [/user/{id}/wallet/recharged]

### User Wallet Recharged List [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## User Wallet Payments List [/user/{id}/wallet/payments]

### User Wallet Payments List [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## User Wallet CashBack List [/user/{id}/wallet/cashback]

### User Wallet CashBack List [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Merchant Payment [/user/{id}/merchant/{id}/payment]

### Create Merchant Payment [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "amount":1000,
                "paymentModeId":2,
                "cardTypeId":1,
                "bankListId":null,
                "cardNumber":123456789101112,
                "expiresOn":"2026-11-12T05:03:46.000Z",
                "cvv":123,
                "userId":24,
                "merchantId":12,
                "promocode":"24556TY"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":4,
                "amount":1000,
                "paymentModeId":2,
                "cardTypeId":1,
                "bankListId":null,
                "cardNumber":123456789101112,
                "expiresOn":"2026-11-12T05:03:46.000Z",
                "cvv":123,
                "userId":24,
                "merchantId":12,
                "promocode":"24556TY"
                
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Merchant Payment Status  [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "netAmountDebited":712.5,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null
                                            
                                        },
                    "promocodeId":    {
                                            "id":1,
                                            "promocode":code1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "percentageCostBourneByBatua":10,
                                            "percentageCostBourneByMerchant":20,
                                            "merchantId":12,
                                            "statusId":2
                                            
                                        },
                    "offerDiscountId":    {
                                            "id":1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "merchantId":12,
                                            "statusId":2
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik"
                                                            }
                                            
                                        },
                    "promocodeId":    {
                                            "id":1,
                                            "promocode":code1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "percentageCostBourneByBatua":10,
                                            "percentageCostBourneByMerchant":20,
                                            "merchantId":12,
                                            "statusId":2
                                            
                                        },
                    "offerDiscountId":    {
                                            "id":1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "merchantId":12,
                                            "statusId":2
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Wallet Recharge Payment [/user/{id}/Wallet/payment]

### Create Wallet Recharge Payment [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "amount":1000,
                "paymentModeId":2,
                "cardTypeId":1,
                "bankListId":null,
                "cardNumber":123456789101112,
                "expiresOn":"2026-11-12T05:03:46.000Z",
                "cvv":123,
                "userId":24
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":4,
                "amount":1000,
                "paymentModeId":2,
                "cardTypeId":1,
                "bankListId":null,
                "cardNumber":123456789101112,
                "expiresOn":"2026-11-12T05:03:46.000Z",
                "cvv":123,
                "userId":24,
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Wallet Recharge Payment Status [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":4,
                                            "orderNumber":ABCD1234,
                                            "txnid":QWERTY1234,
                                            "netAmountDebited":712.5,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"visa",
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                        },
                    "merchantId":   {
                                        "id":2,
                                        "name":Pizza Hut",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "paymentModeId":    {
                                            "id":1,
                                            "name":"netbanking",
                                            "walletTypeId":null,
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "promocodeId":    {
                                            "id":1,
                                            "promocode":code1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "percentageCostBourneByBatua":10,
                                            "percentageCostBourneByMerchant":20,
                                            "merchantId":12,
                                            "statusId":2,
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "offerDiscountId":    {
                                            "id":1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "merchantId":12,
                                            "statusId":2,
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "amount":1000,
                    "reducedAmount":800,
                    "paidAmount":700,
                    "transactionId":    {
                                            "id":5,
                                            "orderNumber":BCD1234,
                                            "txnid":QWERT1234,
                                            "cardNumber":123456789101112",
                                            "bankName":"HDFC",
                                            "cardType":"RuPay",
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                        },
                    "merchantId":   {
                                        "id":3,
                                        "name":Pizza Hut",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "paymentModeId":    {
                                            "id":3,
                                            "name":"wallet",
                                            "walletTypeId": {
                                                                "id":2,
                                                                "name":"mobikwik",
                                                                "createdAt": "2016-11-12T05:03:46.000Z",
                                                                "updatedAt": "2016-11-12T05:03:46.000Z"
                                                            },
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "promocodeId":    {
                                            "id":1,
                                            "promocode":code1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "percentageCostBourneByBatua":10,
                                            "percentageCostBourneByMerchant":20,
                                            "merchantId":12,
                                            "statusId":2,
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "offerDiscountId":    {
                                            "id":1,
                                            "offerDiscountPercentage":40,
                                            "description":"grive some description",
                                            "maximumAmountLimit":1000,
                                            "validFrom":"2016-11-12T05:03:46.000Z",
                                            "validTo":"2017-11-12T05:03:46.000Z",
                                            "merchantId":12,
                                            "statusId":2,
                                            "createdAt": "2016-11-12T05:03:46.000Z",
                                            "updatedAt": "2016-11-12T05:03:46.000Z"
                                            
                                        },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Payment Settlement [/user/{id}/payment/settlement]

### Create [POST]

+ Request (application/json)

    + Body 
        
            {
                "merchantId":12,
                "date":"2016-11-12T05:03:46.000Z",
                "referenceNumber":1234567891547464,
                "description":"some description",
                "userId":24,
                "paymentId":5
            }
            
+ Response 201 (application/json)


+ Response 400 (application/json)


+ Response 401 (application/json)

                

                