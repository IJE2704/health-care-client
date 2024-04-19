export const removeData = async (url) => {
  try {
    const res = await fetch(url,{
      method:'DELETE'
    })
    const response = await res.json();
    if(response.deletedCount === 0){
      throw new Error('Network response was not ok');
    }
    return response;
  } catch (error) {
    console.log('Error to fetch data : ' , error);
    throw error;
  }
};
