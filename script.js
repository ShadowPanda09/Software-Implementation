let startNodeCoords = [Number(document.getElementById("startY").value), Number(document.getElementById("startX").value)]
let goalNodeCoords = [Number(document.getElementById("goalY").value), Number(document.getElementById("goalX").value)]
console.log(startNodeCoords)
console.log(goalNodeCoords)

class Node{

    constructor(coords, tile){
        this.coords = coords
        this.children;
        this.parent;
        this.wall = false
        this.tile = tile
    }

    findChildren(){
        
    }



}



class Algorithm{
    constructor(){
        this.visited = [];
        this.current;
        this.queue = [];
        this.path = []
    }
    
    color(){
        for (let i = 0; i < this.visited.length; i++){
            this.visited[i].tile.style.backgroundColor = "light green"
        }
    }

    effPath(){
        for (let i = 0; i < this.path.length; i++){
            this.path[i].tile.style.backgroundColor = "dark green"
        }
    }

    run(){}

    check(){
        if (this.current.coords == goalNodeCoords){
            return true;
        } else {
            return false;
        }
    }

    traceBack(startNode){
        while (this.current != startNode){
            this.current = this.current.parent;
        }
    }

    buildBoard(startNode, goalNode){
        for (let y = 0; y < map.length; y++){
            for (let x = 0; x < map[y].length; x++){
                if (map[y][x].wall == true){
                    map[y][x].tile.style.backgroundColor = "black"
                } else if (map[y][x].coords == startNode){
                    map[y][x].tile.style.backgroundColor = "green"
                } else if (map[y][x].coords == goalNode){
                    map[y][x].tile.style.backgroundColor = "red"
                } else{
                    map[y][x].tile.style.backgroundColor = "white"
                }
                console.log(map[y][x].coords)
                console.log(startNode)
                console.log(goalNode)
                console.log(map[y][x].coords == startNode)
                console.log(map[y][x].coords == goalNode)
                
            }
        }
    }
}

class BFS extends Algorithm{
    constructor(){
        super()
    }

    run(){
        
    }
}


let BFSal = new BFS()

function createMap(width, height){    
    let nodes = [];
    let x = 0;
    let y = 0;


    for (let i = 0; i < height; i++){
        let row = document.createElement("tr")
        document.getElementById("table").appendChild(row)
        nodes.push([])

        for (let j = 0; j < width; j++){
            nodes[i].push(new Node([y, x], document.createElement("td")));
            nodes[i][j].tile.style.width = "50px"
            nodes[i][j].tile.style.height = "50px"  
            nodes[i][j].tile.style.border = "3px solid black"
            nodes[i][j].tile.addEventListener("click", function(){
                if(nodes[i][j].wall == true){
                    nodes[i][j].wall = false;
                } else{
                    nodes[i][j].wall = true; 
                }
                BFSal.buildBoard(map[0][0], map[5][5]);})
            row.appendChild(nodes[i][j].tile)
            x++;
        }
        x = 0;
        y++;
    }

    

    return nodes
}

map = createMap(8,8)
document.getElementById("submit").addEventListener("click", function(){
    console.log("ran")
    startNodeCoords = [Number(document.getElementById("startY").value), Number(document.getElementById("startX").value)]
    goalNodeCoords = [Number(document.getElementById("goalY").value), Number(document.getElementById("goalX").value)]
    BFSal.buildBoard(startNodeCoords, goalNodeCoords)})