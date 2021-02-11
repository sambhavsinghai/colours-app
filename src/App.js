import React, { Component } from "react";
import {Route,Switch} from 'react-router-dom';
import seedColors from "./seedColors";
import Palette from "./Palette";
import {generatePalette} from './colorHelpers'
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import {TransitionGroup,CSSTransition} from 'react-transition-group'; 

import Page from './Page';


class App extends Component {
  constructor(props){
    super(props);
    const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {palettes : savePalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);

  }
  findPalette(id){
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  deletePalette(id){
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  savePalette(newPallette){
    this.setState({palettes : [...this.state.palettes,newPallette ] },
      this.syncLocalStorage
        );
  }

  syncLocalStorage(){
    window.localStorage.setItem("palettes",
          JSON.stringify(this.state.palettes)
        );
  }


  render(){
   
    return (
    <div>
      <Route 
        render ={({location}) =>(
      <TransitionGroup>
      <CSSTransition key = {location.key} classNames = 'page' timeout = {500}>
        <Switch location = {location} >
        <Route 
          exact
          path = "/palette/new"
          render={(routeProps) => (
            <Page> 
            <NewPaletteForm 
                savePalette={this.savePalette}
                palettes = {this.state.palettes}
                {...routeProps} 
             />
            </Page>
          )}
        />
        <Route 
            exact 
            path = "/palette/:paletteId/:colorId" 
            render={routeProps => (
              <Page>
              <SingleColorPalette 
                colorId = {routeProps.match.params.colorId}
                palette = { generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
               )}
              />
              </Page>
            )}
          />
          <Route 
            exact 
            path = "/" 
            render={routeProps => 
              <Page>
              <PaletteList 
                palettes = {this.state.palettes} 
                deletePalette = {this.deletePalette}
                 {...routeProps} 
              />
              </Page>
            } />
          <Route 
            exact 
            path  = "/palette/:id" 
            render={routeProps => (
              <Page>
              <Palette palettes = { generatePalette(
                this.findPalette(routeProps.match.params.id)
              )} />
              </Page>
            )}
          />
          <Route 
            
            render={routeProps => 
              <Page>
              <PaletteList 
                palettes = {this.state.palettes} 
                deletePalette = {this.deletePalette}
                 {...routeProps} 
              />
              </Page>
            } />
          
          
        </Switch>
        </CSSTransition>
      </TransitionGroup>
        )}
        />

    </div>
    );
  }
}

export default App;
