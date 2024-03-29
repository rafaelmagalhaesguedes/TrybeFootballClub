import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeTeam: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  }
};