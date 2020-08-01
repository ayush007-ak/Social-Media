import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username , caption , imageUrl}){     /* Destructor with ES6 syntx*/
    return(
        <div className="post">
            <div className="post_header">
              <Avatar className="post_avatar"
              alt='ayush98'
              src="https://is2-ssl.mzstatic.com/image/thumb/Purple113/v4/95/4e/05/954e0568-9163-b46b-f610-e21b6131bf46/AppIcon-0-1x_U007emarketing-0-5-0-0-sRGB-85-220.png/246x0w.png"/> 

           <h3>{username}</h3>
            </div>

            
            
           

            <img className="post_image" src={imageUrl}/>

            {/* header -> avatar -> username*/}
    <h4 className="post_text"><strong> {username}</strong> {caption}</h4> 

        </div>
    )
}

export default Post;