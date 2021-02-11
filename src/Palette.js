import React, { Component } from 'react'
import ColorBox from './ColorBox.js'; 
import NavBar from './NavBar';
import PaletteFooter from "./PaletteFooter";
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';


class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {level : 500 , format : 'hex'};
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    

    changeLevel(level){
        this.setState({level})
    }
    changeFormat(val){
        this.setState({format : val})
     }
    render() {
        const {colors,paletteName,emoji,id} = this.props.palettes;
        const {classes} = this.props;
        const {level,format} = this.state;
        const ColorBoxes = colors[level].map(color => (
            <ColorBox 
                background = {color[format]} 
                name = {color.name} 
                key = {color.id }
                id = {color.id}
                paletteId = {id}
                showingFullPalette = {true}
                />
        ));
        return (
            <div className = {classes.Palette}>
            <NavBar 
                level={level} 
                changeLevel={this.changeLevel} 
                handleChange = {this.changeFormat}
                showingAllColors = {true}
                />
                
                <div className = {classes.colors}>
                    {ColorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
export default withStyles(styles)(Palette);