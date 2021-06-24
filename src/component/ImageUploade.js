import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import firebase from 'firebase';
import { db, storage } from '../FireBase/config';

const ImageUploade = ({ username }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  //function for choose the file.
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //function for uploade the file.
  const handleUpload = (e) => {
    const uploadeTask = storage.ref(`images/${image.name}`).put(image);

    uploadeTask.on(
      "state_changed",
      (snapshort) => {
        //progress function...
        const progress = Math.round(
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function while uploading the file.
        console.log(error);
        alert(error.message);
      },
      () => {
        //final function for what happend after uploading a file.
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            //post image inside db.
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100"></progress>
      <TextField type="text" placeholder="Enter a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
      <TextField type="file" onChange={handleChange} />
      <Button disabled={!caption} onClick={handleUpload} >Upload</Button>
    </div>
  )
}

export default ImageUploade;
