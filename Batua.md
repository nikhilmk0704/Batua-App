FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# Batua

Batua is a Payment Andriod Mobile Application targeting the general public users, using which payments can be made across merchants shops like restaurants, coffee shops etc.

# User Authentication

## User By Admin [/user]

### Create New User [POST]

+ Request (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "password":"123456",
                "profileImageUrl":"url",
                "groupId":1,
                "deviceToken":"APA91bGl8H-kxi4eEVIcNHExgbsI5zB32Aj42340iAkL7_D6g2VYTlTvYDKIqfKeiX9eDswg7xFifVhOmrJtmRAtzviDKZEVlaq3FiWAzNB8jpyaEv8d22uH04MyUn_XwsUs4kwV88ZC"
            }
        
+ Response 201 (application/json)

            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "profileImageUrl":"url",
                "accessToken": "dgfjsdgjkbdjkbvs"
            }

+ Response 400 (applicaiton)

        {
            "success": false,
            "message": "Already exist"
        }

### Get User List [GET]
        
+ Response 200 (application/json)
    
    + Body
    
            {
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dgfjsdgjkbdjkbvs",
                "groupId":  {
                                "id":1,
                                "name":"admin"
                            },
                "statusId": {
                                "id":1,
                                "name":"active"
                            }
            }

+ Response 400 (applicaiton)

        {
            "success": false
        }


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
                "name":"vikash singh",
                "email":"username@domain.com",
                "phone":9876543210,
                "accessToken": "dgfjsdgjkbdjkbvs"
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
                "phone":9876543210,
                "socialId": "hehdbdhbchvywegduahsjxnsajbcdjscvcbjdsbn@facebook.com",
                "socialType": "FACEBOOK",
                "profileImageUrl":"https://beatniks-s3.s3.amazonaws.com/e4207a81-2dd1-4c49-b4e5-0391380e235f.jpg",
                "password":"123456",
                "deviceToken":"APA91bGl8H-kxi4eEVIcNHExgbsI5zB32Aj42340iAkL7_D6g2VYTlTvYDKIqfKeiX9eDswg7xFifVhOmrJtmRAtzviDKZEVlaq3FiWAzNB8jpyaEv8d22uH04MyUn_XwsUs4kwV88ZC"
            }
        
+ Response 201 (application/json)

        {
            "success": true,
            "accessToken": "08yGxPpUNeRcF8UK18g0lnHW"
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
        
## Suspend/Activate/Permanent Suspend User [/user/{id}/status]

### Suspend/Activate/Permanent Suspend [PUT]

+ Request  (application/json)

    + Body

            {
                "id":1,
                "statusId": 3
            }

+ Response 200 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


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

    
## Admin Forgot Password [/admin/forgotPassword]
    
### Admin forgotPassword [POST]

+ Request  (application/json)

    + Body

            {
                "email": "username@domain.com"
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)

    

## OTP Verification [/user/otpverification]

### verify otp for forgotpassword [POST]

+ Request  (application/json)

    + Body

            {
                "mobile": 9876543210,
                "otp": 123456
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
                "newPassword" : "watro1234",
                "otp": 123456
            }

+ Response 201 (application/json)


+ Response 401 (application/json)

 
+ Response 400 (application/json)



## Reset Password [/user/resetPassword]

### Reset Password [PUT]

+ Request  (application/json)

    + Headers
        
            Access-Token: "ABCDEFGH12345678"
            
    + Body

            {
                "userId": "1",
                "currentPassword" : "currentPassword",
                "newPassword" : "newPassword"
            }

+ Response 200 (application/json)


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



## Profile Image Upload [/user/{id}/profile/Image]

### Upload Profile Image [PUT]

+ Request (multipart/form-data)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            $image
            
        
+ Response 200 (application/json)

        {
            "url" : "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png"
        }

+ Response 400 (application/json)
    

## Update Profile [/user/{id}/profile]

### Update Profile [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name": "updatedName",
                "profileImageUrl":"url",
                "groupId":2
                
            }
            
        
+ Response 200 (application/json)


+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Get Profile [GET]
    
+ Response 200 (application/json)

    + Body 
        
            {
                "userId":1,
                "name": "vikash",
                "profileImageUrl":"someUrl",
                "email":"abc@mail.com",
                "phone":9876543210
            }

