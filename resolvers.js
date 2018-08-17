var fetch = require("node-fetch");
var querystring = require('query-string');
const endpoint = 'https://api.gbif.org/v1'
const toJSON = res => res.json()
const getResults = res => res.results
const handleError = err => console.log(err)

// resolver functions

const occurrence = (root, { key }) => fetch(`${endpoint}/occurrence/${key}`)
    .then(toJSON)
const occurrences = (root, params) => {
    let ep = `${endpoint}/occurrence/search`
    if (params) {
        ep += '?' + querystring.stringify(params)
    }
    return fetch(ep).then(toJSON).then(getResults)
        .catch(handleError)
}
const occDataset = ({ datasetKey }) => fetch(`${endpoint}/dataset/${datasetKey}`)
    .then(toJSON)
    .catch(handleError)
const occTaxon = ({ taxonKey }) => fetch(`${endpoint}/species/${taxonKey}`)
    .then(toJSON)
    .catch(handleError)
const species = ({ key }) => fetch(`${endpoint}/species/${key}`)
    .then(toJSON)
    .catch(handleError)
const datasetOccurrences = ({ key }) => fetch(`${endpoint}/occurrence/search?datasetKey=${key}`)
    .then(toJSON)
    .then(getResults)
    .catch(handleError)
const dataset = (root, { key }) => fetch(`${endpoint}/dataset/${key}`)
    .then(toJSON)
    .catch(handleError)
const datasets = () => fetch(`${endpoint}/dataset`).then(toJSON)
    .then(getResults)
    .catch(handleError)
const event = (root, { datasetKey, eventID }) => {
    return fetch(`${endpoint}/occurrence/search?datasetKey=${datasetKey}&eventID=${eventID}`)
        .then(toJSON)
        .then(function (res) {
            let occurrence = res.results[0];
            return {
                eventID: occurrence.eventID,
                datasetKey: occurrence.datasetKey,
                parentEventID: occurrence.parentEventID,
                decimalLongitude: occurrence.decimalLongitude,
                decimalLatitude: occurrence.decimalLatitude,
                footprintWKT: occurrence.footprintWKT,
                footprintSRS: occurrence.footprintSRS,
                footprintSpatialFit: occurrence.footprintSpatialFit,
                coordinateUncertaintyInMeters: occurrence.coordinateUncertaintyInMeters,
                locality: occurrence.locality,
                countryCode: occurrence.countryCode,
                eventDate: occurrence.eventDate,
                sampleSizeUnit: occurrence.sampleSizeUnit,
                eventRemarks: occurrence.eventRemarks,
                samplingEffort: occurrence.samplingEffort,
                samplingProtocol: occurrence.samplingProtocol,
                basisOfRecord: occurrence.basisOfRecord,
                occurrenceCount: occurrences.count
            };
        })
        .catch(handleError)
}
const eventOccurrences = ({ datasetKey, eventID }) => fetch(`${endpoint}/occurrence/search?datasetKey=${datasetKey}&eventID=${eventID}`)
    .then(toJSON)
    .then(getResults)
    .catch(handleError)
const publisher = ({publishingOrganizationKey}) => fetch(`${endpoint}/organization/${publishingOrganizationKey}`)
.then(toJSON)
.catch(handleError)
module.exports = {
    Query: {
        occurrence,
        occurrences,
        dataset,
        datasets,
        species,
        event
    },
    Occurrence: {
        occDataset,
        occTaxon

    },
    Dataset: {
        datasetOccurrences,
        publisher
    },
    Event: {
        eventOccurrences
    }
}