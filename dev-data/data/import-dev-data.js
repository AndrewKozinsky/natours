
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
// Сформирую строку подключения к БД
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
// Подключение к БД
mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB connection successful!'));


// Чтение файла JSON
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Функция импортирующая данные в БД
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    }
    catch(err) {
        console.log(err);
    }
    process.exit();
};

// Функция удаляющая все данные из БД
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    }
    catch(err) {
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === '--import') importData();
else if(process.argv[2] === '--delete') deleteData();