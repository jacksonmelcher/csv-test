const express = require('express');
const axios = require('axios');
const CSVToJSON = require('csvtojson');
const fsLibrary = require('fs');

const app = express();

const port = 3000;

const getData = async () => {
    let response;
    try {
        response = await axios.get(
            'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'
        );

        fsLibrary.writeFile('cases.csv', response.data, (error) => {
            // In case of a error throw err exception.
            if (error) throw err;
        });
    } catch (error) {
        console.log(error);
        return;
    }

    // console.log(toJSON());
};

const toJSON = async () => {
    let formattedData;
    let countyData = [];
    await getData();
    try {
        formattedData = await CSVToJSON()
            .fromFile('./cases.csv')
            .then((source) => {
                for (let i = 0; i < source.length; i++) {
                    if (source[i].county === 'Washoe') {
                        countyData.push(source[i]);
                    }
                }
                return countyData;
            });
    } catch (error) {
        console.log(error);
    }

    return formattedData;
};

// toJSON();

const washoe = async () => {
    const json = await toJSON();
    // console.log(json);
};

washoe();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