+ Response 400 (application/json)
    

+ Response 401 (application/json)


## User Groups [/user/group]

### Create Group [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "Field Sales Agent"
                
            }
            
        
+ Response 201 (application/json)


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


## User Wallet [/user/{id}/wallet]

### Get User Wallet Balance [GET]

+ Response 200 (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body 
        
            {
                "id":1,
                "balance":1500
            }

+ Response 400 (application/json)
    

+ Response 401 (application/json)


## Create New Merchant [/merchant/{id}]

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
                "imageGallery":[ imageUrl1,imageUrl2,imageUrl3,...],
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
                "bankBranch":"branch name of bank",
                "bankListId":4,
                "statusId":1
            }
            
        
+ Response 201 (application/json)


+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Get Merchant [GET]

+ Response 200 (application/json)

            [    {
                    "name": "merchantName1",
                    "shortCode":"merchant123",
                    "profileImageUrl":"someUrl",
                    "email":"username@domain.com",
                    "phone":9876543210,
                    "imageGallery":[ imageUrl1,imageUrl2,imageUrl3,...],
                    "fee":5000,
                    "averageRating":4.5,
                    "categoryId":{
                                    "id":1,
                                    "name":"category1"
                                 },
                    "cityId":{
                                "id":1,
                                "name":"city1"
                             },
                    "address":"give some address ",
                    "pincode":485001,
                    "latitude":17.7426
                    "longitude":75.1546,
                    "bankDetailsId":  {
                                        "accountHolder": "vikash singh",
                                        "accountNumber":546879463132131644,
                                        "ifscCode":"hdfc10554",
                                        "bankBranch":"branch name of bank",
                                        "bankListId":   {
                                                            "id":1,
                                                            "name":"HDFC"
                                                        },
                                    },
                    "statusId":{
                                    "id":1,
                                    "name":"Active"
                                 }
                },
                {
                    "name": "merchantName2",
                    "shortCode":"merchant1234",
                    "profileImageUrl":"someUrl",
                    "email":"username@domain.com",
                    "phone":9876543210,
                    "imageGallery":[ imageUrl1,imageUrl2,imageUrl3,...],
                    "fee":5000,
                    "averageRating":4.5,
                    "categoryId":{
                                    "id":1,
                                    "name":"category1"
                                 },
                    "cityId":{
                                "id":1,
                                "name":"city1"
                             },
                    "address":"give some address ",
                    "pincode":485001,
                    "latitude":17.7426
                    "longitude":75.1546,
                    "bankDetailsId":  {
                                        "accountHolder": "Arnold",
                                        "accountNumber":546879463132131643,
                                        "ifscCode":"hdfc10554",
                                        "bankBranch":"branch name of bank",
                                        "bankListId":   {
                                                            "id":1,
                                                            "name":"SBI"
                                                        },
                                    },
                    "statusId":{
                                    "id":1,
                                    "name":"Active",
                                    "createdAt": "2016-11-12T05:03:46.000Z",
                                    "updatedAt": "2016-11-12T05:03:46.000Z"
                                 }
                }
            ]

+ Response 400 (application/json)
    

+ Response 401 (application/json)


### Update Merchant [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name": "merchantName",
                "shortCode":"merchant123",
                "profileImageUrl":"someUrl",
                "email":"username@domain.com",
                "phone":9876543210,
                "imageGallery":[ imageUrl1,imageUrl2,imageUrl3,...],
                "fee":5000,
                "categoryId":1,
                "cityId":1,
                "address":"give some address ",
                "pincode":485001,
                "latitude":17.7426
                "longitude":75.1546,
                "accountHolder": "vikash singh",
                "accountNumber":546879463132131644,
                "ifscCode":"hdfc10554",
                "bankBranch":"branch name of bank",
                "bankName":"HDFC",
                "statusId":1
            }

+ Response 200 (application/json)
    

+ Response 400 (application/json)


+ Response 401 (application/json)

## Suspend/Activate/Permanent Suspend Merchant [/merchant/{id}/status]

### Suspend/Activate/Permanent Suspend [PUT]

+ Request  (application/json)

    + Body

            {
                "id":1,
                "statusId": 3
            }

