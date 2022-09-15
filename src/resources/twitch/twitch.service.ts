import type { Stream } from '~~/types/streams'
import axios from 'axios'

//import { pets } from '~/data'
import { NotFoundException } from '~/utils/exceptions'

import api, {getAppAcessToken, getOAuthUserToken} from "~/resources/twitch/twitch.config"
import { apiData } from '~/data'

const data = apiData;



export class TwitchService {
  /**
   * On copie localement les animaux pour pouvoir insérer, supprimer etc
   */
//   pets: Stream[] = [];

  /**
   * Obtenir un access token pour l'utiliser dans les requêtes
   */
  getAccessToken(): any {
  return getAppAcessToken()
  }

  async getGameId(game_name: string): Promise<any> {
    const res = await api.get(`https://api.twitch.tv/helix/games?name=${game_name}`)
    // console.log(res.data.data)
    return res.data.data
  }

//   /**
//    * Trouve les stream sur un jeu en particulier
//    * @param id - ID unique de l'animal
//    */
  async getStreamsByGameId(game_id: string): Promise<Stream[] | undefined> {
    const res = await api.get(`https://api.twitch.tv/helix/streams?game_id=${game_id}`)
    // console.log(res)
    const streams: Stream[] = res.data.data
    return streams
  }

  async getGtaStreams(): Promise<Stream[] | undefined> {
    const res = await api.get(`https://api.twitch.tv/helix/streams?game_id=${data.gta_game_id}&first=100`)
    // console.log(res)
    const streams: Stream[] = res.data.data
    return streams
  }

  async getRdrStreams(): Promise<Stream[] | undefined> {
    const res = await api.get(`https://api.twitch.tv/helix/streams?game_id=${data.rdr_game_id}`)
    // console.log(res)
    const streams: Stream[] = res.data.data
    return streams
  }

  async get21jcStreams(): Promise<any | undefined> {
    const gtaStreams = await this.getGtaStreams();
    // const gtaStreams = axios.get('http://localhost:3000/twitch/gta-streams')
    let streams: Stream[] = [];
    if(gtaStreams) {
      for(let i = 0; i < gtaStreams.length; i++) {
        if(data.regExp21JC.test(gtaStreams[i].title)) {
          streams.push(gtaStreams[i])
        }
      }
    }


    // gtaStreams.forEach((stream :Stream) => { 
    //   if (stream.title === '21jc') {
    //     streams.push(stream);
    //   }
    // });

    return streams
  }

//   /**
//    * Met à jour un animal en particulier
//    *
//    * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
//    *
//    * @param petData - Un objet correspondant à un animal, il ne contient pas forcément tout un animal. Attention, on ne prend pas l'id avec.
//    * @param id - ID unique de l'animal
//    */
//   update(petData: Partial<Stream>, id: number): Stream | undefined {
//     const index = this.pets.findIndex(pet => pet.id === id)

//     if (index === -1) {
//       throw new NotFoundException('Animal introuvable')
//     }

//     /* On ne met jamais l'id à jour */
//     delete petData.id

//     this.pets[index] = { ...this.pets[index], ...petData }
//     return this.pets[index]
//   }

//   /**
//    * Créé un animal
//    *
//    * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
//    *
//    * @param petData - Un objet correspondant à un animal. Attention, on ne prend pas l'id avec.
//    */
//   create(petData: Omit<Stream, 'id'>): Stream {
//     const newPet: Stream = {
//       ...petData,
//       /* /!\ Ne pas faire ceci dans un vrai projet */
//       id: Math.floor(Math.random() * 100)
//     }

//     this.pets.push(newPet)
//     return newPet
//   }

//   /**
//    * Suppression d'un animal
//    */
//   delete(id: number) {
//     //this.pets = this.pets.filter(pet => pet.id !== id)
//   }
 }
