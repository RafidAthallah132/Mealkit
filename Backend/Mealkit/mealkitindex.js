const bcrypt = require ('bcrypt')
const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const { checkCredentials } = require('./config/database'); // Import the checkCredentials function
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ============= create data / insert data
// coba di postman --> (post, x-www-urlencoded)
app.post('/user', (req, res) => {

    console.log('datanya', req.body);
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO user_mealkit SET ?';
    console.log('coba create /input baru');
    console.log('datanya=', req.body);

    // jalankan query
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data user!', error: err });
        }

        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil insert data user!' });

    });
});


// ============= read data / get data
// coba di postman --> (get)
// app.get('/user', (req, res) => {
//     // buat query sql
//     const querySql = 'SELECT * FROM user_mealkit';
//     console.log('Ini GET' );

//     // jalankan query
//     koneksi.query(querySql, (err, rows, field) => {
//         // error handling
//         if (err) {
//             return res.status(500).json({ message: 'Ada kesalahan', error: err });
//         }

//         // jika request berhasil
//         res.status(200).json({ success: true, data: rows });
//     });
// });


// ========= get one record data
// coba di postman --> (get)
app.get('/user/:id', (req, res) => {
    // buat query sql
    const querySql = `SELECT * FROM user_mealkit WHERE id = ${req.params.id}`;
    console.log(`Request id = ${req.params.id}`) 
   

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, data: rows });
    });
});


// Fitur Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, 'request body')
    // if (!Email || !Password) {
    //     return res.status(400).json({ message: 'Please provide both email and password.' });
    // }

    // Query the user by email
    const querySql = 'SELECT * FROM user_mealkit WHERE LOWER(email) = LOWER(?)';
    koneksi.query(querySql, [email], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error in database query', error: err });
        }
        // Check if no user is found
        // if (rows.length === 0) {
        //     return res.status(401).json({ message: 'Invalid email or password.' });
        // }

        // const user = rows[0];

        // Compare the plain text password (this time we're not hashing, just comparing directly)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }


        if (user.role === 1) {
            // Admin user, redirect to the admin page
            return res.status(200).json({ success: true, message: 'Login successful! Redirecting to admin page.', role: 'admin' });
        } else {
            // Regular user, redirect to the user page
            return res.status(200).json({ success: true, message: 'Login successful! Redirecting to user page.', role: 'user' });
        }

        // Successfully authenticated user
        res.status(200).json({ success: true, message: 'Login successful!', user: user });


    
    });
});

/// Fitur Login
app.post('/confirmforgot', (req, res) => {
    const { Email, Username } = req.body;

    if (!Email || !Username) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    // Query the user by email
    const querySql = 'SELECT * FROM user_mealkit WHERE Email = ?';
    koneksi.query(querySql, [Email], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error in database query', error: err });
        }

        // Check if no user is found
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = rows[0];

        // Compare the plain text password (this time we're not hashing, just comparing directly)
        if (Username !== user.username) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        if (user.role === 1) {
            // Admin user, redirect to the admin page
            return res.status(200).json({ success: true, message: 'Login successful! wryyyyy Redirecting to admin page.', role: 'admin' });
        } else {
            // Regular user, redirect to the user page
            return res.status(200).json({ success: true, message: 'Login successful! RYYY Redirecting to user page.', role: 'user' });
        }
        // Successfully authenticated user
        res.status(200).json({ success: true, message: 'Login successful!', user: user });
    });
});

// });

// // update data 
// // coba di postman --> (put, body)
// app.put('/students/:nrp', (req, res) => {
//     // buat variabel penampung data dan query sql
//     const data = { ...req.body };
//     const querySearch = 'SELECT * FROM mahasiswa WHERE nrp = ?';
//     const queryUpdate = 'UPDATE mahasiswa SET ? WHERE nrp = ?';

//     // jalankan query untuk melakukan pencarian data
//     koneksi.query(querySearch, req.params.nrp, (err, rows, field) => {
//         // error handling
//         if (err) {
//             return res.status(500).json({ message: 'Ada kesalahan', error: err });
//         }

//         // jika id yang dimasukkan sesuai dengan data yang ada di db
//         if (rows.length) {
//             // jalankan query update
//             koneksi.query(queryUpdate, [data, req.params.nrp], (err, rows, field) => {
//                 // error handling
//                 if (err) {
//                     return res.status(500).json({ message: 'Ada kesalahan', error: err });
//                 }

//                 // jika update berhasil
//                 res.status(200).json({ success: true, message: 'Berhasil update data mahasiswa!' });
//             });
//         } else {
//             return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan!', success: false });
//         }
//     });
// });


// // delete data
// // coba di postman --> (delete)
// app.delete('/students/:nrp', (req, res) => {
//     // buat query sql untuk mencari data dan hapus
//     const querySearch = 'SELECT * FROM mahasiswa WHERE nrp = ?';
//     const queryDelete = 'DELETE FROM mahasiswa WHERE nrp = ?';

//     // jalankan query untuk melakukan pencarian data
//     koneksi.query(querySearch, req.params.nrp, (err, rows, field) => {
//         // error handling
//         if (err) {
//             return res.status(500).json({ message: 'Ada kesalahan', error: err });
//         }

//         // jika id yang dimasukkan sesuai dengan data yang ada di db
//         if (rows.length) {
//             // jalankan query delete
//             koneksi.query(queryDelete, req.params.nrp, (err, rows, field) => {
//                 // error handling
//                 if (err) {
//                     return res.status(500).json({ message: 'Ada kesalahan', error: err });
//                 }

//                 // jika delete berhasil
//                 res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
//             });
//         } else {
//             return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
//         }
//     });
// });

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
