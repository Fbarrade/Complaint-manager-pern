import axios from 'axios'
axios.defaults.withCredentials = true

export async function onInsertion(ComplaintData) {
  return await axios.post(
    'http://localhost:8000/api/insert-complaint',
    ComplaintData
  )
}
export async function onDeletion(ComplaintData) {
  return await axios.post(
    'http://localhost:8000/api/delete-complaint',
    ComplaintData
  )
}
export async function onGet() {
  return await axios.get('http://localhost:8000/api/get-complaints')
}


export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}
export async function predictUrgency(text) {
  try {
   const response = await axios.post('http://100.91.178.148:8081/predict', { data :text}, {
  headers: {
    'Content-Type': 'application/json',
  },
});
    return response.data.prediction;
  } catch (error) {
    console.error("Error predicting urgency:", error);
    return null;
  }
}