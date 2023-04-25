import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import SendCircleOutline from 'mdi-material-ui/SendCircleOutline'
import { useSession } from 'next-auth/react'

const Chat = () => {
  const session = useSession()
  const { data: user } = session
  const userInfo = user?.user.user

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' className='header-message'>
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
            <ListItem button key='RemySharp'>
              <ListItemIcon>
                <Avatar alt='Remy Sharp' src={userInfo.avatar} />
              </ListItemIcon>
              <ListItemText primary={userInfo.fullname}></ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Grid>
        <Grid item xs={9}>
          <List
            style={{
              height: '500px'
            }}>
            <ListItem key='1'>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align='right' primary="Hey man, What's up ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align='right' secondary='09:30'></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key='2'>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align='left' primary='Hey, Iam Good! What about you ?'></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align='left' secondary='09:31'></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key='3'>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align='right' primary="Cool. i am good, let's catch up!"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align='right' secondary='10:30'></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id='outlined-basic-email' label='Type Something' fullWidth />
            </Grid>
            <Grid xs={1} align='right'>
              <Fab color='primary' aria-label='add'>
                <SendCircleOutline />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
