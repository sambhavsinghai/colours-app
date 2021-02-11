import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from "./PaletteFooter";
import styles from './styles/PaletteStyles';



class singleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette,this.props.colorId);
        this.state = {format : "hex"}
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette,colorToFilterBy){
        let shades = [] ;
        let allColors = palette.colors;
        for(let Key in allColors){
            shades = shades.concat(
                allColors[Key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({format : val})
     }
    render() {
        const {format} = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const {classes} = this.props;
        const colorBox = this._shades.map(color =>(
            <ColorBox 
                key = {color.name}
                name = {color.name}
                background = {color[format]}
                showingFullPalette = {false}
            />
        ) )
        return (
            <div className = {classes.Palette}>
                <NavBar  handleChange = {this.changeFormat} showingAllColors = {false}/>
                <div className = {classes.colors}>
                {colorBox}
                <div className = {classes.goBack}>
                <Link to= {`/palette/${id}`} className = "back-button">Go Back</Link>
                </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />

            </div>
        )
    }
}
export default withStyles(styles)(singleColorPalette);