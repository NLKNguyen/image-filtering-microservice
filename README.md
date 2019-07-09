# Image Filtering Microservice

Given a public image URL as query parameter to a REST API, this server application will download the image, do some image processing, then deliver the processed image file. 

The response status codes are indicated closely to the REST API standard guidelines.

Written in Node.js using TypeScript language with Express framework. All image processing is done entirely in Node.js without extra dependency. 

Provided necessary configuration to transpile TypeScript to JavaScript and package for deploying on Amazon Web Services - Elastic Beanstalk

*A project for Udacity's Cloud Developer Nanodegree*

# Usage

Image Filtering endpoint: **HOST**`/filteredimage?image_url=`**IMAGE_URL**


Example:
```
http://image-filtering-microservice-dev.us-west-2.elasticbeanstalk.com/filteredimage?image_url=https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg
```

# Setup Local Node.js Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:


1. Install depedencies:
    - `npm install`
2. Run the development server:
    - `npm run dev`
3. Manually test the endpoints or use Postman with the provided config `cloud-cdnd-c2-final.postman_collection.json`


![Screenshot from 2019-07-08 17-14-19](https://user-images.githubusercontent.com/4667129/60850369-db26b900-a1a3-11e9-9846-7fd95cb7907a.png)
![Screenshot from 2019-07-08 17-14-01](https://user-images.githubusercontent.com/4667129/60850371-de21a980-a1a3-11e9-8271-e1dcdb925b8f.png)

Tip: *Edit Collection* in Postman to change the path of the variable HOST to test your deployed enpoint.
![Screenshot from 2019-07-08 16-33-52](https://user-images.githubusercontent.com/4667129/60850375-df52d680-a1a3-11e9-938e-12ae6ba715a9.png)




# Deploy to AWS Elastic Beanstalk

1. Set up AWS CLI and EB CLI with your appropriate credentials
2. Create deployment artifact *www/Archive.zip*:
    - `npm run build`
3. Create initial Elastic Beanstalk application:
    - `eb create`
    - For load balancer: choose *application*
    - Everything else can be default
    - Deployed location will show in the command output, otherwise, find in AWS console / Elastic Beanstalk (choose the correct region to see the deployed application)
    - Make sure the VPC of the application allows public inbound so that it can be accessible from the outside world
3. Whenever having new changes to deploy again:
    - `npm run build`
    - `eb deploy` 

# License MIT
Copyright © 2019 Nikyle Nguyen