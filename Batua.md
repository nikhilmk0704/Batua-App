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


### Get Active Users For Push Notification [GET /api/admin/activeuser/{id}]
        
+ Response 200 (application/json)
    
    + Body

            [
                {
                    "id": 1,
                    "name": "vikash baghel",
                    "phone": 9479897807,
                    "email": "vikash.baghel@tecsolsoftware.com",
                    "status": "Active",
                    "profileImageUrl": "url",
                    "userGroups": null
                },
                {
                    "id": 2,
                    "name": "Varsha Udasi",
                    "phone": 9876543210,
                    "email": "varsha.udasi@tecsolsoftware.com",
                    "status": "Active",
                    "profileImageUrl": "url",
                    "userGroups": null
                },
                {
                    "id": 3,
                    "name": "Kajal Anant Jadhav",
                    "phone": 9008952987,
                    "email": "kajal.jadhav@tecsolsoftware.com",
                    "status": "Active",
                    "profileImageUrl": "https://batua-test.s3.amazonaws.com/c92f8ae8-886f-4b25-ba43-ab445ec889e7.jpg",
                    "userGroups": null
                }
            ]
            
+ Response 400 (applicaiton)


### Send Push Notification To Active Users [PUT /api/admin/activeuser/notify]

+ Request (application/json)
 
    + Body
    
            {
                "id":[27,28,30],
                "message":"hello"
            }
        
+ Response 200 (application/json)
    
    + Body

            {
                "message": "Notification Sent"
            }
            
+ Response 400 (applicaiton)

### Cancel Payment [PUT /api/admin/transaction/cancel]

+ Request (application/json)
 
    + Body
    
            {
                "paymentId":1,
                "adminId":1,
                "cancellationDate":"2016-05-13T12:45:16.000Z",
                "cancellationDescription":"Cancelled"
            }
        
+ Response 200 (application/json)
    
    + Body

            {
                "id": 1,
                "initialAmount": 1000,
                "reducedAmount": 1110.48,
                "paidAmount": 9.52,
                "promocodeAmount": 0,
                "batuaCommission": 0,
                "merchantFee": 0,
                "isConfirmed": false,
                "isCancelled": true,
                "type": null,
                "cancellationDate": "2016-05-13T12:45:16.000Z",
                "cancellationDescription": "Cancelled",
                "createdAt": "2016-05-13T12:45:16.000Z",
                "updatedAt": "2016-05-20T06:08:24.000Z",
                "userId": 12,
                "adminId": 1,
                "promocodeId": 6,
                "offerDiscountId": null,
                "merchantId": 5,
                "paymentModeId": 1,
                "transactionDetailId": 1
            }
            
+ Response 400 (applicaiton)
    
            {   
                "errors":[
                    {
                        "message": "Already exist"
                    }
                ]
            }  

### Add Settlement [POST /api/admin/settlement]

+ Request (application/json)
 
    + Body
    
            {
                "name":"vikash",
                "date":"2016-05-10T13:18:48.000Z",
                "referenceNumber":"1234",
                "description":"hello",
                "merchantId":"12",
                "fromDate":"2016-05-26T05:39:46.000Z",
                "toDate":"2016-05-26T05:39:46.000Z"
            }
        
+ Response 200 (application/json)
    
    + Body

            {
                "id": 1,
                "name": "vikash",
                "date": "2016-05-10T13:18:48.000Z",
                "referenceNumber": "1234",
                "description": "hello",
                "updatedAt": "2016-05-26T05:39:46.000Z",
                "createdAt": "2016-05-26T05:39:46.000Z"
            }

+ Response 400 (applicaiton)
    
            {   
                "errors":[
                    {
                        "message": "Please provide Name"
                    }
                ]
            }  


### Get Payment Settlement report [GET /api/admin/payment/settlement?merchantId=12&fromDate=""&toDate=""]

