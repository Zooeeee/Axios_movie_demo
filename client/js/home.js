window.onload = function(){
    //console.log("为了JS的代码不阻塞页面的DOM渲染，我们使用这个方法让页面加载完成之后再执行内部代码")
    document.addEventListener('click',handleDeleteMovieClick,false);
    function handleDeleteMovieClick(e){
        let movieId = e.target.getAttribute('data-movieId');
        if (movieId){
            let confirmDel = confirm("确定删除？");
            if(confirmDel){
                console.log(movieId);
                deleteMovieById(movieId);
                location.reload();}
            else 
                return ;}
        else
            return 0 ;
            }
    function deleteMovieById(movieId){
        let str ='http://localhost:3000/movies/'+movieId
        axios.delete(str)
            .then(function(response){
                console.log(response)
                })
            .catch(function (error){
                console.log(error)
            })
        }
            
    function render(){
        axios.get('http://localhost:3000/movies')
            .then(function(response){
                let movies = response.data,str=``;
                movies.forEach(movie => {
                let star = "⭐⭐⭐⭐⭐※※※※※";
                let rate = Math.round(movie.score/2);
                str += `
                <li class="movieBox">
                <button class="delMovie" data-movieId="${movie.id}">x</button>
                    <div class = "mPost">
                        <img src = "${movie.post}" alt="${movie.title}">
                    </div>
                    <div class="mTitle">${movie.title}</div>
                    <div class="mScore">${star.slice(5-rate,10-rate)+movie.score}分</div>
                </li>`
            });
                let moviesRow = document.getElementById("moviesRow");
                moviesRow.innerHTML += str ;
            }) 
            .catch(function(error){
            console.log(error);
            });

        }

        //main
        render();
        generate_modify_input()
        //end
        

        function generate_modify_input(){   //生成修改栏
        axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let information = response.data;
            let str = `title:<select name="name">`;
            for(let a of information){
                let b = a.title;
                str += `<option value="${b}">${b}</option>`
            }
            str += ` </select>属性:
            <select name="cont">`;
            let a = information[0];
            for (let b in a){
                str += `<option value="${b}">${b}</option>`;
            }
            str += `</select>
            修改内容:<input type="text" id = "modify_text"/>
            <button type="button" id="modify_button" >修改</button>`
            document.getElementById("modify").innerHTML += str;

            //填写信息并发送
            document.getElementById("modify_button").onclick = function(){
                let a = document.getElementsByName("name");
                let b = document.getElementsByName("cont");
                let c = document.getElementById("modify_text");
                post_modify(a[0].value,b[0].value,c.value);  //发送  
            }
        })
         .catch(function (error) {
           console.log(error);
         });
        }

        
        
        function post_modify(title,cont,text){
            
            axios.get('http://localhost:3000/movies')
                .then(function(response){
                    let all = response.data;
                    let test = {}
                    for (let a of all){{
                        if(a.title == title )
                            item = a ;}}
                    axios.delete('http://localhost:3000/movies/'+item.id) //删除
                        .then(function(res){console.log(res)})
                        .catch(function(res){console.log(res)})
                    item[cont] = text ; 
                    axios.post('http://localhost:3000/movies',item)
                        .then(function(res){
                            if(res.data){
                                alert("修改成功");
                                location.reload();
                            }

                        })
                        .catch(function(res){console.log(res)})
                        

                })
                .catch(function(err){
                console.log(err);
                });
                
           
                


        
        }
    
    
    } 
