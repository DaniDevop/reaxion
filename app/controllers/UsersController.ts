// eslint-disable-next-line unicorn/filename-case
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';
import bcrypt from 'bcryptjs';
import app from '@adonisjs/core/services/app';

export default class UsersController {
    /**
     * Display a list of resource
     */
    async index({ request, response }: HttpContext) {
    const usersAll = await User.all()
        return response.status(200).json({ data: usersAll });
    }

    /**
     * Handle form submission for the create action
     */
    async store({ auth, request, response }: HttpContext) {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { email, nom, role, passwords } = request.body();

            const password = await bcrypt.hash(passwords, 10);

            const newUser = await User.create({
                nom,
                email,
                role,
                password,
            });

            const token = await User.accessTokens.create(newUser);

            return response.status(200).json({ data: token, user: newUser });
        } catch (error) {
            return response.status(500).json({ data: error.message });
        }
    }

    /**
     * Show individual record
     */
    async show({ request, response }: HttpContext) {
        try {
            const user = await User.find(request.param('id'));
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }
            return response.status(200).json({ data: user });
        } catch (error) {
            console.error('Error in UsersController show:', error);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ response, request }: HttpContext) {
        try {
            const user = await User.find(request.input('id'));
            if (!user) {
                return response.status(404).json({ message: 'Le user est inexistant' });
            }
            user.nom = request.input('nom');
            user.email = request.input('email');
            user.role = request.input('role');
            user.password = await bcrypt.hash(request.input('password'), 10);
            await user.save();
            return response.status(200).json({ message: 'Users mise à jour avec succes', data: user });
        } catch (error) {
            return response.status(500).json({ message: 'Une erreur est survenue' });
        }
    }
    /**
     * Upload Image
     */
    async uploadFile({ request, response }: HttpContext) {

        try {
            const user = await User.find(request.input('id'));

            if (!user) {
                return response.status(404).json({ message: 'Le user est inexistant', requests: request });
            }
            const image = await request.file('piece');
            await image?.move(app.makePath('uploads'));

            user!.piece_identity = image.fileName!;
            await user.save();
            return response.status(200).json({ message: 'Image upload avec succes', data: user });
        } catch (error) {
            return response.status(500).json({ message: 'Une erreur est survenue' });
        }
    }
}