+ Response 200 (application/json)

    + Body 
    
            [
                {
                    "id": 6,
                    "merchantName": "vikash",
                    "netTransactionAmount": 100000,
                    "netOfferAmount": 10000,
                    "netPromoOfferAmount": 10000,
                    "netCashbackByMerchant": 10000,
                    "netFeeCharged": 1000,
                    "netSettlementAmount":1000,
                    "status":"Open",
                    "createdAt": "2016-04-06T07:38:39.000Z",
                    "updatedAt": "2016-04-06T07:43:56.000Z"
                }
            ]
        
+ Response 404 (application/json)


### Get Payment Details report [GET /api/admin/payment/details?merchantId=12]

+ Response 200 (application/json)

    + Body 
    
            [
                {
                    "id": 6,
                    "user": "vikash",
                    "orderNumber": 100000,
                    "transactionId": 10000,
                    "transactionDate": "2016-04-06T07:38:39.000Z",
                    "transactionAmount": 10000,
                    "offerAmount": 1000,
                    "promoOfferAmount":1000,
                    "promoAmountByMerchant":1000,
                    "feeCharged":1000,
                    "amountCreditedToBatua":500,
                    "settlementAmount":10000
                    "createdAt": "2016-04-06T07:38:39.000Z",
                    "updatedAt": "2016-04-06T07:43:56.000Z"
                }
            ]
        
        
+ Response 404 (application/json)


### Get Transaction report [GET /api/admin/transaction/report?merchantId=12&fromDate=""&toDate=""&userId=12]

+ Response 200 (application/json)

    + Body 
    
            [
                {
                    "id": 6,
                    "merchantName":"manaf"
                    "userName": "vikash",
                    "orderNumber": 100000,
                    "transactionId": 10000,
                    "transactionDate": "2016-04-06T07:38:39.000Z",
                    "paymentAmount": 10000,
                    "cashbackByOffer":100,
                    "cashbackByPromo":200,
                    "amountCreditedToBatua":500,
                    "transactionCancelledBy":"admin1",
                    "transactionCancelledOn":"2016-04-06T07:38:39.000Z",
                    "cancellationDescription":"description",
                    "createdAt": "2016-04-06T07:38:39.000Z",
                    "updatedAt": "2016-04-06T07:43:56.000Z"
                }
            ]
    
        
+ Response 404 (application/json)


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
                "phone":9479897802,
                "type":"send"           // or "type":"resend"
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
                "message": "Phone Number Verified"
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
                "userGroup": "User",
                "isPinActivated":true,
                "isPinSet":true
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
                "userGroup": "User",
                "isPinActivated":true,
                "isPinSet":true
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
                "email": "vikash.baghel@tecsolsoftware.com",
                "isPinActivated":true,
                "isPinSet":true
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


### Set/Reset PIN [PUT /api/user/pin/reset]

+ Request (application/json)

    + Body
    
            {
                "userId":3,
                "pin":1234
            }
            
        
+ Response 200 (application/json)

        {
            "message":"PIN Reset"
        }
            
+ Response 400 (application/json)
    
        {
            "errors":[
                {
                    "message": "Invalid PIN"
                }
            ]
        }


### Change PIN [PUT /api/user/pin/change]

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


### Validate Promocode [POST /api/user/validatePromocode]

+ Request (application/json)

    + Body
    
            { 
                "promocode": "DEEVALI20",
                "merchantId":"8"
            }
            
        
+ Response 200 (application/json)

        [
            {
                "id": 1,
                "promocode": "DEEVALI20",
                "discountPercentage": 20,
                "description": "Clearance Sale",
                "maximumAmountLimit": 2500,
                "validFrom": "2016-05-01T11:03:12.000Z",
                "validTo": "2016-05-12T11:03:12.000Z",
                "percentageCostBourneByBatua": 5,
                "percentageCostBourneByMerchant": 2,
                "status": "Active",
                "createdAt": "2016-05-04T09:02:48.000Z",
                "updatedAt": "2016-05-04T09:02:48.000Z"
            }
        ]
            
+ Response 400 (application/json)
    
        {
            "errors":[
                        {
                            "message": "Promocode missing"
                        }
                    ]
        }


### Validate Offer [POST /api/user/validateOffer]

+ Request (application/json)

    + Body
    
            { 
                "merchantId":"8"
            }
            
        
