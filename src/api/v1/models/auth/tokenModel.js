const mongoose = require("mongoose");
//auth Controller will handle token
const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  refId: {
    type: String,
    required: true,
  },
  createdDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("tokenauths", tokenSchema);

/**
 *  @openapi
 *  components:
 *      schemas:
 *          createNewAccessToken:
 *              type: object
 *              required:
 *                -refreshToken
 *                -refId
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvc2Rhc2RhcyIsImlhdCI6MTcwMjk5MDg3NywiZXhwIjoxNzAyOTkwOTA3fQ.9q0kNX5PXXBxVrb_D6l_8x_VR_BQB9vQMyhKFMggo5Q
 *                refId:
 *                  type: string
 *                  example: 751a67e2-72db-4cc9-8b9f-5e4b15f4e59d
 */
