import SequelizeMatches from '../../database/models/SequelizeMatches';

export interface ITeam {
  id: number;
  teamName: string;
  homeMatches?: SequelizeMatches[];
  awayMatches?: SequelizeMatches[];
}
