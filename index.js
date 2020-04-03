const express = require('express');
const axios = require('axios');
const CSVToJSON = require('csvtojson');
const fsLibrary = require('fs');

// const app = express();

// const port = 3000;

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

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
    try {
        formattedData = await CSVToJSON()
            .fromFile('./cases.csv')
            .then((source) => {
                const index = source.find((area, index) => {
                    return (
                        area.county === 'Washoe' && area.date === '2020-04-02'
                    );
                });
                return index;
            });
    } catch (error) {
        console.log(error);
    }

    return formattedData;

    console.log(formattedData);
};

const washoe = async () => {
    const json = await toJSON();
    console.log(json);
};

washoe();
