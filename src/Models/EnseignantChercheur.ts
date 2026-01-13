import {Member} from "./Member";

export interface EnseignantChercheur extends Member {
  grade?: string;
  etablissement?: string;
}
