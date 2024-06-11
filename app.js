const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mail = require('./models/Mail');
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');
const Manual = require('./models/Manual');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos MongoDB');
}).catch((error) => {
  console.error('Error al conectar a la base de datos MongoDB:', error);
});

app.post('/send-mail', async (req, res) => {
  const { recipient, subject, body } = req.body;

  const newMail = new Mail({ recipient, subject, body });

  try {
    await newMail.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      text: body
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo enviado y guardado en la base de datos');
  } catch (error) {
    res.status(500).send('Error al enviar el correo o guardar en la base de datos');
  }
});

// Rutas CRUD para vehículos
app.post('/vehicles', async (req, res) => {
  const { name, model, image, mark, description } = req.body;

  const newVehicle = new Vehicle({ name, model, image, mark, description });

  try {
    await newVehicle.save();
    res.status(201).send('Vehículo creado exitosamente');
  } catch (error) {
    res.status(500).send('Error al crear el vehículo');
  }
});

app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).send('Error al obtener los vehículos');
  }
});

app.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(404).send('Vehículo no encontrado');
    } else {
      res.status(200).json(vehicle);
    }
  } catch (error) {
    res.status(500).send('Error al obtener el vehículo');
  }
});

app.put('/vehicles/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) {
      res.status(404).send('Vehículo no encontrado');
    } else {
      res.status(200).json(updatedVehicle);
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el vehículo');
  }
});

app.delete('/vehicles/:id', async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      res.status(404).send('Vehículo no encontrado');
    } else {
      res.status(200).send('Vehículo eliminado exitosamente');
    }
  }
  catch (error) {
    res.status(500).send('Error al eliminar el vehículo');
  }
});

// Rutas CRUD para usuarios
app.post('/users', async (req, res) => {
  const { name, mail, password, vehicles } = req.body;

  const newUser = new User({ name, mail, password, vehicles });

  try {
    await newUser.save();
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('vehicles.idVehicle');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('vehicles.idVehicle');
    if (!user) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send('Error al obtener el usuario');
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send('Usuario no encontrado');
    } else {
      res.status(200).send('Usuario eliminado exitosamente');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario');
  }
});

// Rutas CRUD para manuales
app.post('/manuals', async (req, res) => {
  const {
    idVehicle, changeOil, changeBujia, changeTire, changeBattery,
    changeBrakes, changeAirFilter, changeLiquidBrakes, tiresAlignAndBalance,
    timingBeltReplacement, changeTransmissionLiquid
  } = req.body;

  const newManual = new Manual({
    idVehicle, changeOil, changeBujia, changeTire, changeBattery,
    changeBrakes, changeAirFilter, changeLiquidBrakes, tiresAlignAndBalance,
    timingBeltReplacement, changeTransmissionLiquid
  });

  try {
    await newManual.save();
    res.status(201).send('Manual creado exitosamente');
  } catch (error) {
    res.status(500).send('Error al crear el manual');
  }
});

app.get('/manuals', async (req, res) => {
  try {
    const manuals = await Manual.find().populate('idVehicle');
    res.status(200).json(manuals);
  } catch (error) {
    res.status(500).send('Error al obtener los manuales');
  }
});

app.get('/manuals/:id', async (req, res) => {
  try {
    const manual = await Manual.findById(req.params.id).populate('idVehicle');
    if (!manual) {
      res.status(404).send('Manual no encontrado');
    } else {
      res.status(200).json(manual);
    }
  } catch (error) {
    res.status(500).send('Error al obtener el manual');
  }
});

app.put('/manuals/:id', async (req, res) => {
  try {
    const updatedManual = await Manual.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedManual) {
      res.status(404).send('Manual no encontrado');
    } else {
      res.status(200).json(updatedManual);
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el manual');
  }
});

app.delete('/manuals/:id', async (req, res) => {
  try {
    const deletedManual = await Manual.findByIdAndDelete(req.params.id);
    if (!deletedManual) {
      res.status(404).send('Manual no encontrado');
    } else {
      res.status(200).send('Manual eliminado exitosamente');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar el manual');
  }
});

app.get('/',(req, res)=>{
    res.send("Hello world");
})

app.listen(3000, () =>{
    console.log("The server is running in the port ", 3000);
})