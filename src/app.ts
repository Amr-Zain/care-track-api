import express from 'express';
import dotenv from'dotenv';  
import 'express-async-errors';
import userRouter from './routes/user';
import sessionRouter from './routes/session';
import patientRouter from './routes/patient';
import doctorRouter from'./routes/doctor';
import nurseRouter from './routes/nurse';
import clinicRouter from './routes/clinic';
import appointmentRouter from './routes/appointment';
//import receptionsistRouter from './routes/receptionsist';
//import searchRouter from './routes/search';
import auth from './middleware/authentication';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import connect from './datastore/connect';
dotenv.config({ path:__dirname+'\\src\\.env'});

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ extended: false, limit: '3mb' }));
app.use(auth);
app.use(express.static(path.join(__dirname,"../public")));
console.log(__dirname,"../public")

// routes 
/* app.post('/api/v1/upload', (req, res) => {
    res.send('Submitted')
  }) */ 
  
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sessions', sessionRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/clinics', clinicRouter);
app.use('/api/v1/nurses', nurseRouter);
app.use('/api/v1/appointmets', appointmentRouter);
//app.use('/api/v1/receptionsists', receptionsistRouter);
//app.use('/api/v1/search', searchRouter);

app.use(notFound);
app.use(errorHandler);

(function start(){
    //connect to the db
    connect();

    app.listen(PORT,()=>console.log(`app listening on port ${PORT}`))
})();