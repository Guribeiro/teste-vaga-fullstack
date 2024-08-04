import fs from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

import csv from 'csv-parser'

import { streamValidator } from './utils/transformers/stream_validator.js'
import { transformToCurrency } from './utils/transformers/transform_to_currency.js'

const readableStream = fs.createReadStream('data.csv')

const promisedPipeline = promisify(pipeline)

async function run() {
  await promisedPipeline(
    readableStream,
    csv(),
    streamValidator,
    transformToCurrency,
  )

  console.log('streaming has been finished!')
}

run().catch(console.error)

 