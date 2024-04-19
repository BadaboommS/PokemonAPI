const validTypes = ["Grass","Poison","Fire","Flying","Water","Bug","Normal","Electric","Ground","Rock","Fairy","Fighting","Psychic","Steel","Ghost","Ice","Dragon"]

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
      atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points atk doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points atk doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points atk.'},
          notNull: {msg: 'Les points atk sont une propriété requise.'}
        }
      },
      def: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points def doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points def doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points def.'},
          notNull: {msg: 'Les points def sont une propriété requise.'}
        }
      },
      s_atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points s_atk doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points s_atk doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points s_atk.'},
          notNull: {msg: 'Les points s_atk sont une propriété requise.'}
        }
      },
      s_def: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points s_def doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points s_def doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points s_def.'},
          notNull: {msg: 'Les points s_def sont une propriété requise.'}
        }
      },
      spd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Les points spd doivent être supérieur à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points spd doivent être inférieur à 999.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour les points spd.'},
          notNull: {msg: 'Les points spd sont une propriété requise.'}
        }
      },
      gen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'La gen ne peux pas être égale à 0.'
          },
          max: {
            args: [2],
            msg: 'Les points spd doivent être inférieur à 2.'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour la gen.'},
          notNull: {msg: 'La gen est une propriété requise.'}
        }
      },
      legendary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le champ legendary ne peut pas être vide.'},
          notNull: {msg: 'Legendary est une propriété requise.'}
        }
      },
      evolves_from_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [151],
            msg: 'Le pokémon ne peux pas évoluer depuis un pokémon non existant !'
          },
          isInt: {msg: 'Utilisez seulement des nombres entiers pour evolves_from_id.'},
          notNull: {msg: 'Evolves_from_id est une propriété requise.'}
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