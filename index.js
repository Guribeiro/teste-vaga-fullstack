import fs from 'node:fs'
import csv from 'csv-parser'

import { validators } from './utils/validators/index.js'
import { transformToCurrency } from './utils/transformers/transform_to_currency.js'

const readableStream = fs.createReadStream('data.csv')

const parseFile = csv()

const items = []

readableStream
  .pipe(parseFile.on('data', validators))
  .pipe(transformToCurrency)
  .on('data', (chunck) => items.push(JSON.parse(chunck)))
  .on('error', (error) => console.log({error}))
  .on('finish', () => console.log('stream has been finished'))
