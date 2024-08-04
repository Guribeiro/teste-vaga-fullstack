import fs from 'node:fs'
import csv from 'csv-parser'

import { transformToCurrency } from './utils/transformers/transform_to_currency.js'
import { streamValidator } from './utils/transformers/stream_validator.js'

const readableStream = fs.createReadStream('data.csv')
const parseFile = csv()

readableStream
  .pipe(parseFile)
    .on('error', (error) => console.log({error: error.message}))
  .pipe(streamValidator)
    .on('error', (error) => console.log({error: error.message}))
  .pipe(transformToCurrency)
    .on('error', (error) => console.log({error: error.message}))
    .on('finish', () => console.log('stream has been finished'))
