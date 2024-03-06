import { Identifiable } from '..';
import SequelizeTeams from '../../database/models/SequelizeTeams';

export interface IMatchesBody extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatches extends IMatchesBody {
  homeTeam?: SequelizeTeams;
  awayTeam?: SequelizeTeams;
}
