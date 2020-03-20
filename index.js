const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const request = require('request');
const cheerio = require("cheerio");

app.get('/allinfo', (req, res) =>

    request("https://www.worldometers.info/coronavirus/", function (error, response, body) {
        if (error) {
            res.send(response.statusCode);

        }

        var country = [];
        var $ = cheerio.load(body);
        const tempCases = $('div#maincounter-wrap').eq(0).text().split(':')[1].trim();
        const cases = parseInt(tempCases.replace(/,/g, ''), 10);
        const tempDeaths = $('div#maincounter-wrap').eq(1).text().split(':')[1].trim();
        const deaths = parseInt(tempDeaths.replace(/,/g, ''), 10);
        const tempRecovered = $('div#maincounter-wrap').eq(2).text().split(':')[1].trim();
        const recovered = parseInt(tempRecovered.replace(/,/g, ''), 10);
        $('tbody>tr').each(function (index, element) {


            country[index] = {};
            country[index]['country'] = $(element).find('td:nth-child(1)').text().trim();
            country[index]['totalCases'] = $(element).find('td:nth-child(2)').text().trim();
            country[index]['newCases'] = $(element).find('td:nth-child(3)').text().trim();
            country[index]['totalDeaths'] = $(element).find('td:nth-child(4)').text().trim();
            country[index]['newDeath'] = $(element).find('td:nth-child(5)').text().trim();
            country[index]['totalRecovered'] = $(element).find('td:nth-child(6)').text().trim();
            country[index]['activeCases'] = $(element).find('td:nth-child(7)').text().trim();
            country[index]['seriousCases'] = $(element).find('td:nth-child(8)').text().trim();
            country[index]['totalCasesperOneMillionPopulation'] = $(element).find('td:nth-child(9)').text().trim();

        });

        res.json(country);
    })


)
app.get('/globalinfo', (req, res) =>

    request("https://www.worldometers.info/coronavirus/", function (error, response, body) {
        if (error) {
            res.send(response.statusCode);
            alert(response.statusCode)
        }

        var country = [];
        var $ = cheerio.load(body);
        const tempCases = $('div#maincounter-wrap').eq(0).text().split(':')[1].trim();
        const cases = parseInt(tempCases.replace(/,/g, ''), 10);
        const tempDeaths = $('div#maincounter-wrap').eq(1).text().split(':')[1].trim();
        const deaths = parseInt(tempDeaths.replace(/,/g, ''), 10);
        const tempRecovered = $('div#maincounter-wrap').eq(2).text().split(':')[1].trim();
        const recovered = parseInt(tempRecovered.replace(/,/g, ''), 10);
        
        $('tbody>tr').each(function (index, element) {


            country[index] = {};
            country[index]= $(element).find('td:nth-child(1)').text().trim();

        });

        res.json({ cases: cases, deaths: deaths, recovered: recovered,country:country});
    })


)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))