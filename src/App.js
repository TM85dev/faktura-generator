import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './components/pdf';
import Navigation from './components/nav';
import Home from './components/index';
import Progress from './components/progress';
import Part2 from './components/part2';
import Part3 from './components/part3';
import { useSelector } from 'react-redux';

function App() {
  const data = useSelector(state => state);
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Progress />
            <Home />
          </Route>
          <Route exact path="/part2">
            <Progress />
            <Part2 />
          </Route>
          <Route exact path="/part3">
            <Progress />
            <Part3 />
          </Route>
          <Route exact path="/pdf">
            <div className="pdf-file">
              <PDFViewer width="100%" height="100%">
                <MyDocument data={data} />      
              </PDFViewer>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
