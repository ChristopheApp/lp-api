import type { Stream } from '~~/types/streams'
import type {data} from '~~/types/apiData'
/**
 * On imagine que ce sont des données reçues de la base de données
 *
 * On spécifie ici que `animals` est un tableau contenant des `Animal`
 */
export const pets: Stream[] = [
  
]

export const apiData: data = {
    client_id: "3qlhvtm78xgpq4nw63dqlgp07zb0zg",
    client_secret: "qxv5e47fsxm8yhemihpktgk8fe58ji",
    authorization : "Bearer gs6d188f7eus71a6kxlt5obfvgydum",
    redirect_uri: "http://localhost:3000/",
    response_type: "token",
    scope: "user:read:follows",
    game_name: "Grand Theft Auto V",
    game_id: "32982",
    language: "fr",
    limit: "100",
    use_follows: false,
    user_id: "147359949", // Compte : Kin4y, compte pour le mode followed users
    // J'ai autorisé le read follow sur mon compte pour les 2 apps enregistrées sur Twitch.
    regExp21JC: /(21 *[jJ][uU][mM][pP] *[cC][lL][iI][cC][kK])|(21 *[jJ] *[cC])/,
    regExpLP: /([lL][oO][sS] *[pP][lL][aA][nN][tT][oO][sS])/,
    
}