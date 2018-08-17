const { gql } = require('apollo-server');

module.exports = gql`

  type Occurrence {
    key: Int!
    scientificName: String
    decimalLatitude: Float
    decimalLongitude: Float
    datasetKey: String!
    eventID: String
    country: String
    taxonKey: Int!
    speciesKey: Int
    taxonRank: String
    recordedBy: String
    occDataset: Dataset
    occTaxon: Species
  }
  type Event {
    eventID: ID
    datasetKey: ID
    parentEventID: ID
    decimalLongitude: Float
    decimalLatitude: Float
    footprintWKT: String
    footprintSRS: String
    footprintSpatialFit: String
    coordinateUncertaintyInMeters: Int
    locality: String
    countryCode: String
    eventDate: String
    sampleSizeUnit: String
    eventRemarks: String
    samplingEffort: String
    samplingProtocol: String
    basisOfRecord: String
    occurrenceCount: Int
    eventOccurrences: [Occurrence]
  }
  type Organization {
      key: ID!
      title: String!
      description: String
  }
  type Dataset {
    key: ID!
    title: String
    publishingOrganizationKey: ID!
    datasetOccurrences: [Occurrence]
    publisher: Organization
  }
  type Species {
    key: Int!
    nubKey: Int
    speciesKey: Int
    kingdom: String
    phylum: String
    class: String
    order: String
    family: String
    genus: String
    species: String
    rank: String
    scientificName: String
    nameType: String
    parentKey: Int
  }

  type Query {
    occurrences (speciesKey: Int, taxonRank: String, country: String, eventID: String): [Occurrence]
    occurrence (key: Int!): Occurrence
    datasets: [Dataset]
    dataset (key: ID!): Dataset
    species (key: Int!): Species
    event (eventID: ID!, datasetKey: ID!): Event

  }

  schema {
    query: Query
  }
`;