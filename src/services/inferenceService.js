const tf = require("@tensorflow/tfjs-node");

const InputError = require("../exceptions/InputError.js");
async function predictClassification(model, image) {
  try {
    const tensor = tf.node

      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);

    const score = await prediction.data();

    let label, suggestion;

    if (score[0] > 0.5) {
      label = "Cancer";
      suggestion = "Segera periksa ke dokter!";
    } else {
      label = "Non-cancer";
      suggestion = "Anda sehat!";
    }

    return { label, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
  }
}

module.exports = predictClassification;
