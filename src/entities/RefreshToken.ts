import mongoose, { Document, Schema, Model } from 'mongoose'

export type RefreshTokenAttributes = {
  expiresIn: number
  userId: string
}

export type RefreshTokenDocument = Document & RefreshTokenAttributes

type RefreshTokenModel = Model<RefreshTokenDocument>;

const RefreshTokenSchema = new Schema(
  {
    expiresIn: {
      type: Number,
      trim: true,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
      unique: true,
      required: true
    }
  }
)

export default mongoose.model<RefreshTokenDocument, RefreshTokenModel>(
  'RefreshToken',
  RefreshTokenSchema
)
