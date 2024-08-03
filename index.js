import fs from 'node:fs'
import csv from 'csv-parser'

import { validators } from './utils/validators/index.js'
import { transformToCurrency } from './utils/transformers/transform_to_currency.js'

const readableStream = fs.createReadStream('data.csv')
const writableStream = fs.createWriteStream('errors.json')

const parseFile = csv()

const items = []

const errors = []

readableStream
  .pipe(parseFile.on('data', (chunck) => {
    
    if(validators(chunck)) {
       errors.push(chunck)
    }
  }))
  .pipe(transformToCurrency)
  .on('data', (chunck) => items.push(JSON.parse(chunck)))
  .on('error', (error) => console.log({error}))
  .on('end', () => {

    const objectErrors = {
      count: errors.length,
      errors
    }

    writableStream.write(JSON.stringify(objectErrors), (error) => {
      if(error) console.log(error)
    }) 
  })
  .on('finish', () => console.log('stream has been finished'))
