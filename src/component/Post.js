import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../FireBase/config';
import firebase from 'firebase';

const Post = ({ username, imageUrl, caption, postId,user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  //for comment.
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshort) => {
          setComments(snapshort.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  /*to submit the post after click post button */
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text:comment,
      username:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    //after post comment making empty for next comment.
    setComment("");
  }

  const charName = username.charAt(0);
  return (
    <div className="post">
      {/* header->avtar->username */}
      <div className="post__header">
        <Avatar className="post__avtar" alt="mickey" src="" >{charName}</Avatar>
        <h4 >{username}</h4>
      </div>
      {/* image */}
      <img className="post__image" src={imageUrl} />
      {/* username + caption */}
      <h5 className="post__text"><strong>{username}</strong> {caption}</h5>

      {/* display the comment */}
      <div className="post__comments">
        {
          comments.map(comment => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))
        }
      </div>
      {/* end the display */}

        {/* condition showing comment box  */}
        {user ? (
          <>
           {/* form for comment in post. */}
       <form className="post__commentBox">
       <input type="text" placeholder="Add a comment..."
         value={comment} onChange={(e) => setComment(e.target.value)}
         className="post__inputComment" />
       <button className="post__button" disabled={!comment} type="submit" onClick={postComment} >post</button>
     </form>
     </>
        ) : ""}
      
      
    </div>
  )
}

export default Post;
