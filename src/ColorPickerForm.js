import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {ChromePicker} from "react-color";

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = {currentcolor : "teal",newColorName : ""};
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique",value =>
            this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule("isColorUnique",value =>
            this.props.colors.every(
              ({color}) => color !== this.state.currentcolor
            )
        )
       
      }

    updateCurrentColor(newColor){
        this.setState({currentcolor : newColor.hex})
      }
      handleChange(evt){
        this.setState({[evt.target.name] : evt.target.value});
      }
      handleSubmit(){
        const newColor = {
            color : this.state.currentcolor,
            name : this.state.newColorName
          };
          this.props.addNewColor(newColor);
          this.setState({newColorName : ''});
      }
    render() {
        const {paletteIsFull,classes} = this.props;
        const {currentcolor,newColorName}=this.state;
        return (
            <div>
            <ChromePicker
            color = {currentcolor}
            onChangeComplete = {this.updateCurrentColor}
            className = {classes.picker}
          />
          <ValidatorForm 
            onSubmit={this.handleSubmit} 
            ref = "form" 
            instantValidate = {false}
          >
            <TextValidator
             value ={newColorName}
             className = {classes.colorNameInput}
             name = "newColorName"
             variant = "filled"
             margin = "normal"
             placeholder = "Color Name"
             onChange={this.handleChange}
             validators={["required","isColorNameUnique","isColorUnique"]}
             errorMessages={["This can Not be empty","color name must be unique","Color already used"]}
             />
             <Button
                variant='contained'
                type = "submit"
                color='primary'
                disabled = {paletteIsFull}
                className = {classes.addColor}
                style = {{backgroundColor : paletteIsFull ? 
                                            "gray" : currentcolor}}
              >
              {paletteIsFull ? "Palette Full" : "Add Color"}
              </Button>
          </ValidatorForm>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);