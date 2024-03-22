import mongoose from 'mongoose';

const businessUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  produce: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const BusinessUser = mongoose.model('Business User', businessUserSchema);

export default BusinessUser;
