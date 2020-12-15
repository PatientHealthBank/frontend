import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "./styles.css"
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles(theme => ({
  container: {
    bottom: 0
    // position: "fixed" // remove this so we can apply flex design
  },
  bubbleContainer: {
    width: "100%",
    display: "flex" //new added flex so we can put div at left and right side
    //check style.css for left and right classnaeme based on your data
  },
  bubble: {
    backgroundColor: '#abc02311',
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block"
    
  }
}));

const Comments = ({dummyData}) => {
  const classes = useStyles();

  const chatBubbles = dummyData.map((obj, i = 0) => (
      <>
    <div className={`${classes.bubbleContainer} ` +(obj.user ===1? "right-content" : "left-content")} key={i}>
    {obj.user === 2 &&
         <Avatar alt="Remy Sharp" src='/assets/images/avatars/doctor1.png' />}

      <div key={i++} className={classes.bubble}>
        <div className={classes.button}>{obj.message}</div>
        <div className={classes.button} style={{
    fontSize: '10px',
    textAlign: 'center'}}>{obj.date}</div>
      </div>
    </div>
    </>
  ));
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default Comments;
