const getData = async (url) => {
    let response = await fetch(url);
    return await response.json();
  }
  
  const getQuestions = async (category) => {
    const data = await getData(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`);
    console.log(data);
    return data;
  }
  
  export {getData, getQuestions}