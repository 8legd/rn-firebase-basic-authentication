let inflect = require('i')()

export default function normalize (item, rootRef) {
  if (!rootRef) {
    throw new Error('rootRef not defined for normalize function')
  }

  let promises = []
  let normalized = Object.assign({}, item)
  let keyFields = getKeyFields(item)
  let keysFields = getKeysFields(item)

  keyFields.forEach((key) => {
    let infos = key.split('_')

    promises.push(new Promise((resolve, reject) => {
      let childRef = infos[0]

      rootRef.child(`${childRef}/${item[key]}`).once('value', (snap) => {
        if (!snap) {
          console.log(
            `Not found child ${childRef} with key ${item[key]}`
          )
          return reject()
        }

        let data = snap.val()
        data.key = snap.key()
        data.ref_name = inflect.singularize(childRef)
        data.isArrayItem = false

        resolve(data)
      }, reject)
    }))
  })

  keysFields.forEach((key) => {
    let infos = key.split('_')
    let childRef = infos[0]
    let arrayField = item[key]

    arrayField.forEach((childKey) => {
      promises.push(new Promise((resolve, reject) => {
        rootRef.child(`${childRef}/${childKey}`).once('value', (snap) => {
          let data = snap.val()
          data.key = snap.key()
          data.ref_name = childRef
          data.isArrayItem = true

          resolve(data)
        }, reject)
      }))
    })
  })

  return Promise.all(promises).then((values) => {
    values.forEach((value) => {
      let cleanedRef = Object.assign({}, value, { ref_name: undefined })

      if (!value.isArrayItem) {
        normalized[value.ref_name] = cleanedRef
      } else {
        if (!normalized[value.ref_name]) {
          normalized[value.ref_name] = []
        }

        normalized[value.ref_name].push(cleanedRef)
      }
    })

    return normalized
  })
}

function getKeyFields (item) {
  let keys = Object.keys(item)
  let keyFields = []

  keys.forEach((key) => {
    if (key.endsWith('_key')) {
      keyFields.push(key)
    }
  })

  return keyFields
}

function getKeysFields (item) {
  let keys = Object.keys(item)
  let keyFields = []

  keys.forEach((key) => {
    if (key.endsWith('_keys')) {
      keyFields.push(key)
    }
  })

  return keyFields
}