+ Response 200 (application/json)

        [
            {
                "id": 13,
                "discountPercentage": 30,
                "description": "Clearance Duplicate Sale2",
                "maximumAmountLimit": 2500,
                "validFrom": "2016-05-05T11:03:12.000Z",
                "validTo": "2016-06-23T11:03:12.000Z",
                "status": "Active",
                "createdAt": "2016-05-03T11:58:00.000Z",
                "updatedAt": "2016-05-04T12:21:56.000Z"
            }
        ]
            
+ Response 400 (application/json)
    
        {
            "errors":[
                        {
                            "message": "Merchant ID deos not exist"
                        }
                    ]
        }

### Make Payment [POST /api/user/makePayment]

+ Request (application/json)

    + Body
    
            {
              "merchantId": "7",
              "paymentId": "pay_5SUr0HtJ3H2Z2d",
              "userId": "4",
              "amount": "1000",
              "paymentmodeId": "1",
              "status": "success",
              "offer": null,
              "promocode": {
                "id": 1,
                "promocode": "DEEVALI20",
                "discountPercentage": 10,
                "description": "Clearance Sale",
                "maximumAmountLimit": 50,
                "validFrom": "2016-05-01T11:03:12.000Z",
                "validTo": "2016-05-12T11:03:12.000Z",
                "percentageCostBourneByBatua": 5,
                "percentageCostBourneByMerchant": 2,
                "status": "Active",
                "createdAt": "2016-05-04T09:02:48.000Z",
                "updatedAt": "2016-05-04T09:02:48.000Z"
                }
            }
            
        
+ Response 200 (application/json)

        {
          "id": 48,
          "initialAmount": 1000,
          "reducedAmount": 550.5,
          "paidAmount": 499.5,
          "isConfirmed": false,
          "isCancelled": false,
          "type": null,
          "canccellationDate": null,
          "cancellationDescription": null,
          "createdAt": "2016-05-13T10:29:53.000Z",
          "updatedAt": "2016-05-13T10:29:53.000Z",
          "userId": 4,
          "promocodeId": 1,
          "offerDiscountId": null,
          "merchantId": 7,
          "paymentModeId": 1,
          "transactionDetailId": 96,
          "merchant": {
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
            "reviewersCount": null,
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
            "categoryId": 2
          },
          "user": {
            "id": 4,
            "name": "vikash",
            "phone": 123457685,
            "profileImageUrl": "url",
            "email": "nikhil@tecsolsoftware.com",
            "isPhoneVerified": false,
            "facebookId": null,
            "googleId": null,
            "batuaId": null,
            "password": null,
            "pin": null,
            "isPinActivated": false,
            "otp": null,
            "status": "Active",
            "latitude": null,
            "longitude": null,
            "locationUpdateTime": null,
            "createdAt": "2016-04-05T05:45:38.000Z",
            "updatedAt": "2016-04-05T05:45:38.000Z",
            "userGroupId": 3
          },
          "promocode": {
            "id": 1,
            "promocode": "DEEVALI20",
            "discountPercentage": 20,
            "description": "Clearance Sale",
            "maximumAmountLimit": 2500,
            "validFrom": "2016-05-01T11:03:12.000Z",
            "validTo": "2016-05-12T11:03:12.000Z",
            "percentageCostBourneByBatua": 5,
            "percentageCostBourneByMerchant": 2,
            "status": "Active",
            "createdAt": "2016-05-04T09:02:48.000Z",
            "updatedAt": "2016-05-04T09:02:48.000Z"
          },
          "offerDiscount": null,
          "transactionDetail": {
            "id": 96,
            "bankName": null,
            "orderNumber": "130520160096",
            "transactionId": "130520160096",
            "mode": null,
            "status": "success",
            "paymentId": "pay_5SUr0HtJ3H2Z2d",
            "amount": null,
            "additionalCharges": 0,
            "netAmountDebited": null,
            "bankReferenceNumber": null,
            "cardType": null,
            "cardNumber": null,
            "expiryDate": null,
            "createdAt": "2016-05-13T10:29:53.000Z",
            "updatedAt": "2016-05-13T10:29:53.000Z"
          },
          "paymentMode": {
            "id": 1,
            "paymentMode": "razorpay",
            "walletType": null,
            "createdAt": null,
            "updatedAt": null
          },
          "promocodeAmount": 50,
          "batuaCommission": 1,
          "merchantFee": 499.5
        }
            
