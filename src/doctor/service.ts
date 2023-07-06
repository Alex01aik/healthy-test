import Doctor from './model';

class DoctorService {
  async createOne(args: {name: string, working_hours: any}) {
      const data = new Doctor({
        name: args.name,
        working_hours: args.working_hours,
      });
      return await data.save();
  }

  async getAll() {
      return await Doctor.find();
  }

  async getOneById(_id: string) {
    try {
      const data = await Doctor.findById(_id);

      if (!data) {
        throw { message: 'Doctor does not exist!' };
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async isExist(_id: string) {
    try {
      const data = await Doctor.findById(_id);
      if (!data) {
        throw { message: 'Doctor does not exist!' };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default new DoctorService();
