import {Member} from "./Member";

export interface Etudiant extends Member {
  dateInscription?: string;
  diplome?: string;

}
