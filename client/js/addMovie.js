window.onload = function(){
    console.log(0)
    let addButton = document.getElementById("addButton");
    const form = document.getElementById("addMovie");
    addButton.addEventListener('click',e=>{
        e.preventDefault();
        const movieData = getMovieData("addMovie");
        console.log(movieData)
        axios.post('http://localhost:3000/movies',movieData)
        .then(function(response){
            if(response.data){
                alert("添加成功");
                form.reset();
            }
            else{
                alert("添加失败");
            }
        })
        .catch(function(error){
            console.log(error);
        })
    },false);

    function getMovieData(formId){
        const form = document.getElementById(formId);
        let tagElements = form.getElementsByTagName('input');
        let movieData = {};
        for(let item of tagElements){
            movieData[item.name] = item.value;}
        console.log(movieData)
        return movieData;
    }
};
