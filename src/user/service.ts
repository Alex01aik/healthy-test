import User from './model';

class UserService {
  async createOne(args: {name: string, email: string}) {
      const data = new User({
        name: args.name,
        email: args.email,
      });

      return await data.save();
  }

  async getAll() {
      return await User.find();
  }

  async isExist(_id: string) {
    try {
      const data = await User.findById(_id);
      if (!data) {
        throw { message: 'User does not exist!' };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default new UserService();
