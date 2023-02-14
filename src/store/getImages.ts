async function getImages() {
  try {
    const fetchResult = await fetchImages();

    console.log(fetchResult);
  } catch (error) {}
}

export default getImages;

async function fetchImages() {
  const response = await fetch(
    "https://api.giphy.com/v1/stickers/packs?api_key=34fff10Cvxo1SKlv1akZ25wCXp1NQ34P"
  );

  if (!response.ok) {
    throw new Error("Error getting images");
  }
  return response.json();
}
