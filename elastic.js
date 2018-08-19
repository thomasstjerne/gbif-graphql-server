
function getCitations(datasetKey) {
    return {
        "query": {
          "bool": {
            "must": [
              {
                "match_all": {
                  
                }
              },
              {
                "bool": {
                  "should": [
                    {
                      "bool": {
                        "must": [
                          {
                            "range": {
                              "end": {
                                "gte": "now"
                              }
                            }
                          },
                          {
                            "term": {
                              "contentType": "event"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "terms": {
                        "contentType": [
                          "dataUse",
                          "literature",
                          "news",
                          "tool",
                          "document",
                          "project",
                          "programme",
                          "article"
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "term": {
                  "searchable": "true"
                }
              },
              {
                "term": {
                  "gbifDatasetKey": datasetKey
                }
              },
              {
                "term": {
                  "contentType": "literature"
                }
              }
            ]
          }
        },
        "aggregations": {
          "year": {
            "terms": {
              "field": "year",
              "size": 20
            }
          },
          "contentType": {
            "terms": {
              "field": "contentType",
              "size": 20
            }
          },
          "literatureType": {
            "terms": {
              "field": "literatureType",
              "size": 20
            }
          },
          "language": {
            "terms": {
              "field": "language",
              "size": 20
            }
          },
          "audiences": {
            "terms": {
              "field": "audiences",
              "size": 20
            }
          },
          "purposes": {
            "terms": {
              "field": "purposes",
              "size": 20
            }
          },
          "topics": {
            "terms": {
              "field": "topics",
              "size": 20
            }
          },
          "countriesOfResearcher": {
            "terms": {
              "field": "countriesOfResearcher",
              "size": 20
            }
          },
          "countriesOfCoverage": {
            "terms": {
              "field": "countriesOfCoverage",
              "size": 20
            }
          },
          "relevance": {
            "terms": {
              "field": "relevance",
              "size": 20
            }
          },
          "contractCountry": {
            "terms": {
              "field": "contractCountry",
              "size": 20
            }
          },
          "year_count": {
            "cardinality": {
              "field": "year"
            }
          },
          "contentType_count": {
            "cardinality": {
              "field": "contentType"
            }
          },
          "literatureType_count": {
            "cardinality": {
              "field": "literatureType"
            }
          },
          "language_count": {
            "cardinality": {
              "field": "language"
            }
          },
          "audiences_count": {
            "cardinality": {
              "field": "audiences"
            }
          },
          "purposes_count": {
            "cardinality": {
              "field": "purposes"
            }
          },
          "topics_count": {
            "cardinality": {
              "field": "topics"
            }
          },
          "countriesOfResearcher_count": {
            "cardinality": {
              "field": "countriesOfResearcher"
            }
          },
          "countriesOfCoverage_count": {
            "cardinality": {
              "field": "countriesOfCoverage"
            }
          },
          "relevance_count": {
            "cardinality": {
              "field": "relevance"
            }
          },
          "contractCountry_count": {
            "cardinality": {
              "field": "contractCountry"
            }
          }
        },
        "sort": [
          {
            "year": {
              "order": "desc",
              "missing": "_last",
              "unmapped_type": "date"
            },
            "created": {
              "order": "desc",
              "missing": "_last",
              "unmapped_type": "date"
            }
          }
        ],
        "indices_boost": [
          {
            "literature": 1
          },
          {
            "*": 10
          }
        ]
      }
}

module.exports = {
    getCitations: getCitations
}