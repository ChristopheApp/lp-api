import { Router } from 'express'
import { TwitchService } from '~/resources/twitch/twitch.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import api from "~/resources/twitch/twitch.config"
/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const TwitchController = Router()
const API = api;

/**
 * Instance de notre service
 */
const service = new TwitchService()

/**
 * Trouve tous les animaux
 */
TwitchController.get('/access-token', async (req, res) => {
  const result = await service.getAccessToken()
  console.log(result)
  return res
    .status(200)
    .json({status: result.status, data: result.data})
})

TwitchController.get('/gta-streams', async (req, res) => {
  const result = await service.getGtaStreams();
  return res
    .status(200)
    .json({data: result})
})

TwitchController.get('/streams/:gameId', async (req, res) => {
  const result = await service.getStreamsByGameName(req.params.gameId)
  console.log(result)
  return res
    .status(200)
    .json({data: result})
})

// /**
//  * Trouve un animal en particulier
//  */
// TwitchController.get('/:id', (req, res) => {
//   const id = Number(req.params.id)

//   if (!Number.isInteger(id)) {
//     throw new BadRequestException('ID non valide')
//   }

//   const pet = service.findOne(id)

//   if (!pet) {
//     throw new NotFoundException('Animal introuvable')
//   }

//   return res
//     .status(200)
//     .json(pet)
// })

// /**
//  * Créé un animal
//  */
// TwitchController.post('/', (req, res) => {
//   const createdPet = service.create(req.body)

//   return res
//     .status(201)
//     .json(createdPet)
// })

// /**
//  * Mise à jour d'un animal
//  */
// TwitchController.patch('/:id', (req, res) => {
//   const id = Number(req.params.id)

//   if (!Number.isInteger(id)) {
//     throw new BadRequestException('ID invalide')
//   }

//   const updatedPet = service.update(req.body, id)

//   return res
//     .status(200)
//     .json(updatedPet)
// })

// /**
//  * Suppression d'un animal
//  */
// TwitchController.delete('/:id', (req, res) => {
//   const id = Number(req.params.id)

//   if (!Number.isInteger(id)) {
//     throw new BadRequestException('ID invalide')
//   }

//   return res
//     .status(200)
//     .json(service.delete(id))
// })

/**
 * On expose notre controller pour l'utiliser dans `src/index.ts`
 */
export { TwitchController }