/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

//change mode production / development
process.env.NODE_ENV = 'development'

let sequelize

if(process.env.NODE_ENV === 'production'){
  sequelize = new Sequelize('xi16s68xroxb1aul', 'g9a46s26wfc4yoa2', 'bgciz45ef26zxpgj', {
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    port: 3306,
    logging: true
  })
}else{
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}

  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        /* cp: pokemon.cp,
        picture: pokemon.picture, */
        atk: pokemon.atk,
        def: pokemon.def,
        s_atk: pokemon.s_atk,
        s_def: pokemon.s_def,
        spd: pokemon.spd,
        gen: pokemon.gen,
        legendary: pokemon.legendary,
        evolves_from_id: pokemon.evolves_from_id,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu',10)
    .then(hash => {
      User.create({
        username: "pikachu",
        password: hash
      }).then(user => console.log(user.toJSON()))
    })

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}