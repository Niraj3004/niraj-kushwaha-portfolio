import { Testimonial, ITestimonial } from '../models/testimonial.model';
import { uploadToCloudinary } from '../utils/upload';

export class TestimonialService {
  static async getAll() {
    return Testimonial.find().sort({ createdAt: -1 });
  }

  static async create(data: Partial<ITestimonial>, file?: Express.Multer.File) {
    if (file) {
      data.avatar = await uploadToCloudinary(file.buffer, 'portfolio/testimonials');
    }
    return Testimonial.create(data);
  }

  static async update(id: string, data: Partial<ITestimonial>, file?: Express.Multer.File) {
    if (file) {
      data.avatar = await uploadToCloudinary(file.buffer, 'portfolio/testimonials');
    }
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    if (!testimonial) throw { statusCode: 404, message: 'Testimonial not found' };
    return testimonial;
  }

  static async delete(id: string) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw { statusCode: 404, message: 'Testimonial not found' };
    return testimonial;
  }
}
