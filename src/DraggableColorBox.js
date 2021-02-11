import React from 'react'
import { withStyles } from "@material-ui/styles";
import styles from './styles/DraggableColorBoxStyles.js';
import DeleteIcon from "@material-ui/icons/Delete"


function DraggableColorBox(props) {
    const {classes,handleClick,name,color} = props;
    return (
      
        <div 
            className = {classes.root} 
            style={{ backgroundColor:color}}>
                <div className = {classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    className ={classes.deleteIcon} 
                    onClick = {handleClick} 
                />
                </div>
        </div>
    
    )
}
export default withStyles(styles)(DraggableColorBox);