+ Response 400 (application/json)
    
        {
          "errors": [
            {
              "message": "ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`batua`.`payments`, CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`promocodeId`) REFERENCES `Promocodes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)"
            }
          ]
        }


### Yes Bank Wallet Generate OTP [POST /api/user/yesbankwallet/generateotp]

+ Request (application/json)
            
    + Body
    
            {
                "phone":"9876543219"
            }

+ Response 200 (application/json)

        {
            "code": 0,
            "status_code": "SUCCESS",
            "message": "Generated One Time Password Successfully"
        }


### Yes Bank Wallet Verify OTP [POST /api/user/yesbankwallet/verifyotp]

+ Request (application/json)
            
    + Body
    
            {
                "phone":"9876543219",
                "otp":"111111"
            }

+ Response 200 (application/json)

            {
                "code": 0,
                "auth_token": "7a4ec066-eedf-48b1-8e2e-1e1d21edd03e",
                "balance": 7764.34,
                "status_code": "SUCCESS"
            }


### Yes Bank Wallet Execute Transaction [POST /api/user/yesbankwallet/executethirdpartypayment]

+ Request (application/json)
            
    + Body
    
            {
                "phone":"9876543219",
                "amount":100,
                "authToken":"7a4ec066-eedf-48b1-8e2e-1e1d21edd03e"
            }

+ Response 200 (application/json)

            {
                "code": 0,
                "message": "Amount Transferred Successfully",
                "yes_reference_number": "1wddw23232",
                "status_code": "SUCCESS",
                "merchant_reference_number":"ref0001"
            }


### Transaction History Us [GET /api/user/{:userId}/payment/history]

+ Response 200 (application/json)

    + Body
            
            [
                {
                    "id": 5,
                    "initialAmount": 20,
                    "reducedAmount": 0.6,
                    "paidAmount": 19.4,
                    "isConfirmed": false,
                    "isCancelled": false,
                    "type": null,
                    "cancellationDate": null,
                    "cancellationDescription": null,
                    "createdAt": "2016-05-13T13:43:17.000Z",
                    "updatedAt": "2016-05-13T13:43:17.000Z",
                    "userId": 70,
                    "promocodeId": null,
                    "offerDiscountId": null,
                    "merchantId": 120,
                    "paymentModeId": 1,
                    "transactionDetailId": 10,
                    "merchant":{
                                    "id": 120,
                                    "name": "swaram store",
                                    "shortcode": "swaram12"
                                },
                    "user":{
                                "id": 70,
                                "name": "arny"
                            },
                    "promocode": null,
                    "offerDiscount": null,
                    "transactionDetail":{
                                            "id": 10,
                                            "orderNumber": "130520160010",
                                            "transactionId": "130520160010"
                                        },
                    "paymentMode":  {
                                        "id": 1,
                                        "paymentMode": "razorpay",
                                        "walletType": null
                                    }
                    },
                {
                    "id": 6,
                    "initialAmount": 20,
                    "reducedAmount": 2.9,
                    "paidAmount": 17.1,
                    "isConfirmed": false,
                    "isCancelled": false,
                    "type": null,
                    "cancellationDate": null,
                    "cancellationDescription": null,
                    "createdAt": "2016-05-13T14:05:00.000Z",
                    "updatedAt": "2016-05-13T14:05:00.000Z",
                    "userId": 70,
                    "promocodeId": null,
                    "offerDiscountId": 26,
                    "merchantId": 82,
                    "paymentModeId": 1,
                    "transactionDetailId": 11,
                    "merchant":{
                                    "id": 82,
                                    "name": "kada shop",
                                    "shortcode": "KaDa1234"
                                },
                    "user":{
                                "id": 70,
                                "name": "arny"
                            },
                    "promocode": null,
                    "offerDiscount":{
                                        "id": 26,
                                        "discountPercentage": 10,
                                        "description": "Test Offer",
                                        "maximumAmountLimit": 2000,
                                        "validFrom": "2016-05-11T18:30:00.000Z",
                                        "validTo": "2016-05-20T18:30:00.000Z",
                                        "status": "Active",
                                        "createdAt": "2016-05-12T04:28:31.000Z",
                                        "updatedAt": "2016-05-12T04:28:31.000Z"
                                    },
                "transactionDetail":{
                                        "id": 11,
                                        "orderNumber": "130520160011",
                                        "transactionId": "130520160011"
                                    },
                    "paymentMode":  {
                                        "id": 1,
                                        "paymentMode": "razorpay",
                                        "walletType": null
                                    }
                }
            ]

