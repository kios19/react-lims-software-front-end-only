import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Dash from './components/pages/Dash';
import Patients from './components/pages/Patients';
import AddPatient from './components/pages/AddPatient';
import Patientinfo from './components/pages/Patientinfo';
import Samples from './components/pages/Samples';
import EditPatient from './components/pages/EditPatient';
import Payments from './components/pages/Payments';
import Requests from './components/pages/Requests';
import Register from './components/pages/Register';
import User from './components/pages/User';
import GetTest from './components/pages/GetTest';
import Results from './components/pages/Results';
import AddTest from './components/pages/AddTest';
import AddSpecimen from './components/pages/AddSpecimen';
import Supplier from './components/pages/Supplier';
import AddPrint from './components/pages/Addprint';
import Order from './components/pages/Order';
import Initiate from './components/pages/Initiatetest';
import Initiate2 from './components/pages/InitiateTest2';
import GetForm from './components/pages/GetPrintForm';
import Savetest from './components/pages/SaveTest';
import Verifytest from './components/pages/VerifyTest';
import Resultpage from './components/pages/Resultpage';
import Resultpage2 from './components/pages/Resultsprint';
import Tokenfail from './components/pages/Tokenfail';
import Addtgroup from './components/pages/AddTestgrp';
import Addtcategory from './components/pages/AddTestcategory';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import Verify from './components/pages/ver';
import Pres from './components/pages/Pres';
import Patient from './components/pages/patientpage';
import Products from './components/pages/Products';
import Addproduct from './components/pages/Addproduct';
import Typis from './components/pages/Typis';
import Rejectsam from './components/pages/Rejectsample';
import Available from './components/pages/Availabletest';
import Ava from './components/pages/Avail2';
import AllRes from './components/pages/AllResults';
import Patrep from './components/pages/Patientrepo'
import PatrepHome from './components/pages/Patrephome'

function App() {
    return (
      <BrowserRouter>
  
          <Route path="/" component={ Home } exact></Route>
          <Route path="/ava" component={ Ava } exact></Route>
          <Route path="/pres" component={ Pres } exact></Route>
          <Route path="/verify" component={ Verify } exact></Route>
          <Route path="/403" component={ Tokenfail } exact></Route>
          <Route path="/dash" component={ Dash } exact></Route> 
          <Route path="/user" component={ User } exact></Route>
          <Route path="/tgroup" component={Addtgroup} exact></Route>
          <Route path="/tcategory" component={Addtcategory} exact></Route>
          <Route path="/results" component={ Results } exact></Route>
          <Route path="/results/resultspage" component={ Resultpage } exact></Route>
          <Route path="/results/resultspageog" component={ Resultpage2 } exact></Route>
          <Route path="/patients" component={ Patients} exact></Route>
          <Route path="/payments" component={ Payments} exact></Route>
          <Route path="/patient" component={ Patient} exact></Route>
          <Route path="/samples" component={ Samples } exact></Route>
          <Route path="/samples/reject" component={ Rejectsam } exact></Route>
          <Route path="/gettest" component={ GetTest } exact></Route>
          <Route path="/requests" component={ Requests } exact></Route>
          <Route path="/register" component={ Register } exact></Route>
          <Route path="/gettest/addtest" component={ AddTest } exact></Route>
          <Route path="/addspecimen" component={ AddSpecimen } exact></Route>
          <Route path="/patients/add" component={ AddPatient} exact></Route>
          <Route path="/patients/patientinfo" component={ Patientinfo } exact></Route>
          <Route path="/patients/patientinfo/edit" component={ EditPatient } exact></Route>
          <Route path="/inventory/addsupplier" component={ AddTest } exact></Route>
          <Route path="/inventory/suppliers" component={ Supplier } exact></Route>
          <Route path="/inventory/products" component={ Products } exact></Route>
          <Route path="/inventory/products/typis" component={ Typis } exact></Route>
          <Route path="/inventory/addproducts" component={ Addproduct } exact></Route>
          <Route path="/test/addprint" component={ AddPrint } exact></Route>
          <Route path="/test/order" component={ Order } exact></Route>
          <Route path="/test/printform" component={ GetForm } exact></Route>
          <Route path="/test/initiate" component={ Initiate } exact></Route>
          <Route path="/test/initiate2" component={ Initiate2 } exact></Route>
          <Route path="/test/savetest" component={ Savetest } exact></Route>
          <Route path="/test/verifytest" component={ Verifytest } exact></Route>
          <Route path="/reports/availabletest" component={ Available } exact></Route>
            <Route path="/reports/allresults" component={ AllRes } exact></Route>
            <Route path="/reports/patientrepo" component={ Patrep } exact></Route>
            <Route path="/reports/patientrepohome" component={ PatrepHome } exact></Route>
      </BrowserRouter>
    );
  
  }



export default App;
