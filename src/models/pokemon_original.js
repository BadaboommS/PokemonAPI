const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée", "Dragon", "Combat", "Spectre", "Ténebre"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty: {msg: 'Le nom du pokémon ne peut pas être vide.'},
          notNull: {msg: 'Le nom est une propriété requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points de vie.'},
          notNull: {msg: 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Le nombre de cp doit être compris entre 0 et 99.'
          },
          max: {
            args: [99],
            msg: 'Le nombre de cp doit être compris entre 0 et 99.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les cp.'},
          notNull: {msg: 'Les cp sont une propriété requise.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: 'L\Url de l\'image n\'est pas valide.'},
          notNull: {msg: 'Veuillez renseigner un lien pour l\'image du pokémon.'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d\'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }