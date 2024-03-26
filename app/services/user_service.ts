import bcrypt from 'bcryptjs'
import User from '#models/user'

import { UserData } from '../utils/utils.js'

import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { inject } from '@adonisjs/core'

export class UserService {
  async getAllUser() {
    try {
      const users = await User.query().has('taches')
      return { data: users, response: 'Success', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 500 }
    }
  }

  async createUser(user: UserData) {
    try {
      const { nom, password, email, role } = user

      const hashedPassword = await bcrypt.hash(password, 10)
      const currentUser = await User.create({
        nom: nom,
        password: hashedPassword,
        email: email,
        role: role,
      })

      return { data: currentUser, response: 'Utilisateur crée avec succès ', code: 200 }
    } catch (error) {
      console.error(error)
      return { response: 'Data invalide', code: 500 }
    }
  }

  async findUserById(userId: number) {
    try {
      const user = User.find(userId)

      return { data: user, response: 'Utilisateur trouvé avec succès ', code: 200 }
    } catch (error) {
      return { response: 'Error : ' + error, code: 200 }
    }
  }

  async updateUser(user: UserData, idUser: number) {
    try {
      const { nom, password, email, role } = user

      const userExist = await User.find(idUser)
      if (!userExist) {
        return { response: 'Utilisateur introuvable ', code: 404 }
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      userExist.nom = nom
      userExist.email = email
      userExist.password = hashedPassword
      userExist.role = role
      userExist.save()

      return { data: userExist, response: 'Profile mise à jour avec succes ', code: 200 }
    } catch (error) {
      console.error(error)
      return { response: 'Data invalide', code: 500 }
    }
  }

  async uploaFile(file: MultipartFile, userId: number) {
    try {
      const user = await User.find(userId)
      if (!user) {
        return { response: 'Profile inexistant', code: 404 }
      }

      await file?.move(app.makePath('uploads'))

      user!.piece_identity = file?.fileName!
      await user.save()
      return { data: file.fileName, response: 'Profile mise à jour avec succes ', code: 200 }
    } catch (error) {
      return { response: 'Une erreur c est produite  ', code: 500 }
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findBy('email', email)

      if (!user) {
        return { response: 'Informations introuvable', code: 400 }
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return { response: 'Une erreur c est produite  ', code: 403 }
      }
      const token = await User.accessTokens.create(user)
      return { response: token, code: 201 }
    } catch (error) {
      return { response: 'Une erreur c est produite  ', code: 500 }
    }
  }
  async findTachesToUser(nameOrEmail) {
    try {
      const userTachesAll = await User.query()
        .where('email', nameOrEmail)
        .orWhere('nom', nameOrEmail)
        .first()
      if (!userTachesAll) {
        return { response: 'Utilisateur introuvable', code: 404 }
      }

      const tachesAll = await User.query().preload('taches')

      return { response: 'Ok', data: tachesAll, code: 200 }
    } catch (error) {
      return { response: error, code: 400 }
    }
  }
}
export default UserService
