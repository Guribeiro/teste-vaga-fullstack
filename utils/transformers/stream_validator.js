import { Transform } from 'node:stream'
import { validators } from '../../utils/validators/index.js'

export const streamValidator = new Transform({
  objectMode: true,
  transform: (chunck, encoding, callback) => {
    const error = validators(chunck)
    if(error) {
      callback(error)
      return
    }
    callback(null, chunck)
  }  
}) 
