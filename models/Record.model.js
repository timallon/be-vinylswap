const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recordSchema = new Schema(
  {
    title: {
      type: String,
      //required: [true, "The record's title is required."],
    },
    artist: {
      type: String,
      // required: [true, "Artist's name is required."],
    },
    yearReleased: {
      type: Date,
      // required: [true, 'Start time is required.'],
      trim: true
      },
      label: {
        type: String,
        // required: [true, 'Record label is required.'],
        trim: true
        },
      genre: {
      type: String,
      // required: [true, 'End time is required.'],
      enum: ['Rock', 'Pop', 'Indie','Soul', 'Electronic', 'Hip-Hop', 'Psychedelic', 'Reggae','Jazz', 'Other'],
      trim: true
      },
      image: {
      type: String,
      // required: [false, '.'],
      trim: true
      },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Record = model("Record", recordSchema);

module.exports = Record;