+ Response 200 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Create Category [/category/{id}]

###  Create Category [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "merchantName"
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


### Get Category [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name": "merchantName1",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "name": "merchantName2",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


###  Update Category [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   "id":1,
                "name": "merchantName3"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "merchantName3",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


###  Delete Category [DELETE]

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "merchantName3",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## City [/city/{id}]

### Create City [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "city1"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "city1",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update City [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   "id":1,
                "name": "city2"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "city2",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get City [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name": "city1",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "name": "city2",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete City [DELETE]

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
                "name": "city1",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Bank Lists [/bankList/{id}]

### Create Bank List [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "name": "HDFC"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "HDFC",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Bank List [GET]

+ Response 200 (application/json)
    
    + Body
    
            [    
                {   
                    "id":1,
                    "name": "HDFC",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "name": "SBI",
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Bank List [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {
                "id":1,
                "name": "HDFC"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name": "HDFC",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Bank List [DELETE]

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
                "name": "HDFC",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Rate & Review Merchant [/ratereview/{id}]

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
                "success": true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Review [GET]

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


### Update Review [PUT]

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
                "success": true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Review [DELETE]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "userId":23,
                "merchantId":12
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "success": true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Status [/status/{id}]

### Create Status [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "name":Active
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"Active",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Status [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name":active
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"active",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Status [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name":"active"
                },
                {   
                    "id":2,
                    "name":"suspend"
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Status [DELETE]

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
                "name":"active",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Contact Us [/contactus/{id}]

### Create ContactUs [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "email":"username@domain.com",
                "query":"write your query here",
                "userId":23
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "success": true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get ContactUs [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "email":"username@domain.com",
                    "query":"write your query here",
                    "userId":23,
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "email":"username@domain.com",
                    "query":"write your query here",
                    "userId":24,
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Status [DELETE]

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
                "email":"username@domain.com",
                "query":"write your query here",
                "userId":23,
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Promocode Management [/promocode]

### Create Promocode [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
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
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
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
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Promocode [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "promocode":newcode,
                "offerDiscountPercentage":40,
                "description":"grive some new description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "percentageCostBourneByBatua":10,
                "percentageCostBourneByMerchant":20,
                "merchantId":12,
                "statusId":2
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "promocode":newcode,
                "offerDiscountPercentage":40,
                "description":"grive some new description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "percentageCostBourneByBatua":10,
                "percentageCostBourneByMerchant":20,
                "merchantId":12,
                "statusId":2,
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Promocode [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "promocode":code1,
                    "offerDiscountPercentage":40,
                    "description":"grive some description",
                    "maximumAmountLimit":1000,
                    "validFrom":"2016-11-12T05:03:46.000Z",
                    "validTo":"2017-11-12T05:03:46.000Z",
                    "percentageCostBourneByBatua":10,
                    "percentageCostBourneByMerchant":20,
                    "merchantId":   {
                                        "id":14,
                                        "name":"merchantName",
                                        "address":"merchant's address",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "statusId": {
                                        "id":2,
                                        "name":"active"
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "promocode":code2,
                    "offerDiscountPercentage":40,
                    "description":"grive some description",
                    "maximumAmountLimit":1000,
                    "validFrom":"2016-11-12T05:03:46.000Z",
                    "validTo":"2017-11-12T05:03:46.000Z",
                    "percentageCostBourneByBatua":10,
                    "percentageCostBourneByMerchant":20,
                    "merchantId":   {
                                        "id":12,
                                        "name":"merchantName",
                                        "address":"merchant's address",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "statusId":     {
                                        "id":3,
                                        "name":"active"
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Promocode [DELETE]

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
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Suspend/Activate/Permanent Suspend Promocode [/promocode/{id}/status]

### Suspend/Activate/Permanent Suspend [PUT]

+ Request  (application/json)

    + Body

            {
                "id":1,
                "statusId": 3
            }

+ Response 200 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Offer Discount Management [/offerdiscount]

### Create Offer Discount [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "offerDiscountPercentage":40,
                "description":"grive some description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "merchantId":12,
                "statusId":2
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
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
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Offer Discount [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "offerDiscountPercentage":40,
                "description":"grive some new description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "merchantId":12,
                "statusId":2
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "offerDiscountPercentage":40,
                "description":"grive some new description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "merchantId":12,
                "statusId":2,
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Offer Discount [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "offerDiscountPercentage":40,
                    "description":"grive some description",
                    "maximumAmountLimit":1000,
                    "validFrom":"2016-11-12T05:03:46.000Z",
                    "validTo":"2017-11-12T05:03:46.000Z",
                    "merchantId":   {
                                        "id":14,
                                        "name":"merchantName",
                                        "address":"merchant's address",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "statusId": {
                                        "id":2,
                                        "name":"active"
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                },
                {   
                    "id":2,
                    "offerDiscountPercentage":40,
                    "description":"grive some description",
                    "maximumAmountLimit":1000,
                    "validFrom":"2016-11-12T05:03:46.000Z",
                    "validTo":"2017-11-12T05:03:46.000Z",
                    "merchantId":   {
                                        "id":12,
                                        "name":"merchantName",
                                        "address":"merchant's address",
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "statusId":     {
                                        "id":3,
                                        "name":"active"
                                        "createdAt": "2016-11-12T05:03:46.000Z",
                                        "updatedAt": "2016-11-12T05:03:46.000Z"
                                    },
                    "createdAt": "2016-11-12T05:03:46.000Z",
                    "updatedAt": "2016-11-12T05:03:46.000Z"
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Offer Discount [DELETE]

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
                "offerDiscountPercentage":40,
                "description":"grive some description",
                "maximumAmountLimit":1000,
                "validFrom":"2016-11-12T05:03:46.000Z",
                "validTo":"2017-11-12T05:03:46.000Z",
                "merchantId":12,
                "statusId":2,
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


## Suspend/Activate/Permanent Suspend Offer Discount [/offerdiscount/{id}/status]

### Suspend/Activate/Permanent Suspend [PUT]

+ Request  (application/json)

    + Body

            {
                "id":1,
                "statusId": 3
            }

+ Response 200 (application/json)


+ Response 401 (application/json)

        
+ Response 400 (application/json)


## Wallet Types [/wallet/types]

### Create Wallet Types [POST]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "name":"mobikwik"
            }

+ Response 201 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"mobikwiks",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Update Wallet Types [PUT]

+ Request (application/json)

    + Headers

            Access-Token: "ABCDEFGH12345678"

    + Body
    
            {   
                "id":1,
                "name":"mobikwik"
            }

+ Response 200 (application/json)
    
    + Body
    
            {   
                "id":1,
                "name":"mobikwik",
                "createdAt": "2016-11-12T05:03:46.000Z",
                "updatedAt": "2016-11-12T05:03:46.000Z"
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


### Get Wallet Types [GET]

+ Response 200 (application/json)
    
    + Body
    
            [
                {   
                    "id":1,
                    "name":"mobikwik"
                },
                {   
                    "id":2,
                    "name":"payUmoney"
                }
            ]
        
+ Response 400 (application/json)


+ Response 401 (application/json)


### Delete Wallet Types [DELETE]

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
                "success": true
            }
    
+ Response 400 (application/json)


+ Response 401 (application/json)


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


## Weekly LeaderBoard [/user/{id}/leaderboard/weekly]

### Get Weekly LeaderBoard [GET]

+ Response 200 (application/json)

    + Body
    
            [
                {
                    "name":"abcd1",
                    "count":10
                },
                {
                    "name":"abcd2",
                    "count":9
                },
                {
                    "name":"abcd3",
                    "count":8
                },
                {
                    "name":"abcd4",
                    "count":7
                },
                {
                    "name":"abcd5",
                    "count":6
                },
            ]
            
+ Response 400 (application/json)


+ Response 401 (application/json)


## Monthly LeaderBoard [/user/{id}/leaderboard/monthly]

### Get Monthly LeaderBoard [GET]

+ Response 200 (application/json)

    + Body
    
            [
                {
                    "name":"abcd1",
                    "count":10
                },
                {
                    "name":"abcd2",
                    "count":9
                },
                {
                    "name":"abcd3",
                    "count":8
                },
                {
                    "name":"abcd4",
                    "count":7
                },
                {
                    "name":"abcd5",
                    "count":6
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

                

                