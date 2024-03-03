import { QueryInterface, DataTypes } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
      return queryInterface.createTable('teams', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        teamName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'team_name',
        },
      });
    },
    async down(queryInterface: QueryInterface) {
      return queryInterface.dropTable('teams');
    },
};