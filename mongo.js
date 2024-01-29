const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://dnguye12:${password}@cluster0.nocz2mr.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    let newName = process.argv[3]
    let newNumber = process.argv[4]

    const newPerson = new Person({
        name: newName,
        number: newNumber,
    })
    newPerson.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    console.log("phonebook : ")
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
} else {
    console.log("Wrong command format")
}