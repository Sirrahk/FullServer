//The app will export a compenent so the uppercase A is needed
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//BrowerserRouter: brains of react-router, tells react-er how to behave and changes the components

import Header from './Header'
const Dashboard = () => <h2> Dashboard </h2>
const SurveyNew =() => <h2> SurveyNew </h2>
const Landing =() => <h2> Landing </h2>

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                  {/*  Header being placed above components means it will always be at the top of the page*/}
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                   
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;