+ Response 400 (application/json)


### Wallet/Recharge/Payment/Cashback [GET /api/user/{:userId}/wallet]

+ Response 200 (application/json)

    + Body
            
            {
                "balance": 14,
                "recharge": [
                    {
                      "id": 5,
                      "initialAmount": 20,
                      "reducedAmount": 0.6,
                      "paidAmount": 19.4,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T13:43:17.000Z",
                      "updatedAt": "2016-05-13T13:43:17.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": null,
                      "merchantId": 120,
                      "paymentModeId": 1,
                      "transactionDetailId": 10,
                      "merchant": {
                        "id": 120,
                        "name": "swaram store",
                        "shortcode": "swaram12"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": null,
                      "transactionDetail": {
                        "id": 10,
                        "orderNumber": "130520160010",
                        "transactionId": "130520160010"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    },
                    {
                      "id": 6,
                      "initialAmount": 20,
                      "reducedAmount": 2.9,
                      "paidAmount": 17.1,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T14:05:00.000Z",
                      "updatedAt": "2016-05-13T14:05:00.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": 26,
                      "merchantId": 82,
                      "paymentModeId": 1,
                      "transactionDetailId": 11,
                      "merchant": {
                        "id": 82,
                        "name": "kada shop",
                        "shortcode": "KaDa1234"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": {
                        "id": 26,
                        "discountPercentage": 10,
                        "description": "Test Offer",
                        "maximumAmountLimit": 2000,
                        "validFrom": "2016-05-11T18:30:00.000Z",
                        "validTo": "2016-05-20T18:30:00.000Z",
                        "status": "Active",
                        "createdAt": "2016-05-12T04:28:31.000Z",
                        "updatedAt": "2016-05-12T04:28:31.000Z"
                      },
                      "transactionDetail": {
                        "id": 11,
                        "orderNumber": "130520160011",
                        "transactionId": "130520160011"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    }
                ],
                "cashback": [
                    {
                      "id": 5,
                      "initialAmount": 20,
                      "reducedAmount": 0.6,
                      "paidAmount": 19.4,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T13:43:17.000Z",
                      "updatedAt": "2016-05-13T13:43:17.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": null,
                      "merchantId": 120,
                      "paymentModeId": 1,
                      "transactionDetailId": 10,
                      "merchant": {
                        "id": 120,
                        "name": "swaram store",
                        "shortcode": "swaram12"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": null,
                      "transactionDetail": {
                        "id": 10,
                        "orderNumber": "130520160010",
                        "transactionId": "130520160010"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    },
                    {
                      "id": 6,
                      "initialAmount": 20,
                      "reducedAmount": 2.9,
                      "paidAmount": 17.1,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T14:05:00.000Z",
                      "updatedAt": "2016-05-13T14:05:00.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": 26,
                      "merchantId": 82,
                      "paymentModeId": 1,
                      "transactionDetailId": 11,
                      "merchant": {
                        "id": 82,
                        "name": "kada shop",
                        "shortcode": "KaDa1234"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": {
                        "id": 26,
                        "discountPercentage": 10,
                        "description": "Test Offer",
                        "maximumAmountLimit": 2000,
                        "validFrom": "2016-05-11T18:30:00.000Z",
                        "validTo": "2016-05-20T18:30:00.000Z",
                        "status": "Active",
                        "createdAt": "2016-05-12T04:28:31.000Z",
                        "updatedAt": "2016-05-12T04:28:31.000Z"
                      },
                      "transactionDetail": {
                        "id": 11,
                        "orderNumber": "130520160011",
                        "transactionId": "130520160011"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    }
                ],
                "payment": [
                    {
                      "id": 5,
                      "initialAmount": 20,
                      "reducedAmount": 0.6,
                      "paidAmount": 19.4,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T13:43:17.000Z",
                      "updatedAt": "2016-05-13T13:43:17.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": null,
                      "merchantId": 120,
                      "paymentModeId": 1,
                      "transactionDetailId": 10,
                      "merchant": {
                        "id": 120,
                        "name": "swaram store",
                        "shortcode": "swaram12"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": null,
                      "transactionDetail": {
                        "id": 10,
                        "orderNumber": "130520160010",
                        "transactionId": "130520160010"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    },
                    {
                      "id": 6,
                      "initialAmount": 20,
                      "reducedAmount": 2.9,
                      "paidAmount": 17.1,
                      "isConfirmed": false,
                      "isCancelled": false,
                      "type": null,
                      "cancellationDate": null,
                      "cancellationDescription": null,
                      "createdAt": "2016-05-13T14:05:00.000Z",
                      "updatedAt": "2016-05-13T14:05:00.000Z",
                      "userId": 70,
                      "promocodeId": null,
                      "offerDiscountId": 26,
                      "merchantId": 82,
                      "paymentModeId": 1,
                      "transactionDetailId": 11,
                      "merchant": {
                        "id": 82,
                        "name": "kada shop",
                        "shortcode": "KaDa1234"
                      },
                      "user": {
                        "id": 70,
                        "name": "arny"
                      },
                      "promocode": null,
                      "offerDiscount": {
                        "id": 26,
                        "discountPercentage": 10,
                        "description": "Test Offer",
                        "maximumAmountLimit": 2000,
                        "validFrom": "2016-05-11T18:30:00.000Z",
                        "validTo": "2016-05-20T18:30:00.000Z",
                        "status": "Active",
                        "createdAt": "2016-05-12T04:28:31.000Z",
                        "updatedAt": "2016-05-12T04:28:31.000Z"
                      },
                      "transactionDetail": {
                        "id": 11,
                        "orderNumber": "130520160011",
                        "transactionId": "130520160011"
                      },
                      "paymentMode": {
                        "id": 1,
                        "paymentMode": "razorpay",
                        "walletType": null
                      }
                    }
                ]
            }

+ Response 400 (application/json)


### Contact Us [POST /api/user/contactus]

+ Request  (application/json)
    
    + Body

            {
                "email":"vikashcool1991@gmail.com",
                "query":"contact us query lies here !!!"
            }

+ Response 200 (application/json)

    + Body
            
            {
                "message": "Email Sent"
            }

+ Response 400 (application/json)


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

### Get Merchant For User [GET /api/user/:userId/merchant/{:id}/latitude/{:latitude}/longitude/{:longitude}]

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

    + Body
    
            {   
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }
    
+ Response 400 (application/json)


### Get Review By Id [GET /api/ratereview/{:id}]

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }
    
+ Response 400 (application/json)


+ Response 404 (application/json)


### Get Review By userId [GET /api/ratereview/user/{:userId}]

+ Response 200 (application/json)
    
    + Body
    
            [{   
                "id":1,
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }]
    
+ Response 400 (application/json)


+ Response 404 (application/json)


### Get Review By merchantId [GET /api/ratereview/merchant/{:merchantId}]

+ Response 200 (application/json)
    
    + Body
    
            [{   
                "id":1,
                "rating":4,
                "review":"give some review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }]
    
+ Response 400 (application/json)


+ Response 404 (application/json)

### Update Review [PUT /api/ratereview]

+ Request (application/json)

    + Body
    
            {   
                "id":1,
                "rating":5,
                "review":"give some new review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "rating":5,
                "review":"give some new review",
                "userId":23,
                "merchantId":12,
                "paymentId":21
            }
    
+ Response 400 (application/json)


### Delete Review [DELETE /api/ratereview/{id}]

+ Request (application/json)


+ Response 200 (application/json)
    
    
+ Response 400 (application/json)


+ Response 404 (application/json)


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
