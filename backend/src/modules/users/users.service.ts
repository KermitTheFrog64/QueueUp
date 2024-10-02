import { Repository } from "typeorm"
import { UserEntity } from "./entities/user.entity"
import { AppDataSource } from "../../data-source"
import * as jwt from 'jsonwebtoken'

class UsersService {

    private usersRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity)

    async logIn(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } })
        if (user && user.password === password) {
            const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' })
            return { access_token }
        }
        return null
    }

    async signUp(email: string, password: string, name: string, phoneNumber: string) {
        const newUser = this.usersRepository.create({ email, name, password, phoneNumber })
        await this.usersRepository.save(newUser)
        const access_token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' })
        return { access_token }
    }

    async User(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //@ts-ignore
        const userId = decoded?.id
        if (userId) {
            const user = this.usersRepository.findOneBy({id: userId})
            return user
        }
        return null

    }
}

export default UsersService