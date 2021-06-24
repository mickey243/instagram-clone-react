import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const ProfileDetail =({user})=> {
    
    return (
        <>
        {user && (
             <div className="profileDetail">
             <Card className="profileDetail">
      <CardContent>
       <Avatar className="profileDetail__avtar" src="https://us.123rf.com/450wm/dvarg/dvarg1506/dvarg150600073/40964684-black-skull-and-cross-bones-on-yellow-background-as-sign-of-danger.jpg?ver=6">m</Avatar>
        <Typography  
        className="profileDetail__userName">
         {user.displayName}
        </Typography>
      </CardContent>
    </Card>
        </div>
        )}
       
        </>
    )
}

export default ProfileDetail;
