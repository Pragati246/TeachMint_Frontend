import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Directory from "./Component/Directory";
import ProfilePage from './Component/ProfilePage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Directory/>}/>
          <Route path="/ProfilePage/:userId" element={<ProfilePage/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;

