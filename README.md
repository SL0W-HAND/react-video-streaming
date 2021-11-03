# React stream


## Description 
Here is the client-side or the frontend of the project node stream on which we are creating a video streaming app for node js, this readme explains the basics of the frontend app. for development the client-side and the backend works independently one each other, for production all in one I created a repository for that. ([link_to_compiled_repository](https://github.com/SL0W-HAND/node-stream)).

## Step by step 
This app needs the server-side ([link to server repository](https://github.com/SL0W-HAND/stream-express)) to work, for that reason the first you need is to set the config file.

```
src/ipConfig.js
```
In this config you need to write the IP with the port of the backend server, you should see the following by default.

```js
const serverIp = 'localhost:4000';
export default serverIp;
```
**note**:This app has two branches, the **main** branch is for developing the app, so for this one is needed the server address, and the other branch called **production** is only for creating the build folder of the app, and the build folder we will get to integrate with the backend for a production environment, so in the production branch, we are assuming that the front-end app is provided by the same server which we are connecting in the browser.

Essentially the two branches are identical except for the address in which we make the request, in the branch main the address includes the server address, and in the production, the request is to the same server.

Branch main:
```js
axios.get(`http://${ServerIp}/videos/1`, 
            {
				withCredentials: true,
            }
        )
```

Branch production:
```js
axios.get('/videos/1', 
            {
				withCredentials: true,
            }
        )
```


## Technical details

This project is created with react, and some libraries just like, sass for the style of the app, react-router to create a single page app with protected routes, and Redux that we use to create one global state of favourite videos.

The entrance of the app is the login page in which we need to put the password that we set on the back-end.
![login-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_login.png)

Next, we can see is the home page with the videos provided for the back-end.
![home-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_home2.png)


As well the page of player 
![player-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_player.png)
 
404
![404-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_404.png)



